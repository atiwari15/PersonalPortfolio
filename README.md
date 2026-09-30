# Aarav Tiwari — Portfolio

A Sanity-driven personal portfolio built with Next.js App Router, TypeScript and Tailwind, with Motion for section reveals. The first implementation includes a responsive homepage, three project detail pages, résumé download, experience, education and grouped skills. The approved visual direction uses near-black, burgundy and bone, a split hero, subtle gothic-influenced display type and a decorative branching neural structure.

## Run locally

Use Node.js 22.12 or newer. Install dependencies with `npm ci`. Copy `.env.example` to `.env.local` only when creating a new environment, then supply the Sanity project ID and dataset. Never commit `.env.local` or tokens.

```sh
npm run dev -- --port 3333
```

Open `http://localhost:3333` for the portfolio and `http://localhost:3333/studio` to edit content. This origin already has credentialed CORS access for the connected Sanity project. The current preview uses a production server because the development watcher hit the local open-file limit:

```sh
npm run build
npm run start -- --hostname 127.0.0.1 --port 3333
```

If the restricted environment blocks Turbopack's worker port, use `npm run build -- --webpack` before starting the preview. This fallback passed for the interactive-node update.

Stop a previous server before starting another on the same port. Rebuild and restart after code changes in production mode. CMS content changes do not need a code rebuild.

## Edit content

See [the content guide](./CONTENT-GUIDE.md) for screenshot uploads, new projects and activating the fourth neural node.

The local environment connects to project `8119ahnc`, public dataset `production`. Studio editing requires an authorized Sanity login. Public pages use the published perspective; no private API token is required to read this public dataset.

- **Site settings:** full name, headline, introduction, résumé PDF, social/contact links and metadata.
- **Projects:** summaries, rich case studies, screenshots, technology references, feature status and display order. The homepage shows featured projects in ascending display order.
- **Experience / Education / Skills:** the homepage renders these published records.
- **Certifications:** stored in Sanity for later presentation; not displayed in this homepage increment.

The approved résumé import populated 30 documents: site settings, three projects, one internship, one education entry, 22 skills and two certifications. The temporary import tool has been removed from Studio. Existing documents were preserved. Project image areas remain intentionally empty until screenshots are supplied.

Published data is cached with request-driven revalidation after 60 seconds. The first request after expiry may see the previous response while refresh completes. An already-open browser page may need refreshing; this is not a live-preview subscription.

The site settings singleton is enforced by Studio navigation and creation/action restrictions, not by database-level uniqueness. Optional private-dataset read tokens belong only in `SANITY_API_READ_TOKEN`, without a `NEXT_PUBLIC_` prefix.

## Structure

- `app/(portfolio)/`: homepage, project pages and scoped visual styles
- `components/`: navigation, cards, neural decoration, section reveals and footer
- `sanity/schemaTypes/`: six CMS document types
- `sanity/content.ts` and `sanity/queries.ts`: typed server-side content access
- `sanity/types.ts` and `sanity/images.ts`: content contracts and image URL generation
- `sanity.config.ts`: Studio configuration
- `app/studio/`: authenticated Sanity editor shell

The neural graphic is an illustrative project navigation map, not a scientific model. Its first three nodes use the first three featured projects; an optional fourth project reference in Site settings activates the reserved node. Empty, unpublished or duplicate fourth selections remain inactive. Pointer proximity brightens nearby branches and nodes without React renders on every pointer move. Keyboard focus and direct taps work as navigation, and animations respect reduced-motion settings.

## Verification and remaining work

```sh
npm run lint
npm run typecheck
npm run build
```

Verified the published Sanity records, desktop homepage, project navigation and the mobile menu at 400px width. Confirmed that the newly published content appeared on the homepage without rebuilding. Source checks cover reduced-motion handling and keyboard focus styles.

For the interactive map update: lint and TypeScript passed, and the production build passed with Webpack. Checked all three node destinations, keyboard activation and visible focus, increasing proximity glow and reset on pointer exit, plus the layout at 400px and 1280px. The fourth node remains unassigned; no test project was published to populate it.

Still pending: project screenshots, broader device/accessibility testing, standalone project index and any additional routes, production metadata/domain configuration, GitHub and Vercel deployment. Search indexing remains disabled until launch. No public website deployment has been performed.

The initial package audit reported 15 advisories (12 moderate, 3 high) through Sanity's CLI/tooling dependency tree. Reassess before launch; no forced major-version dependency changes have been applied.
