import { chromium } from 'playwright'
const BASE = 'https://ringga-dev.github.io/undangan'
const main = async () => {
  const browser = await chromium.launch({ args: ['--no-sandbox','--disable-dev-shm-usage','--disable-gpu','--single-process','--no-zygote'] })
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } })
  await page.goto(BASE, { waitUntil: 'networkidle' }).catch(() => {})
  await page.waitForTimeout(2000)
  await page.locator('button:has-text("Buka")').first().click({ timeout: 8000 }).catch(() => {})
  await page.waitForTimeout(2000)
  const html = await page.evaluate(() => document.querySelector('.style-elegant')?.innerHTML || 'NULL')
  console.log('LEN', html.length)
  console.log('HAS_CANVAS', html.includes('canvas'))
  console.log('HAS_ILLU', html.includes('illu'))
  console.log('SNIPPET', html.slice(0, 300))
  await browser.close()
}
main().catch(e => { console.error('FATAL', e); process.exit(1) })
