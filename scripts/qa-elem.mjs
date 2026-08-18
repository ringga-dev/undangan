import { chromium } from 'playwright'
const BASE='https://ringga-dev.github.io/undangan'
const shot=async(slug,sel,f)=>{const b=await chromium.launch({args:['--no-sandbox','--disable-dev-shm-usage','--disable-gpu','--single-process','--no-zygote']});const p=await b.newPage({viewport:{width:390,height:844}});await p.goto(BASE+'?to='+slug,{waitUntil:'networkidle',cache:'no-store'}).catch(()=>{});await p.waitForTimeout(1500);await p.locator('button:has-text("Buka")').first().click({timeout:8000}).catch(()=>{});await p.waitForTimeout(2200);const el=await p.$(sel);await el.screenshot({path:f});await b.close()}
const m=async()=>{
 await shot('budi-siti','#story','/tmp/e_floral_story.png')
 await shot('budi-siti','#waktu','/tmp/e_floral_waktu.png')
 await shot('demo-minimal','#story','/tmp/e_min_story.png')
 await shot('demo-rustic','#story','/tmp/e_rust_story.png')
 await shot('demo-modern','#story','/tmp/e_mod_story.png')
 console.log('done')
}
m().catch(e=>{console.error('FATAL',e.message);process.exit(1)})
