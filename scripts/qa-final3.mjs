import { chromium } from 'playwright'
const BASE='https://ringga-dev.github.io/undangan'
const shot=async(slug,f)=>{const b=await chromium.launch({args:['--no-sandbox','--disable-dev-shm-usage','--disable-gpu','--single-process','--no-zygote']});const p=await b.newPage({viewport:{width:390,height:844}});const errs=[];p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>{if(m.type()==='error')errs.push(m.text())});await p.goto(BASE+'?to='+slug,{waitUntil:'networkidle',cache:'no-store'}).catch(()=>{});await p.waitForTimeout(1500);await p.locator('button:has-text("Buka")').first().click({timeout:8000}).catch(()=>{});await p.waitForTimeout(2500);await p.screenshot({path:f,fullPage:true});return errs}
const m=async()=>{const e1=await shot('demo-rustic','/tmp/fg_rustic.png');const e2=await shot('','/tmp/fg_elegant.png');console.log('ERRS',JSON.stringify(e1.slice(0,2)),JSON.stringify(e2.slice(0,2)))}
m().catch(e=>{console.error('FATAL',e.message);process.exit(1)})
