import { createImageUrlBuilder } from "@sanity/image-url";
import { projectId, dataset } from "./env";
import type { ContentImage } from "./types";

export function imageUrl(image?: ContentImage) {
  if (!projectId || !dataset || !image?.asset?._ref) return undefined;
  return createImageUrlBuilder({ projectId, dataset }).image(image).width(1200).height(750).fit("crop").auto("format").url();
}
