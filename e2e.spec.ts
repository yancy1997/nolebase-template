import { test, expect } from '@playwright/test';

test('homepage loads', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  // Accept either Nólëbase or the default title
  await expect(page).toHaveTitle(/Nólëbase|笔记|aichen/);
});

test('AI index page loads', async ({ page }) => {
  await page.goto('http://localhost:5173/AI/');
  await expect(page.locator('h1')).toContainText('AI');
});

test('笔记 index page loads', async ({ page }) => {
  await page.goto('http://localhost:5173/笔记/');
  await expect(page.locator('h1')).toContainText('笔记');
});

test('AI research page loads', async ({ page }) => {
  await page.goto('http://localhost:5173/AI/研究/');
  await expect(page.locator('h1')).toBeVisible();
});

test('笔记 tutorial page loads', async ({ page }) => {
  await page.goto('http://localhost:5173/笔记/教程/');
  await expect(page.locator('h1')).toBeVisible();
});