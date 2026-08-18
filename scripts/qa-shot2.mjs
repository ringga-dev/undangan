import { chromium } from 'playwright'
const BASE='https://ringga-dev.github.io/undangan'
const main=async()=>{
 const b=await chromium.launch({args:['--no-sandbox','--disable-dev-shm-usage','--disable-gpu','--single-process','--no-zygote']})
 const p=await b.newPage({viewport:{width:390,height:844}})
 await p.goto(BASE,{waitUntil:'networkidle',cache:'no-store'}).catch(()=>{})
 await p.waitForTimeout(3000)
 await p.screenshot({path:'/tmp/live.png'})
 const cls=await p.evaluate(()=>document.querySelector('[class*="style-"]')?.className||'NONE')
 console.log('CLS:',cls)
 await b.close()
}
main().catch(e=>{console.error('FATAL',e);process.exit(1)})
