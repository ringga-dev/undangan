import { chromium } from 'playwright'
const BASE='https://ringga-dev.github.io/undangan'
const main=async()=>{
 const b=await chromium.launch({args:['--no-sandbox','--disable-dev-shm-usage','--disable-gpu','--single-process','--no-zygote']})
 const p=await b.newPage({viewport:{width:390,height:844}})
 await p.goto(BASE+'?x='+Date.now(),{waitUntil:'networkidle',cache:'no-store'}).catch(()=>{})
 await p.waitForTimeout(1800)
 await p.locator('button:has-text("Buka")').first().click({timeout:8000}).catch(()=>{})
 await p.waitForTimeout(2000)
 const hero=await p.evaluate(()=>document.querySelector('.hero')?.outerHTML||'NO HERO')
 console.log(hero.slice(0,700))
 await b.close()
}
main().catch(e=>{console.error('FATAL',e);process.exit(1)})
