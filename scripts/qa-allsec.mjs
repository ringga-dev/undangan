import { chromium } from 'playwright'
const BASE='https://ringga-dev.github.io/undangan'
const shot=async(slug,sel,f)=>{const b=await chromium.launch({args:['--no-sandbox','--disable-dev-shm-usage','--disable-gpu','--single-process','--no-zygote']});const p=await b.newPage({viewport:{width:390,height:844}});const errs=[];p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>{if(m.type()==='error')errs.push(m.text())});await p.goto(BASE+'?to='+slug,{waitUntil:'networkidle',cache:'no-store'}).catch(()=>{});await p.waitForTimeout(1500);await p.locator('button:has-text("Buka")').first().click({timeout:8000}).catch(()=>{});await p.waitForTimeout(2000);await p.evaluate(s=>document.querySelector(s).scrollIntoView(),sel);await p.waitForTimeout(900);await p.screenshot({path:f});await b.close();return errs}
const m=async()=>{
 const jobs=[['budi-siti','#story','/tmp/a_floral_story.png'],['budi-siti','#waktu','/tmp/a_floral_waktu.png'],['demo-minimal','#story','/tmp/a_min_story.png'],['demo-rustic','#story','/tmp/a_rust_story.png'],['demo-modern','#story','/tmp/a_mod_story.png']]
 let alleq=[]
 for(const [s,sel,f] of jobs){const e=await shot(s,sel,f);alleq.push(...e)}
 console.log('ERRS',JSON.stringify(alleq.slice(0,3)))
}
m().catch(e=>{console.error('FATAL',e.message);process.exit(1)})
