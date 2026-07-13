import { notFound } from "next/navigation";
import { ColoringStudio } from "@/components/coloring-pages/ColoringStudio";
import { pageMetadata } from "@/lib/seo";
import {
  coloringPages,
  getColoringPageBySlug,
} from "@/lib/siteContent/coloringPages";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return coloringPages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const page = getColoringPageBySlug(slug);
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
  const page = getColoringPageBySlug(slug);
  if (!page) {
    notFound();
  }
  return <ColoringStudio page={page} />;
}
