import { chromium } from 'playwright'
const BASE='https://ringga-dev.github.io/undangan'
const slug=process.argv[2]
const run=async()=>{
 let b=await chromium.launch({args:['--no-sandbox','--disable-dev-shm-usage','--disable-gpu','--single-process','--no-zygote']})
 let p=await b.newPage({viewport:{width:360,height:740}})
 await p.goto(`${BASE}/${slug}/?to=any&yanto&cb=${Date.now()}`,{waitUntil:'networkidle',cache:'no-store'}).catch(()=>{})
 await p.waitForTimeout(1400)
 await p.evaluate(()=>{document.querySelectorAll('.deck-dot')[3].click()})
 await p.waitForTimeout(2500)
 const info=await p.evaluate(()=>{
   const cd=document.querySelector('.deck-slide.is-active .countdown')||document.querySelector('.countdown')
   if(!cd) return {found:false}
   const cs=getComputedStyle(cd)
   const boxes=cd.querySelectorAll('.cd-box, b').length
   const rects=[...cd.children].map(c=>{const r=c.getBoundingClientRect();return {x:Math.round(r.x),y:Math.round(r.y),w:Math.round(r.width)}})
   return {found:true, display:cs.display, cols:cs.gridTemplateColumns, boxes, rects}
 })
 console.log(slug+': '+JSON.stringify(info))
 await p.screenshot({path:`/tmp/cd-${slug}.png`})
 await b.close()
}
run().catch(e=>{console.error('FATAL',e.message);process.exit(1)})
