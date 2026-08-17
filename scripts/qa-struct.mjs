import { chromium } from 'playwright'
const BASE='https://ringga-dev.github.io/undangan'
const main=async()=>{
 const b=await chromium.launch({args:['--no-sandbox','--disable-dev-shm-usage','--disable-gpu','--single-process','--no-zygote']})
 const p=await b.newPage({viewport:{width:390,height:844}})
 const errs=[]; p.on('pageerror',e=>errs.push('PE:'+e.message)); p.on('console',m=>{if(m.type()==='error')errs.push('C:'+m.text())})
 await p.goto(BASE,{waitUntil:'networkidle'}).catch(()=>{})
 await p.waitForTimeout(1800)
 await p.locator('button:has-text("Buka")').first().click({timeout:8000}).catch(()=>{})
 await p.waitForTimeout(2000)
 const h=await p.evaluate(()=>document.querySelector('.style-elegant')?.innerHTML||'NULL')
 const has=k=>h.includes(k)
 console.log('LEN',h.length)
 console.log('hero:',has('class="hero"'),'| main:',has('<main'),'| cropper:',has('cropper'),'| card3d:',has('card3d'),'| stage:',has('stage'),'| dust:',has('dust'),'| illu:',has('illu'),'| mempelai:',has('mempelai'),'| ucapan:',has('ucapan'))
 console.log('ERRS',errs.slice(0,6))
 await b.close()
}
main().catch(e=>{console.error('FATAL',e);process.exit(1)})
