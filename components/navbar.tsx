"use client";

import Link from "next/link";
import { useRef, useState } from "react";

export function Navbar({ name, resumeUrl }: { name: string; resumeUrl?: string }) {
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  return <header className="site-header" onKeyDown={(event) => {
    if (event.key === "Escape" && open) { setOpen(false); toggle.current?.focus(); }
  }}>
    <div className="shell nav-inner">
      <Link className="wordmark" href="/" onClick={() => setOpen(false)}><span className="brand-mark" aria-hidden="true">✳</span>{name}</Link>
      <button ref={toggle} className="menu-toggle" type="button" aria-expanded={open} aria-controls="primary-navigation" onClick={() => setOpen(!open)}>{open ? "Close" : "Menu"}<span aria-hidden="true">{open ? "−" : "+"}</span></button>
      <nav id="primary-navigation" aria-label="Main navigation" className={open ? "main-nav is-open" : "main-nav"}>
        <Link href="/#work" onClick={() => setOpen(false)}>Work</Link>
        <Link href="/#experience" onClick={() => setOpen(false)}>Experience</Link>
        <Link href="/#about" onClick={() => setOpen(false)}>About</Link>
        {resumeUrl ? <a className="resume-nav" href={resumeUrl} target="_blank" rel="noreferrer" onClick={() => setOpen(false)}>Resume <span aria-hidden="true">↗</span></a> : null}
      </nav>
    </div>
  </header>;
}
