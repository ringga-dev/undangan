import { chromium } from 'playwright'
const BASE='https://ringga-dev.github.io/undangan'
const main=async()=>{
 const b=await chromium.launch({args:['--no-sandbox','--disable-dev-shm-usage','--disable-gpu','--single-process','--no-zygote']})
 const p=await b.newPage({viewport:{width:390,height:844}})
 const failed=[]
 p.on('requestfailed',r=>failed.push(r.url()+' :: '+r.failure()?.errorText))
 p.on('response',r=>{ if(r.status()>=400) failed.push(r.status()+' '+r.url()) })
 await p.goto(BASE+'?x='+Date.now(),{waitUntil:'networkidle',cache:'no-store'}).catch(()=>{})
 await p.waitForTimeout(2500)
 console.log('FAILED_REQ:',failed.slice(0,8))
 await b.close()
}
main().catch(e=>{console.error('FATAL',e);process.exit(1)})
