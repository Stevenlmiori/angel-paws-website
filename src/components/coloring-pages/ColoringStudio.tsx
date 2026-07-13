"use client";

import Link from "next/link";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";
import {
  ArrowLeft,
  Download,
  Droplets,
  Eraser,
  Paintbrush,
  Printer,
  RotateCcw,
  Sparkles,
  Undo2,
} from "lucide-react";
import { cn } from "@/lib/cn";
import {
  computeFitSize,
  floodFillRegion,
  hexToRgba,
  mergePaintAndLineArt,
} from "@/lib/coloringPages/canvasUtils";
import {
  COLORING_PALETTE,
  ERASER_COLOR,
} from "@/lib/coloringPages/palette";
import { openImagePrintWindow } from "@/lib/coloringPages/print";
import type { ColoringPage } from "@/lib/siteContent/coloringPages";

type Tool = "brush" | "fill" | "eraser";

const BRUSH_SIZES = [10, 20, 36] as const;
const MAX_UNDO = 24;

type Props = {
  page: ColoringPage;
};

export function ColoringStudio({ page }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const paintRef = useRef<HTMLCanvasElement>(null);
  const lineArtRef = useRef<HTMLImageElement>(null);
  const lineDataRef = useRef<Uint8ClampedArray | null>(null);
  const drawingRef = useRef(false);
  const undoStackRef = useRef<ImageData[]>([]);

  const [ready, setReady] = useState(false);
  const [tool, setTool] = useState<Tool>("brush");
  const [color, setColor] = useState(COLORING_PALETTE[0]!.hex);
  const [brushSize, setBrushSize] = useState<(typeof BRUSH_SIZES)[number]>(20);
  const [canUndo, setCanUndo] = useState(false);
  const [displaySize, setDisplaySize] = useState({ width: 0, height: 0 });

  const activeColor = tool === "eraser" ? ERASER_COLOR : color;

  const snapshotUndo = useCallback(() => {
    const canvas = paintRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) {
      return;
    }
    const snap = ctx.getImageData(0, 0, canvas.width, canvas.height);
    undoStackRef.current = [...undoStackRef.current.slice(-(MAX_UNDO - 1)), snap];
    setCanUndo(undoStackRef.current.length > 0);
  }, []);

  const clearPaintLayer = useCallback((ctx: CanvasRenderingContext2D, w: number, h: number) => {
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, w, h);
  }, []);

  const setupCanvas = useCallback(() => {
    const container = containerRef.current;
    const canvas = paintRef.current;
    const img = lineArtRef.current;
    if (!container || !canvas || !img || !img.complete || img.naturalWidth === 0) {
      return;
    }

    const fit = computeFitSize(
      container.clientWidth,
      Math.max(container.clientHeight, 320),
      page.orientation,
    );
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const pixelWidth = Math.round(fit.width * dpr);
    const pixelHeight = Math.round(fit.height * dpr);

    canvas.width = pixelWidth;
    canvas.height = pixelHeight;
    setDisplaySize({ width: fit.width, height: fit.height });

    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) {
      return;
    }
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    clearPaintLayer(ctx, pixelWidth, pixelHeight);

    const lineCanvas = document.createElement("canvas");
    lineCanvas.width = pixelWidth;
    lineCanvas.height = pixelHeight;
    const lineCtx = lineCanvas.getContext("2d");
    if (!lineCtx) {
      return;
    }
    lineCtx.drawImage(img, 0, 0, pixelWidth, pixelHeight);
    lineDataRef.current = lineCtx.getImageData(0, 0, pixelWidth, pixelHeight).data;

    undoStackRef.current = [];
    setCanUndo(false);
    setReady(true);
  }, [clearPaintLayer, page.orientation]);

  useEffect(() => {
    const img = lineArtRef.current;
    if (!img) {
      return;
    }
    const onLoad = () => setupCanvas();
    if (img.complete) {
      onLoad();
    } else {
      img.addEventListener("load", onLoad);
      return () => img.removeEventListener("load", onLoad);
    }
  }, [setupCanvas, page.file]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return;
    }
    const observer = new ResizeObserver(() => setupCanvas());
    observer.observe(container);
    return () => observer.disconnect();
  }, [setupCanvas]);

  const canvasPoint = useCallback((event: ReactPointerEvent<HTMLCanvasElement>) => {
    const canvas = paintRef.current;
    if (!canvas) {
      return null;
    }
    const rect = canvas.getBoundingClientRect();
    return {
      x: ((event.clientX - rect.left) / rect.width) * canvas.width,
      y: ((event.clientY - rect.top) / rect.height) * canvas.height,
    };
  }, []);

  const drawDot = useCallback(
    (x: number, y: number) => {
      const canvas = paintRef.current;
      const ctx = canvas?.getContext("2d");
      if (!canvas || !ctx) {
        return;
      }
      ctx.fillStyle = activeColor;
      ctx.beginPath();
      ctx.arc(
        x,
        y,
        (brushSize * canvas.width) / (displaySize.width || canvas.width) / 2,
        0,
        Math.PI * 2,
      );
      ctx.fill();
    },
    [activeColor, brushSize, displaySize.width],
  );

  const drawLine = useCallback(
    (fromX: number, fromY: number, toX: number, toY: number) => {
      const canvas = paintRef.current;
      const ctx = canvas?.getContext("2d");
      if (!canvas || !ctx) {
        return;
      }
      const scale = canvas.width / (displaySize.width || canvas.width);
      ctx.strokeStyle = activeColor;
      ctx.lineWidth = brushSize * scale;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.beginPath();
      ctx.moveTo(fromX, fromY);
      ctx.lineTo(toX, toY);
      ctx.stroke();
    },
    [activeColor, brushSize, displaySize.width],
  );

  const lastPointRef = useRef<{ x: number; y: number } | null>(null);

  const handlePointerDown = (event: ReactPointerEvent<HTMLCanvasElement>) => {
    if (!ready) {
      return;
    }
    event.currentTarget.setPointerCapture(event.pointerId);
    const point = canvasPoint(event);
    if (!point) {
      return;
    }

    if (tool === "fill") {
      snapshotUndo();
      const canvas = paintRef.current;
      const ctx = canvas?.getContext("2d");
      const lineData = lineDataRef.current;
      if (!canvas || !ctx || !lineData) {
        return;
      }
      floodFillRegion(
        ctx,
        lineData,
        canvas.width,
        canvas.height,
        point.x,
        point.y,
        hexToRgba(activeColor),
      );
      return;
    }

    drawingRef.current = true;
    snapshotUndo();
    lastPointRef.current = point;
    drawDot(point.x, point.y);
  };

  const handlePointerMove = (event: ReactPointerEvent<HTMLCanvasElement>) => {
    if (!drawingRef.current || tool === "fill") {
      return;
    }
    const point = canvasPoint(event);
    const last = lastPointRef.current;
    if (!point || !last) {
      return;
    }
    drawLine(last.x, last.y, point.x, point.y);
    lastPointRef.current = point;
  };

  const handlePointerEnd = () => {
    drawingRef.current = false;
    lastPointRef.current = null;
  };

  const handleUndo = () => {
    const canvas = paintRef.current;
    const ctx = canvas?.getContext("2d");
    const stack = undoStackRef.current;
    if (!canvas || !ctx || stack.length === 0) {
      return;
    }
    const previous = stack.pop();
    if (!previous) {
      return;
    }
    ctx.putImageData(previous, 0, 0);
    setCanUndo(stack.length > 0);
  };

  const handleClear = () => {
    const canvas = paintRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) {
      return;
    }
    snapshotUndo();
    clearPaintLayer(ctx, canvas.width, canvas.height);
  };

  const exportMergedPng = () => {
    const canvas = paintRef.current;
    const img = lineArtRef.current;
    if (!canvas || !img) {
      return "";
    }
    return mergePaintAndLineArt(canvas, img);
  };

  const handleDownload = () => {
    const dataUrl = exportMergedPng();
    if (!dataUrl) {
      return;
    }
    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = `${page.slug}-colored.png`;
    link.click();
  };

  const handlePrint = () => {
    const dataUrl = exportMergedPng();
    if (!dataUrl) {
      return;
    }
    openImagePrintWindow(dataUrl, {
      orientation: page.orientation,
      title: `${page.name} — Angel Paws Coloring`,
    });
  };

  return (
    <div className="flex min-h-[calc(100dvh-5rem)] flex-col bg-background">
      <header className="sticky top-20 z-40 border-b border-stone-200/80 bg-stone-50/95 px-4 py-3 backdrop-blur-md sm:px-6">
        <div className="mx-auto flex max-w-screen-xl items-center gap-3">
          <Link
            href="/coloring-pages"
            className="inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-semibold text-stone-600 transition hover:bg-stone-200/60 hover:text-stone-900"
          >
            <ArrowLeft className="size-4" aria-hidden />
            <span className="hidden sm:inline">All pages</span>
          </Link>
          <div className="min-w-0 flex-1">
            <p className="truncate font-serif text-xl text-on-surface sm:text-2xl">
              Color {page.name}
            </p>
            <p className="hidden text-xs text-on-surface-variant sm:block">
              Brush, tap-to-fill, then save or print your masterpiece
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <button
              type="button"
              onClick={handleDownload}
              disabled={!ready}
              className="inline-flex items-center gap-1.5 rounded-full bg-primary px-3 py-2 text-sm font-semibold text-on-primary transition hover:opacity-90 disabled:opacity-50 sm:px-4"
            >
              <Download className="size-4" aria-hidden />
              <span className="hidden sm:inline">Save</span>
            </button>
            <button
              type="button"
              onClick={handlePrint}
              disabled={!ready}
              className="inline-flex items-center gap-1.5 rounded-full bg-surface-container-high px-3 py-2 text-sm font-semibold text-on-surface transition hover:bg-surface-container-highest disabled:opacity-50 sm:px-4"
            >
              <Printer className="size-4" aria-hidden />
              <span className="hidden sm:inline">Print</span>
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto flex w-full max-w-screen-xl flex-1 flex-col gap-4 px-4 py-4 sm:px-6 sm:py-6 lg:flex-row lg:gap-8">
        <div
          ref={containerRef}
          className="flex min-h-[50dvh] flex-1 items-center justify-center lg:min-h-[62dvh]"
        >
          <div
            className="relative isolate bg-white shadow-soft ring-1 ring-stone-200/80"
            style={
              displaySize.width > 0
                ? { width: displaySize.width, height: displaySize.height }
                : { width: "100%", aspectRatio: page.orientation === "landscape" ? "11/8.5" : "8.5/11" }
            }
          >
            <canvas
              ref={paintRef}
              className={cn(
                "absolute inset-0 z-10 h-full w-full touch-none bg-white",
                tool === "fill" ? "cursor-cell" : "cursor-crosshair",
              )}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerEnd}
              onPointerCancel={handlePointerEnd}
              aria-label={`Coloring canvas for ${page.name}`}
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              ref={lineArtRef}
              src={page.file}
              alt=""
              className="pointer-events-none absolute inset-0 z-20 h-full w-full select-none object-fill mix-blend-multiply"
              draggable={false}
            />
            {!ready ? (
              <div className="absolute inset-0 flex items-center justify-center bg-white/80 text-sm text-on-surface-variant">
                Loading coloring page…
              </div>
            ) : null}
          </div>
        </div>

        <aside className="w-full shrink-0 rounded-[1.75rem] bg-white p-4 shadow-soft ring-1 ring-primary/5 sm:p-5 lg:w-72">
          <p className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-primary">
            <Sparkles className="size-3.5" aria-hidden />
            Tools
          </p>

          <div className="mb-4 grid grid-cols-3 gap-2">
            {(
              [
                { id: "brush" as const, label: "Brush", Icon: Paintbrush },
                { id: "fill" as const, label: "Fill", Icon: Droplets },
                { id: "eraser" as const, label: "Eraser", Icon: Eraser },
              ] as const
            ).map(({ id, label, Icon }) => (
              <button
                key={id}
                type="button"
                onClick={() => setTool(id)}
                className={cn(
                  "flex flex-col items-center gap-1 rounded-2xl px-2 py-3 text-xs font-semibold transition",
                  tool === id
                    ? "bg-primary text-on-primary"
                    : "bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high",
                )}
              >
                <Icon className="size-5" strokeWidth={1.75} aria-hidden />
                {label}
              </button>
            ))}
          </div>

          {tool !== "fill" ? (
            <div className="mb-4">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-on-surface-variant">
                Brush size
              </p>
              <div className="flex gap-2">
                {BRUSH_SIZES.map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setBrushSize(size)}
                    className={cn(
                      "flex h-10 flex-1 items-center justify-center rounded-xl transition",
                      brushSize === size
                        ? "bg-primary-container text-on-primary-container ring-2 ring-primary/30"
                        : "bg-surface-container-low hover:bg-surface-container-high",
                    )}
                    aria-label={`Brush size ${size}`}
                  >
                    <span
                      className="rounded-full bg-on-surface"
                      style={{ width: size / 2, height: size / 2 }}
                    />
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <p className="mb-4 text-sm leading-relaxed text-on-surface-variant">
              Tap any white area to fill it with your color. Black lines stay
              crisp on top.
            </p>
          )}

          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-on-surface-variant">
            Colors
          </p>
          <div className="mb-4 grid grid-cols-6 gap-2 sm:grid-cols-6 lg:grid-cols-4">
            {COLORING_PALETTE.map((swatch) => (
              <button
                key={swatch.hex}
                type="button"
                onClick={() => {
                  setColor(swatch.hex);
                  if (tool === "eraser") {
                    setTool("brush");
                  }
                }}
                className={cn(
                  "aspect-square rounded-xl transition hover:scale-105",
                  color === swatch.hex && tool !== "eraser"
                    ? "ring-2 ring-primary ring-offset-2"
                    : "ring-1 ring-stone-200/80",
                )}
                style={{ backgroundColor: swatch.hex }}
                aria-label={swatch.name}
                title={swatch.name}
              />
            ))}
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={handleUndo}
              disabled={!canUndo}
              className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-surface-container-low px-3 py-2.5 text-sm font-semibold text-on-surface transition hover:bg-surface-container-high disabled:opacity-40"
            >
              <Undo2 className="size-4" aria-hidden />
              Undo
            </button>
            <button
              type="button"
              onClick={handleClear}
              disabled={!ready}
              className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-surface-container-low px-3 py-2.5 text-sm font-semibold text-on-surface transition hover:bg-surface-container-high disabled:opacity-40"
            >
              <RotateCcw className="size-4" aria-hidden />
              Clear
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}
