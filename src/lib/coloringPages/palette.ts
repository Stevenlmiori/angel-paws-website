export type ColoringSwatch = {
  name: string;
  hex: string;
};

export type ColoringSwatchGroup = {
  label: string;
  swatches: ColoringSwatch[];
};

export const DOG_FUR_PALETTE_GROUPS: ColoringSwatchGroup[] = [
  {
    label: "Lights & goldens",
    swatches: [
      { name: "Cream", hex: "#FAF0DC" },
      { name: "Wheat", hex: "#E8D4B0" },
      { name: "Golden", hex: "#D4A24C" },
      { name: "Honey", hex: "#C9952B" },
      { name: "Tan", hex: "#C9B08C" },
      { name: "Fawn", hex: "#B8956A" },
    ],
  },
  {
    label: "Browns & reds",
    swatches: [
      { name: "Brown", hex: "#6D4C41" },
      { name: "Chestnut", hex: "#8B5E3C" },
      { name: "Auburn", hex: "#A45A3B" },
      { name: "Chocolate", hex: "#4A3228" },
      { name: "Sable", hex: "#7A5C3A" },
      { name: "Red Clay", hex: "#B85C38" },
    ],
  },
  {
    label: "Grays & black",
    swatches: [
      { name: "Silver", hex: "#B8B8B8" },
      { name: "Gray", hex: "#9E9E9E" },
      { name: "Charcoal", hex: "#4A4A4A" },
      { name: "Black", hex: "#212121" },
    ],
  },
];

export const SCENERY_PALETTE_GROUPS: ColoringSwatchGroup[] = [
  {
    label: "Sky & water",
    swatches: [
      { name: "Sky", hex: "#4784F2" },
      { name: "Light Blue", hex: "#87CEEB" },
      { name: "Robin Egg", hex: "#6EC6F5" },
      { name: "Navy", hex: "#1E3A5F" },
      { name: "Teal", hex: "#26A69A" },
      { name: "Aqua", hex: "#4DD0E1" },
      { name: "Seafoam", hex: "#80CBC4" },
    ],
  },
  {
    label: "Plants & grass",
    swatches: [
      { name: "Grass", hex: "#43A047" },
      { name: "Spring Green", hex: "#7CB342" },
      { name: "Forest", hex: "#2E7D32" },
      { name: "Mint", hex: "#A5D6A7" },
    ],
  },
  {
    label: "Sun & warmth",
    swatches: [
      { name: "Sunshine", hex: "#FBC02D" },
      { name: "Lemon", hex: "#FFF176" },
      { name: "Orange", hex: "#FB8C00" },
      { name: "Peach", hex: "#FFCC80" },
    ],
  },
  {
    label: "Flowers & bright",
    swatches: [
      { name: "Coral", hex: "#FF6B6B" },
      { name: "Rose", hex: "#F06292" },
      { name: "Pink", hex: "#F48FB1" },
      { name: "Red", hex: "#E53935" },
    ],
  },
  {
    label: "Purples",
    swatches: [
      { name: "Lavender", hex: "#CE93D8" },
      { name: "Grape", hex: "#8E24AA" },
      { name: "Plum", hex: "#6A1B9A" },
    ],
  },
  {
    label: "Earth & wood",
    swatches: [
      { name: "Sand", hex: "#F5DEB3" },
      { name: "Dirt", hex: "#8D6E63" },
      { name: "Bark", hex: "#5D4037" },
    ],
  },
];

export const DOG_FUR_PALETTE: ColoringSwatch[] = DOG_FUR_PALETTE_GROUPS.flatMap(
  (group) => group.swatches,
);

export const SCENERY_PALETTE: ColoringSwatch[] = SCENERY_PALETTE_GROUPS.flatMap(
  (group) => group.swatches,
);

export const COLORING_PALETTE: ColoringSwatch[] = [
  ...DOG_FUR_PALETTE,
  ...SCENERY_PALETTE,
];

export const ERASER_COLOR = "#FFFFFF";

/** Default swatch when the studio opens — warm golden fur. */
export const DEFAULT_COLORING_COLOR = "#D4A24C";
