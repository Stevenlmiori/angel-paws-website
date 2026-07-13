import type { ColoringPage } from "@/lib/siteContent/coloringPages";

type PrintOptions = {
  orientation?: "portrait" | "landscape";
  title?: string;
};

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

function mountPrintDocument(
  doc: Document,
  imgSrc: string,
  { orientation = "portrait", title = "Angel Paws Coloring Page" }: PrintOptions,
  onReady: () => void,
  onError: () => void,
): () => void {
  const { src, revoke } = resolvePrintImageSrc(imgSrc);
  let readyCalled = false;

  const ready = () => {
    if (readyCalled) {
      return;
    }
    readyCalled = true;
    onReady();
  };

  doc.title = title;
  doc.documentElement.lang = "en";

  const style = doc.createElement("style");
  style.textContent = printStyles(orientation);
  doc.head.appendChild(style);

  const img = doc.createElement("img");
  img.alt = title;
  img.decoding = "async";
  img.addEventListener("load", ready, { once: true });
  img.addEventListener(
    "error",
    () => {
      revoke?.();
      onError();
    },
    { once: true },
  );

  doc.body.appendChild(img);
  img.src = src;

  if (img.complete && img.naturalWidth > 0) {
    ready();
  }

  return () => revoke?.();
}

function triggerPrint(win: Window, cleanup: () => void): void {
  setTimeout(() => {
    win.focus();
    win.print();
    win.addEventListener("afterprint", cleanup, { once: true });
    setTimeout(cleanup, 60_000);
  }, 150);
}

function printViaIframe(imgSrc: string, options: PrintOptions): void {
  const iframe = document.createElement("iframe");
  iframe.setAttribute("aria-hidden", "true");
  iframe.style.cssText =
    "position:fixed;right:0;bottom:0;width:0;height:0;border:0;opacity:0;pointer-events:none;";
  document.body.appendChild(iframe);

  const doc = iframe.contentDocument;
  const win = iframe.contentWindow;
  if (!doc || !win) {
    iframe.remove();
    return;
  }

  const cleanup = mountPrintDocument(
    doc,
    imgSrc,
    options,
    () => triggerPrint(win, () => iframe.remove()),
    () => iframe.remove(),
  );

  win.addEventListener("afterprint", cleanup, { once: true });
}

/**
 * Open a chrome-free print window sized for one US Letter sheet.
 */
export function openColoringPagePrintWindow(page: ColoringPage): void {
  const imgSrc = new URL(page.file, window.location.origin).href;
  openImagePrintWindow(imgSrc, {
    orientation: page.orientation,
    title: `${page.name} — Angel Paws Coloring Page`,
  });
}

export function openImagePrintWindow(
  imgSrc: string,
  options: PrintOptions = {},
): void {
  const win = window.open("about:blank", "_blank");
  if (!win) {
    printViaIframe(imgSrc, options);
    return;
  }

  const cleanup = mountPrintDocument(
    win.document,
    imgSrc,
    options,
    () => triggerPrint(win, cleanup),
    () => {
      cleanup();
      win.document.body.textContent =
        "We could not prepare your coloring page for printing. Try Save, then print the downloaded image.";
    },
  );
}
