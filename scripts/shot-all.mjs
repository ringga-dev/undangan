import { chromium } from 'playwright'
const BASE='https://ringga-dev.github.io/undangan'
const slug=process.argv[2]
const vp=JSON.parse(process.argv[3]) // {w,h,name}
const b=await chromium.launch()
const p=await b.newPage({viewport:{width:vp.w,height:vp.h}})
await p.goto(BASE+'/'+slug+'?v='+Date.now(),{waitUntil:'networkidle'})
await p.waitForTimeout(2500)
// close opening modal if present
const ob=await p.$('.opening-modal, [class*="modal"]')
if(ob){ try{ await p.click('button'); }catch(e){} await p.waitForTimeout(500) }
const out=`/tmp/shot-${slug}-${vp.name}.png`
await p.screenshot({path:out})
console.log('saved '+out)
await b.close()
