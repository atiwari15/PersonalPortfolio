import { defineField, defineType } from "sanity";
import { displayOrder, displayOrdering, imageField, webLink } from "./fields";

export const certification = defineType({
  name: "certification", title: "Certifications", type: "document", orderings: displayOrdering,
  fields: [
    defineField({ name: "title", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "issuer", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "issueDate", type: "date" }),
    webLink("credentialUrl"),
    defineField({ name: "credentialId", type: "string" }),
    imageField("logo"), displayOrder,
  ],
});
