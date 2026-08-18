import { chromium } from 'playwright'
const BASE='https://ringga-dev.github.io/undangan'
const run=async()=>{
 let b=await chromium.launch({args:['--no-sandbox','--disable-dev-shm-usage','--disable-gpu','--single-process','--no-zygote']})
 // landing
 let p=await b.newPage({viewport:{width:390,height:844}})
 await p.goto(BASE+'/',{waitUntil:'networkidle',cache:'no-store'}).catch(()=>{})
 await p.waitForTimeout(1500)
 await p.screenshot({path:'/tmp/shot_landing.png'})
 // elegant detail hero
 p=await b.newPage({viewport:{width:390,height:844}})
 await p.goto(`${BASE}/ringga-delvy/?to=any&yanto&cb=${Date.now()}`,{waitUntil:'networkidle',cache:'no-store'}).catch(()=>{})
 await p.waitForTimeout(2000)
 await p.screenshot({path:'/tmp/shot_elegant.png'})
 await b.close()
 console.log('SHOTS DONE')
}
run().catch(e=>{console.error('FATAL',e.message);process.exit(1)})
