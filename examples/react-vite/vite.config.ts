import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { nodePolyfills } from 'vite-plugin-node-polyfills';

export default defineConfig({
  // some Elements dependencies expect Node.js globals and built-ins (process, Buffer, url, ...)
  plugins: [react(), nodePolyfills()],
  server: { port: 4200, strictPort: true },
  preview: { host: true, port: 4200, strictPort: true },
});
