import { test, expect } from '@playwright/test';

test('full site walkthrough', async ({ page }) => {
  // Home
  await page.goto('/index.html');
  await expect(page.locator('.services-grid a.service')).toHaveCount(3);
  await page.waitForTimeout(300); // allow initial render

  // Quote info -> live demo -> GitHub -> home
  await page.click('a[href="./quote"]');
  await expect(page.locator('h4', { hasText: 'F1 Random Quote Display' })).toBeVisible();
  await page.waitForTimeout(300);
  {
    const liveDemo = page.getByRole('link', { name: /live demo/i });
    await liveDemo.evaluate((el) => el.removeAttribute('target'));
    await Promise.all([
      page.waitForNavigation({ waitUntil: 'networkidle' }),
      liveDemo.click(),
    ]);
  }
  const quoteDemo = page.locator('#quotation .quote');
  await expect(quoteDemo).toBeVisible();
  const refresh = page.locator('#refresh');
  await refresh.evaluate((el) => (el as HTMLElement).click());
  await expect(quoteDemo).toBeVisible();
  await page.waitForTimeout(300);
  await page.goBack({ waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(300);
  {
    const githubLink = page.getByRole('link', { name: /github page/i });
    await githubLink.evaluate((el) => el.removeAttribute('target'));
    await Promise.all([
      page.waitForNavigation({ waitUntil: 'domcontentloaded' }),
      githubLink.click(),
    ]);
    await expect(page).toHaveURL(/github\.com\/Crucial-hash\/f1-random-quote-display/);
    await page.waitForTimeout(300);
    await page.goBack({ waitUntil: 'domcontentloaded' });
  }
  await page.click('.back-button');
  await expect(page).toHaveURL(/\/(index\.html?)?$/);
  await page.waitForTimeout(300);

  // Clock info -> live demo -> GitHub -> home
  await page.click('a[href="./clock"]');
  await expect(page.locator('h4', { hasText: 'Kindle Paperwhite Clock' })).toBeVisible();
  await page.waitForTimeout(300);
  {
    const liveDemo = page.getByRole('link', { name: /live demo/i });
    await liveDemo.evaluate((el) => el.removeAttribute('target'));
    await Promise.all([
      page.waitForNavigation({ waitUntil: 'networkidle' }),
      liveDemo.click(),
    ]);
  }
  await expect(page.locator('#hours')).toBeVisible();
  await expect(page.locator('#minutes')).toBeVisible();
  await page.waitForTimeout(300);
  await page.goBack({ waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(300);
  {
    const githubLink = page.getByRole('link', { name: /github page/i });
    await githubLink.evaluate((el) => el.removeAttribute('target'));
    await Promise.all([
      page.waitForNavigation({ waitUntil: 'domcontentloaded' }),
      githubLink.click(),
    ]);
    await expect(page).toHaveURL(/github\.com\/Crucial-hash\/kindle-paperwhite-clock/);
    await page.waitForTimeout(300);
    await page.goBack({ waitUntil: 'domcontentloaded' });
  }
  await page.click('.back-button');
  await expect(page).toHaveURL(/\/(index\.html?)?$/);
  await page.waitForTimeout(300);

  // Media info -> GitHub -> home
  await page.click('a[href="./media"]');
  await expect(page.locator('h4', { hasText: 'Local Media Display' })).toBeVisible();
  await page.waitForTimeout(300);
  {
    const githubLink = page.getByRole('link', { name: /github page/i });
    await githubLink.evaluate((el) => el.removeAttribute('target'));
    await Promise.all([
      page.waitForNavigation({ waitUntil: 'domcontentloaded' }),
      githubLink.click(),
    ]);
    await expect(page).toHaveURL(/github\.com\/Crucial-hash\/local-media-display/);
    await page.waitForTimeout(300);
    await page.goBack({ waitUntil: 'domcontentloaded' });
  }
  await page.click('.back-button');
  await expect(page).toHaveURL(/\/(index\.html?)?$/);
  await page.waitForTimeout(300);
});
