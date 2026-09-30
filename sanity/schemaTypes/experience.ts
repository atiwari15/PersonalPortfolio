import { defineField, defineType } from "sanity";
import { displayOrder, displayOrdering, imageField, technologies, textList, webLink } from "./fields";

export const experience = defineType({
  name: "experience", title: "Experience", type: "document", orderings: displayOrdering,
  fields: [
    defineField({ name: "company", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "role", type: "string", validation: (rule) => rule.required() }),
    imageField("companyLogo"),
    defineField({ name: "location", type: "string" }),
    defineField({ name: "startDate", type: "date", validation: (rule) => rule.required() }),
    defineField({ name: "endDate", type: "date", validation: (rule) => rule.min(rule.valueOfField("startDate")) }),
    defineField({ name: "currentlyWorking", type: "boolean", initialValue: false }),
    defineField({ name: "shortDescription", type: "text" }),
    textList("bulletPoints"), technologies, webLink("companyUrl"), displayOrder,
  ],
  preview: { select: { title: "role", subtitle: "company", media: "companyLogo" } },
});
