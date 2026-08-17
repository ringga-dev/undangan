import { chromium } from 'playwright'
const BASE='https://ringga-dev.github.io/undangan'
const main=async()=>{
 const b=await chromium.launch({args:['--no-sandbox','--disable-dev-shm-usage','--disable-gpu','--single-process','--no-zygote']})
 const p=await b.newPage({viewport:{width:390,height:844}})
 await p.goto(BASE+'?x='+Date.now(),{waitUntil:'networkidle',cache:'no-store'}).catch(()=>{})
 await p.waitForTimeout(1800)
 await p.locator('button:has-text("Buka")').first().click({timeout:8000}).catch(()=>{})
 await p.waitForTimeout(2000)
 const info=await p.evaluate(()=>{
   const el=document.querySelector('[class*="style-"]')
   return {cls:el?.className, childTags:[...el.children].slice(0,4).map(c=>c.tagName+'.'+(c.className||'').toString().slice(0,30))}
 })
 console.log(JSON.stringify(info,null,1))
 await b.close()
}
main().catch(e=>{console.error('FATAL',e);process.exit(1)})
