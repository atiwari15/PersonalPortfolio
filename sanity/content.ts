import "server-only";
import type { QueryParams } from "@sanity/client";
import { getSanityClient } from "./client";
import * as queries from "./queries";
import type { Certification, Education, Experience, Project, ProjectSummary, SiteSettings, Skill } from "./types";

async function fetchContent<T>(query: string, params: QueryParams = {}) {
  // Published content is revalidated on subsequent requests after 60 seconds.
  return getSanityClient().fetch<T>(query, params, { next: { revalidate: 60 } });
}

export const getProjects = () => fetchContent<ProjectSummary[]>(queries.projectsQuery);
export const getFeaturedProjects = () => fetchContent<ProjectSummary[]>(queries.featuredProjectsQuery);
export const getProject = (slug: string) => fetchContent<Project | null>(queries.projectBySlugQuery, { slug });
export const getExperience = () => fetchContent<Experience[]>(queries.experienceQuery);
export const getEducation = () => fetchContent<Education[]>(queries.educationQuery);
export const getSkills = () => fetchContent<Skill[]>(queries.skillsQuery);
export const getCertifications = () => fetchContent<Certification[]>(queries.certificationsQuery);
export const getSiteSettings = () => fetchContent<SiteSettings | null>(queries.siteSettingsQuery);
