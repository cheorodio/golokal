import { expect, test } from '@playwright/test';

test('User registration test', async ({ page }) => {
  await page.goto('http://localhost:3000/register');
});
