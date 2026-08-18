import { chromium } from 'playwright'
const BASE='https://ringga-dev.github.io/undangan'
const s=process.argv[2]
const run=async()=>{
 let b=await chromium.launch({args:['--no-sandbox','--disable-dev-shm-usage','--disable-gpu','--single-process','--no-zygote']})
 const p=await b.newPage({viewport:{width:390,height:844}})
 const errs=[]; p.on('console',m=>{if(m.type()==='error')errs.push(m.text())}); p.on('pageerror',e=>errs.push('PE:'+e.message))
 await p.goto(`${BASE}/${s}/?to=any&yanto&cb=${Date.now()}`,{waitUntil:'networkidle',cache:'no-store'}).catch(()=>{})
 await p.waitForTimeout(1800)
 const nav=await p.evaluate(()=>({flex:getComputedStyle(document.querySelector('.deck-nav')).flexDirection, dots:document.querySelectorAll('.deck-dot').length}))
 const slides=await p.evaluate(()=>document.querySelectorAll('.deck-slide').length)
 const t0=await p.evaluate(()=>document.querySelector('.deck-track')?.style.transform||'')
 await p.click('.deck-arrow:last-child').catch(()=>{})
 await p.waitForTimeout(800)
 const t1=await p.evaluate(()=>document.querySelector('.deck-track')?.style.transform||'')
 const guest=await p.evaluate(()=>document.querySelector('.guest')?.textContent||'')
 console.log(`${s}: slides=${slides} nav(flex=${nav.flex},dots=${nav.dots}) guest="${guest}" move=${t1.includes('translate(-100')?'HORIZONTAL':'?'} ERR=${errs.length}`)
 await b.close()
}
run().catch(e=>{console.error('FATAL',e.message);process.exit(1)})
