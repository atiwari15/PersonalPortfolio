import type { Metadata } from "next";
import { getEducation, getExperience, getFeaturedProjects, getSiteSettings, getSkills } from "@/sanity/content";
import { NeuralStructure, type NeuralProject } from "@/components/neural-structure";
import { ProjectCard } from "@/components/project-card";
import { SectionTitle } from "@/components/section-title";
import { Reveal } from "@/components/reveal";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  return { title: settings?.seoTitle || `${settings?.fullName ?? "Portfolio"} — ${settings?.headline ?? ""}`, description: settings?.seoDescription || settings?.shortBio };
}

function month(date?: string) {
  return date ? new Date(`${date}T12:00:00Z`).toLocaleDateString("en-US", { month: "short", year: "numeric", timeZone: "UTC" }) : "";
}

export default async function Home() {
  const [settings, projects, experience, education, skills] = await Promise.all([getSiteSettings(), getFeaturedProjects(), getExperience(), getEducation(), getSkills()]);
  if (!settings) return <main id="main" className="shell section"><h1>Portfolio coming soon.</h1></main>;
  const groups = [...new Set(skills.map((skill) => skill.category || "Tools"))];
  const primaryNodes = projects.slice(0, 3).map(({ _id, title, slug }) => ({ _id, title, slug }));
  const fourthNode = settings.fourthNeuralProject;
  const neuralProjects: (NeuralProject | null)[] = [0, 1, 2].map((index) => primaryNodes[index] ?? null);
  neuralProjects.push(fourthNode?.slug && !primaryNodes.some((project) => project._id === fourthNode._id) ? fourthNode : null);
  return <main id="main">
    <section className="shell hero" id="top" aria-labelledby="hero-title">
      <div className="hero-copy">
        <p className="eyebrow"><span className="red-line" />{settings.fullName}</p>
        <h1 id="hero-title">{settings.headline}</h1>
        <p className="hero-bio">{settings.shortBio}</p>
        <div className="hero-actions"><a className="button button-primary" href="#work">Explore my work <span aria-hidden="true">↓</span></a>{settings.resumeUrl ? <a className="button button-secondary" href={settings.resumeUrl} target="_blank" rel="noreferrer">View resume <span aria-hidden="true">↗</span></a> : null}</div>
        <div className="social-links micro">{settings.githubUrl ? <a href={settings.githubUrl} target="_blank" rel="noreferrer">GitHub ↗</a> : null}{settings.linkedinUrl ? <a href={settings.linkedinUrl} target="_blank" rel="noreferrer">LinkedIn ↗</a> : null}</div>
      </div>
      <NeuralStructure projects={neuralProjects} />
    </section>
    <div className="shell hero-foot micro"><span>Software engineering · Applied AI</span><a href="#work">Selected work <span aria-hidden="true">↓</span></a></div>
    <section className="shell section" id="work" aria-labelledby="work-title">
      <Reveal><div id="work-title"><SectionTitle number="01" label="Selected work" title="Ideas, engineered." /></div></Reveal>
      {projects.length ? <div className="project-grid">{projects.map((project, index) => <Reveal key={project._id}><ProjectCard project={project} index={index} /></Reveal>)}</div> : <p className="muted">Selected projects will appear here soon.</p>}
    </section>
    <section className="section experience-section" id="experience" aria-labelledby="experience-title">
      <div className="shell"><Reveal><div id="experience-title"><SectionTitle number="02" label="Experience" title="Built beyond the classroom." /></div></Reveal>
        {experience.map((item) => <Reveal key={item._id}><article className="experience-row"><div><p className="micro">{month(item.startDate)} — {item.currentlyWorking ? "Present" : month(item.endDate)}</p><p className="micro muted">{item.location}</p></div><div><h3>{item.role}</h3><p className="company-name">{item.company}</p><p className="experience-summary">{item.shortDescription}</p>{item.bulletPoints?.length ? <ul className="experience-points">{item.bulletPoints.map((point) => <li key={point}>{point}</li>)}</ul> : null}</div></article></Reveal>)}
      </div>
    </section>
    <section className="shell section about-section" id="about" aria-labelledby="about-title">
      <Reveal><div id="about-title"><SectionTitle number="03" label="About & technical profile" title="Curiosity, put to work." /></div></Reveal>
      <div className="about-grid"><div><p className="about-bio">{settings.shortBio}</p>{education.map((item) => <div key={item._id} className="education"><p className="micro">Education</p><h3>{item.school}</h3><p>{item.degree}{item.major ? ` · ${item.major}` : ""}</p>{item.graduationDate ? <p className="micro muted">Expected {month(item.graduationDate)}</p> : null}</div>)}</div><div className="skills">{groups.map((group) => <div className="skill-group" key={group}><h3 className="micro">{group}</h3><p>{skills.filter((skill) => (skill.category || "Tools") === group).map((skill) => skill.name).join(" · ")}</p></div>)}</div></div>
    </section>
  </main>;
}
