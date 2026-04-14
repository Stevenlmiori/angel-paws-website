import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Member portal admin",
  robots: { index: false, follow: false },
};

export default function AdminMemberPortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background text-on-background">{children}</div>
  );
}
