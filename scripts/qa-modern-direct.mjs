import { chromium } from 'playwright'
const BASE = 'https://ringga-dev.github.io/undangan'
const main = async () => {
  const browser = await chromium.launch({ args: ['--no-sandbox','--disable-dev-shm-usage','--disable-gpu','--single-process','--no-zygote'] })
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } })
  const errs = []
  page.on('console', m => { if (m.type() === 'error') errs.push(m.text()) })
  page.on('pageerror', e => errs.push('PE:' + e.message))
  await page.goto(BASE + '?to=demo-modern', { waitUntil: 'networkidle' }).catch(() => {})
  await page.waitForTimeout(1500)
  await page.locator('button:has-text("Buka")').first().click({ timeout: 8000 }).catch(() => {})
  await page.waitForTimeout(1500)
  const info = await page.evaluate(() => ({
    canvas: !!document.querySelector('canvas.bg3d'),
    canvases: document.querySelectorAll('canvas').length,
    cls: document.querySelector('[class*="style-"]')?.className
  }))
  console.log('DEMO-MODERN:', JSON.stringify(info), 'ERR:', errs.slice(0, 4))
  await browser.close()
}
main().catch(e => { console.error('FATAL', e); process.exit(1) })
