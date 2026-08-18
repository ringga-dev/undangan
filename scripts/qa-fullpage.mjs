import { chromium } from 'playwright'
const BASE='https://ringga-dev.github.io/undangan'
const shot=async(slug,file)=>{
 const b=await chromium.launch({args:['--no-sandbox','--disable-dev-shm-usage','--disable-gpu','--single-process','--no-zygote']})
 const p=await b.newPage({viewport:{width:390,height:844}})
 await p.goto(BASE+'?to='+slug,{waitUntil:'networkidle',cache:'no-store'}).catch(()=>{})
 await p.waitForTimeout(1500)
 await p.locator('button:has-text("Buka")').first().click({timeout:8000}).catch(()=>{})
 await p.waitForTimeout(2000)
 await p.screenshot({path:file, fullPage:true})
 await b.close()
}
const main=async()=>{
 await shot('','/tmp/fp_elegant.png')
 await shot('budi-siti','/tmp/fp_floral.png')
 console.log('done')
}
main().catch(e=>{console.error('FATAL',e.message);process.exit(1)})
