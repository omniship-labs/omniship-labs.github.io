#!/usr/bin/env node
/**
 * build.mjs — assemble dist/ from src/ + site.config.json.
 *
 * site.config.json only lists which projects to feature (a manifest URL +
 * whether it's "live") plus homepage-only settings (Discord invite, Open
 * Collective slug). Each project's own metadata (name, description, language,
 * accent, brand mark, license) is fetched at build time from that project's
 * own manifest endpoint — the project repo is the source of truth for its own
 * facts, so nothing here can drift out of sync with it. All three headline
 * stats (live project count, AGPL-3.0 %, funds raised) are derived from live
 * sources at build time, not hand-typed. Also compiles site.less and writes
 * the /discord redirect.
 */
import { cp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import less from 'less';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const SRC = resolve(ROOT, 'src');
const DIST = resolve(ROOT, 'dist');

const config = JSON.parse(await readFile(resolve(ROOT, 'site.config.json'), 'utf8'));

const fetchJson = async (url) => {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${url} -> ${res.status}`);
  return res.json();
};

// Merge each project's own manifest with the local (manifest, live) config entry.
const projects = await Promise.all(
  config.projects.map(async ({ manifest, live }) => {
    const p = await fetchJson(manifest);
    const gh = await fetchJson(`https://api.github.com/repos/omniship-labs/${p.repo}`);
    return { ...p, live, license: gh.license?.spdx_id ?? 'UNKNOWN' };
  })
);

const ocSlug = new URL(config.openCollective).pathname.split('/').filter(Boolean).pop();
const ocRes = await fetch('https://api.opencollective.com/graphql/v2', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    query: `{ collective(slug: "${ocSlug}") { stats { totalAmountReceived { valueInCents } } } }`,
  }),
});
if (!ocRes.ok) throw new Error(`Open Collective API -> ${ocRes.status}`);
const { data: ocData } = await ocRes.json();
const raisedDollars = Math.floor(
  ocData.collective.stats.totalAmountReceived.valueInCents / 100
);

const derivedStats = [
  { value: String(projects.filter((p) => p.live).length), label: 'live project' },
  {
    value: `${Math.round(
      (100 * projects.filter((p) => p.license === 'AGPL-3.0').length) / projects.length
    )}%`,
    label: 'AGPL-3.0',
  },
  { value: `$${raisedDollars.toLocaleString('en-US')}`, label: 'raised via Open Collective' },
];

const esc = (s) =>
  String(s)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');

/* ---------------------------------------------------------- renderers */

const statCell = ({ value, label }) => `
    <div class="stat"><div class="stat-value">${esc(value)}</div><div class="stat-label mono">${esc(label)}</div></div>`;

const badgeLive = `<span class="badge badge-success mono"><span class="badge-dot"></span>live</span>`;

const projectCard = (p) => `
    <a class="project-card" href="${esc(p.href)}" rel="noopener" style="--a:${esc(p.accent)}">
      <span class="project-topline" aria-hidden="true"></span>
      <span class="project-head">
        <span class="project-icon project-icon-mark" aria-hidden="true">
          <img src="${esc(p.mark)}" alt="" width="38" height="38">
        </span>
        <span class="project-names">
          <span class="project-repo mono">omniship-labs/<strong>${esc(p.repo)}</strong></span>
          <span class="project-cat mono">${esc(p.category)}</span>
        </span>
      </span>
      <span class="project-desc">${esc(p.description)}</span>
      <span class="project-meta">
        <span class="badge badge-neutral mono">${esc(p.license)}</span>
        <span class="lang-chip mono">${esc(p.language)}</span>
        ${p.live ? badgeLive : ''}
      </span>
    </a>`;

const workbenchCard = `
    <a class="project-card project-card-placeholder" href="${esc(config.github)}" rel="noopener">
      <span class="project-desc">More on the workbench. Follow the org on GitHub to see what ships next.</span>
      <span class="project-meta">
        <span class="all-link mono">github.com/omniship-labs
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
        </span>
      </span>
    </a>`;

const footerProjectLink = (p) => `
        <a href="${esc(p.href)}" rel="noopener">${esc(p.name)}</a>`;

const discordRedirect = (invite) => `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<!-- omniship.dev/discord — stable community link. The invite comes from
     site.config.json; edit it there and rebuild. -->
<meta http-equiv="refresh" content="0; url=${esc(invite)}">
<link rel="canonical" href="${esc(invite)}">
<title>OmniShip Labs — Discord</title>
<meta name="robots" content="noindex">
</head>
<body>
<p>Taking you to the OmniShip Labs Discord — <a href="${esc(invite)}">${esc(invite.replace('https://', ''))}</a></p>
<script>location.replace(${JSON.stringify(invite)});</script>
</body>
</html>
`;

/* -------------------------------------------------------------- build */

// A marker either stands alone (<!-- @name -->) or wraps stale content from a
// previous render (<!-- @name --> ... <!-- /@name -->); both forms re-render.
const inject = (html, name, content) => {
  const block = `<!-- @${name} -->${content}\n    <!-- /@${name} -->`;
  const wrapped = new RegExp(`<!-- @${name} -->[\\s\\S]*?<!-- /@${name} -->`);
  if (wrapped.test(html)) return html.replace(wrapped, block);
  if (!html.includes(`<!-- @${name} -->`)) {
    throw new Error(`marker <!-- @${name} --> not found in index.html`);
  }
  return html.replace(`<!-- @${name} -->`, block);
};

await rm(DIST, { recursive: true, force: true });
await mkdir(DIST, { recursive: true });
await cp(SRC, DIST, { recursive: true });
await cp(resolve(ROOT, 'CNAME'), resolve(DIST, 'CNAME'));

// index.html from config — {{key}} tokens for scalar values, then markers
let html = await readFile(resolve(SRC, 'index.html'), 'utf8');
html = html.replace(/\{\{(\w+)\}\}/g, (m, key) => {
  const v = config[key];
  if (typeof v !== 'string') throw new Error(`unknown config token {{${key}}}`);
  return esc(v);
});
html = inject(html, 'stats', derivedStats.map(statCell).join(''));
html = inject(html, 'projects', [...projects.map(projectCard), workbenchCard].join('\n'));
html = inject(html, 'footer-projects', projects.map(footerProjectLink).join(''));
await writeFile(resolve(DIST, 'index.html'), html);

// /discord redirect from config
await mkdir(resolve(DIST, 'discord'), { recursive: true });
await writeFile(resolve(DIST, 'discord', 'index.html'), discordRedirect(config.discordInvite));

// Less → CSS
const lessSrc = await readFile(resolve(SRC, 'styles', 'site.less'), 'utf8');
const { css } = await less.render(lessSrc, { filename: resolve(SRC, 'styles', 'site.less') });
await writeFile(resolve(DIST, 'styles', 'site.css'), css);
await rm(resolve(DIST, 'styles', 'site.less'));

console.log(
  `[build] dist/ ready — ${projects.length} project(s), discord → ${config.discordInvite}`
);
