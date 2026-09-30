import { defineArrayMember, defineField, defineType } from "sanity";
import { displayOrder, displayOrdering, imageField, technologies, textList, webLink } from "./fields";

export const project = defineType({
  name: "project", title: "Projects", type: "document",
  orderings: displayOrdering,
  fields: [
    defineField({ name: "title", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "slug", type: "slug", options: { source: "title" }, validation: (rule) => rule.required() }),
    defineField({ name: "shortDescription", type: "text", rows: 3, validation: (rule) => rule.required() }),
    defineField({ name: "fullDescription", title: "Case study", type: "array", of: [defineArrayMember({ type: "block" }), defineArrayMember(imageField("image"))] }),
    imageField("thumbnail"),
    defineField({ name: "galleryImages", type: "array", of: [defineArrayMember(imageField("image"))] }),
    technologies,
    defineField({ name: "category", type: "string" }),
    webLink("githubUrl"), webLink("liveUrl"), webLink("demoVideoUrl"),
    defineField({ name: "startDate", type: "date" }),
    defineField({ name: "endDate", type: "date", validation: (rule) => rule.min(rule.valueOfField("startDate")) }),
    defineField({ name: "featured", type: "boolean", initialValue: false }),
    displayOrder,
    defineField({ name: "status", type: "string", description: "Project progress; publishing is controlled by Sanity's Publish action." }),
    defineField({ name: "role", type: "string" }),
    textList("collaborators"), textList("keyFeatures"), textList("technicalChallenges"), textList("lessonsLearned"),
  ],
  preview: { select: { title: "title", subtitle: "category", media: "thumbnail" } },
});
