import { test, expect } from '@playwright/test';

const services = [
  { name: 'Quote info', selector: 'a[href="./quote"]', heading: 'F1 Random Quote Display' },
  { name: 'Clock info', selector: 'a[href="./clock"]', heading: 'Kindle Paperwhite Clock' },
  { name: 'Media info', selector: 'a[href="./media"]', heading: 'Local Media Display' },
];

test.describe('Home page', () => {
  test('loads and lists all services', async ({ page }) => {
    await page.goto('/index.html');
    await expect(page.locator('.services-grid a.service')).toHaveCount(services.length);
  });

  for (const service of services) {
    test(`navigates to ${service.name}`, async ({ page }) => {
      await page.goto('/index.html');
      const [response] = await Promise.all([
        page.waitForNavigation({ waitUntil: 'networkidle' }),
        page.click(service.selector),
      ]);
      expect(response?.ok()).toBeTruthy();
      await expect(page.locator('h4', { hasText: service.heading })).toBeVisible();
    });
  }
});

test.describe('Quote info page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/quote');
  });

  test('back button returns home', async ({ page }) => {
    await page.click('.back-button');
    await expect(page).toHaveURL(/\/(index\.html?)?$/);
  });

  test('cta links are visible', async ({ page }) => {
    await expect(page.locator('.service2 .cta')).toHaveCount(2);
  });

  test('github link opens in new tab', async ({ page }) => {
    const href = await page.locator('.service2 .cta').first().getAttribute('href');
    expect(href).toBeTruthy();
    await page.goto(href!);
    await expect(page).toHaveURL(/github\.com\/Crucial-hash\/f1-random-quote-display/);
    await page.goBack();
    await expect(page.locator('h4', { hasText: 'F1 Random Quote Display' })).toBeVisible();
  });
});

test.describe('Clock info page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/clock');
  });

  test('back button returns home', async ({ page }) => {
    await page.click('.back-button');
    await expect(page).toHaveURL(/\/(index\.html?)?$/);
  });

  test('cta links are visible', async ({ page }) => {
    await expect(page.locator('.service2 .cta')).toHaveCount(2);
  });

  test('github link opens in new tab', async ({ page }) => {
    const href = await page.locator('.service2 .cta').first().getAttribute('href');
    expect(href).toBeTruthy();
    await page.goto(href!);
    await expect(page).toHaveURL(/github\.com\/Crucial-hash\/kindle-paperwhite-clock/);
    await page.goBack();
    await expect(page.locator('h4', { hasText: 'Kindle Paperwhite Clock' })).toBeVisible();
  });
});

test.describe('Media info page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/media');
  });

  test('back button returns home', async ({ page }) => {
    await page.click('.back-button');
    await expect(page).toHaveURL(/\/(index\.html?)?$/);
  });

  test('github link is visible', async ({ page }) => {
    await expect(page.locator('.service2 .cta')).toHaveCount(1);
  });

  test('github link opens in new tab', async ({ page }) => {
    const href = await page.locator('.service2 .cta').first().getAttribute('href');
    expect(href).toBeTruthy();
    await page.goto(href!);
    await expect(page).toHaveURL(/github\.com\/Crucial-hash\/local-media-display/);
    await page.goBack();
    await expect(page.locator('h4', { hasText: 'Local Media Display' })).toBeVisible();
  });
});

test.describe('Random quote demo', () => {
  test('refresh button is clickable and quote is visible', async ({ page }) => {
    await page.goto('/f1-random-quote-display/');
    const quote = page.locator('#quotation .quote');
    await expect(quote).toBeVisible();

    const refresh = page.locator('#refresh');
    await refresh.evaluate((el) => (el as HTMLElement).click());
    await expect(quote).toBeVisible();
    const text = (await quote.textContent())?.trim() ?? '';
    expect(text.length).toBeGreaterThan(0);
  });
});

test.describe('Clock demo', () => {
  test('loads clock elements', async ({ page }) => {
    await page.goto('/kindle-paperwhite-clock/');
    await expect(page.locator('#hours')).toBeVisible();
    await expect(page.locator('#minutes')).toBeVisible();
    await expect(page.locator('#prayerbutton')).toBeVisible();
  });
});
