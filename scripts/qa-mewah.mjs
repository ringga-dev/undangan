import { chromium } from 'playwright'
const BASE = 'https://ringga-dev.github.io/undangan'
const styleCls = (p) => p.evaluate(() => document.querySelector('[class*="style-"]')?.className || 'NONE')

const openPanel = async (p) => {
  const t = p.locator('.ts-toggle')
  if (await t.isVisible().catch(() => false)) { await t.click().catch(() => {}); await p.waitForTimeout(300) }
}
const clickDot = async (p, idx) => {
  const dots = p.locator('.ts-dot')
  await dots.nth(idx).click()
  await p.waitForTimeout(900)
}

const main = async () => {
  const browser = await chromium.launch({ args: ['--no-sandbox','--disable-dev-shm-usage','--disable-gpu','--single-process','--no-zygote','--disable-extensions'], executableOptions: { timeout: 60000 } })
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } })
  const errors = []
  page.on('console', m => { if (m.type() === 'error') errors.push(m.text()) })
  page.on('pageerror', e => errors.push('PAGEERR: ' + e.message))

  await page.goto(BASE, { waitUntil: 'networkidle' }).catch(() => {})
  await page.waitForTimeout(1500)
  // open invitation: click the opening button (text "Buka Undangan")
  const buka = page.locator('.opening-screen button, button:has-text("Buka")').first()
  await buka.click({ timeout: 8000 }).catch(() => {})
  await page.waitForTimeout(800)
  const start = await styleCls(page)
  console.log('START:', start)

  // Modern (index 20)
  await openPanel(page); await clickDot(page, 20)
  const modern = await styleCls(page)
  const hasCanvas = await page.locator('canvas.bg3d').count()
  console.log('MODERN:', modern, '| canvas3d:', hasCanvas)

  // Floral (index 5)
  await openPanel(page); await clickDot(page, 5)
  const floral = await styleCls(page)
  const hasIllu = await page.locator('.style-floral img.illu').count()
  console.log('FLORAL:', floral, '| illu:', hasIllu)

  // Elegant (index 0)
  await openPanel(page); await clickDot(page, 0)
  const elegant = await styleCls(page)
  const hasGold = await page.locator('.style-elegant img.illu').count()
  console.log('ELEGANT:', elegant, '| illu:', hasGold)

  // Rustic (index 15)
  await openPanel(page); await clickDot(page, 15)
  const rustic = await styleCls(page)
  console.log('RUSTIC:', rustic)

  // Minimal (index 10)
  await openPanel(page); await clickDot(page, 10)
  const minimal = await styleCls(page)
  console.log('MINIMAL:', minimal)

  console.log('ERRORS:', errors.length ? errors.slice(0,5) : 'none')
  await browser.close()
}
main().catch(e => { console.error('FATAL', e); process.exit(1) })
