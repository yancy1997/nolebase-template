import { expect, test } from '@playwright/test'

const baseURL = process.env.BLOG_URL || 'http://127.0.0.1:4174'

test('核心页面可以访问', async ({ page }) => {
  for (const path of ['/', '/articles', '/topics', '/about']) {
    const response = await page.goto(`${baseURL}${path}`)
    expect(response?.ok(), `${path} should load`).toBeTruthy()
    await expect(page.locator('h1')).toBeVisible()
  }
})
test('文章筛选和搜索可用', async ({ page }) => {
  await page.goto(`${baseURL}/articles`)
  await expect(page.locator('.article-card')).toHaveCount(13)

  await page.getByRole('button', { name: 'Agent 工程', exact: true }).click()
  await expect(page.locator('.article-card')).toHaveCount(4)

  await page.getByRole('searchbox', { name: '搜索文章' }).fill('MCP')
  await expect(page.locator('.article-card')).toHaveCount(1)
  await expect(page.locator('.article-card h2')).toHaveText('MCP与Agent生产集成')
})

test('sitemap 中的全部页面都返回成功', async ({ request }) => {
  const sitemapResponse = await request.get(`${baseURL}/sitemap.xml`)
  expect(sitemapResponse.ok()).toBeTruthy()

  const sitemap = await sitemapResponse.text()
  const paths = [...sitemap.matchAll(/<loc>https?:\/\/[^/]+([^<]*)<\/loc>/g)]
    .map(match => match[1] || '/')

  expect(paths.length).toBeGreaterThan(10)
  for (const path of paths) {
    const response = await request.get(`${baseURL}${path}`)
    expect(response.ok(), `${path} should load`).toBeTruthy()
  }
})
