const { test, expect } = require('@playwright/test');

test.describe('Pengujian Fitur Keranjang - SauceDemo', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.locator('#user-name').fill('standard_user');
    await page.locator('#password').fill('secret_sauce');
    await page.locator('#login-button').click();
  });

  test('User dapat menghapus produk dari keranjang di halaman utama', async ({ page }) => {
    // Tambahkan produk
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await expect(page.locator('.shopping_cart_badge')).toHaveText('1');

    // Hapus produk
    await page.locator('[data-test="remove-sauce-labs-backpack"]').click();

    // Validasi badge keranjang hilang/kosong
    await expect(page.locator('.shopping_cart_badge')).not.toBeVisible();
  });

});