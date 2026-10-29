import { readFileSync } from 'node:fs'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Mêmes en-têtes de sécurité qu'en production (vercel.json) pour `npm run preview`
const vercel = JSON.parse(readFileSync(new URL('./vercel.json', import.meta.url), 'utf8'))
const securityHeaders = Object.fromEntries(vercel.headers[0].headers.map(({ key, value }) => [key, value]))

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  preview: {
    headers: securityHeaders,
  },
})
