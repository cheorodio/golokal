import { expect, test } from '@playwright/test';

test('User login test', async ({ page }) => {
  await page.goto('http://localhost:3000/login');

  await page.getByLabel('Username *').fill('milo');
  await page.getByLabel('Password *').fill('woof123');

  await page.getByRole('button', { name: 'Log in' }).click();

  await expect(page).toHaveURL('http://localhost:3000/login');
});
