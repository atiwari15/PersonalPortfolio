import { isSanityConfigured } from "@/sanity/env";
import { Studio } from "./studio";

export const dynamic = "force-dynamic";

export default function StudioPage() {
  if (!isSanityConfigured) {
    return <p>Set the Sanity project ID and dataset in .env.local to open the content editor.</p>;
  }

  return <Studio />;
}
