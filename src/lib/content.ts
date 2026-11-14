// Reads the editable YAML files in /content at build time.
// Nothing here needs editing for normal content changes.
import fs from 'node:fs';
import path from 'node:path';
import { load as yamlLoad } from 'js-yaml';

export type Lang = 'en' | 'ar';
const ROOT = path.resolve(process.cwd(), 'content');
const cache = new Map<string, any>();

export function readYaml(rel: string): any {
  if (cache.has(rel) && import.meta.env.PROD) return cache.get(rel);
  const file = path.join(ROOT, rel);
  let data: any;
  try {
    data = yamlLoad(fs.readFileSync(file, 'utf8')) ?? {};
  } catch (err: any) {
    // Make YAML typos easy to find for a non-developer.
    throw new Error(`\n\n✖ Problem in content file "content/${rel}":\n${err.message}\n` +
      `Tip: check quotes "..." and indentation (spaces) on the line mentioned above.\n`);
  }
  cache.set(rel, data);
  return data;
}

const isObj = (v: unknown): v is Record<string, any> => !!v && typeof v === 'object' && !Array.isArray(v);

/** Deep-merge: Arabic values override English; anything missing in Arabic falls back to English. */
function merge(base: any, over: any): any {
  if (over === undefined || over === null || over === '') return base;
  if (Array.isArray(base) && Array.isArray(over)) {
    return base.map((b, i) => merge(b, over[i])).concat(over.slice(base.length));
  }
  if (isObj(base) && isObj(over)) {
    const out: Record<string, any> = { ...base };
    for (const k of Object.keys(over)) out[k] = merge(base[k], over[k]);
    return out;
  }
  return over;
}

/** Load a bilingual file (with en: / ar: blocks) for one language. */
export function loadLocalized(rel: string, lang: Lang): any {
  const data = readYaml(rel);
  if (lang === 'en') return data.en ?? {};
  return merge(data.en ?? {}, data.ar ?? {});
}

export const settings = readYaml('settings.yaml');

/** True when a value is real content (not empty and not an [[EDIT]] placeholder). */
export function isFilled(v: unknown): boolean {
  if (v === undefined || v === null) return false;
  if (typeof v === 'string') return v.trim() !== '' && !v.includes('[[EDIT');
  return true;
}

/** Return the value if filled, otherwise undefined (so templates can hide it). */
export function filled<T>(v: T): T | undefined {
  return isFilled(v) ? v : undefined;
}

export function languages(): Lang[] {
  const out: Lang[] = [];
  if (settings.languages?.english !== false) out.push('en');
  if (settings.languages?.arabic) out.push('ar');
  return out;
}

export function pageEnabled(key: string): boolean {
  if (key === 'home') return true;
  return settings.pages?.[key] !== false;
}

/** Build getStaticPaths entries: English at "/", Arabic under "/ar". */
export function langPaths(pageKey = 'home') {
  if (!pageEnabled(pageKey)) return [];
  return languages().map((lang) => ({ params: { lang: lang === 'en' ? undefined : lang }, props: { lang } }));
}

export function localePath(lang: Lang, p = '/'): string {
  const clean = p.startsWith('/') ? p : `/${p}`;
  if (lang === 'en') return clean;
  return clean === '/' ? '/ar/' : `/ar${clean}`;
}

/** Products: every .yaml file in content/products is one product. */
export function loadProducts(lang: Lang) {
  const dir = path.join(ROOT, 'products');
  const files = fs.readdirSync(dir).filter((f) => f.endsWith('.yaml') || f.endsWith('.yml'));
  return files
    .map((f) => {
      const raw = readYaml(`products/${f}`);
      const slug = raw.slug || f.replace(/\.ya?ml$/, '');
      return { ...raw, slug, text: loadLocalized(`products/${f}`, lang) };
    })
    .filter((p) => p.show !== false)
    .sort((a, b) => (a.order ?? 99) - (b.order ?? 99));
}

export function siteUrl(): string | undefined {
  const u = settings.site?.url;
  return isFilled(u) ? String(u).replace(/\/$/, '') : undefined;
}

/** The external website/app address for a product (from settings.yaml or the product file). */
export function productExternalUrl(p: any): string | undefined {
  const fromSettings = p.externalUrlFromSettings ? settings.products?.[p.externalUrlFromSettings] : undefined;
  return filled(fromSettings) ?? filled(p.externalUrl);
}

/** Remove list items that still contain [[EDIT]] placeholders (so they never show on the live site). */
export function onlyFilled<T>(items: T[] | undefined, keys: string[]): T[] {
  return (items ?? []).filter((it: any) => keys.every((k) => isFilled(it?.[k])));
}

/** Contact location fields in the right language (Arabic falls back to English). */
export function place(lang: Lang) {
  const c = settings.contact ?? {};
  const pick = (k: string) => (lang === 'ar' ? filled(c[`${k}Ar`]) : undefined) ?? filled(c[k]);
  return { city: pick('city'), country: pick('country'), address: pick('address') };
}
