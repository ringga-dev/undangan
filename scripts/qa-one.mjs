import { chromium } from 'playwright'
const slug=process.argv[2]||''; const label=process.argv[3]||slug
const BASE='https://ringga-dev.github.io/undangan'
const main=async()=>{
 const b=await chromium.launch({args:['--no-sandbox','--disable-dev-shm-usage','--disable-gpu','--single-process','--no-zygote']})
 const p=await b.newPage({viewport:{width:390,height:844}})
 const errs=[]; p.on('pageerror',e=>errs.push('PE:'+e.message)); p.on('console',m=>{if(m.type()==='error')errs.push('C:'+m.text())})
 await p.goto(BASE+'?to='+slug,{waitUntil:'networkidle',cache:'no-store'}).catch(()=>{})
 await p.waitForTimeout(1500)
 await p.locator('button:has-text("Buka")').first().click({timeout:8000}).catch(()=>{})
 await p.waitForTimeout(2000)
 const r=await p.evaluate(()=>({cls:document.querySelector('[class*="style-"]')?.className||'NONE',canvas:document.querySelectorAll('canvas').length,illu:document.querySelectorAll('img.illu').length}))
 console.log(label,JSON.stringify(r),'ERR',JSON.stringify(errs.slice(0,2)))
 await b.close()
}
main().catch(e=>{console.error('FATAL',e.message);process.exit(1)})
