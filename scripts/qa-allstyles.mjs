import { chromium } from 'playwright'
const BASE='https://ringga-dev.github.io/undangan'
const slugs=['ringga-delvy','budi-siti','demo-minimal','demo-rustic','demo-modern']
const run=async()=>{
 const errAll=[]
 let b=await chromium.launch({args:['--no-sandbox','--disable-dev-shm-usage','--disable-gpu','--single-process','--no-zygote']})
 for(const s of slugs){
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
  const dir=t1.includes('translate(-100')?'HORIZONTAL':'?'
  console.log(`${s}: slides=${slides} nav(flex=${nav.flex},dots=${nav.dots}) guest="${guest}" move=${dir} ERR=${errs.length}`)
  errAll.push(...errs.map(e=>s+':'+e))
  await p.close()
 }
 await b.close()
 console.log('TOTAL_ERRORS='+errAll.length)
 if(errAll.length)console.log(errAll.slice(0,5).join('\n'))
}
run().catch(e=>{console.error('FATAL',e.message);process.exit(1)})
