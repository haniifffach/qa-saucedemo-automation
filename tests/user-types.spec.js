const { test, expect } = require('@playwright/test');

test.describe('Pengujian Jenis User Spesifik - SauceDemo', () => {

  test('Login gagal untuk locked_out_user', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.locator('#user-name').fill('locked_out_user');
    await page.locator('#password').fill('secret_sauce');
    await page.locator('#login-button').click();

    // Validasi pesan error user terkunci
    const errorMessage = page.locator('[data-test="error"]');
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toContainText('Sorry, this user has been locked out.');
  });

});