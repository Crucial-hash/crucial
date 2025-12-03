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
  projects: [
    {
      name: 'desktop-16-9',
      use: { viewport: { width: 1920, height: 1057 } }, // 1080p minus typical browser chrome
    },
    {
      name: 'mobile-narrow',
      use: { viewport: { width: 390, height: 844 } }, // common phone size to trigger column layout
    },
  ],
  webServer: {
    command: 'npx http-server . -p 3000 -c-1 --ext html',
    port: 3000,
    reuseExistingServer: true,
    timeout: 30_000,
  },
});
