import type { PortableTextBlock } from "@portabletext/react";

export interface ContentDocument { _id: string; displayOrder?: number }
export interface ContentImage {
  _type: "image";
  asset?: { _type: "reference"; _ref: string };
  alt?: string;
  crop?: { top: number; bottom: number; left: number; right: number };
  hotspot?: { x: number; y: number; width: number; height: number };
}
export type RichTextBlock = PortableTextBlock | (ContentImage & { _key: string });
export interface Skill extends ContentDocument {
  name: string; category?: string; icon?: ContentImage; proficiencyLabel?: string;
}
export interface ProjectSummary extends ContentDocument {
  title: string; slug: string; shortDescription: string;
  thumbnail?: ContentImage; technologies: Skill[]; category?: string;
  githubUrl?: string; liveUrl?: string; featured: boolean;
}
export interface Project extends ProjectSummary {
  fullDescription?: RichTextBlock[]; galleryImages?: ContentImage[];
  demoVideoUrl?: string; startDate?: string; endDate?: string; status?: string;
  role?: string; collaborators?: string[]; keyFeatures?: string[];
  technicalChallenges?: string[]; lessonsLearned?: string[];
}
export interface Experience extends ContentDocument {
  company: string; role: string; companyLogo?: ContentImage; location?: string;
  startDate: string; endDate?: string; currentlyWorking: boolean;
  shortDescription?: string; bulletPoints?: string[]; technologies: Skill[]; companyUrl?: string;
}
export interface Education extends ContentDocument {
  school: string; degree?: string; major?: string; minor?: string;
  startDate?: string; graduationDate?: string; description?: string;
  coursework?: string[]; schoolLogo?: ContentImage;
}
export interface Certification extends ContentDocument {
  title: string; issuer: string; issueDate?: string; credentialUrl?: string;
  credentialId?: string; logo?: ContentImage;
}
export interface SiteSettings {
  _id: string; fullName: string; headline?: string; shortBio?: string;
  fourthNeuralProject?: Pick<ProjectSummary, "_id" | "title" | "slug"> | null;
  longBio?: RichTextBlock[]; profileImage?: ContentImage; resumeUrl?: string;
  email?: string; githubUrl?: string; linkedinUrl?: string;
  socialLinks?: { _key: string; label: string; url?: string }[];
  availabilityStatus?: string; currentFocus?: string; locationLabel?: string;
  seoTitle?: string; seoDescription?: string;
}
