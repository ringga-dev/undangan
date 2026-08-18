import { chromium } from 'playwright'
const BASE='https://ringga-dev.github.io/undangan'
const main=async()=>{
 const b=await chromium.launch({args:['--no-sandbox','--disable-dev-shm-usage','--disable-gpu','--single-process','--no-zygote']})
 const p=await b.newPage({viewport:{width:390,height:844}})
 p.on('console',m=>{if(m.type()==='error')console.log('ERR_FULL:',m.text())})
 p.on('pageerror',e=>console.log('PAGEERR:',e.message))
 await p.goto(BASE+'?to=budi-siti',{waitUntil:'networkidle',cache:'no-store'}).catch(()=>{})
 await p.waitForTimeout(3000)
 await b.close()
}
main().catch(e=>{console.error('FATAL',e.message);process.exit(1)})
