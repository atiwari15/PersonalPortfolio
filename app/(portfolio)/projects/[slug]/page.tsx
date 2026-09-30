import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getProject } from "@/sanity/content";
import { imageUrl } from "@/sanity/images";
import { PortableText } from "@portabletext/react";

export const revalidate = 60;
type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = await getProject((await params).slug);
  return { title: project ? `${project.title} — Aarav Tiwari` : "Project not found", description: project?.shortDescription };
}

export default async function ProjectPage({ params }: Props) {
  const project = await getProject((await params).slug);
  if (!project) notFound();
  const image = imageUrl(project.thumbnail);
  return <main id="main" className="shell project-detail"><div id="top" /><Link className="micro back-link" href="/#work">← All work</Link><p className="eyebrow">{project.category}</p><h1>{project.title}</h1><p className="detail-summary">{project.shortDescription}</p><ul className="tags">{project.technologies.filter(Boolean).map((skill) => <li key={skill._id}>{skill.name}</li>)}</ul>
    <div className="hero-actions">{project.githubUrl ? <a className="button button-primary" href={project.githubUrl} target="_blank" rel="noreferrer">View source ↗</a> : null}{project.liveUrl ? <a className="button button-secondary" href={project.liveUrl} target="_blank" rel="noreferrer">View project ↗</a> : null}</div>
    {image ? <div className="detail-image"><Image src={image} alt={project.thumbnail?.alt ?? ""} fill sizes="(max-width: 1200px) 100vw, 1100px" /></div> : null}
    <div className="rich-text">{project.fullDescription?.length ? <PortableText value={project.fullDescription} components={{ types: { image: ({ value }) => { const src = imageUrl(value); return src ? <Image src={src} alt={value.alt || ""} width={1200} height={750} /> : null; } } }} /> : null}
    {project.keyFeatures?.length ? <><h2>What it does</h2><ul>{project.keyFeatures.map((feature) => <li key={feature}>{feature}</li>)}</ul></> : null}
    {project.technicalChallenges?.length ? <><h2>Engineering challenges</h2><ul>{project.technicalChallenges.map((challenge) => <li key={challenge}>{challenge}</li>)}</ul></> : null}
    {project.lessonsLearned?.length ? <><h2>Lessons learned</h2><ul>{project.lessonsLearned.map((lesson) => <li key={lesson}>{lesson}</li>)}</ul></> : null}</div>
  </main>;
}
