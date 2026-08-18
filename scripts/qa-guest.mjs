import { chromium } from 'playwright'
const BASE='https://ringga-dev.github.io/undangan'
const run=async()=>{
 const b=await chromium.launch({args:['--no-sandbox','--disable-dev-shm-usage','--disable-gpu','--single-process','--no-zygote']})
 const p=await b.newPage({viewport:{width:390,height:844}})
 await p.goto(BASE+'/ringga-delvy/?to=any&yanto',{waitUntil:'networkidle',cache:'no-store'}).catch(()=>{})
 await p.waitForTimeout(3000)
 const r=await p.evaluate(()=>({
   search:window.location.search,
   guestLine:(document.querySelector('.guest-line')?document.querySelector('.guest-line').innerText:'NONE'),
   modalOpen:!!document.querySelector('.opening-screen')
 }))
 console.log('search=['+r.search+'] guestLine="'+r.guestLine+'" modalOpen='+r.modalOpen)
 // click Buka if present
 const buka=await p.$('.opening-screen button')
 if(buka){await buka.click().catch(()=>{});await p.waitForTimeout(1500)}
 const r2=await p.evaluate(()=>({guestLine:(document.querySelector('.guest-line')?document.querySelector('.guest-line').innerText:'NONE')}))
 console.log('afterBuka guestLine="'+r2.guestLine+'"')
 await b.close()
}
run().catch(e=>{console.error('FATAL',e.message);process.exit(1)})
