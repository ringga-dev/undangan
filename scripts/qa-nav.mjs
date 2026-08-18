import { chromium } from 'playwright'
const BASE='https://ringga-dev.github.io/undangan'
const run=async()=>{
 let b=await chromium.launch({args:['--no-sandbox','--disable-dev-shm-usage','--disable-gpu','--single-process','--no-zygote']})
 let p=await b.newPage({viewport:{width:360,height:740}})
 await p.goto(`${BASE}/ringga-delvy/?to=any&yanto&cb=${Date.now()}`,{waitUntil:'networkidle',cache:'no-store'}).catch(()=>{})
 await p.waitForTimeout(1600)
 await p.screenshot({path:'/tmp/nav1.png'})
 // go next twice
 await p.evaluate(()=>document.querySelector('.deck-btn[aria-label="Next"]').click())
 await p.waitForTimeout(900)
 await p.evaluate(()=>document.querySelector('.deck-btn[aria-label="Next"]').click())
 await p.waitForTimeout(900)
 const page=await p.evaluate(()=>document.querySelector('.deck-page')?.textContent?.trim())
 await p.screenshot({path:'/tmp/nav2.png'})
 console.log('page after 2 next: '+page)
 await b.close()
}
run().catch(e=>{console.error('FATAL',e.message);process.exit(1)})
