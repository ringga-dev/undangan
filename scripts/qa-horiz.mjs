import { chromium } from 'playwright'
const BASE='https://ringga-dev.github.io/undangan'
const run=async()=>{
 let b=await chromium.launch({args:['--no-sandbox','--disable-dev-shm-usage','--disable-gpu','--single-process','--no-zygote']})
 let p=await b.newPage({viewport:{width:390,height:844}})
 let errs=[]; p.on('console',m=>{if(m.type()==='error')errs.push(m.text())}); p.on('pageerror',e=>errs.push('PE:'+e.message))
 await p.goto(`${BASE}/ringga-delvy/?to=any&yanto&cb=${Date.now()}`,{waitUntil:'networkidle',cache:'no-store'}).catch(()=>{})
 await p.waitForTimeout(2000)
 // nav horizontal: arrow left/right present + dots row
 const nav=await p.evaluate(()=>{
   const n=document.querySelector('.deck-nav')
   if(!n)return null
   const arrs=[...n.querySelectorAll('.deck-arrow')].map(a=>a.querySelector('i')?.className)
   const dots=n.querySelectorAll('.deck-dot').length
   const flex=getComputedStyle(n).flexDirection
   return {arrows:arrs, dots, flex}
 })
 // section count (deck-slide)
 const slides=await p.evaluate(()=>document.querySelectorAll('.deck-slide').length)
 // track transform -> next
 const t0=await p.evaluate(()=>document.querySelector('.deck-track')?.style.transform||'')
 await p.click('.deck-arrow:last-child').catch(()=>{})
 await p.waitForTimeout(900)
 const t1=await p.evaluate(()=>document.querySelector('.deck-track')?.style.transform||'')
 const guest=await p.evaluate(()=>document.querySelector('.guest')?.textContent||'')
 console.log('nav='+JSON.stringify(nav))
 console.log('slides='+slides+' guest="'+guest+'"')
 console.log('trackT0="'+t0+'" trackT1="'+t1+'"')
 console.log('consoleErrors='+errs.length)
 await b.close()
}
run().catch(e=>{console.error('FATAL',e.message);process.exit(1)})
