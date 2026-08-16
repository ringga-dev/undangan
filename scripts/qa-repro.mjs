// Repro v2: open live, click "Buka Undangan", then test switcher (color + style).
import { chromium } from 'playwright'

const BASE = 'https://ringga-dev.github.io/undangan'
const COUPLE = 'Ringga%20Septia%20Pribadi%20dan%20Delvy%20Lim'

const readVar = async (page) =>
  page.evaluate(() => getComputedStyle(document.documentElement).getPropertyValue('--c-bg').trim())

const main = async () => {
  const browser = await chromium.launch()
  const page = await browser.newPage()
  const errors = []
  page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()) })
  page.on('pageerror', (e) => errors.push('PAGEERROR: ' + e.message))

  await page.goto(`${BASE}/${COUPLE}/elegant`, { waitUntil: 'networkidle' })
  await page.waitForTimeout(1200)

  const openingBefore = await page.locator('.opening-screen').count()
  console.log('opening-screen present before Buka:', openingBefore)

  // Click "Buka Undangan"
  const bukaBtn = page.getByText('Buka Undangan', { exact: true })
  console.log('Buka btn visible:', await bukaBtn.isVisible().catch(() => false))
  await bukaBtn.click().catch((e) => console.log('buka err:', e.message))
  await page.waitForTimeout(1000)

  const openingAfter = await page.locator('.opening-screen').count()
  console.log('opening-screen present AFTER Buka:', openingAfter)

  const before = await readVar(page)
  console.log('BEFORE --c-bg:', before)

  // Open switcher
  const toggle = page.locator('.ts-toggle')
  console.log('switcher toggle visible:', await toggle.isVisible().catch(() => false))
  await toggle.click().catch((e) => console.log('toggle err:', e.message))
  await page.waitForTimeout(400)
  const dots = await page.locator('.ts-dot').count()
  console.log('switcher dots count:', dots)

  // Recolor: click a DIFFERENT color dot in the SAME style row (first row = elegant)
  // click last dot of first row (5th dot) -> different color, same template
  const recolorDot = page.locator('.ts-dot').nth(4)
  await recolorDot.click().catch((e) => console.log('recolor err:', e.message))
  await page.waitForTimeout(600)
  const afterColor = await readVar(page)
  console.log('AFTER recolor --c-bg:', afterColor)

  // Change template: click a dot from 2nd style row (6th dot = floral)
  const styleDot = page.locator('.ts-dot').nth(5)
  const urlBefore = page.url()
  await styleDot.click().catch((e) => console.log('style err:', e.message))
  await page.waitForTimeout(1500)
  const urlAfter = page.url()
  const afterStyle = await readVar(page)
  console.log('URL before style:', urlBefore)
  console.log('URL after style :', urlAfter)
  console.log('AFTER style --c-bg:', afterStyle)

  console.log('CONSOLE ERRORS:', errors.length ? errors : 'none')
  await browser.close()
}

main().catch((e) => { console.error('FATAL', e); process.exit(1) })
