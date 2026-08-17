import { chromium } from 'playwright'
const BASE = 'https://ringga-dev.github.io/undangan'
const main = async () => {
  const browser = await chromium.launch({ args: ['--no-sandbox','--disable-dev-shm-usage','--disable-gpu','--single-process','--no-zygote'] })
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } })
  await page.goto(BASE + '?to=demo-modern', { waitUntil: 'networkidle' }).catch(() => {})
  await page.waitForTimeout(1500)
  await page.locator('button:has-text("Buka")').first().click({ timeout: 8000 }).catch(() => {})
  await page.waitForTimeout(1500)
  const html = await page.evaluate(() => document.querySelector('.style-modern')?.innerHTML?.slice(0, 400))
  console.log('HTML_HEAD:', html)
  await browser.close()
}
main().catch(e => { console.error('FATAL', e); process.exit(1) })
