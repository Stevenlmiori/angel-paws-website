export const PORTAL_ICON_IDS = [
  "folder",
  "file",
  "clipboard",
  "link",
  "mail",
] as const;

export type PortalIconId = (typeof PORTAL_ICON_IDS)[number];

export type StoredPortalResource = {
  id: string;
  title: string;
  description: string;
  href: string;
  external: boolean;
  iconId: PortalIconId;
};

export function isPortalIconId(v: string): v is PortalIconId {
  return (PORTAL_ICON_IDS as readonly string[]).includes(v);
}
