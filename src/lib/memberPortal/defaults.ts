import type { StoredPortalResource } from "./resourceTypes";

/** Shipped default list when no saved data exists yet (Redis / local file). */
export const DEFAULT_PORTAL_RESOURCES: StoredPortalResource[] = [
  {
    id: "policies",
    title: "Policies & handbooks",
    description: "PDFs and policy documents (Google Drive).",
    href: "https://drive.google.com",
    external: true,
    iconId: "folder",
  },
  {
    id: "forms-templates",
    title: "Form templates",
    description: "Printable or fillable templates for members.",
    href: "https://drive.google.com",
    external: true,
    iconId: "file",
  },
  {
    id: "wellness",
    title: "Annual wellness form",
    description: "Member wellness submission (add your Tally link when ready).",
    href: "https://tally.so",
    external: true,
    iconId: "clipboard",
  },
  {
    id: "incident",
    title: "Incident report",
    description: "For reporting incidents per team policy (add your Tally link when ready).",
    href: "https://tally.so",
    external: true,
    iconId: "clipboard",
  },
  {
    id: "roster",
    title: "Membership roster",
    description: "Living roster or link to your internal tool.",
    href: "https://drive.google.com",
    external: true,
    iconId: "link",
  },
];
