import { createClient, type SanityClient } from "@sanity/client";
import {
  getSanityPublicConfig,
  getSanityWriteToken,
} from "@/lib/sanity/env";

export function sanityReadClient(): SanityClient | null {
  const cfg = getSanityPublicConfig();
  if (!cfg) {
    return null;
  }
  return createClient({
    projectId: cfg.projectId,
    dataset: cfg.dataset,
    apiVersion: cfg.apiVersion,
    useCdn: true,
    perspective: "published",
  });
}

export function sanityWriteClient(): SanityClient | null {
  const cfg = getSanityPublicConfig();
  const token = getSanityWriteToken();
  if (!cfg || !token) {
    return null;
  }
  return createClient({
    projectId: cfg.projectId,
    dataset: cfg.dataset,
    apiVersion: cfg.apiVersion,
    useCdn: false,
    token,
  });
}
