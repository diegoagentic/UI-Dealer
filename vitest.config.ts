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
            // FE-16 scope: "Component + Hook Tests". Exclude wiring, type
            // declarations, mock-stub hooks (will be replaced by real GraphQL
            // when GW-01/02/03 land), and full page surfaces (integration
            // territory — covered separately by E2E once routes are stable).
            exclude: [
                '**/*.test.*',
                '**/mockData.ts',
                '**/index.ts',
                '**/types.ts',
                '**/routes.tsx',
                '**/skeletons.tsx',
                '**/hooks.ts',
                '**/ConversionReviewPage.tsx',
                '**/PODraftsListPage.tsx',
            ],
            thresholds: {
                statements: 70,
                branches: 60,
                functions: 70,
                lines: 70,
            },
        },
    },
})
