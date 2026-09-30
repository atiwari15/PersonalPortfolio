import Image from "next/image";
import Link from "next/link";
import { imageUrl } from "@/sanity/images";
import type { ProjectSummary } from "@/sanity/types";

export function ProjectCard({ project, index }: { project: ProjectSummary; index: number }) {
  const image = imageUrl(project.thumbnail);
  return <article className="project-card">
    <Link className="project-image-link" href={`/projects/${project.slug}`} aria-label={`Read about ${project.title}`}>
      <div className="project-image">{image ? <Image src={image} alt={project.thumbnail?.alt ?? ""} fill sizes="(max-width: 700px) 100vw, 50vw" /> : null}</div>
    </Link>
    <div className="card-meta micro"><span>{String(index + 1).padStart(2, "0")} / {project.category}</span><span aria-hidden="true">↗</span></div>
    <h3><Link href={`/projects/${project.slug}`}>{project.title}</Link></h3>
    <p>{project.shortDescription}</p>
    <ul className="tags" aria-label="Technologies">{project.technologies.filter(Boolean).slice(0, 5).map((skill) => <li key={skill._id}>{skill.name}</li>)}</ul>
  </article>;
}
