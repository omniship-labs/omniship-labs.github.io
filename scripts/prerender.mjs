#!/usr/bin/env node
/**
 * prerender.mjs — statically render the SSR bundle into dist/index.html.
 *
 * `vite build` (client) already produced a dist/index.html with hashed
 * asset tags; this script fetches the homepage's live data, renders <App>
 * to a string via the SSR bundle (built separately with `vite build --ssr`),
 * drops it into #root, and serializes the data as window.__DATA__ so the
 * client hydrates without a second fetch. Also writes the /discord redirect
 * and copies CNAME.
 */
import { copyFile, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { loadData } from './data.mjs';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const DIST = resolve(ROOT, 'dist');

const esc = (s) => String(s).replaceAll('<', '\\u003c');

const data = await loadData(ROOT);
const { render } = await import(resolve(ROOT, 'dist-ssr', 'entry-server.js'));
const appHtml = render(data);

let html = await readFile(resolve(DIST, 'index.html'), 'utf8');
html = html.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);
html = html.replace(
  '<script type="module"',
  `<script>window.__DATA__=${esc(JSON.stringify(data))}</script>\n<script type="module"`
);
await writeFile(resolve(DIST, 'index.html'), html);

await copyFile(resolve(ROOT, 'CNAME'), resolve(DIST, 'CNAME'));

const discordRedirect = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<!-- omniship.dev/discord — stable community link. The invite comes from
     site.config.json; edit it there and rebuild. -->
<meta http-equiv="refresh" content="0; url=${data.discordInvite}">
<link rel="canonical" href="${data.discordInvite}">
<title>OmniShip Labs — Discord</title>
<meta name="robots" content="noindex">
</head>
<body>
<p>Taking you to the OmniShip Labs Discord — <a href="${data.discordInvite}">${data.discordInvite.replace('https://', '')}</a></p>
<script>location.replace(${JSON.stringify(data.discordInvite)});</script>
</body>
</html>
`;
await mkdir(resolve(DIST, 'discord'), { recursive: true });
await writeFile(resolve(DIST, 'discord', 'index.html'), discordRedirect);

await rm(resolve(ROOT, 'dist-ssr'), { recursive: true, force: true });

console.log(
  `[prerender] dist/ ready — ${data.projects.length} project(s), discord → ${data.discordInvite}`
);
