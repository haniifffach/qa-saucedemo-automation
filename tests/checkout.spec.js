const { test, expect } = require('@playwright/test');

test.describe('Pengujian Alur Belanja (E2E) - SauceDemo', () => {

  test('User berhasil membeli produk dari login sampai checkout selesai', async ({ page }) => {
    // 1. Buka Halaman Login & Masuk
    await page.goto('https://www.saucedemo.com/');
    await page.locator('#user-name').fill('standard_user');
    await page.locator('#password').fill('secret_sauce');
    await page.locator('#login-button').click();

    // Validasi sudah berada di halaman katalog produk
    await expect(page.locator('.title')).toHaveText('Products');

    // 2. Tambah Produk ke Keranjang Belanja
    // Menggunakan data-test attribute (Best Practice di Playwright)
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();

    // Validasi badge keranjang menunjukkan angka 2
    const shoppingCartBadge = page.locator('.shopping_cart_badge');
    await expect(shoppingCartBadge).toHaveText('2');

    // 3. Masuk ke Halaman Keranjang Belanja
    await page.locator('.shopping_cart_link').click();
    await expect(page.locator('.title')).toHaveText('Your Cart');

    // Klik tombol Checkout
    await page.locator('[data-test="checkout"]').click();

    // 4. Isi Form Informasi Pengiriman (Checkout Step 1)
    await expect(page.locator('.title')).toHaveText('Checkout: Your Information');
    await page.locator('[data-test="firstName"]').fill('Hanif');
    await page.locator('[data-test="lastName"]').fill('Tester');
    await page.locator('[data-test="postalCode"]').fill('12345');
    await page.locator('[data-test="continue"]').click();

    // 5. Tinjauan Ringkasan Pesanan (Checkout Step 2)
    await expect(page.locator('.title')).toHaveText('Checkout: Overview');
    await page.locator('[data-test="finish"]').click();

    // 6. Validasi Transaksi Berhasil (Checkout Complete)
    await expect(page.locator('.title')).toHaveText('Checkout: Complete!');
    await expect(page.locator('.complete-header')).toHaveText('Thank you for your order!');
  });

});