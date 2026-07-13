"use client";

import { useCallback, useMemo, useRef, useState, useTransition } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  Eye,
  EyeOff,
  GripVertical,
  Palette,
  Plus,
  Save,
  Trash2,
  UploadCloud,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import {
  uniqueColoringSlug,
  type StoredColoringPage,
} from "@/lib/siteContent/coloringPageTypes";
import { saveColoringPagesDirect } from "./actions";

function newId() {
  return `cp-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
}

function fileBaseName(file: File) {
  return file.name
    .replace(/\.[^.]+$/, "")
    .replace(/[_-]?coloring[_\s-]?page/gi, "")
    .replace(/[-_]/g, " ")
    .trim();
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new window.Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error("Could not read image."));
    img.src = src;
  });
}

function readFileAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () =>
      typeof reader.result === "string"
        ? resolve(reader.result)
        : reject(new Error("Could not read image."));
    reader.onerror = () => reject(new Error("Could not read image."));
    reader.readAsDataURL(file);
  });
}

async function compressedDataUrl(file: File): Promise<string> {
  const source = await readFileAsDataUrl(file);
  const img = await loadImage(source);
  const maxSide = 2200;
  const scale = Math.min(1, maxSide / Math.max(img.width, img.height));
  const width = Math.max(1, Math.round(img.width * scale));
  const height = Math.max(1, Math.round(img.height * scale));
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    throw new Error("Could not prepare image.");
  }
  ctx.drawImage(img, 0, 0, width, height);
  return canvas.toDataURL("image/jpeg", 0.9);
}

async function detectOrientation(
  src: string,
): Promise<"portrait" | "landscape"> {
  try {
    const img = await loadImage(src);
    return img.width >= img.height ? "landscape" : "portrait";
  } catch {
    return "portrait";
  }
}

type SortableRowProps = {
  item: StoredColoringPage;
  onChange: (id: string, patch: Partial<StoredColoringPage>) => void;
  onRemove: (id: string) => void;
  onReplaceImage: (id: string, file: File) => void;
  replacing: boolean;
};

function SortableColoringRow({
  item,
  onChange,
  onRemove,
  onReplaceImage,
  replacing,
}: SortableRowProps) {
  const fileRef = useRef<HTMLInputElement>(null);
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.88 : 1,
  };

  return (
    <li
      ref={setNodeRef}
      style={style}
      className="overflow-hidden rounded-2xl bg-surface-container-high shadow-soft ring-1 ring-primary/5"
    >
      <div className="flex flex-col gap-4 p-4 sm:flex-row sm:items-start">
        <button
          type="button"
          className="flex size-10 shrink-0 cursor-grab touch-none items-center justify-center self-start rounded-lg bg-primary/10 text-primary active:cursor-grabbing"
          aria-label="Drag to reorder"
          {...attributes}
          {...listeners}
        >
          <GripVertical className="size-5" aria-hidden />
        </button>

        <div
          className={cn(
            "relative shrink-0 overflow-hidden rounded-xl bg-white ring-1 ring-stone-200/80",
            item.orientation === "landscape"
              ? "aspect-[11/8.5] w-full sm:w-44"
              : "aspect-[8.5/11] w-28",
          )}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={item.file}
            alt=""
            className="h-full w-full object-contain"
          />
        </div>

        <div className="min-w-0 flex-1 space-y-3">
          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-on-surface-variant">
                Name
              </label>
              <input
                value={item.name}
                onChange={(e) => onChange(item.id, { name: e.target.value })}
                className="w-full rounded-[0.625rem] border border-primary/10 bg-surface-container-lowest px-3 py-2.5 text-sm text-on-surface outline-none ring-primary/20 focus-visible:ring-2"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-on-surface-variant">
                URL slug
              </label>
              <input
                value={item.slug}
                readOnly
                className="w-full rounded-[0.625rem] border border-primary/10 bg-surface-container-low/60 px-3 py-2.5 font-mono text-sm text-on-surface-variant outline-none"
              />
            </div>
          </div>

          <div>
            <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-on-surface-variant">
              Alt text (optional)
            </label>
            <input
              value={item.alt}
              onChange={(e) => onChange(item.id, { alt: e.target.value })}
              placeholder={`${item.name} the therapy dog — printable coloring page`}
              className="w-full rounded-[0.625rem] border border-primary/10 bg-surface-container-lowest px-3 py-2.5 text-sm text-on-surface outline-none ring-primary/20 focus-visible:ring-2"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => onChange(item.id, { active: !item.active })}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition",
                item.active
                  ? "bg-primary-container text-on-primary-container"
                  : "bg-surface-container-low text-on-surface-variant",
              )}
            >
              {item.active ? (
                <Eye className="size-3.5" aria-hidden />
              ) : (
                <EyeOff className="size-3.5" aria-hidden />
              )}
              {item.active ? "Visible" : "Hidden"}
            </button>
            <span className="rounded-full bg-surface-container-low px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-on-surface-variant">
              {item.orientation}
            </span>
            <input
              ref={fileRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  onReplaceImage(item.id, file);
                }
                e.target.value = "";
              }}
            />
            <button
              type="button"
              disabled={replacing}
              onClick={() => fileRef.current?.click()}
              className="inline-flex items-center gap-1.5 rounded-full bg-surface-container-low px-3 py-1.5 text-xs font-semibold text-on-surface transition hover:bg-surface-container-highest disabled:opacity-50"
            >
              <UploadCloud className="size-3.5" aria-hidden />
              Replace image
            </button>
            <button
              type="button"
              onClick={() => onRemove(item.id)}
              className="ml-auto inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold text-red-700 transition hover:bg-red-50"
            >
              <Trash2 className="size-3.5" aria-hidden />
              Delete
            </button>
          </div>
        </div>
      </div>
    </li>
  );
}

export function ColoringPagesEditor({
  initialItems,
}: {
  initialItems: StoredColoringPage[];
}) {
  const [items, setItems] = useState(initialItems);
  const [message, setMessage] = useState("");
  const [uploading, setUploading] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [pending, startTransition] = useTransition();
  const fileRef = useRef<HTMLInputElement>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const ids = useMemo(() => items.map((item) => item.id), [items]);
  const activeCount = useMemo(
    () => items.filter((item) => item.active).length,
    [items],
  );

  const patchItem = useCallback(
    (id: string, patch: Partial<StoredColoringPage>) => {
      setItems((prev) =>
        prev.map((row) => {
          if (row.id !== id) {
            return row;
          }
          const next = { ...row, ...patch };
          if (typeof patch.name === "string") {
            next.slug = uniqueColoringSlug(patch.name, prev, id);
          }
          return next;
        }),
      );
      setMessage("");
    },
    [],
  );

  const removeItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((row) => row.id !== id));
    setMessage("Page removed. Save to publish the change.");
  }, []);

  const handleDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) {
      return;
    }
    setItems((prev) => {
      const oldIndex = prev.findIndex((item) => item.id === active.id);
      const newIndex = prev.findIndex((item) => item.id === over.id);
      if (oldIndex < 0 || newIndex < 0) {
        return prev;
      }
      return arrayMove(prev, oldIndex, newIndex);
    });
  }, []);

  async function uploadImageFile(file: File): Promise<{
    src: string;
    orientation: "portrait" | "landscape";
  }> {
    const fd = new FormData();
    fd.set("file", file);
    const res = await fetch("/api/admin/coloring-page-image", {
      method: "POST",
      body: fd,
    });
    const data = (await res.json()) as { src?: string; error?: string };
    let src = data.src;
    if (!res.ok || !src) {
      src = await compressedDataUrl(file);
    }
    const orientation = await detectOrientation(src);
    return { src, orientation };
  }

  async function uploadFiles(files: FileList | File[]) {
    const imageFiles = Array.from(files).filter((file) =>
      file.type.startsWith("image/"),
    );
    if (imageFiles.length === 0) {
      setMessage("Choose a printer-ready JPEG or PNG to upload.");
      return;
    }

    setUploading(true);
    setMessage("");
    try {
      const uploaded: StoredColoringPage[] = [];
      for (const file of imageFiles) {
        const { src, orientation } = await uploadImageFile(file);
        const name = fileBaseName(file) || "New coloring page";
        const slug = uniqueColoringSlug(name, [...items, ...uploaded]);
        uploaded.push({
          id: newId(),
          slug,
          name,
          file: src,
          alt: `${name} the therapy dog — printable coloring page`,
          active: true,
          orientation,
        });
      }
      setItems((prev) => [...uploaded, ...prev]);
      setMessage(
        uploaded.length === 1
          ? "Coloring page added. Review the name and save."
          : `${uploaded.length} coloring pages added. Review names and save.`,
      );
    } catch {
      setMessage("Upload failed.");
    } finally {
      setUploading(false);
      setDragging(false);
    }
  }

  async function replaceImage(id: string, file: File) {
    setUploading(true);
    setMessage("");
    try {
      const { src, orientation } = await uploadImageFile(file);
      setItems((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, file: src, orientation } : item,
        ),
      );
      setMessage("Image replaced. Save to publish.");
    } catch {
      setMessage("Could not replace image.");
    } finally {
      setUploading(false);
    }
  }

  function save() {
    setMessage("");
    if (items.some((item) => !item.name.trim() || !item.file.trim())) {
      setMessage("Every page needs a name and an image.");
      return;
    }
    startTransition(async () => {
      const result = await saveColoringPagesDirect(JSON.stringify(items));
      setMessage(result.message);
    });
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_18rem]">
      <div>
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-on-surface-variant">
            <span className="font-semibold text-on-surface">{activeCount}</span>{" "}
            visible · drag to rearrange · upload printer-ready letter-size pages
          </p>
          <Button
            type="button"
            onClick={save}
            disabled={pending || uploading}
            className="gap-2"
          >
            <Save className="size-4" aria-hidden />
            {pending ? "Saving…" : "Save changes"}
          </Button>
        </div>

        {message ? (
          <p className="mb-4 rounded-2xl bg-primary-container/50 px-4 py-3 text-sm text-on-primary-container">
            {message}
          </p>
        ) : null}

        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext items={ids} strategy={verticalListSortingStrategy}>
            <ul className="space-y-4">
              {items.map((item) => (
                <SortableColoringRow
                  key={item.id}
                  item={item}
                  onChange={patchItem}
                  onRemove={removeItem}
                  onReplaceImage={replaceImage}
                  replacing={uploading}
                />
              ))}
            </ul>
          </SortableContext>
        </DndContext>

        {items.length === 0 ? (
          <p className="rounded-2xl bg-surface-container-low px-6 py-10 text-center text-on-surface-variant">
            No coloring pages yet. Upload a printer-ready letter-size image to
            get started.
          </p>
        ) : null}
      </div>

      <aside className="space-y-4 lg:sticky lg:top-28 lg:self-start">
        <div
          className={cn(
            "rounded-[1.75rem] border-2 border-dashed p-6 text-center transition",
            dragging
              ? "border-primary bg-primary-container/40"
              : "border-primary/20 bg-surface-container-high",
          )}
          onDragEnter={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragOver={(e) => e.preventDefault()}
          onDragLeave={() => setDragging(false)}
          onDrop={(e) => {
            e.preventDefault();
            void uploadFiles(e.dataTransfer.files);
          }}
        >
          <span className="mx-auto mb-3 flex size-12 items-center justify-center rounded-2xl bg-primary-container text-on-primary-container">
            <Plus className="size-6" aria-hidden />
          </span>
          <p className="font-serif text-xl text-on-surface">Add pages</p>
          <p className="mt-2 text-sm text-on-surface-variant">
            Drop printer-ready JPGs here (letter size with margins), or browse.
          </p>
          <input
            ref={fileRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            multiple
            className="hidden"
            onChange={(e) => {
              if (e.target.files) {
                void uploadFiles(e.target.files);
              }
              e.target.value = "";
            }}
          />
          <Button
            type="button"
            variant="secondary"
            className="mt-4 gap-2"
            disabled={uploading}
            onClick={() => fileRef.current?.click()}
          >
            <UploadCloud className="size-4" aria-hidden />
            {uploading ? "Uploading…" : "Choose files"}
          </Button>
        </div>

        <div className="rounded-[1.75rem] bg-surface-container-low p-5 text-sm leading-relaxed text-on-surface-variant">
          <p className="mb-2 flex items-center gap-2 font-semibold text-on-surface">
            <Palette className="size-4 text-primary" aria-hidden />
            For Debbie
          </p>
          Upload finished letter-size coloring sheets. Portrait or landscape is
          detected automatically. Click <strong>Save changes</strong> before
          leaving.
        </div>
      </aside>
    </div>
  );
}
