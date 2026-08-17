import { chromium } from 'playwright'
const BASE='https://ringga-dev.github.io/undangan'
const shot=async(url,file)=>{
 const b=await chromium.launch({args:['--no-sandbox','--disable-dev-shm-usage','--disable-gpu','--single-process','--no-zygote']})
 const p=await b.newPage({viewport:{width:390,height:844}})
 await p.goto(url,{waitUntil:'networkidle'}).catch(()=>{})
 await p.waitForTimeout(1500)
 await p.locator('button:has-text("Buka")').first().click({timeout:8000}).catch(()=>{})
 await p.waitForTimeout(2500)
 await p.screenshot({path:file})
 const info=await p.evaluate(()=>({canvas:document.querySelectorAll('canvas').length,illu:document.querySelectorAll('img.illu').length}))
 await b.close(); return info
}
const main=async()=>{
 console.log('ELEGANT',JSON.stringify(await shot(BASE,'/tmp/v_elegant.png')))
 console.log('MODERN',JSON.stringify(await shot(BASE+'?to=demo-modern','/tmp/v_modern.png')))
}
main().catch(e=>{console.error('FATAL',e);process.exit(1)})
