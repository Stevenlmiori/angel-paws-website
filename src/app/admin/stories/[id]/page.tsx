import { notFound } from "next/navigation";
import { sanityReadClient } from "@/lib/sanity/client";
import { storyByIdAdminQuery } from "@/lib/sanity/queries";
import type { StoryDetail } from "@/lib/sanity/types";
import { StoryForm } from "../StoryForm";

export const dynamic = "force-dynamic";

export default async function EditStoryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const client = sanityReadClient();
  if (!client) {
    notFound();
  }
  const story = await client.fetch<StoryDetail | null>(storyByIdAdminQuery, { id });
  if (!story) {
    notFound();
  }
  return <StoryForm story={story} />;
}
