const { test, expect } = require('@playwright/test');

test.describe('Pengujian Validasi Form Checkout - SauceDemo', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.locator('#user-name').fill('standard_user');
    await page.locator('#password').fill('secret_sauce');
    await page.locator('#login-button').click();
    
    // Masuk ke keranjang & lanjut ke checkout
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('.shopping_cart_link').click();
    await page.locator('[data-test="checkout"]').click();
  });

  test('Checkout gagal jika First Name kosong', async ({ page }) => {
    // Langsung klik Continue tanpa isi form
    await page.locator('[data-test="continue"]').click();

    // Validasi pesan error
    const errorMessage = page.locator('[data-test="error"]');
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toContainText('Error: First Name is required');
  });

  test('Checkout gagal jika Postal Code kosong', async ({ page }) => {
    await page.locator('[data-test="firstName"]').fill('Hanif');
    await page.locator('[data-test="lastName"]').fill('Tester');
    await page.locator('[data-test="continue"]').click();

    // Validasi pesan error
    const errorMessage = page.locator('[data-test="error"]');
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toContainText('Error: Postal Code is required');
  });

});