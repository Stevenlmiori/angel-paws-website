import type { ColoringSwatchGroup } from "@/lib/coloringPages/palette";
import { cn } from "@/lib/cn";

type SwatchGridProps = {
  groups: ColoringSwatchGroup[];
  activeColor: string;
  eraserActive: boolean;
  onPick: (hex: string) => void;
};

export function ColoringSwatchGroups({
  groups,
  activeColor,
  eraserActive,
  onPick,
}: SwatchGridProps) {
  return (
    <div className="space-y-3">
      {groups.map((group) => (
        <div key={group.label}>
          <p className="mb-1.5 text-[0.65rem] font-semibold uppercase tracking-wide text-on-surface-variant/80">
            {group.label}
          </p>
          <div className="grid grid-cols-4 gap-1.5">
            {group.swatches.map((swatch) => (
              <button
                key={swatch.hex}
                type="button"
                onClick={() => onPick(swatch.hex)}
                className={cn(
                  "aspect-square rounded-xl transition hover:scale-105",
                  activeColor === swatch.hex && !eraserActive
                    ? "ring-2 ring-primary ring-offset-2"
                    : "ring-1 ring-stone-200/80",
                )}
                style={{ backgroundColor: swatch.hex }}
                aria-label={swatch.name}
                title={swatch.name}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
