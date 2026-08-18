import { chromium } from 'playwright'
const BASE='https://ringga-dev.github.io/undangan'
const slug=process.argv[2]
const run=async()=>{
 let b=await chromium.launch({args:['--no-sandbox','--disable-dev-shm-usage','--disable-gpu','--single-process','--no-zygote']})
 let p=await b.newPage({viewport:{width:360,height:740}})
 await p.goto(`${BASE}/${slug}/?to=any&yanto&cb=${Date.now()}`,{waitUntil:'networkidle',cache:'no-store'}).catch(()=>{})
 await p.waitForTimeout(1500)
 const n=await p.evaluate(()=>document.querySelectorAll('.deck-dot').length)
 for(let i=0;i<n;i++){
   await p.evaluate((idx)=>{document.querySelectorAll('.deck-dot')[idx].click()}, i)
   await p.waitForTimeout(900)
   const label=await p.evaluate(()=>{const a=document.querySelector('.deck-slide.is-active');return a?a.id||a.className.toString().slice(0,20):'?'})
   await p.screenshot({path:`/tmp/sec-${slug}-${i}.png`})
   console.log(`shot ${slug} slide${i} (${label})`)
 }
 await b.close()
}
run().catch(e=>{console.error('FATAL',e.message);process.exit(1)})
