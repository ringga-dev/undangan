import { chromium } from 'playwright'
const BASE='https://ringga-dev.github.io/undangan'
const styles=[['ringga-delvy','elegant'],['budi-siti','floral'],['demo-minimal','minimal'],['demo-rustic','rustic'],['demo-modern','modern']]
const run=async()=>{
 for(const [slug,name] of styles){
  let b=await chromium.launch({args:['--no-sandbox','--disable-dev-shm-usage','--disable-gpu','--single-process','--no-zygote']})
  let p=await b.newPage({viewport:{width:390,height:844}})
  const cb=Date.now()
  await p.goto(`${BASE}/${slug}/?to=any&yanto&cb=${cb}`,{waitUntil:'networkidle',cache:'no-store'}).catch(()=>{})
  await p.waitForTimeout(2500)
  const r=await p.evaluate(()=>({g:document.querySelector('.guest')?.textContent||'',nav:!!document.querySelector('.navbar')}))
  console.log(`${name}: guest="${r.g}" navbar=${r.nav}`)
  await b.close()
 }
}
run().catch(e=>{console.error('FATAL',e.message);process.exit(1)})
