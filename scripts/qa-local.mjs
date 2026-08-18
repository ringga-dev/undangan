import { chromium } from 'playwright'
const BASE='http://localhost:8099/'
const main=async()=>{
 const b=await chromium.launch({args:['--no-sandbox','--disable-dev-shm-usage','--disable-gpu','--single-process','--no-zygote']})
 const p=await b.newPage({viewport:{width:390,height:844}})
 const errs=[]; p.on('console',m=>{if(m.type()==='error')errs.push(m.text())}); p.on('pageerror',e=>errs.push('PE:'+e.message))
 await p.goto(BASE+'?x='+Date.now(),{waitUntil:'networkidle',cache:'no-store'}).catch(()=>{})
 await p.waitForTimeout(2000)
 await p.locator('button:has-text("Buka")').first().click({timeout:8000}).catch(()=>{})
 await p.waitForTimeout(2000)
 const h=await p.evaluate(()=>document.querySelector('.style-elegant')?.innerHTML||'NULL')
 const has=k=>h.includes(k)
 console.log('LOCAL stage:',has('stage'),'| card3d:',has('card3d'),'| dust:',has('dust'),'| illu:',has('illu'))
 console.log('ERRS',errs.slice(0,3))
 await b.close()
}
main().catch(e=>{console.error('FATAL',e);process.exit(1)})
