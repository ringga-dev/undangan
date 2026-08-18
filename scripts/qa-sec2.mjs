import { chromium } from 'playwright'
const BASE='https://ringga-dev.github.io/undangan'
const slug=process.argv[2]
const idxs=[1,4,5] // couple, schedule, gift
const run=async()=>{
 let b=await chromium.launch({args:['--no-sandbox','--disable-dev-shm-usage','--disable-gpu','--single-process','--no-zygote']})
 let p=await b.newPage({viewport:{width:360,height:740}})
 await p.goto(`${BASE}/${slug}/?to=any&yanto&cb=${Date.now()}`,{waitUntil:'networkidle',cache:'no-store'}).catch(()=>{})
 await p.waitForTimeout(1400)
 for(const i of idxs){
   await p.evaluate((idx)=>{document.querySelectorAll('.deck-dot')[idx]&&document.querySelectorAll('.deck-dot')[idx].click()}, i)
   await p.waitForTimeout(800)
   await p.screenshot({path:`/tmp/s2-${slug}-${i}.png`})
   console.log(`shot ${slug} slide${i}`)
 }
 await b.close()
}
run().catch(e=>{console.error('FATAL',e.message);process.exit(1)})
