import { chromium } from 'playwright'
const BASE='https://ringga-dev.github.io/undangan'
const shot=async(slug,f)=>{const b=await chromium.launch({args:['--no-sandbox','--disable-dev-shm-usage','--disable-gpu','--single-process','--no-zygote']});const p=await b.newPage({viewport:{width:390,height:844}});await p.goto(BASE+'?to='+slug,{waitUntil:'networkidle',cache:'no-store'}).catch(()=>{});await p.waitForTimeout(1500);await p.locator('button:has-text("Buka")').first().click({timeout:8000}).catch(()=>{});await p.waitForTimeout(2500);await p.screenshot({path:f,fullPage:true});await b.close()}
const m=async()=>{await shot('budi-siti','/tmp/ff_floral.png');await shot('demo-modern','/tmp/ff_modern.png');console.log('done')}
m().catch(e=>{console.error('FATAL',e.message);process.exit(1)})
