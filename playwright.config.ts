import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: 'tests',
  use: {
    baseURL: 'http://localhost:3000',
    headless: true,
    screenshot: 'on',
    video: 'on',
    trace: 'on',
  },
  webServer: {
    command: 'npx http-server . -p 3000 -c-1 --ext html',
    port: 3000,
    reuseExistingServer: true,
    timeout: 30_000,
  },
});
