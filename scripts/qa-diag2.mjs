import { chromium } from 'playwright'
const BASE = 'https://ringga-dev.github.io/undangan'
const styleCls = (p) => p.evaluate(() => document.querySelector('[class*="style-"]')?.className || 'NONE')
const main = async () => {
  const browser = await chromium.launch({ args: ['--no-sandbox','--disable-dev-shm-usage','--disable-gpu'] })
  const page = await browser.newPage()
  await page.goto(`${BASE}/`, { waitUntil: 'load' })
  await page.waitForTimeout(1500)
  const buka = page.getByText('Buka Undangan', { exact: true })
  if (await buka.isVisible().catch(()=>false)) await buka.click().catch(()=>{})
  await page.waitForTimeout(600)
  console.log('START:', await styleCls(page))
  // -> modern
  await page.locator('.ts-toggle').click().catch(e=>console.log('tog1',e.message)); await page.waitForTimeout(400)
  console.log('panel1 dots:', await page.locator('.ts-dot').count())
  await page.locator('.ts-dot').nth(20).click().catch(e=>console.log('mod err',e.message)); await page.waitForTimeout(700)
  console.log('MODERN:', await styleCls(page))
  // try open panel again
  await page.locator('.ts-toggle').click().catch(e=>console.log('tog2',e.message)); await page.waitForTimeout(400)
  const opening = await page.locator('.opening-screen').count()
  const toggleVisible = await page.locator('.ts-toggle').isVisible().catch(()=>false)
  const dots = await page.locator('.ts-dot').count()
  console.log('after modern -> opening:', opening, '| toggleVisible:', toggleVisible, '| dots:', dots)
  // what intercepts? click dot 0 and capture
  await page.locator('.ts-dot').nth(0).click({ timeout: 5000 }).catch(e=>console.log('eleg err:', e.message.split('\n')[0]))
  await page.waitForTimeout(500)
  console.log('ELEGANT:', await styleCls(page))
  await browser.close()
}
main().catch(e=>{console.error('FATAL',e);process.exit(1)})
