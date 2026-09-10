import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Participant portal admin",
  robots: { index: false, follow: false },
};

export default function AdminMemberPortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
