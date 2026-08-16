// Repro v3: open live, Buka, recolor (panel stays open), then change STYLE.
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
  await page.getByText('Buka Undangan', { exact: true }).click().catch((e) => console.log('buka err:', e.message))
  await page.waitForTimeout(800)

  const before = await readVar(page)
  console.log('BEFORE --c-bg:', before, '| URL:', page.url())

  // open switcher
  await page.locator('.ts-toggle').click()
  await page.waitForTimeout(300)
  // click style dot #6 (floral first color) -> should navigate to /floral
  const styleDot = page.locator('.ts-dot').nth(5)
  console.log('style dot visible:', await styleDot.isVisible().catch(() => false))
  const urlBefore = page.url()
  await styleDot.click().catch((e) => console.log('style click err:', e.message))
  await page.waitForTimeout(1800)
  const urlAfter = page.url()
  const afterStyle = await readVar(page)
  console.log('URL before style:', urlBefore)
  console.log('URL after style :', urlAfter)
  console.log('AFTER style --c-bg:', afterStyle)
  console.log('STYLE CHANGED:', urlAfter.includes('/floral') ? 'YES' : 'NO')

  console.log('CONSOLE ERRORS:', errors.length ? errors : 'none')
  await browser.close()
}

main().catch((e) => { console.error('FATAL', e); process.exit(1) })
