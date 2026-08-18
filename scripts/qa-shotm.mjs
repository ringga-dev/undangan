import { chromium } from 'playwright'
const BASE='https://ringga-dev.github.io/undangan'
const s=process.argv[2], out=process.argv[3]
const run=async()=>{
 let b=await chromium.launch({args:['--no-sandbox','--disable-dev-shm-usage','--disable-gpu','--single-process','--no-zygote']})
 let p=await b.newPage({viewport:{width:360,height:740}})
 await p.goto(`${BASE}/${s}/?to=any&yanto&cb=${Date.now()}`,{waitUntil:'networkidle',cache:'no-store'}).catch(()=>{})
 await p.waitForTimeout(1500)
 await p.screenshot({path:out})
 await b.close()
}
run().catch(e=>{console.error('FATAL',e.message);process.exit(1)})
