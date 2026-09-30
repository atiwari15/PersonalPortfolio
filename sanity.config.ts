import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { dataset, projectId } from "./sanity/env";
import { schemaTypes } from "./sanity/schemaTypes";

export function getStudioConfig() {
  if (!projectId || !dataset) throw new Error("Configure Sanity before opening Studio.");

  return defineConfig({
    name: "portfolio", title: "Portfolio", basePath: "/studio", projectId, dataset,
    plugins: [structureTool({ structure: (S) => S.list().title("Content").items([
      S.listItem().title("Site settings").id("siteSettings").child(
        S.document().schemaType("siteSettings").documentId("siteSettings"),
      ),
      ...S.documentTypeListItems().filter((item) => item.getId() !== "siteSettings"),
    ]) })],
    schema: { types: schemaTypes, templates: (templates) => templates.filter((template) => template.schemaType !== "siteSettings") },
    document: { actions: (actions, context) => context.schemaType === "siteSettings"
      ? actions.filter(({ action }) => action !== "duplicate" && action !== "delete" && action !== "unpublish")
      : actions },
  });
}
