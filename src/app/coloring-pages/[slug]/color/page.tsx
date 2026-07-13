import { notFound } from "next/navigation";
import { ColoringStudio } from "@/components/coloring-pages/ColoringStudio";
import { pageMetadata } from "@/lib/seo";
import { getActiveColoringPageBySlug } from "@/lib/siteContent/coloringPagesStore";

type Props = { params: Promise<{ slug: string }> };

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const page = await getActiveColoringPageBySlug(slug);
  if (!page) {
    return pageMetadata({
      title: "Color Online",
      description: "Digital coloring for Angel Paws therapy dogs.",
      path: "/coloring-pages",
    });
  }
  return pageMetadata({
    title: `Color ${page.name} Online`,
    description: `Color ${page.name} online with brush and tap-to-fill tools, then save or print your artwork.`,
    path: `/coloring-pages/${page.slug}/color`,
  });
}

export default async function ColoringStudioPage({ params }: Props) {
  const { slug } = await params;
  const page = await getActiveColoringPageBySlug(slug);
  if (!page) {
    notFound();
  }
  return <ColoringStudio page={page} />;
}
