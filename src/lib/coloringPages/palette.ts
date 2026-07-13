export type ColoringSwatch = {
  name: string;
  hex: string;
};

/**
 * Dog fur tones first (light → dark), then scenery accents for backgrounds
 * and details on the coloring pages.
 */
export const COLORING_PALETTE: ColoringSwatch[] = [
  // Fur — lights & goldens
  { name: "Cream", hex: "#FAF0DC" },
  { name: "Wheat", hex: "#E8D4B0" },
  { name: "Golden", hex: "#D4A24C" },
  { name: "Honey", hex: "#C9952B" },
  { name: "Tan", hex: "#C9B08C" },
  { name: "Fawn", hex: "#B8956A" },
  // Fur — browns & reds
  { name: "Brown", hex: "#6D4C41" },
  { name: "Chestnut", hex: "#8B5E3C" },
  { name: "Auburn", hex: "#A45A3B" },
  { name: "Chocolate", hex: "#4A3228" },
  { name: "Sable", hex: "#7A5C3A" },
  { name: "Red Clay", hex: "#B85C38" },
  // Fur — grays & black
  { name: "Silver", hex: "#B8B8B8" },
  { name: "Gray", hex: "#9E9E9E" },
  { name: "Charcoal", hex: "#4A4A4A" },
  { name: "Black", hex: "#212121" },
  // Scenery & accents
  { name: "Sky", hex: "#4784F2" },
  { name: "Grass", hex: "#43A047" },
  { name: "Sunshine", hex: "#FBC02D" },
  { name: "Coral", hex: "#FF6B6B" },
  { name: "Pink", hex: "#F48FB1" },
  { name: "Orange", hex: "#FB8C00" },
  { name: "Teal", hex: "#26A69A" },
  { name: "Grape", hex: "#8E24AA" },
];

export const ERASER_COLOR = "#FFFFFF";

/** Default swatch when the studio opens — warm golden fur. */
export const DEFAULT_COLORING_COLOR = "#D4A24C";
