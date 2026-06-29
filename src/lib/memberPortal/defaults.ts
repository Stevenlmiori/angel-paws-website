import { HOW_TO_BECOME_INVOLVED_DOC_URL } from "@/lib/siteLinks";
import type { StoredPortalResource } from "./resourceTypes";

/** Shipped default list when no saved data exists yet (Redis / local file). */
export const DEFAULT_PORTAL_RESOURCES: StoredPortalResource[] = [
  {
    id: "how-to-become-involved",
    title: "How to become involved",
    description: "Overview of requirements and expectations for handlers.",
    href: HOW_TO_BECOME_INVOLVED_DOC_URL,
    external: true,
    iconId: "file",
  },
  {
    id: "policies",
    title: "Policies & handbooks",
    description: "Member policies and handbook materials (add Drive links as ready).",
    href: HOW_TO_BECOME_INVOLVED_DOC_URL,
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
    description: "Member wellness submission (add your Google Form link when ready).",
    href: "https://docs.google.com/forms",
    external: true,
    iconId: "clipboard",
  },
  {
    id: "incident",
    title: "Incident report",
    description: "For reporting incidents per team policy (add your Google Form link when ready).",
    href: "https://docs.google.com/forms",
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
