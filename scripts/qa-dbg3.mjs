import { chromium } from 'playwright'
const BASE='https://ringga-dev.github.io/undangan'
const run=async()=>{
 let b=await chromium.launch({args:['--no-sandbox','--disable-dev-shm-usage','--disable-gpu','--single-process','--no-zygote']})
 let p=await b.newPage({viewport:{width:390,height:844}})
 await p.goto(BASE+'/ringga-delvy/?to=any&yanto',{waitUntil:'networkidle',cache:'no-store'}).catch(()=>{})
 await p.waitForTimeout(3000)
 const r=await p.evaluate(()=>({
   anyGuest: !!document.querySelector('.guest'),
   guestHTML: document.querySelector('.guest')?document.querySelector('.guest').outerHTML.slice(0,80):'NONE',
   dataGuest: document.documentElement.getAttribute('data-guest'),
   search: window.location.search
 }))
 console.log(JSON.stringify(r))
 await b.close()
}
run().catch(e=>{console.error('FATAL',e.message);process.exit(1)})
