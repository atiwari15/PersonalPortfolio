import { defineArrayMember, defineField } from "sanity";

export const displayOrder = defineField({
  name: "displayOrder", type: "number", initialValue: 0,
  validation: (rule) => rule.integer().min(0),
});

export function textList(name: string) {
  return defineField({ name, type: "array", of: [defineArrayMember({ type: "string" })] });
}

export function imageField(name: string) {
  return defineField({
    name, type: "image", options: { hotspot: true },
    fields: [defineField({ name: "alt", title: "Alternative text", type: "string", validation: (rule) => rule.required() })],
  });
}

export function webLink(name: string) {
  return defineField({ name, type: "url", validation: (rule) => rule.uri({ scheme: ["https", "http"] }) });
}

export const technologies = defineField({
  name: "technologies", type: "array",
  of: [defineArrayMember({ type: "reference", to: [{ type: "skill" }] })],
});

export const displayOrdering = [{ title: "Display order", name: "displayOrderAsc", by: [{ field: "displayOrder", direction: "asc" as const }] }];
