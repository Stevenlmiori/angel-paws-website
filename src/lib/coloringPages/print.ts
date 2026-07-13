import type { ColoringPage } from "@/lib/siteContent/coloringPages";

type PrintOptions = {
  orientation?: "portrait" | "landscape";
  title?: string;
};

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;");
}

function dataUrlToBlob(dataUrl: string): Blob {
  const [header, base64 = ""] = dataUrl.split(",");
  const mime = header?.match(/:(.*?);/)?.[1] ?? "image/png";
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return new Blob([bytes], { type: mime });
}

function resolvePrintImageSrc(imgSrc: string): {
  src: string;
  revoke?: () => void;
} {
  if (!imgSrc.startsWith("data:")) {
    return { src: imgSrc };
  }
  const blobUrl = URL.createObjectURL(dataUrlToBlob(imgSrc));
  return { src: blobUrl, revoke: () => URL.revokeObjectURL(blobUrl) };
}

function printStyles(orientation: "portrait" | "landscape"): string {
  const isLandscape = orientation === "landscape";
  const pageCss = isLandscape
    ? "size: letter landscape; margin: 0;"
    : "size: letter portrait; margin: 0;";
  const sheetCss = isLandscape
    ? "width: 11in; height: 8.5in;"
    : "width: 8.5in; height: 11in;";
  const maxImgCss = isLandscape
    ? "max-width: 10.75in; max-height: 8in;"
    : "max-width: 8.5in; max-height: 10.75in;";

  return `
    @page { ${pageCss} }
    * { margin: 0; padding: 0; box-sizing: border-box; }
    html, body {
      background: #fff;
      overflow: hidden;
      ${sheetCss}
    }
    body {
      display: flex;
      align-items: center;
      justify-content: center;
    }
    img {
      display: block;
      width: 100%;
      height: 100%;
      ${maxImgCss}
      object-fit: contain;
      page-break-before: avoid;
      page-break-after: avoid;
      page-break-inside: avoid;
    }
    @media print {
      html, body {
        ${sheetCss}
        overflow: hidden;
      }
    }
  `;
}

/**
 * Print via a hidden iframe on the current page.
 * Safari reliably blocks async DOM writes to window.open tabs, which left users
 * on a blank about:blank page — iframe print avoids that entirely.
 */
export function openImagePrintWindow(
  imgSrc: string,
  { orientation = "portrait", title = "Angel Paws Coloring Page" }: PrintOptions = {},
): void {
  if (!imgSrc) {
    return;
  }

  const { src, revoke } = resolvePrintImageSrc(imgSrc);
  const iframe = document.createElement("iframe");
  iframe.setAttribute("aria-hidden", "true");
  iframe.style.cssText =
    "position:fixed;left:-9999px;top:0;width:0;height:0;border:0;opacity:0;pointer-events:none;";
  document.body.appendChild(iframe);

  const win = iframe.contentWindow;
  const doc = iframe.contentDocument;
  if (!win || !doc) {
    revoke?.();
    iframe.remove();
    return;
  }

  const cleanup = () => {
    revoke?.();
    iframe.remove();
  };

  const safeTitle = escapeHtml(title);
  const safeSrc = escapeHtml(src);

  doc.open();
  doc.write(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>${safeTitle}</title>
  <style>${printStyles(orientation)}</style>
</head>
<body>
  <img id="print-image" src="${safeSrc}" alt="${safeTitle}" />
  <script>
    (function () {
      var img = document.getElementById("print-image");
      if (!img) return;
      function runPrint() {
        setTimeout(function () {
          window.focus();
          window.print();
        }, 120);
      }
      img.addEventListener("load", runPrint, { once: true });
      img.addEventListener("error", function () {
        document.body.textContent = "Could not load image for printing.";
      }, { once: true });
      if (img.complete && img.naturalWidth > 0) {
        runPrint();
      }
    })();
  <\/script>
</body>
</html>`);
  doc.close();

  win.addEventListener("afterprint", cleanup, { once: true });
  setTimeout(cleanup, 60_000);
}

/** Print a repo-hosted blank coloring sheet. */
export function openColoringPagePrintWindow(page: ColoringPage): void {
  const imgSrc = new URL(page.file, window.location.origin).href;
  openImagePrintWindow(imgSrc, {
    orientation: page.orientation,
    title: `${page.name} — Angel Paws Coloring Page`,
  });
}
