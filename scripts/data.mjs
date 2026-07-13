/**
 * data.mjs — build-time data for the homepage.
 *
 * site.config.json only lists which projects to feature (a manifest URL +
 * editorial "live" flag) plus homepage-only settings (Discord invite, Open
 * Collective, budget allocation). Each project's own metadata (name,
 * description, language, accent, brand mark) is fetched from that project's
 * own manifest endpoint — the project repo is the source of truth for its
 * own facts. License comes from the GitHub API. The three headline stats and
 * the funding ledger's "raised"/"backers" numbers are derived from these live
 * sources at build time, never hand-typed.
 */
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const fetchJson = async (url) => {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${url} -> ${res.status}`);
  return res.json();
};

export async function loadData(root) {
  const config = JSON.parse(await readFile(resolve(root, 'site.config.json'), 'utf8'));

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
      query: `{ collective(slug: "${ocSlug}") { totalFinancialContributors stats { totalAmountReceived { valueInCents } } } }`,
    }),
  });
  if (!ocRes.ok) throw new Error(`Open Collective API -> ${ocRes.status}`);
  const { data: oc } = await ocRes.json();
  const raised = Math.floor(oc.collective.stats.totalAmountReceived.valueInCents / 100);
  const backers = oc.collective.totalFinancialContributors;

  const stats = [
    { value: String(projects.filter((p) => p.live).length), label: 'live project' },
    {
      value: `${Math.round(
        (100 * projects.filter((p) => p.license === 'AGPL-3.0').length) / projects.length
      )}%`,
      label: 'AGPL-3.0',
    },
    { value: `$${raised.toLocaleString('en-US')}`, label: 'raised via Open Collective' },
  ];

  return {
    openCollective: config.openCollective,
    discordInvite: config.discordInvite,
    github: config.github,
    ledger: config.fundingLedger,
    projects,
    stats,
    raised,
    backers,
  };
}
