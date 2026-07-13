import type { ColoringPage } from "@/lib/siteContent/coloringPages";

type PrintOptions = {
  orientation?: "portrait" | "landscape";
  title?: string;
};

/**
 * Open a chrome-free print window sized for one US Letter sheet.
 * Raw JPG printing in Safari often queues a second page when headers/footers
 * are enabled because the image fills the full printable area.
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
  { orientation = "portrait", title = "Angel Paws Coloring Page" }: PrintOptions = {},
): void {
  const win = window.open("", "_blank", "noopener,noreferrer");
  if (!win) {
    return;
  }

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

  win.document.write(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>${title}</title>
  <style>
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
  </style>
</head>
<body>
  <img id="sheet" src="${imgSrc}" alt="${title.replace(/"/g, "&quot;")}" />
  <script>
    const img = document.getElementById("sheet");
    const printSheet = () => setTimeout(() => window.print(), 150);
    if (img.complete) {
      printSheet();
    } else {
      img.addEventListener("load", printSheet, { once: true });
    }
  </script>
</body>
</html>`);
  win.document.close();
}
