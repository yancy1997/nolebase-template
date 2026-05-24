import { chromium } from '@playwright/test'
import { mkdirSync } from 'node:fs'

const SHOT_DIR = '/tmp/nolebase-shots'
mkdirSync(SHOT_DIR, { recursive: true })

const pages = [
  { name: 'home', path: '/' },
  { name: 'notes', path: '/笔记/' },
  { name: 'article', path: '/笔记/教程/Codex CLI使用指南' },
]

async function shoot(ctxName: string, viewport: { width: number; height: number }, theme: 'light' | 'dark') {
  const browser = await chromium.launch()
  const ctx = await browser.newContext({
    viewport,
    colorScheme: theme,
    deviceScaleFactor: 2,
  })
  const page = await ctx.newPage()

  const errors: string[] = []
  page.on('pageerror', (e) => errors.push(`[pageerror] ${e.message}`))
  page.on('console', (msg) => {
    if (msg.type() === 'error') errors.push(`[console.error] ${msg.text()}`)
  })

  for (const p of pages) {
    const url = `http://localhost:5173${p.path}`
    try {
      await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 })
      await page.waitForTimeout(800)
      const file = `${SHOT_DIR}/${ctxName}-${theme}-${p.name}.png`
      await page.screenshot({ path: file, fullPage: false })
      console.log(`OK  ${ctxName} ${theme} ${p.name} -> ${file}`)
    } catch (e: any) {
      console.log(`ERR ${ctxName} ${theme} ${p.name}: ${e.message}`)
    }
  }

  if (errors.length) {
    console.log(`-- console errors in ${ctxName}/${theme} --`)
    for (const e of errors.slice(0, 10)) console.log(e)
  }

  await browser.close()
}

await shoot('desktop', { width: 1440, height: 900 }, 'light')
await shoot('desktop', { width: 1440, height: 900 }, 'dark')
await shoot('mobile', { width: 390, height: 844 }, 'light')
console.log('done')
