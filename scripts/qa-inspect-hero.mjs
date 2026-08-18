import { chromium } from 'playwright'
const BASE='https://ringga-dev.github.io/undangan'
const slug=process.argv[2]||'demo-modern'
const b=await chromium.launch()
const p=await b.newPage({viewport:{width:1280,height:800}})
await p.goto(BASE+'/'+slug+'?v='+Date.now(),{waitUntil:'networkidle'})
await p.waitForTimeout(2000)
const r=await p.evaluate(()=>{
  const hero=document.querySelector('.deck-slide.hero')
  const out={heroH:hero.scrollHeight, heroClient:hero.clientHeight}
  hero.querySelectorAll('*').forEach(e=>{const cs=getComputedStyle(e);const rect=e.getBoundingClientRect();if(rect.height>0)out[e.className||e.tagName]=Math.round(rect.height)+'/'+cs.height})
  return out
})
console.log(JSON.stringify(r,null,1))
await b.close()
