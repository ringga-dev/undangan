import { chromium } from 'playwright'
const BASE = 'https://ringga-dev.github.io/undangan'
const main = async () => {
  const browser = await chromium.launch({ args: ['--no-sandbox','--disable-dev-shm-usage','--disable-gpu'] })
  const page = await browser.newPage()
  await page.goto(`${BASE}/?to=budi-siti`, { waitUntil: 'load' })
  await page.waitForTimeout(1500)
  const buka = page.getByText('Buka Undangan', { exact: true })
  if (await buka.isVisible().catch(()=>false)) await buka.click().catch(()=>{})
  await page.waitForTimeout(500)
  const info = await page.evaluate(() => {
    const cls = document.querySelector('[class*="style-"]')?.className || 'NONE'
    const h1 = document.querySelector('h1, .couple-name, [class*="bride"]')?.textContent?.slice(0,40) || '?'
    return { cls, h1, url: location.href, search: location.search }
  })
  console.log('BUDI info:', JSON.stringify(info))
  await browser.close()
}
main().catch(e=>{console.error('FATAL',e);process.exit(1)})
