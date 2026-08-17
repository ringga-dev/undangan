import { chromium } from 'playwright'
const BASE = 'https://ringga-dev.github.io/undangan'
const main = async () => {
  const browser = await chromium.launch({ args: ['--no-sandbox','--disable-dev-shm-usage','--disable-gpu','--single-process','--no-zygote'] })
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } })
  const errs = []
  page.on('console', m => { if (m.type()==='error'||m.type()==='warning') errs.push(m.type()+':'+m.text()) })
  page.on('pageerror', e => errs.push('PE:'+e.message))
  await page.goto(BASE, { waitUntil: 'networkidle' }).catch(() => {})
  await page.waitForTimeout(1500)
  await page.locator('button:has-text("Buka")').first().click({ timeout: 8000 }).catch(() => {})
  await page.waitForTimeout(1500)
  const info = await page.evaluate(() => ({
    canvases: document.querySelectorAll('canvas').length,
    illu: document.querySelectorAll('img.illu').length,
    illuSrc: [...document.querySelectorAll('img.illu')].map(i=>i.getAttribute('src')),
    cls: document.querySelector('[class*="style-"]')?.className
  }))
  console.log('ELEGANT:', JSON.stringify(info))
  console.log('CONSOLE:', errs.slice(0,8))
  await browser.close()
}
main().catch(e => { console.error('FATAL', e); process.exit(1) })
