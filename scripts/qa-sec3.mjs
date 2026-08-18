import { chromium } from 'playwright'
const BASE='https://ringga-dev.github.io/undangan'
const slug=process.argv[2]
const run=async()=>{
 let b=await chromium.launch({args:['--no-sandbox','--disable-dev-shm-usage','--disable-gpu','--single-process','--no-zygote']})
 let p=await b.newPage({viewport:{width:360,height:740}})
 await p.goto(`${BASE}/${slug}/?to=any&yanto&cb=${Date.now()}`,{waitUntil:'networkidle',cache:'no-store'}).catch(()=>{})
 await p.waitForTimeout(1400)
 await p.evaluate(()=>{document.querySelectorAll('.deck-dot')[3].click()})
 await p.waitForTimeout(900)
 await p.screenshot({path:`/tmp/w-${slug}.png`})
 console.log('shot '+slug+' waktu')
 await b.close()
}
run().catch(e=>{console.error('FATAL',e.message);process.exit(1)})
