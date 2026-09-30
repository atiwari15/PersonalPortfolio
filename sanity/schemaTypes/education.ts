import { defineField, defineType } from "sanity";
import { displayOrder, displayOrdering, imageField, textList } from "./fields";

export const education = defineType({
  name: "education", title: "Education", type: "document", orderings: displayOrdering,
  fields: [
    defineField({ name: "school", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "degree", type: "string" }),
    defineField({ name: "major", type: "string" }),
    defineField({ name: "minor", type: "string" }),
    defineField({ name: "startDate", type: "date" }),
    defineField({ name: "graduationDate", type: "date", validation: (rule) => rule.min(rule.valueOfField("startDate")) }),
    defineField({ name: "description", type: "text" }),
    textList("coursework"), imageField("schoolLogo"), displayOrder,
  ],
  preview: { select: { title: "school", subtitle: "degree", media: "schoolLogo" } },
});
