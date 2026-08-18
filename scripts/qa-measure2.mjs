import { chromium } from 'playwright'
const BASE='https://ringga-dev.github.io/undangan'
const slug=process.argv[2], dot=+process.argv[3]
const run=async()=>{
 let b=await chromium.launch({args:['--no-sandbox','--disable-dev-shm-usage','--disable-gpu','--single-process','--no-zygote']})
 let p=await b.newPage({viewport:{width:360,height:740}})
 await p.goto(`${BASE}/${slug}/?to=any&yanto&cb=${Date.now()}`,{waitUntil:'networkidle',cache:'no-store'}).catch(()=>{})
 await p.waitForTimeout(1500)
 await p.evaluate((d)=>{document.querySelectorAll('.deck-dot')[d].click()}, dot)
 await p.waitForTimeout(4000)
 const info=await p.evaluate(()=>{
   const slide=document.querySelector('.deck-slide.is-active')
   const cd=slide?.querySelector('.countdown')
   if(!cd) return {found:false}
   const r=cd.getBoundingClientRect()
   const vh=window.innerHeight
   return {found:true, cdTop:Math.round(r.top), cdBottom:Math.round(r.bottom), vh, fullyVisible: r.top>=0 && r.bottom<=vh+1, trackX: Math.round(document.querySelector('.deck-track').getBoundingClientRect().x)}
 })
 console.log(slug+': '+JSON.stringify(info))
 await p.screenshot({path:`/tmp/m2-${slug}.png`})
 await b.close()
}
run().catch(e=>{console.error('FATAL',e.message);process.exit(1)})
