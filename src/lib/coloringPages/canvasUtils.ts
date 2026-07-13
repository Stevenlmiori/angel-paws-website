export type CanvasSize = { width: number; height: number };

export function hexToRgba(hex: string): [number, number, number, number] {
  const normalized = hex.replace("#", "");
  const full =
    normalized.length === 3
      ? normalized
          .split("")
          .map((c) => c + c)
          .join("")
      : normalized;
  const int = Number.parseInt(full, 16);
  return [(int >> 16) & 255, (int >> 8) & 255, int & 255, 255];
}

export function isLinePixel(
  lineData: Uint8ClampedArray,
  width: number,
  x: number,
  y: number,
  threshold = 105,
): boolean {
  const i = (y * width + x) * 4;
  const r = lineData[i] ?? 255;
  const g = lineData[i + 1] ?? 255;
  const b = lineData[i + 2] ?? 255;
  const darkness = 255 - Math.min(r, g, b);
  return darkness > threshold;
}

function colorsMatch(
  data: Uint8ClampedArray,
  i: number,
  target: [number, number, number, number],
): boolean {
  return (
    data[i] === target[0] &&
    data[i + 1] === target[1] &&
    data[i + 2] === target[2] &&
    data[i + 3] === target[3]
  );
}

/**
 * Flood fill on the paint layer, stopping at dark pixels in the line-art map.
 */
export function floodFillRegion(
  paintCtx: CanvasRenderingContext2D,
  lineData: Uint8ClampedArray,
  width: number,
  height: number,
  startX: number,
  startY: number,
  fillColor: [number, number, number, number],
): void {
  const x0 = Math.floor(startX);
  const y0 = Math.floor(startY);
  if (x0 < 0 || y0 < 0 || x0 >= width || y0 >= height) {
    return;
  }
  if (isLinePixel(lineData, width, x0, y0)) {
    return;
  }

  const imageData = paintCtx.getImageData(0, 0, width, height);
  const data = imageData.data;
  const startIndex = (y0 * width + x0) * 4;
  const target: [number, number, number, number] = [
    data[startIndex] ?? 255,
    data[startIndex + 1] ?? 255,
    data[startIndex + 2] ?? 255,
    data[startIndex + 3] ?? 255,
  ];

  if (
    target[0] === fillColor[0] &&
    target[1] === fillColor[1] &&
    target[2] === fillColor[2] &&
    target[3] === fillColor[3]
  ) {
    return;
  }

  const stack: [number, number][] = [[x0, y0]];
  const visited = new Uint8Array(width * height);

  while (stack.length > 0) {
    const [x, y] = stack.pop()!;
    const key = y * width + x;
    if (visited[key]) {
      continue;
    }
    visited[key] = 1;

    const i = key * 4;
    if (!colorsMatch(data, i, target) || isLinePixel(lineData, width, x, y)) {
      continue;
    }

    data[i] = fillColor[0];
    data[i + 1] = fillColor[1];
    data[i + 2] = fillColor[2];
    data[i + 3] = fillColor[3];

    if (x > 0) stack.push([x - 1, y]);
    if (x < width - 1) stack.push([x + 1, y]);
    if (y > 0) stack.push([x, y - 1]);
    if (y < height - 1) stack.push([x, y + 1]);
  }

  paintCtx.putImageData(imageData, 0, 0);
}

export function mergePaintAndLineArt(
  paintCanvas: HTMLCanvasElement,
  lineArt: HTMLImageElement,
): string {
  const offscreen = document.createElement("canvas");
  offscreen.width = paintCanvas.width;
  offscreen.height = paintCanvas.height;
  const ctx = offscreen.getContext("2d");
  if (!ctx) {
    return "";
  }
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, offscreen.width, offscreen.height);
  ctx.drawImage(paintCanvas, 0, 0);
  ctx.drawImage(lineArt, 0, 0, offscreen.width, offscreen.height);
  return offscreen.toDataURL("image/png");
}

export function computeFitSize(
  containerWidth: number,
  containerHeight: number,
  orientation: "portrait" | "landscape",
): CanvasSize {
  const aspect = orientation === "landscape" ? 11 / 8.5 : 8.5 / 11;
  let width = containerWidth;
  let height = width / aspect;
  if (height > containerHeight) {
    height = containerHeight;
    width = height * aspect;
  }
  const maxEdge = 1400;
  const longEdge = Math.max(width, height);
  if (longEdge > maxEdge) {
    const scale = maxEdge / longEdge;
    width *= scale;
    height *= scale;
  }
  return {
    width: Math.max(1, Math.round(width)),
    height: Math.max(1, Math.round(height)),
  };
}
