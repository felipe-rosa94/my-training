import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import {VitePWA} from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
    base: '/my-training/',
    plugins: [
        react(),
        VitePWA({
            registerType: 'autoUpdate',
            workbox: {
                clientsClaim: true,
                skipWaiting: true,
            },
            includeAssests: ['favicon.ico', 'apple-touch-icon.png'],
            manifest: {
                name: 'My training',
                short_name: 'My training',
                description: 'Aplicativo para registro de treino.',
                theme_color: '#ff1744',
                icons: [
                    {
                        src: '/my-training/icon-192x192.png',
                        sizes: '192x192',
                        type: 'image/png',
                    },
                    {
                        src: '/my-training/icon-512x512.png',
                        sizes: '512x512',
                        type: 'image/png',
                    }
                ]
            }
        })
    ],
})
