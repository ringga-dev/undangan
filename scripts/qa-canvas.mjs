import { chromium } from 'playwright'
const BASE = 'https://ringga-dev.github.io/undangan'
const main = async () => {
  const browser = await chromium.launch({ args: ['--no-sandbox','--disable-dev-shm-usage','--disable-gpu','--single-process','--no-zygote'] })
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } })
  await page.goto(BASE, { waitUntil: 'networkidle' }).catch(() => {})
  await page.waitForTimeout(1500)
  await page.locator('button:has-text("Buka")').first().click({ timeout: 8000 }).catch(() => {})
  await page.waitForTimeout(1000)
  // open panel, click modern (idx 20)
  await page.locator('.ts-toggle').click().catch(()=>{}); await page.waitForTimeout(300)
  await page.locator('.ts-dot').nth(20).click(); await page.waitForTimeout(1200)
  const info = await page.evaluate(() => {
    const c = document.querySelector('canvas.bg3d')
    const imgs = [...document.querySelectorAll('img')].map(i => i.getAttribute('src')).filter(s => s && s.includes('illu'))
    return { canvas: !!c, canvasW: c?.width, illuImgs: imgs, modernCanvas: document.querySelectorAll('canvas').length }
  })
  console.log('MODERN:', JSON.stringify(info))
  await browser.close()
}
main().catch(e => { console.error('FATAL', e); process.exit(1) })
