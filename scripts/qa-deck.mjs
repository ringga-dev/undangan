import { chromium } from 'playwright'
const BASE = 'https://ringga-dev.github.io/undangan'
const run = async () => {
  const b = await chromium.launch({ args: ['--no-sandbox', '--disable-dev-shm-usage', '--disable-gpu', '--single-process', '--no-zygote'] })
  const p = await b.newPage({ viewport: { width: 390, height: 844 } })
  const errs = []
  p.on('pageerror', e => errs.push(e.message))
  p.on('console', m => { if (m.type() === 'error') errs.push(m.text()) })
  await p.goto(BASE + '?to=ringga-delvy', { waitUntil: 'networkidle', cache: 'no-store' }).catch(() => {})
  await p.waitForTimeout(1500)
  await p.locator('button:has-text("Buka")').first().click({ timeout: 8000 }).catch(() => {})
  await p.waitForTimeout(2000)
  const vis = async () => p.evaluate(() => {
    const s = [...document.querySelectorAll('[data-slide]')]
    return s.map((el, i) => {
      const r = el.getBoundingClientRect()
      const h = el.querySelector('h2')
      return { i, id: el.id || (h ? h.textContent.slice(0, 18) : 'ucapan'), top: Math.round(r.top), active: el.classList.contains('is-active') ? 1 : 0 }
    })
  })
  console.log('SLIDES0', JSON.stringify(await vis()))
  for (let k = 0; k < 4; k++) { await p.locator('.deck-arrow').nth(1).click({ timeout: 5000 }).catch(() => {}); await p.waitForTimeout(900) }
  console.log('SLIDES4', JSON.stringify(await vis()))
  await b.close()
  console.log('ERRS', JSON.stringify(errs.slice(0, 4)))
}
run().catch(e => { console.error('FATAL', e.message); process.exit(1) })
