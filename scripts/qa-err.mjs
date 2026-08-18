import { chromium } from 'playwright'
const BASE='https://ringga-dev.github.io/undangan'
const main=async()=>{
 const b=await chromium.launch({args:['--no-sandbox','--disable-dev-shm-usage','--disable-gpu','--single-process','--no-zygote']})
 const p=await b.newPage({viewport:{width:390,height:844}})
 const errs=[]; p.on('console',m=>{if(m.type()==='error')errs.push(m.text())}); p.on('pageerror',e=>errs.push('PE:'+e.message))
 await p.goto(BASE+'?x='+Date.now(),{waitUntil:'networkidle',cache:'no-store'}).catch(()=>{})
 await p.waitForTimeout(2500)
 console.log('ERRS:',errs.slice(0,4))
 await b.close()
}
main().catch(e=>{console.error('FATAL',e);process.exit(1)})
