import { chromium } from 'playwright'
const BASE='https://ringga-dev.github.io/undangan'
const main=async()=>{
 const b=await chromium.launch({args:['--no-sandbox','--disable-dev-shm-usage','--disable-gpu','--single-process','--no-zygote']})
 const p=await b.newPage({viewport:{width:390,height:844}})
 await p.goto(BASE,{waitUntil:'networkidle',cache:'no-store'}).catch(()=>{})
 await p.waitForTimeout(1500)
 await p.locator('button:has-text("Buka")').first().click({timeout:8000}).catch(()=>{})
 await p.waitForTimeout(2500)
 const r=await p.evaluate(()=>{
   const secs=[...document.querySelectorAll('section, .block, .surface')]
   return secs.map(s=>{const st=getComputedStyle(s);return {id:s.id||s.className.toString().slice(0,20),op:+st.opacity,h:s.getBoundingClientRect().height|0}})
 })
 console.log(JSON.stringify(r,null,0))
 await b.close()
}
main().catch(e=>{console.error('FATAL',e.message);process.exit(1)})
