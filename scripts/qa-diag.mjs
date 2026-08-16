// Deep client-render diagnostic: load page, wait for hydration, capture ALL errors.
import { chromium } from 'playwright'

const BASE = 'https://ringga-dev.github.io/undangan'
const COUPLE = 'Ringga%20Septia%20Pribadi%20dan%20Delvy%20Lim'

const main = async () => {
  const browser = await chromium.launch()
  const page = await browser.newPage()
  const logs = []
  page.on('console', (m) => logs.push(`[${m.type()}] ${m.text()}`))
  page.on('pageerror', (e) => logs.push(`[PAGEERROR] ${e.message}\n${e.stack || ''}`))
  page.on('requestfailed', (r) => logs.push(`[REQFAIL] ${r.url()} ${r.failure()?.errorText}`))

  // Capture BEFORE any interaction
  await page.goto(`${BASE}/${COUPLE}/elegant`, { waitUntil: 'load' })
  await page.waitForTimeout(3000) // allow hydration

  const diag = await page.evaluate(() => {
    const html = document.documentElement
    return {
      hasNuxt: !!window.__NUXT__,
      rootChildren: document.getElementById('__nuxt')?.childElementCount ?? -1,
      tsToggle: !!document.querySelector('.ts-toggle'),
      openingScreen: !!document.querySelector('.opening-screen'),
      cBg: getComputedStyle(html).getPropertyValue('--c-bg').trim(),
      bodyClasses: document.body.className,
      vueMounted: !!(document.querySelector('#__nuxt') && document.querySelector('#__nuxt').__vue_app__),
    }
  })
  console.log('=== DIAGNOSTIC (after 3s) ===')
  console.log(JSON.stringify(diag, null, 2))
  console.log('=== CONSOLE LOGS ===')
  console.log(logs.join('\n') || '(none)')

  await browser.close()
}
main().catch((e) => { console.error('FATAL', e); process.exit(1) })
