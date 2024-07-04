import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from "vite-plugin-pwa";

const manifestForPlugIn = {
  registerType: 'prompt',
  includeAssests: ['favicon.ico', "apple-touc-icon.png", "masked-icon.svg"],
  manifest: {
    name: "Quotes",
    short_name: "Quotes",
    description: "I am a simple vite app",
    "icons": [
      {
        "src": "/icon-192x192.png",
        "sizes": "192x192",
        "type": "image/png",
        purpose: 'favicon'
      },
      {
        "src": "/icon-256x256.png",
        "sizes": "256x256",
        "type": "image/png",
        purpose: 'favicon'
      },
      {
        "src": "/icon-384x384.png",
        "sizes": "384x384",
        "type": "image/png",
        purpose: 'favicon'
      },
      {
        "src": "/icon-512x512.png",
        "sizes": "512x512",
        "type": "image/png",
        purpose: 'favicon'
      },
      {
        src: '/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png',
        purpose: 'apple touch icon',
      },
      {
        "src": "/maskable.png",
        "sizes": "3200x3200",
        "type": "image/x-icon",
        purpose: 'any maskable',
      }
    ],
    theme_color: '#171717',
    background_color: '#f0e7db',
    display: "standalone",
    scope: '/',
    start_url: "/",
    orientation: 'portrait'
  }
}
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), VitePWA(manifestForPlugIn)],
})
