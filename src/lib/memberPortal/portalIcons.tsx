import type { LucideIcon } from "lucide-react";
import {
  ClipboardList,
  FileText,
  FolderOpen,
  Link2,
  Mail,
} from "lucide-react";
import type { PortalIconId } from "./resourceTypes";

const map: Record<PortalIconId, LucideIcon> = {
  folder: FolderOpen,
  file: FileText,
  clipboard: ClipboardList,
  link: Link2,
  mail: Mail,
};

export function getPortalIcon(iconId: PortalIconId): LucideIcon {
  return map[iconId] ?? FileText;
}
