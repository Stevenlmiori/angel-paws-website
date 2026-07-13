export type ColoringSwatch = {
  name: string;
  hex: string;
};

/** Kid-friendly palette — names are fun labels, not strict color matches. */
export const COLORING_PALETTE: ColoringSwatch[] = [
  { name: "Sky", hex: "#4784F2" },
  { name: "Grass", hex: "#43A047" },
  { name: "Sunshine", hex: "#FBC02D" },
  { name: "Coral", hex: "#FF6B6B" },
  { name: "Grape", hex: "#8E24AA" },
  { name: "Orange", hex: "#FB8C00" },
  { name: "Pink", hex: "#F48FB1" },
  { name: "Brown", hex: "#6D4C41" },
  { name: "Teal", hex: "#26A69A" },
  { name: "Red", hex: "#E53935" },
  { name: "Gray", hex: "#9E9E9E" },
  { name: "Black", hex: "#212121" },
];

export const ERASER_COLOR = "#FFFFFF";
