import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';

function injectPrecacheManifest() {
  return {
    name: 'inject-precache-manifest',
    apply: 'build',
    closeBundle() {
      let manifest;
      for (const p of ['dist/manifest.json', 'dist/.vite/manifest.json']) {
        try {
          manifest = JSON.parse(readFileSync(resolve(p), 'utf-8'));
          break;
        } catch {}
      }
      if (!manifest) return;

      const assetSet = new Set(['/', '/index.html']);
      for (const entry of Object.values(manifest)) {
        if (entry.file) assetSet.add(`/${entry.file}`);
        if (entry.css) entry.css.forEach((f) => assetSet.add(`/${f}`));
      }
      const assets = Array.from(assetSet);

      const swPath = resolve('dist/sw.js');
      const sw = readFileSync(swPath, 'utf-8');
      writeFileSync(
        swPath,
        sw.replace('"__PRECACHE_ASSETS__"', JSON.stringify(assets))
      );
    },
  };
}

export default defineConfig({
  plugins: [react(), injectPrecacheManifest()],
  build: {
    outDir: 'dist',
    manifest: true,
  },
});
