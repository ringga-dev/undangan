// Final QA v2: robust, low-RAM friendly. Single page, ?to= couple switch, style, color.
import { chromium } from 'playwright'
const BASE = 'https://ringga-dev.github.io/undangan'

const readVar = (page) => page.evaluate(() => getComputedStyle(document.documentElement).getPropertyValue('--c-bg').trim())
const styleCls = (page) => page.evaluate(() => document.querySelector('[class*="style-"]')?.className || 'NONE')

const openPage = async (browser, url) => {
  const page = await browser.newPage()
  const errors = []
  page.on('pageerror', (e) => errors.push('PAGEERROR: ' + e.message))
  page.on('console', (m) => { if (m.type() === 'error' && !m.text().includes('404') && !m.text().includes('ERR_BLOCKED')) errors.push('CONSOLE: ' + m.text()) })
  await page.goto(url, { waitUntil: 'load' })
  await page.waitForTimeout(1500)
  // Buka Undangan (opening overlay)
  const buka = page.getByText('Buka Undangan', { exact: true })
  if (await buka.isVisible().catch(() => false)) await buka.click().catch(() => {})
  await page.waitForTimeout(600)
  return { page, errors }
}

const main = async () => {
  const browser = await chromium.launch({ args: ['--no-sandbox', '--disable-dev-shm-usage', '--disable-gpu'] })

  // 1. Default
  let { page, errors } = await openPage(browser, `${BASE}/`)
  console.log('DEFAULT  style:', await styleCls(page), '| cBg:', await readVar(page))

  // 2. Switch couple via ?to=demo-modern
  await page.close()
  ;({ page, errors } = await openPage(browser, `${BASE}/?to=demo-modern`))
  console.log('MODERN   style:', await styleCls(page), '| cBg:', await readVar(page))

  // 3. Change COLOR within modern (click a non-active dot in modern row)
  await page.locator('.ts-toggle').click().catch(()=>{})
  await page.waitForTimeout(400)
  const dots = page.locator('.ts-dot')
  const before = await readVar(page)
  await dots.nth(23).click().catch((e)=>console.log('color err', e.message)) // modern row, theme before last
  await page.waitForTimeout(500)
  console.log('COLOR    before:', before, '-> after:', await readVar(page))

  // 4. Change STYLE -> elegant (click first dot)
  await page.locator('.ts-toggle').click().catch(()=>{})
  await page.waitForTimeout(400)
  await page.locator('.ts-dot').first().click().catch((e)=>console.log('style err', e.message))
  await page.waitForTimeout(500)
  console.log('STYLE->ELEGANT style:', await styleCls(page), '| cBg:', await readVar(page))

  console.log('ERRORS:', errors.length ? errors : 'none')
  await browser.close()
}
main().catch((e) => { console.error('FATAL', e); process.exit(1) })
