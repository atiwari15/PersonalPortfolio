import "server-only";
import { createClient } from "@sanity/client";
import { apiVersion, dataset, projectId } from "./env";

export function getSanityClient() {
  if (!projectId || !dataset) {
    throw new Error("Set NEXT_PUBLIC_SANITY_PROJECT_ID and NEXT_PUBLIC_SANITY_DATASET in .env.local before querying portfolio content.");
  }

  return createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: false,
    perspective: "published",
    token: process.env.SANITY_API_READ_TOKEN,
  });
}
