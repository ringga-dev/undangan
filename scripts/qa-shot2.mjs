import { chromium } from 'playwright'
const BASE='https://ringga-dev.github.io/undangan'
const shot=async(url,file)=>{
 const b=await chromium.launch({args:['--no-sandbox','--disable-dev-shm-usage','--disable-gpu','--single-process','--no-zygote']})
 const p=await b.newPage({viewport:{width:390,height:844}})
 await p.goto(url,{waitUntil:'networkidle',cache:'no-store'}).catch(()=>{})
 await p.waitForTimeout(2000)
 await p.screenshot({path:file})
 await b.close()
}
const run=async()=>{
 await shot(BASE+'/','/tmp/shot_landing.png')
 await shot(`${BASE}/ringga-delvy/?to=any&yanto&cb=${Date.now()}`,'/tmp/shot_elegant.png')
 console.log('SHOTS DONE')
}
run().catch(e=>{console.error('FATAL',e.message);process.exit(1)})
