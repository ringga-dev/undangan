import { chromium } from 'playwright'
const BASE='https://ringga-dev.github.io/undangan'
const run=async()=>{
 let b=await chromium.launch({args:['--no-sandbox','--disable-dev-shm-usage','--disable-gpu','--single-process','--no-zygote']})
 // desktop
 let p=await b.newPage({viewport:{width:1280,height:800}})
 await p.goto(`${BASE}/ringga-delvy/?to=any&yanto&cb=${Date.now()}`,{waitUntil:'networkidle',cache:'no-store'}).catch(()=>{})
 await p.waitForTimeout(2000)
 const info=await p.evaluate(()=>{
   const slides=[...document.querySelectorAll('.deck-slide')]
   const first=slides[0].getBoundingClientRect()
   const second=slides[1]?slides[1].getBoundingClientRect():null
   return {
     slideW: Math.round(first.width), vw: window.innerWidth,
     firstLeft: Math.round(first.left), secondLeft: second?Math.round(second.left):null,
     sideBySide: second? (second.left < window.innerWidth-50) : false
   }
 })
 console.log('DESKTOP slideW='+info.slideW+' vw='+info.vw+' sideBySide='+info.sideBySide)
 // test NO auto-slide: wait 3s, idx should stay 0
 const t0=await p.evaluate(()=>document.querySelector('.deck-track')?.style.transform||'')
 await p.waitForTimeout(3000)
 const t3=await p.evaluate(()=>document.querySelector('.deck-track')?.style.transform||'')
 console.log('AUTO_SLIDE='+(t0!==t3 ? 'YES(bad)' : 'NO(good)'))
 await p.screenshot({path:'/tmp/qa-desktop.png'})
 await p.close()
 await b.close()
}
run().catch(e=>{console.error('FATAL',e.message);process.exit(1)})
