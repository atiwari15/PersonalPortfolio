import { defineField, defineType } from "sanity";
import { displayOrder, displayOrdering, imageField } from "./fields";

export const skill = defineType({
  name: "skill", title: "Skills / Technologies", type: "document", orderings: displayOrdering,
  fields: [
    defineField({ name: "name", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "category", type: "string" }),
    imageField("icon"),
    defineField({ name: "proficiencyLabel", type: "string" }),
    displayOrder,
  ],
  preview: { select: { title: "name", subtitle: "category", media: "icon" } },
});
