import { chromium } from 'playwright'
const BASE='https://ringga-dev.github.io/undangan'
const run=async()=>{
 let b=await chromium.launch({args:['--no-sandbox','--disable-dev-shm-usage','--disable-gpu','--single-process','--no-zygote']})
 let p=await b.newPage({viewport:{width:360,height:740}})
 await p.goto(`${BASE}/ringga-delvy/?to=any&yanto&cb=${Date.now()}`,{waitUntil:'networkidle',cache:'no-store'}).catch(()=>{})
 await p.waitForTimeout(1400)
 await p.evaluate(()=>{document.querySelectorAll('.deck-dot')[4].click()})
 await p.waitForTimeout(2500)
 await p.screenshot({path:'/tmp/cd-elegant-waktu.png'})
 console.log('shot elegant waktu (dot4)')
 await b.close()
}
run().catch(e=>{console.error('FATAL',e.message);process.exit(1)})
