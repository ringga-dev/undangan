import { chromium } from 'playwright'
const BASE='https://ringga-dev.github.io/undangan'
const main=async()=>{
 const b=await chromium.launch({args:['--no-sandbox','--disable-dev-shm-usage','--disable-gpu','--single-process','--no-zygote']})
 const p=await b.newPage({viewport:{width:390,height:844}})
 const errs=[]; p.on('pageerror',e=>errs.push('PE:'+e.message)); p.on('console',m=>{if(m.type()==='error')errs.push('C:'+m.text())})
 await p.goto(BASE,{waitUntil:'networkidle',cache:'no-store'}).catch(()=>{})
 await p.waitForTimeout(1500)
 await p.locator('button:has-text("Buka")').first().click({timeout:8000}).catch(()=>{})
 await p.waitForTimeout(2500)
 const secs=await p.evaluate(()=>[...document.querySelectorAll('section')].map(s=>({id:s.id,op:+getComputedStyle(s).opacity,h:s.getBoundingClientRect().height|0})))
 console.log('ELEGANT_SECS', JSON.stringify(secs))
 console.log('ELEGANT_ERR', JSON.stringify(errs.slice(0,3)))
 await p.screenshot({path:'/tmp/fp2_elegant.png', fullPage:true})
 await b.close()
}
main().catch(e=>{console.error('FATAL',e.message);process.exit(1)})
