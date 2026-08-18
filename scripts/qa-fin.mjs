import { chromium } from 'playwright'
const BASE='https://ringga-dev.github.io/undangan'
const run=async()=>{
 let b=await chromium.launch({args:['--no-sandbox','--disable-dev-shm-usage','--disable-gpu','--single-process','--no-zygote']})
 for(const [slug,dot] of [['ringga-delvy',4],['budi-siti',3],['demo-minimal',3]]){
  let p=await b.newPage({viewport:{width:360,height:740}})
  await p.goto(`${BASE}/${slug}/?to=any&yanto&cb=${Date.now()}`,{waitUntil:'networkidle',cache:'no-store'}).catch(()=>{})
  await p.waitForTimeout(1500)
  await p.evaluate((d)=>{document.querySelectorAll('.deck-dot')[d].click()}, dot)
  await p.waitForTimeout(3000)
  await p.screenshot({path:`/tmp/fin-${slug}.png`})
  console.log('shot '+slug)
  await p.close()
 }
 await b.close()
}
run().catch(e=>{console.error('FATAL',e.message);process.exit(1)})
