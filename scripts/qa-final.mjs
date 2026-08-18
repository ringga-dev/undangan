import { chromium } from 'playwright'
const BASE='https://ringga-dev.github.io/undangan'
const open=async(p)=>{ await p.locator('button:has-text("Buka")').first().click({timeout:8000}).catch(()=>{}) }
const info=async(p)=>p.evaluate(()=>{const el=document.querySelector('[class*="style-"]');return {cls:el?.className||'NONE',canvas:document.querySelectorAll('canvas').length,illu:document.querySelectorAll('img.illu').length,stage:!!document.querySelector('.stage'),card3d:!!document.querySelector('.card3d')} })
const main=async()=>{
 const b=await chromium.launch({args:['--no-sandbox','--disable-dev-shm-usage','--disable-gpu','--single-process','--no-zygote']})
 const errs=[]; const log=async(p,u)=>{const i=await info(p);console.log(u,JSON.stringify(i))}
 for(const [slug,label] of [['','ELEGANT'],['?to=budi-siti','FLORAL'],['?to=demo-minimal','MINIMAL'],['?to=demo-rustic','RUSTIC'],['?to=demo-modern','MODERN']]){
   const p=await b.newPage({viewport:{width:390,height:844}})
   p.on('pageerror',e=>errs.push(label+':PE:'+e.message)); p.on('console',m=>{if(m.type()==='error')errs.push(label+':C:'+m.text())})
   await p.goto(BASE+slug,{waitUntil:'networkidle',cache:'no-store'}).catch(()=>{})
   await p.waitForTimeout(1500); await open(p); await p.waitForTimeout(2000)
   await log(p,label); await p.close()
 }
 console.log('ERRORS:',errs.slice(0,8))
 await b.close()
}
main().catch(e=>{console.error('FATAL',e);process.exit(1)})
