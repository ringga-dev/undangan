import { chromium } from 'playwright'
const BASE='https://ringga-dev.github.io/undangan'
const run=async()=>{
 let b=await chromium.launch({args:['--no-sandbox','--disable-dev-shm-usage','--disable-gpu','--single-process','--no-zygote']})
 let p=await b.newPage({viewport:{width:1280,height:800}})
 await p.goto(`${BASE}/ringga-delvy/?to=any&yanto&cb=${Date.now()}`,{waitUntil:'networkidle',cache:'no-store'}).catch(()=>{})
 await p.waitForTimeout(2000)
 const data=await p.evaluate(()=>{
   const slides=[...document.querySelectorAll('.deck-slide')]
   const s1=slides[1]
   const cs=getComputedStyle(s1)
   return {
     slide1classes:s1.className,
     width:cs.width, flexBasis:cs.flexBasis, flexGrow:cs.flexGrow, flexShrink:cs.flexShrink,
     maxWidth:cs.maxWidth, display:cs.display,
     hasDeckCss: !!document.querySelector('style') // rough
   }
 })
 console.log(JSON.stringify(data,null,1))
 await b.close()
}
run().catch(e=>{console.error('FATAL',e.message);process.exit(1)})
