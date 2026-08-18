import { chromium } from 'playwright'
const BASE='https://ringga-dev.github.io/undangan'
const run=async()=>{
 let b=await chromium.launch({args:['--no-sandbox','--disable-dev-shm-usage','--disable-gpu','--single-process','--no-zygote']})
 let p=await b.newPage({viewport:{width:390,height:844}})
 await p.goto(BASE+'/ringga-delvy/?to=any&yanto',{waitUntil:'networkidle',cache:'no-store'}).catch(()=>{})
 await p.waitForTimeout(3000)
 const r=await p.evaluate(()=>({dbg:document.documentElement.getAttribute('data-guestdbg'), guestTxt:document.querySelector('.guest')?.textContent}))
 console.log(JSON.stringify(r))
 await b.close()
}
run().catch(e=>{console.error('FATAL',e.message);process.exit(1)})
