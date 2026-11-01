const { test, expect } = require('@playwright/test');

test.describe('Pengujian Fitur Produk & Sorting - SauceDemo', () => {

  test.beforeEach(async ({ page }) => {
    // Jalankan login otomatis sebelum setiap tes di file ini
    await page.goto('https://www.saucedemo.com/');
    await page.locator('#user-name').fill('standard_user');
    await page.locator('#password').fill('secret_sauce');
    await page.locator('#login-button').click();
  });

  test('Filter produk dari harga terendah ke tertinggi (Low to High)', async ({ page }) => {
    // Pilih opsi sorting 'Price (low to high)'
    await page.locator('[data-test="product-sort-container"]').selectOption('lohi');

    // Ambil semua elemen harga produk
    const priceElements = page.locator('.inventory_item_price');
    
    // Validasi harga pertama adalah $7.99 (produk termurah)
    await expect(priceElements.first()).toHaveText('$7.99');
  });

  test('Filter produk dari Z ke A (Name Z to A)', async ({ page }) => {
    // Pilih opsi sorting 'Name (Z to A)'
    await page.locator('[data-test="product-sort-container"]').selectOption('za');

    // Validasi produk pertama yang muncul diawali dengan huruf Z (Test.allTheThings() T-Shirt)
    const firstProductName = page.locator('.inventory_item_name').first();
    await expect(firstProductName).toContainText('Test.allTheThings()');
  });

});