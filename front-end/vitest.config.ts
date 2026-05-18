import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['src/test-setup.ts'],
    include: ['src/**/*.spec.ts'],
    exclude: ['node_modules/**', 'dist/**'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      include: ['src/**/*.ts'],
      exclude: [
        'src/main.ts',
        'src/test-setup.ts',
        'src/environments/**',
        'src/**/*.spec.ts',
        'src/**/*.type.ts',
        'src/app/app.config.ts',
        'src/app/app.routes.ts',
        'src/app/app.ts',
        'src/app/shared/environment/**',
        'src/app/components/select-locale/constants.ts',
        'src/app/components/select-locale/models.ts',
        'src/app/components/select-locale/select-locale.ts',
        'src/app/pages/home/home.ts',
      ],
      thresholds: {
        lines: 85,
        functions: 85,
        branches: 85,
        statements: 85,
      },
    },
  },
  resolve: {
    mainFields: ['module'],
  },
});
