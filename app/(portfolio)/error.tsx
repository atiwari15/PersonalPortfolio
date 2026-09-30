"use client";
export default function ContentError({ reset }: { reset: () => void }) {
  return <main id="main" className="shell section"><h1>Unable to load this page.</h1><p>Please try again in a moment.</p><button className="button button-primary" onClick={reset}>Try again</button></main>;
}
