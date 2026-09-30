"use client";

import { NextStudio } from "next-sanity/studio";
import { getStudioConfig } from "@/sanity.config";

export function Studio() {
  return <NextStudio config={getStudioConfig()} />;
}
