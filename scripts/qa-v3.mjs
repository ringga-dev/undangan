// QA v3: verify style swap both directions + color, with panel re-open each step.
import { chromium } from 'playwright'
const BASE = 'https://ringga-dev.github.io/undangan'
const styleCls = (p) => p.evaluate(() => document.querySelector('[class*="style-"]')?.className || 'NONE')
const readVar = (p) => p.evaluate(() => getComputedStyle(document.documentElement).getPropertyValue('--c-bg').trim())

const openPanel = async (page) => {
  await page.locator('.ts-toggle').click().catch(()=>{})
  await page.waitForTimeout(350)
}
const clickDot = async (page, i) => {
  await page.locator('.ts-dot').nth(i).click().catch((e)=>console.log(`dot ${i} err`, e.message))
  await page.waitForTimeout(700)
}

const main = async () => {
  const browser = await chromium.launch({ args: ['--no-sandbox','--disable-dev-shm-usage','--disable-gpu'] })
  const page = await browser.newPage()
  const errors = []
  page.on('pageerror', (e) => errors.push('PAGEERROR: ' + e.message))
  page.on('console', (m) => { if (m.type()==='error' && !m.text().includes('404') && !m.text().includes('ERR_BLOCKED')) errors.push(m.text()) })

  await page.goto(`${BASE}/`, { waitUntil: 'load' })
  await page.waitForTimeout(1500)
  const buka = page.getByText('Buka Undangan', { exact: true })
  if (await buka.isVisible().catch(()=>false)) await buka.click().catch(()=>{})
  await page.waitForTimeout(700)
  console.log('START   :', await styleCls(page), await readVar(page))

  // -> modern (dot 20)
  await openPanel(page); await clickDot(page, 20)
  console.log('->MODERN :', await styleCls(page), await readVar(page))

  // -> elegant (dot 0)
  await openPanel(page); await clickDot(page, 0)
  console.log('->ELEGANT:', await styleCls(page), await readVar(page))

  // color change on elegant: click dot 2 (gold)
  await openPanel(page); await clickDot(page, 2)
  console.log('COLOR   :', await styleCls(page), await readVar(page))

  // -> minimal (dot 10)
  await openPanel(page); await clickDot(page, 10)
  console.log('->MINIMAL:', await styleCls(page), await readVar(page))

  console.log('ERRORS:', errors.length ? errors : 'none')
  await browser.close()
}
main().catch((e) => { console.error('FATAL', e); process.exit(1) })
