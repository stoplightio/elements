import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  resolve: {
    // `@stoplight/elements` and friends resolve to their sources, see `paths` in the root tsconfig.json
    tsconfigPaths: true,
  },
  define: {
    // some dependencies expect the Node.js globals that webpack used to provide, see ../process-shim.js
    global: 'globalThis',
  },
  server: {
    port: 4025,
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    chunkSizeWarningLimit: 4000,
  },
});
