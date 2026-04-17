export type SanityPublicConfig = {
  projectId: string;
  dataset: string;
  apiVersion: string;
};

export function getSanityPublicConfig(): SanityPublicConfig | null {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  if (!projectId || projectId.length < 3) {
    return null;
  }
  return {
    projectId,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
    apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2024-01-01",
  };
}

export function getSanityWriteToken(): string | null {
  const t = process.env.SANITY_API_WRITE_TOKEN;
  if (typeof t === "string" && t.length > 10) {
    return t;
  }
  return null;
}

export function getSanityWebhookSecret(): string | null {
  const s = process.env.SANITY_REVALIDATE_SECRET;
  if (typeof s === "string" && s.length > 8) {
    return s;
  }
  return null;
}
