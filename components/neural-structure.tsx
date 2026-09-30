"use client";

import Link from "next/link";
import { useEffect, useRef, type CSSProperties, type PointerEvent } from "react";

// An illustrative navigation network, not a scientific model or live simulation.
function branches(x: number, y: number, angle: number, length: number, depth: number, seed: number): string[] {
  if (depth === 0) return [];
  const endX = x + Math.cos(angle) * length;
  const endY = y + Math.sin(angle) * length;
  const bend = Math.sin(seed * 2.3) * length * 0.24;
  const path = `M${x.toFixed(1)},${y.toFixed(1)} Q${((x + endX) / 2 + bend).toFixed(1)},${((y + endY) / 2 - bend).toFixed(1)} ${endX.toFixed(1)},${endY.toFixed(1)}`;
  return [path, ...branches(endX, endY, angle - 0.5, length * 0.7, depth - 1, seed + 1), ...branches(endX, endY, angle + 0.59, length * 0.64, depth - 1, seed + 3)];
}
const branchGroups = Array.from({ length: 7 }, (_, i) => branches(290, 280, i * Math.PI * 2 / 7 + 0.2, 78 + (i % 3) * 16, 5, i + 1));
const paths = branchGroups.flat();

// Place each node at an existing fork, using the same geometry as the artwork.
const slots = [4, 0, 2, 6].map((branch, index) => {
  const angle = branch * Math.PI * 2 / 7 + 0.2;
  const length = 78 + (branch % 3) * 16;
  const turn = index === 3 ? -0.5 : 0.59;
  const nextLength = length * (index === 3 ? 0.7 : 0.64);
  return {
    branch,
    x: 290 + Math.cos(angle) * length + Math.cos(angle + turn) * nextLength,
    y: 280 + Math.sin(angle) * length + Math.sin(angle + turn) * nextLength,
  };
});

export type NeuralProject = { _id: string; title: string; slug: string };

export function NeuralStructure({ projects }: { projects: (NeuralProject | null)[] }) {
  const panel = useRef<HTMLDivElement>(null);
  const nodeElements = useRef<(HTMLAnchorElement | null)[]>([]);
  const branchElements = useRef<(SVGGElement | null)[]>([]);
  const frame = useRef<number | null>(null);

  useEffect(() => () => {
    if (frame.current !== null) cancelAnimationFrame(frame.current);
  }, []);

  function resetProximity() {
    if (frame.current !== null) cancelAnimationFrame(frame.current);
    frame.current = null;
    panel.current?.style.setProperty("--pointer-strength", "0");
    nodeElements.current.forEach((node) => node?.style.setProperty("--proximity", "0"));
    branchElements.current.forEach((branch) => branch?.style.setProperty("--proximity", "0"));
  }

  function followPointer(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType === "touch") return;
    const { clientX, clientY } = event;
    if (frame.current !== null) cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      frame.current = null;
      const element = panel.current;
      if (!element) return;
      const rect = element.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      const x = (clientX - rect.left) / rect.width * 580;
      const y = (clientY - rect.top) / rect.height * 560;
      element.style.setProperty("--pointer-x", `${x / 580 * 100}%`);
      element.style.setProperty("--pointer-y", `${y / 560 * 100}%`);
      element.style.setProperty("--pointer-strength", "1");
      slots.forEach((slot, index) => {
        // Smooth falloff, bounded to a local area around each active project.
        const proximity = Math.max(0, 1 - Math.hypot(x - slot.x, y - slot.y) / 170);
        const strength = (proximity * proximity).toFixed(3);
        const node = nodeElements.current[index];
        node?.style.setProperty("--proximity", strength);
        branchElements.current[slot.branch]?.style.setProperty("--proximity", node ? strength : "0");
      });
    });
  }

  return <div ref={panel} className="neural-panel" onPointerMove={followPointer} onPointerLeave={resetProximity} onPointerCancel={resetProximity}>
    <div className="neural-cursor-glow" aria-hidden="true" />
    <div className="neural-orbit orbit-one" aria-hidden="true" /><div className="neural-orbit orbit-two" aria-hidden="true" />
    <svg className="neural-svg" viewBox="0 0 580 560" fill="none" aria-hidden="true">
      <defs>
        <radialGradient id="neural-halo"><stop stopColor="#C1121F" stopOpacity=".3"/><stop offset="1" stopColor="#8B0000" stopOpacity="0"/></radialGradient>
        <filter id="neural-glow" x="-100%" y="-100%" width="300%" height="300%"><feGaussianBlur stdDeviation="3"/></filter>
      </defs>
      <circle cx="290" cy="280" r="230" fill="url(#neural-halo)" />
      {branchGroups.map((group, branch) => <g key={branch} ref={(element) => { branchElements.current[branch] = element; }} className="neural-branch" stroke="#8B0000" strokeWidth="1.2">{group.map((d, i) => <path key={i} d={d} opacity={0.45 + (i % 5) * 0.1} />)}</g>)}
      <g className="neural-pulse" stroke="#F28585" strokeWidth="1" filter="url(#neural-glow)">{paths.filter((_, i) => i % 4 === 0).map((d, i) => <path key={i} d={d} />)}</g>
      <g stroke="#C1121F" strokeWidth="1.4">{paths.filter((_, i) => i % 7 === 0).map((d, i) => <path key={i} d={d} />)}</g>
      <path d="M272 266 Q290 256 303 268 L310 283 Q294 301 280 293 L270 280 Z" fill="#190d0e" stroke="#C1121F" />
      <circle className="neural-pulse" cx="290" cy="280" r="6" fill="#F28585" filter="url(#neural-glow)" />
      <circle cx="290" cy="280" r="2" fill="#F2EFEA" />
      <g stroke="#695552" strokeWidth=".7" opacity=".7"><path d="M66 89h17m-8-8v17 M486 457h17m-8-8v17 M490 80h17m-8-8v17 M81 460h17m-8-8v17" /></g>
    </svg>
    <nav className="neural-nodes" aria-label="Explore projects">
      {slots.map((slot, index) => {
        const project = projects[index];
        const style = { left: `${slot.x / 580 * 100}%`, top: `${slot.y / 560 * 100}%` } as CSSProperties;
        return project ? <Link
          key={index}
          ref={(element) => { nodeElements.current[index] = element; }}
          className="neural-node"
          style={style}
          href={`/projects/${encodeURIComponent(project.slug)}`}
          aria-label={`Explore ${project.title}`}
          onFocus={() => branchElements.current[slot.branch]?.style.setProperty("--proximity", "1")}
          onBlur={resetProximity}
        >
          <span className="neural-node-aura" aria-hidden="true" />
          <span className="neural-node-dot" aria-hidden="true" />
          <span className="neural-node-label micro">{project.title}<span aria-hidden="true"> ↗</span></span>
        </Link> : <span key={index} className="neural-node neural-node-empty" style={style} aria-hidden="true"><span className="neural-node-dot" /></span>;
      })}
    </nav>
    <span className="micro neural-label">Software × Applied AI</span>
  </div>;
}
