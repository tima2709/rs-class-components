/// <reference types="vitest" />
/// <reference types="vite/client" />
import { defineConfig } from 'vite';

// https://vitejs.dev/config
export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts', // Убедитесь, что путь правильный
    coverage: {
      provider: 'istanbul',
      reporter: ['text', 'html'],
      reportsDirectory: './coverage', // Укажите, куда сохранять отчеты
    },
  },
});
