import { chromium } from 'playwright'
const BASE='https://ringga-dev.github.io/undangan'
const main=async()=>{
 const b=await chromium.launch({args:['--no-sandbox','--disable-dev-shm-usage','--disable-gpu','--single-process','--no-zygote']})
 const ctx=await b.newContext({viewport:{width:390,height:844}})
 const p=await ctx.newPage()
 await p.goto(BASE+'?x='+Date.now(),{waitUntil:'networkidle',cache:'no-store'}).catch(()=>{})
 await p.waitForTimeout(1800)
 await p.locator('button:has-text("Buka")').first().click({timeout:8000}).catch(()=>{})
 await p.waitForTimeout(2000)
 const h=await p.evaluate(()=>document.querySelector('.style-elegant')?.innerHTML||'NULL')
 const has=k=>h.includes(k)
 console.log('LEN',h.length,'| stage:',has('stage'),'| card3d:',has('card3d'),'| dust:',has('dust'),'| illu:',has('illu'))
 await b.close()
}
main().catch(e=>{console.error('FATAL',e);process.exit(1)})
