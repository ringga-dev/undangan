import { chromium } from 'playwright'
const BASE='https://ringga-dev.github.io/undangan'
const shot=async(slug,sel,f)=>{const b=await chromium.launch({args:['--no-sandbox','--disable-dev-shm-usage','--disable-gpu','--single-process','--no-zygote']});const p=await b.newPage({viewport:{width:390,height:844}});const errs=[];p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>{if(m.type()==='error')errs.push(m.text())});await p.goto(BASE+'?to='+slug,{waitUntil:'networkidle',cache:'no-store'}).catch(()=>{});await p.waitForTimeout(1500);await p.locator('button:has-text("Buka")').first().click({timeout:8000}).catch(()=>{});await p.waitForTimeout(2000);await p.evaluate(s=>document.querySelector(s).scrollIntoView(),sel);await p.waitForTimeout(1000);await p.screenshot({path:f});await b.close();return errs}
const m=async()=>{
 const e1=await shot('ringga-delvy','#story','/tmp/s_story.png')
 const e2=await shot('ringga-delvy','#waktu','/tmp/s_waktu.png')
 const e3=await shot('ringga-delvy','#hadiah','/tmp/s_hadiah.png')
 console.log('ERRS',JSON.stringify([...e1,...e2,...e3].slice(0,3)))
}
m().catch(e=>{console.error('FATAL',e.message);process.exit(1)})
