import { chromium } from 'playwright'
const BASE='https://ringga-dev.github.io/undangan'
const run=async()=>{
 let b=await chromium.launch({args:['--no-sandbox','--disable-dev-shm-usage','--disable-gpu','--single-process','--no-zygote']})
 let p=await b.newPage({viewport:{width:1280,height:800}})
 await p.goto(`${BASE}/ringga-delvy/?to=any&yanto&cb=${Date.now()}`,{waitUntil:'networkidle',cache:'no-store'}).catch(()=>{})
 await p.waitForTimeout(2000)
 const data=await p.evaluate(()=>{
   const slides=[...document.querySelectorAll('.deck-slide')]
   const vw=window.innerWidth
   const rects=slides.map(s=>{const r=s.getBoundingClientRect();return {left:Math.round(r.left),width:Math.round(r.width)}})
   // how many slides are within the current viewport horizontally?
   const visible=rects.filter(r=>r.left<vw && r.left+r.width>0).length
   return {vw, count:slides.length, visibleInViewport:visible, rects}
 })
 console.log(JSON.stringify(data,null,1))
 await b.close()
}
run().catch(e=>{console.error('FATAL',e.message);process.exit(1)})
