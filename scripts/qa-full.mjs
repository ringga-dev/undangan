import { chromium } from 'playwright'
const BASE='https://ringga-dev.github.io/undangan'
const main=async()=>{
 const b=await chromium.launch({args:['--no-sandbox','--disable-dev-shm-usage','--disable-gpu','--single-process','--no-zygote']})
 const p=await b.newPage({viewport:{width:390,height:844}})
 const errs=[]; p.on('console',m=>{if(m.type()==='error')errs.push('C:'+m.text())}); p.on('pageerror',e=>errs.push('PE:'+e.message))
 await p.goto(BASE,{waitUntil:'networkidle'}).catch(()=>{})
 await p.waitForTimeout(1500)
 await p.locator('button:has-text("Buka")').first().click({timeout:8000}).catch(()=>{})
 await p.waitForTimeout(2000)
 const h=await p.evaluate(()=>document.querySelector('.style-elegant')?.innerHTML||'NULL')
 console.log('LEN',h.length,'| stage:',h.includes('stage'),'| card3d:',h.includes('card3d'),'| dust:',h.includes('dust'),'| illu:',h.includes('illu'),'| mempelai:',h.includes('mempelai'))
 console.log('ERRS:',errs.slice(0,5))
 await b.close()
}
main().catch(e=>{console.error('FATAL',e);process.exit(1)})
