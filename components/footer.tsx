import type { SiteSettings } from "@/sanity/types";

export function Footer({ settings }: { settings: SiteSettings | null }) {
  return <footer className="shell site-footer">
    <div><span className="footer-name">{settings?.fullName}</span><p className="micro">© {new Date().getFullYear()}</p></div>
    <div className="footer-links">
      {settings?.email ? <a href={`mailto:${settings.email}`}>Email</a> : null}
      {settings?.githubUrl ? <a href={settings.githubUrl} target="_blank" rel="noreferrer">GitHub</a> : null}
      {settings?.linkedinUrl ? <a href={settings.linkedinUrl} target="_blank" rel="noreferrer">LinkedIn</a> : null}
    </div>
    <a className="micro" href="#top">Back to top ↑</a>
  </footer>;
}
