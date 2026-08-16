// QA v4: correct panel handling. After color tweak panel stays open -> click style directly.
import { chromium } from 'playwright'
const BASE = 'https://ringga-dev.github.io/undangan'
const styleCls = (p) => p.evaluate(() => document.querySelector('[class*="style-"]')?.className || 'NONE')
const readVar = (p) => p.evaluate(() => getComputedStyle(document.documentElement).getPropertyValue('--c-bg').trim())
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
  await page.waitForTimeout(600)
  console.log('START   :', await styleCls(page), await readVar(page))

  // open panel once
  await page.locator('.ts-toggle').click().catch(()=>{}); await page.waitForTimeout(350)
  // modern (20)
  await page.locator('.ts-dot').nth(20).click().catch(e=>console.log('m',e.message)); await page.waitForTimeout(600)
  console.log('MODERN  :', await styleCls(page), await readVar(page))
  // panel closed after style change -> open again
  await page.locator('.ts-toggle').click().catch(()=>{}); await page.waitForTimeout(350)
  // minimal (10)
  await page.locator('.ts-dot').nth(10).click().catch(e=>console.log('min',e.message)); await page.waitForTimeout(600)
  console.log('MINIMAL :', await styleCls(page), await readVar(page))
  // panel closed -> open again
  await page.locator('.ts-toggle').click().catch(()=>{}); await page.waitForTimeout(350)
  // rustic (15)
  await page.locator('.ts-dot').nth(15).click().catch(e=>console.log('rus',e.message)); await page.waitForTimeout(600)
  console.log('RUSTIC  :', await styleCls(page), await readVar(page))
  // floral: couple switch test via ?to=budi-siti
  await page.goto(`${BASE}/?to=budi-siti`, { waitUntil: 'load' }); await page.waitForTimeout(1200)
  const buka2 = page.getByText('Buka Undangan', { exact: true })
  if (await buka2.isVisible().catch(()=>false)) await buka2.click().catch(()=>{})
  await page.waitForTimeout(500)
  console.log('BUDI(floral):', await styleCls(page), await readVar(page))
  console.log('ERRORS:', errors.length ? errors : 'none')
  await browser.close()
}
main().catch(e=>{console.error('FATAL',e);process.exit(1)})
