import { chromium } from 'playwright'
const BASE='https://ringga-dev.github.io/undangan'
const run=async()=>{
 let b=await chromium.launch({args:['--no-sandbox','--disable-dev-shm-usage','--disable-gpu','--single-process','--no-zygote']})
 let p=await b.newPage({viewport:{width:360,height:740}})
 await p.goto(`${BASE}/ringga-delvy/?to=any&yanto&cb=${Date.now()}`,{waitUntil:'networkidle'}).catch(()=>{})
 await p.waitForTimeout(2200)
 const dom=await p.evaluate(()=>({btns:document.querySelectorAll('.deck-btn').length, page:document.querySelector('.deck-page')?.textContent?.trim()}))
 console.log('initial: '+JSON.stringify(dom))
 await p.screenshot({path:'/tmp/nav-new1.png'})
 await p.evaluate(()=>document.querySelector('.deck-btn[aria-label="Next"]')?.click())
 await p.waitForTimeout(900)
 await p.evaluate(()=>document.querySelector('.deck-btn[aria-label="Next"]')?.click())
 await p.waitForTimeout(900)
 const dom2=await p.evaluate(()=>({page:document.querySelector('.deck-page')?.textContent?.trim()}))
 console.log('after 2 Next: '+JSON.stringify(dom2))
 await p.screenshot({path:'/tmp/nav-new2.png'})
 await b.close()
}
run().catch(e=>{console.error('FATAL',e.message);process.exit(1)})
