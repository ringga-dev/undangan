import { chromium } from 'playwright'
const BASE='https://ringga-dev.github.io/undangan'
const slug=process.argv[2]||''; const label=process.argv[3]||slug
const main=async()=>{
 const b=await chromium.launch({args:['--no-sandbox','--disable-dev-shm-usage','--disable-gpu','--single-process','--no-zygote']})
 const p=await b.newPage({viewport:{width:390,height:844}})
 await p.goto(BASE+'?to='+slug,{waitUntil:'networkidle',cache:'no-store'}).catch(()=>{})
 await p.waitForTimeout(1500); await p.locator('button:has-text("Buka")').first().click({timeout:8000}).catch(()=>{})
 await p.waitForTimeout(2500)
 const c=await p.evaluate(()=>({story:document.querySelectorAll('#story').length, gallery:document.querySelectorAll('#gallery').length, closing:document.querySelectorAll('.closing').length}))
 console.log(label, JSON.stringify(c))
 await b.close()
}
main().catch(e=>{console.error('FATAL',e.message);process.exit(1)})
