import { chromium } from 'playwright'
const BASE = 'https://ringga-dev.github.io/undangan'
const main = async () => {
  const browser = await chromium.launch({ args: ['--no-sandbox','--disable-dev-shm-usage','--disable-gpu','--single-process','--no-zygote'] })
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } })
  await page.goto(BASE, { waitUntil: 'networkidle' }).catch(() => {})
  await page.waitForTimeout(1500)
  await page.locator('button:has-text("Buka")').first().click({ timeout: 8000 }).catch(() => {})
  await page.waitForTimeout(2000)
  await page.screenshot({ path: '/tmp/elegant.png', fullPage: false })
  // dump the styles component HTML around canvas
  const dump = await page.evaluate(() => {
    const el = document.querySelector('.style-elegant')
    return el ? el.outerHTML.slice(0, 600) : 'NO STYLE'
  })
  console.log('DUMP:', dump)
  await browser.close()
}
main().catch(e => { console.error('FATAL', e); process.exit(1) })
