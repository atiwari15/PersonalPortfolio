import { defineArrayMember, defineField, defineType } from "sanity";
import { imageField, webLink } from "./fields";

export const siteSettings = defineType({
  name: "siteSettings", title: "Site settings", type: "document",
  fields: [
    defineField({ name: "fullName", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "headline", type: "string" }),
    defineField({ name: "shortBio", type: "text", rows: 3 }),
    defineField({
      name: "fourthNeuralProject", title: "Fourth neural node", type: "reference", to: [{ type: "project" }],
      description: "Optional project for the empty node in the homepage graphic. Choose a published project with a slug, different from the first three featured projects. Leave empty to keep the node inactive. The other nodes follow the first three featured projects in display order.",
      options: { filter: "defined(slug.current)" },
    }),
    defineField({ name: "longBio", type: "array", of: [defineArrayMember({ type: "block" })] }),
    imageField("profileImage"),
    defineField({ name: "resumeFile", type: "file", options: { accept: "application/pdf" } }),
    defineField({ name: "email", type: "string", validation: (rule) => rule.email() }),
    webLink("githubUrl"), webLink("linkedinUrl"),
    defineField({ name: "socialLinks", type: "array", of: [defineArrayMember({
      type: "object", name: "socialLink", fields: [
        defineField({ name: "label", type: "string", validation: (rule) => rule.required() }), webLink("url"),
      ],
    })] }),
    defineField({ name: "availabilityStatus", type: "string" }),
    defineField({ name: "currentFocus", type: "text" }),
    defineField({ name: "locationLabel", type: "string" }),
    defineField({ name: "seoTitle", type: "string" }),
    defineField({ name: "seoDescription", type: "text", rows: 3 }),
  ],
});
