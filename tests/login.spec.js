const { test, expect } = require('@playwright/test');

test.describe('Pengujian Fitur Login - SauceDemo', () => {

  // Skenario 1: Login Berhasil dengan Kredensial Valid
  test('Login berhasil dengan username dan password valid', async ({ page }) => {
    // 1. Buka halaman utama SauceDemo
    await page.goto('https://www.saucedemo.com/');

    // 2. Isi username dan password
    await page.locator('#user-name').fill('standard_user');
    await page.locator('#password').fill('secret_sauce');

    // 3. Klik tombol login
    await page.locator('#login-button').click();

    // 4. Validasi (Assertion): Pastikan berhasil masuk ke halaman produk
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    await expect(page.locator('.title')).toHaveText('Products');
  });

  // Skenario 2: Login Gagal dengan Password Salah (Skenario Negatif)
  test('Login gagal jika password salah', async ({ page }) => {
    // 1. Buka halaman utama
    await page.goto('https://www.saucedemo.com/');

    // 2. Isi username valid tapi password salah
    await page.locator('#user-name').fill('standard_user');
    await page.locator('#password').fill('password_salah');

    // 3. Klik tombol login
    await page.locator('#login-button').click();

    // 4. Validasi (Assertion): Pastikan pesan error muncul
    const errorMessage = page.locator('[data-test="error"]');
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toContainText('Username and password do not match');
  });

});