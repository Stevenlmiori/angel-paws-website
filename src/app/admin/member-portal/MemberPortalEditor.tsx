"use client";

import { useCallback, useMemo, useState, useTransition } from "react";
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
  ChevronDown,
  ChevronUp,
  GripVertical,
  Plus,
  Trash2,
} from "lucide-react";
import {
  PORTAL_ICON_IDS,
  type StoredPortalResource,
  isPortalIconId,
} from "@/lib/memberPortal/resourceTypes";
import { Button } from "@/components/ui/Button";
import { savePortalResourcesDirect } from "./actions";

function truncateMiddle(s: string, max: number): string {
  if (s.length <= max) {
    return s;
  }
  const edge = Math.floor((max - 1) / 2);
  return `${s.slice(0, edge)}…${s.slice(s.length - edge)}`;
}

type SortableRowProps = {
  item: StoredPortalResource;
  expanded: boolean;
  onToggleExpand: () => void;
  onChange: (id: string, patch: Partial<StoredPortalResource>) => void;
  onRemove: (id: string) => void;
};

function SortableResourceRow({
  item,
  expanded,
  onToggleExpand,
  onChange,
  onRemove,
}: SortableRowProps) {
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
    opacity: isDragging ? 0.85 : 1,
  };

  return (
    <li
      ref={setNodeRef}
      style={style}
      className="overflow-hidden rounded-2xl bg-surface-container-high shadow-soft ring-1 ring-primary/5"
    >
      <div className="flex items-stretch gap-2 px-2 py-2 sm:gap-3 sm:px-3 sm:py-2.5">
        <button
          type="button"
          className="mt-0.5 flex size-9 shrink-0 cursor-grab touch-none items-center justify-center rounded-lg bg-primary/10 text-primary active:cursor-grabbing sm:size-10"
          aria-label="Drag to reorder"
          {...attributes}
          {...listeners}
        >
          <GripVertical className="size-4 sm:size-5" aria-hidden />
        </button>

        <button
          type="button"
          onClick={onToggleExpand}
          aria-expanded={expanded}
          className="min-w-0 flex-1 rounded-lg px-1 py-0.5 text-left transition hover:bg-primary/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary/30"
        >
          <span className="block truncate font-medium text-on-surface">
            {item.title.trim() || "Untitled"}
          </span>
          <span className="mt-0.5 block truncate font-mono text-xs text-on-surface-variant">
            {truncateMiddle(item.href.trim() || "—", 56)}
          </span>
          <span className="mt-1 block text-[11px] uppercase tracking-wide text-on-surface-variant/90">
            {item.iconId}
            {item.external ? " · new tab" : " · same tab"}
          </span>
        </button>

        <div className="flex shrink-0 flex-col items-stretch gap-1 sm:flex-row sm:items-center">
          <button
            type="button"
            onClick={onToggleExpand}
            className="inline-flex items-center justify-center gap-1 rounded-lg px-2 py-1.5 text-xs font-semibold text-primary hover:bg-primary/10 sm:px-3"
            aria-expanded={expanded}
          >
            {expanded ? (
              <>
                <ChevronUp className="size-4" aria-hidden />
                <span className="hidden sm:inline">Less</span>
              </>
            ) : (
              <>
                <ChevronDown className="size-4" aria-hidden />
                <span className="hidden sm:inline">Edit</span>
              </>
            )}
          </button>
          <button
            type="button"
            onClick={() => onRemove(item.id)}
            className="inline-flex size-9 items-center justify-center self-center rounded-lg text-red-700 transition hover:bg-red-50 sm:size-10"
            aria-label={`Remove ${item.title}`}
          >
            <Trash2 className="size-4 sm:size-5" aria-hidden />
          </button>
        </div>
      </div>

      {expanded ? (
        <div className="border-t border-primary/10 bg-surface-container-lowest/80 px-3 pb-4 pt-3 sm:px-4 sm:pl-[3.25rem]">
          <div className="grid min-w-0 gap-3 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-on-surface-variant">
                Title
              </label>
              <input
                value={item.title}
                onChange={(e) => onChange(item.id, { title: e.target.value })}
                className="w-full rounded-[0.625rem] border border-primary/10 bg-surface-container-lowest px-3 py-2.5 text-sm text-on-surface outline-none ring-primary/20 focus-visible:ring-2"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-on-surface-variant">
                Description
              </label>
              <textarea
                value={item.description}
                onChange={(e) =>
                  onChange(item.id, { description: e.target.value })
                }
                rows={3}
                className="w-full resize-y rounded-[0.625rem] border border-primary/10 bg-surface-container-lowest px-3 py-2.5 text-sm text-on-surface outline-none ring-primary/20 focus-visible:ring-2"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-on-surface-variant">
                Link (https://… or /internal-path)
              </label>
              <input
                value={item.href}
                onChange={(e) => onChange(item.id, { href: e.target.value })}
                className="w-full rounded-[0.625rem] border border-primary/10 bg-surface-container-lowest px-3 py-2.5 text-sm text-on-surface outline-none ring-primary/20 focus-visible:ring-2"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-on-surface-variant">
                Icon
              </label>
              <select
                value={item.iconId}
                onChange={(e) => {
                  const v = e.target.value;
                  if (isPortalIconId(v)) {
                    onChange(item.id, { iconId: v });
                  }
                }}
                className="w-full rounded-[0.625rem] border border-primary/10 bg-surface-container-lowest px-3 py-2.5 text-sm text-on-surface outline-none ring-primary/20 focus-visible:ring-2"
              >
                {PORTAL_ICON_IDS.map((id) => (
                  <option key={id} value={id}>
                    {id}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-end">
              <label className="flex cursor-pointer items-center gap-2 text-sm text-on-surface">
                <input
                  type="checkbox"
                  checked={item.external}
                  onChange={(e) =>
                    onChange(item.id, { external: e.target.checked })
                  }
                  className="size-4 rounded border-primary/30 text-primary"
                />
                Open in new tab
              </label>
            </div>
          </div>
        </div>
      ) : null}
    </li>
  );
}

type Props = { initialItems: StoredPortalResource[] };

export function MemberPortalEditor({ initialItems }: Props) {
  const [items, setItems] = useState<StoredPortalResource[]>(initialItems);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );

  const ids = useMemo(() => items.map((i) => i.id), [items]);

  const handleDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) {
      return;
    }
    setItems((prev) => {
      const oldIndex = prev.findIndex((i) => i.id === active.id);
      const newIndex = prev.findIndex((i) => i.id === over.id);
      if (oldIndex < 0 || newIndex < 0) {
        return prev;
      }
      return arrayMove(prev, oldIndex, newIndex);
    });
  }, []);

  const patchItem = useCallback((id: string, patch: Partial<StoredPortalResource>) => {
    setItems((prev) =>
      prev.map((row) => (row.id === id ? { ...row, ...patch } : row)),
    );
    setSaveMessage(null);
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((row) => row.id !== id));
    setExpandedId((cur) => (cur === id ? null : cur));
    setSaveMessage(null);
  }, []);

  const toggleExpand = useCallback((id: string) => {
    setExpandedId((cur) => (cur === id ? null : id));
  }, []);

  const addItem = useCallback(() => {
    const id =
      typeof crypto !== "undefined" && crypto.randomUUID
        ? crypto.randomUUID()
        : `item-${Date.now()}`;
    const row: StoredPortalResource = {
      id,
      title: "New resource",
      description: "Short description for members.",
      href: "https://",
      external: true,
      iconId: "folder",
    };
    setItems((prev) => [row, ...prev]);
    setExpandedId(id);
    setSaveMessage(null);
  }, []);

  const handleSave = () => {
    setSaveMessage(null);
    startTransition(async () => {
      const res = await savePortalResourcesDirect(JSON.stringify(items));
      setSaveMessage(res.message);
    });
  };

  return (
    <div className="mx-auto max-w-screen-xl px-6 py-12 sm:px-10 lg:px-12">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="mb-1 text-xs font-bold uppercase tracking-[0.2em] text-primary">
            Admin
          </p>
          <h1 className="font-serif text-3xl text-on-surface md:text-4xl">
            Member portal links
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-on-surface-variant leading-relaxed">
            Drag the handle to reorder. Click a row or{" "}
            <span className="font-semibold text-on-surface">Edit</span> to change
            details. Save sends the list to storage (Redis in production,
            or a local file in dev when Redis is not set).
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button type="button" variant="secondary" className="gap-2" onClick={addItem}>
            <Plus className="size-4" aria-hidden />
            Add link
          </Button>
          <Button type="button" onClick={handleSave} disabled={isPending}>
            {isPending ? "Saving…" : "Save changes"}
          </Button>
        </div>
      </div>

      {saveMessage ? (
        <p
          className="mb-6 rounded-2xl bg-primary-container/50 px-4 py-3 text-sm font-medium text-on-primary-container"
          role="status"
        >
          {saveMessage}
        </p>
      ) : null}

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={ids} strategy={verticalListSortingStrategy}>
          <ul className="flex flex-col gap-2">
            {items.map((item) => (
              <SortableResourceRow
                key={item.id}
                item={item}
                expanded={expandedId === item.id}
                onToggleExpand={() => toggleExpand(item.id)}
                onChange={patchItem}
                onRemove={removeItem}
              />
            ))}
          </ul>
        </SortableContext>
      </DndContext>

      {items.length === 0 ? (
        <p className="mt-8 text-center text-on-surface-variant">
          No links yet. Add one, or reload to restore defaults from code until you
          save.
        </p>
      ) : null}
    </div>
  );
}
