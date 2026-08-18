import { chromium } from 'playwright'
const BASE='https://ringga-dev.github.io/undangan'
const styles=[
 ['elegant',['emerald','royal','navy','burgundy','bronze']],
 ['floral',['rose','blush','lilac','sage','sky']],
 ['minimal',['noir','paper','graphite','ivory','steel']],
 ['rustic',['terracotta','olive','clay','forest','wheat']],
 ['modern',['cyan','violet','lime','coral','magenta']],
]
const run=async()=>{
 let b=await chromium.launch({args:['--no-sandbox','--disable-dev-shm-usage','--disable-gpu','--single-process','--no-zygote']})
 let p=await b.newPage({viewport:{width:390,height:844}})
 let ok=0, bad=0
 for(const [st,themes] of styles){
  for(const th of themes){
   await p.goto(`${BASE}/ringga-delvy/?style=${st}&theme=${th}&cb=${Date.now()}`,{waitUntil:'networkidle',cache:'no-store'}).catch(()=>{})
   await p.waitForTimeout(700)
   const r=await p.evaluate(()=>({s:document.documentElement.getAttribute('data-style'),t:document.documentElement.getAttribute('data-theme')}))
   if(r.s===st&&r.t===th){ok++}else{bad++;console.log(`MISMATCH ${st}/${th} -> ${r.s}/${r.t}`)}
  }
 }
 console.log(`25-combo check: ok=${ok} bad=${bad}`)
 await b.close()
}
run().catch(e=>{console.error('FATAL',e.message);process.exit(1)})
