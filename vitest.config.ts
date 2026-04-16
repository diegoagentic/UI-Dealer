/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
    plugins: [react()],
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: ['./src/test-setup.ts'],
        include: ['src/**/*.test.{ts,tsx}'],
        coverage: {
            provider: 'v8',
            include: ['src/features/po-conversion/**'],
            exclude: ['**/*.test.*', '**/mockData.ts', '**/index.ts'],
            thresholds: {
                statements: 70,
                branches: 60,
                functions: 70,
                lines: 70,
            },
        },
    },
})
