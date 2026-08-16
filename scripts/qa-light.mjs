// Light QA: single page, switch style via switcher, verify component swaps.
import { chromium } from 'playwright'
const BASE = 'https://ringga-dev.github.io/undangan'
const styleCls = (p) => p.evaluate(() => document.querySelector('[class*="style-"]')?.className || 'NONE')
const readVar = (p) => p.evaluate(() => getComputedStyle(document.documentElement).getPropertyValue('--c-bg').trim())

const main = async () => {
  const browser = await chromium.launch({ args: ['--no-sandbox', '--disable-dev-shm-usage', '--disable-gpu'] })
  const page = await browser.newPage()
  const errors = []
  page.on('pageerror', (e) => errors.push('PAGEERROR: ' + e.message))
  page.on('console', (m) => { if (m.type()==='error' && !m.text().includes('404') && !m.text().includes('ERR_BLOCKED')) errors.push(m.text()) })

  await page.goto(`${BASE}/`, { waitUntil: 'load' })
  await page.waitForTimeout(1500)
  const buka = page.getByText('Buka Undangan', { exact: true })
  if (await buka.isVisible().catch(()=>false)) await buka.click().catch(()=>{})
  await page.waitForTimeout(700)
  console.log('START style:', await styleCls(page), await readVar(page))

  // open switcher
  await page.locator('.ts-toggle').click().catch(()=>{})
  await page.waitForTimeout(400)
  console.log('dots:', await page.locator('.ts-dot').count())

  // click modern row first dot (index 20) -> should swap to style-modern
  await page.locator('.ts-dot').nth(20).click().catch((e)=>console.log('click err', e.message))
  await page.waitForTimeout(800)
  console.log('AFTER MODERN style:', await styleCls(page), await readVar(page))

  // click elegant first dot (index 0)
  await page.locator('.ts-toggle').click().catch(()=>{})
  await page.waitForTimeout(400)
  await page.locator('.ts-dot').first().click().catch((e)=>console.log('click2 err', e.message))
  await page.waitForTimeout(800)
  console.log('AFTER ELEGANT style:', await styleCls(page), await readVar(page))

  console.log('ERRORS:', errors.length ? errors : 'none')
  await browser.close()
}
main().catch((e) => { console.error('FATAL', e); process.exit(1) })
