// Test OLD '&' URL (what user likely still has bookmarked) vs NEW 'dan' URL.
import { chromium } from 'playwright'
const BASE = 'https://ringga-dev.github.io/undangan'

const run = async (url, label) => {
  const browser = await chromium.launch()
  const page = await browser.newPage()
  const errs = []
  page.on('pageerror', (e) => errs.push('PAGEERROR: ' + e.message))
  page.on('console', (m) => { if (m.type() === 'error') errs.push('CONSOLE: ' + m.text()) })
  await page.goto(url, { waitUntil: 'load' })
  await page.waitForTimeout(2500)
  const d = await page.evaluate(() => ({
    url: location.href,
    tsToggle: !!document.querySelector('.ts-toggle'),
    opening: !!document.querySelector('.opening-screen'),
    styleClass: document.querySelector('[class*="style-"]')?.className || 'NONE',
    cBg: getComputedStyle(document.documentElement).getPropertyValue('--c-bg').trim(),
  }))
  console.log(`\n=== ${label} ===`)
  console.log('requested:', url)
  console.log('resolved :', d.url)
  console.log('tsToggle :', d.tsToggle, '| opening:', d.opening)
  console.log('styleCls :', d.styleClass)
  console.log('cBg      :', d.cBg)
  console.log('errors   :', errs.length ? errs : 'none')
  await browser.close()
}

const main = async () => {
  await run(`${BASE}/Ringga%20Septia%20Pribadi&Delvy%20Lim/elegant`, 'OLD & URL')
  await run(`${BASE}/Ringga%20Septia%20Pribadi%20dan%20Delvy%20Lim/modern`, 'NEW dan URL /modern')
}
main().catch((e) => { console.error('FATAL', e); process.exit(1) })
