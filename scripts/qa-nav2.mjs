import { chromium } from 'playwright'
const BASE='https://ringga-dev.github.io/undangan'
const run=async()=>{
 let b=await chromium.launch({args:['--no-sandbox','--disable-dev-shm-usage','--disable-gpu','--single-process','--no-zygote']})
 let p=await b.newPage({viewport:{width:360,height:740}})
 await p.goto(`${BASE}/ringga-delvy/?to=any&yanto&cb=${Date.now()}`,{waitUntil:'networkidle',cache:'no-store'}).catch(()=>{})
 await p.waitForTimeout(1800)
 const dom=await p.evaluate(()=>{
   const nav=document.querySelector('.deck-nav')
   if(!nav) return {nav:false}
   return {nav:true, html: nav.outerHTML.slice(0,400), btns: document.querySelectorAll('.deck-btn').length, page: document.querySelector('.deck-page')?.textContent?.trim()}
 })
 console.log(JSON.stringify(dom))
 await p.screenshot({path:'/tmp/nav1.png'})
 await b.close()
}
run().catch(e=>{console.error('FATAL',e.message);process.exit(1)})
