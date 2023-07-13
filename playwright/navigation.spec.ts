import { expect, test } from '@playwright/test';

test('nagivation test', async ({ page }) => {
  await page.goto('http://localhost:3000/shops');

  await page
    .getByRole('link', {
      name: 'vida Based in Vienna Shop avatar Hi, welcome to Vida. My name is Taylor and I make jewellery using polymer clay',
    })
    .click();
  await expect(page).toHaveURL('http://localhost:3000/login?returnTo=/shops/1');
});
