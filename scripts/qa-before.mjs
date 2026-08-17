import { chromium } from 'playwright'
const BASE='https://ringga-dev.github.io/undangan'
const main=async()=>{
 const b=await chromium.launch({args:['--no-sandbox','--disable-dev-shm-usage','--disable-gpu','--single-process','--no-zygote']})
 const p=await b.newPage({viewport:{width:390,height:844}})
 await p.goto(BASE,{waitUntil:'networkidle'}).catch(()=>{})
 await p.waitForTimeout(2000)
 const before=await p.evaluate(()=>({canvas:document.querySelectorAll('canvas').length,hasDust:!!document.querySelector('.dust'),hasStage:!!document.querySelector('.stage'),cls:document.querySelector('[class*="style-"]')?.className}))
 console.log('BEFORE_CLICK',JSON.stringify(before))
 await p.locator('button:has-text("Buka")').first().click({timeout:8000}).catch(()=>{})
 await p.waitForTimeout(2000)
 const after=await p.evaluate(()=>({canvas:document.querySelectorAll('canvas').length,hasDust:!!document.querySelector('.dust'),hasStage:!!document.querySelector('.stage')}))
 console.log('AFTER_CLICK',JSON.stringify(after))
 await b.close()
}
main().catch(e=>{console.error('FATAL',e);process.exit(1)})
