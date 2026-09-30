const projectFields = `
  _id, title, "slug": slug.current, shortDescription, thumbnail,
  "technologies": coalesce(technologies[]->, []), category,
  githubUrl, liveUrl, "featured": coalesce(featured, false), displayOrder
`;

export const projectsQuery = `*[_type == "project" && defined(slug.current)]
  | order(coalesce(displayOrder, 0) asc, title asc) {${projectFields}}`;
export const featuredProjectsQuery = `*[_type == "project" && featured == true && defined(slug.current)]
  | order(coalesce(displayOrder, 0) asc, title asc) {${projectFields}}`;
export const projectBySlugQuery = `*[_type == "project" && slug.current == $slug][0] {
  ${projectFields}, fullDescription, galleryImages, demoVideoUrl, startDate,
  endDate, status, role, collaborators, keyFeatures, technicalChallenges, lessonsLearned
}`;
export const experienceQuery = `*[_type == "experience"] | order(coalesce(displayOrder, 0) asc, startDate desc) {
  ..., "technologies": coalesce(technologies[]->, []), "currentlyWorking": coalesce(currentlyWorking, false)
}`;
export const educationQuery = `*[_type == "education"] | order(coalesce(displayOrder, 0) asc, school asc)`;
export const skillsQuery = `*[_type == "skill"] | order(coalesce(displayOrder, 0) asc, name asc)`;
export const certificationsQuery = `*[_type == "certification"] | order(coalesce(displayOrder, 0) asc, title asc)`;
export const siteSettingsQuery = `*[_type == "siteSettings" && _id == "siteSettings"][0] {
  ..., "resumeUrl": resumeFile.asset->url,
  "fourthNeuralProject": fourthNeuralProject->{_id, title, "slug": slug.current}
}`;
