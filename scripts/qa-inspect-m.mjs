import { chromium } from 'playwright'
const BASE='https://ringga-dev.github.io/undangan'
const slug=process.argv[2]||'demo-modern'
const b=await chromium.launch()
const p=await b.newPage({viewport:{width:360,height:740}})
await p.goto(BASE+'/'+slug+'?v='+Date.now(),{waitUntil:'networkidle'})
await p.waitForTimeout(2000)
const r=await p.evaluate(()=>{
  const hero=document.querySelector('.deck-slide.hero')
  const out={heroScroll:hero.scrollHeight, heroClient:hero.clientHeight, cs:getComputedStyle(hero).height}
  hero.querySelectorAll('*').forEach(e=>{const rect=e.getBoundingClientRect();const cs=getComputedStyle(e);if(rect.height>0)out[(e.className||e.tagName)+'']={h:Math.round(rect.height),cssH:cs.height,mt:cs.marginTop,pt:cs.paddingTop}})
  return out
})
console.log(JSON.stringify(r,null,1))
await b.close()
