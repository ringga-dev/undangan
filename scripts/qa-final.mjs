// Final QA: single-page app, no route params. Test couple switch (?to=), style, color.
import { chromium } from 'playwright'
const BASE = 'http://localhost:3095/undangan'

const readVar = (page) => page.evaluate(() => getComputedStyle(document.documentElement).getPropertyValue('--c-bg').trim())
const styleCls = (page) => page.evaluate(() => document.querySelector('[class*="style-"]')?.className || 'NONE')

const main = async () => {
  const browser = await chromium.launch()
  const page = await browser.newPage()
  const errors = []
  page.on('pageerror', (e) => errors.push('PAGEERROR: ' + e.message))
  page.on('console', (m) => { if (m.type() === 'error' && !m.text().includes('404') && !m.text().includes('ERR_BLOCKED')) errors.push('CONSOLE: ' + m.text()) })

  // 1. Default page
  await page.goto(`${BASE}/`, { waitUntil: 'load' })
  await page.waitForTimeout(1500)
  await page.getByText('Buka Undangan', { exact: true }).click().catch(()=>{})
  await page.waitForTimeout(600)
  console.log('DEFAULT  style:', await styleCls(page), '| cBg:', await readVar(page))

  // 2. Switch couple via ?to=demo-modern
  await page.goto(`${BASE}/?to=demo-modern`, { waitUntil: 'load' })
  await page.waitForTimeout(1500)
  await page.getByText('Buka Undangan', { exact: true }).click().catch(()=>{})
  await page.waitForTimeout(600)
  console.log('MODERN  style:', await styleCls(page), '| cBg:', await readVar(page), '| cBgShouldBeCyan')

  // 3. Open switcher, change COLOR (recolor) on modern page
  await page.locator('.ts-toggle').click()
  await page.waitForTimeout(300)
  // click a different color dot in the modern row (6th style row). Just click any dot that's not active.
  const dots = page.locator('.ts-dot')
  const n = await dots.count()
  // click last dot of modern row (idx ~ 24)
  await dots.nth(24).click().catch((e)=>console.log('color err', e.message))
  await page.waitForTimeout(500)
  console.log('AFTER COLOR CHANGE cBg:', await readVar(page))

  // 4. Change STYLE via switcher (click elegant dot -> should swap component)
  await page.locator('.ts-toggle').click().catch(()=>{})
  await page.waitForTimeout(300)
  await page.locator('.ts-dot').first().click().catch((e)=>console.log('style err', e.message))
  await page.waitForTimeout(500)
  console.log('AFTER STYLE->ELEGANT style:', await styleCls(page), '| cBg:', await readVar(page))

  console.log('ERRORS:', errors.length ? errors : 'none')
  await browser.close()
}
main().catch((e) => { console.error('FATAL', e); process.exit(1) })
