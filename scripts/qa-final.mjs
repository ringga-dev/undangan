import { chromium } from 'playwright'
const BASE='https://ringga-dev.github.io/undangan'
const styles=[['elegant','emerald'],['floral','rose'],['minimal','paper'],['rustic','terracotta'],['modern','cyan']]
const run=async()=>{
 // 1) pasangan ke-3
 let b=await chromium.launch({args:['--no-sandbox','--disable-dev-shm-usage','--disable-gpu','--single-process','--no-zygote']})
 let p=await b.newPage({viewport:{width:390,height:844}})
 let code=await p.goto(`${BASE}/rara-pandu/?cb=${Date.now()}`,{waitUntil:'networkidle',cache:'no-store'}).then(r=>r.status()).catch(()=>0)
 console.log('rara-pandu ->',code)
 // 2) ucapan localStorage: buka ringga-delvy, scroll ke ucapan, isi + kirim
 await p.goto(`${BASE}/ringga-delvy/?to=any&yanto&cb=${Date.now()}`,{waitUntil:'networkidle',cache:'no-store'}).catch(()=>{})
 await p.waitForTimeout(1500)
 const uc=await p.$('#ucapan')
 if(uc){ await uc.scrollIntoViewIfNeeded(); await p.fill('#ucapan input[type=text]','Tester'); await p.selectOption('#ucapan select','1'); await p.fill('#ucapan textarea','Semoga bahagia selalu!'); await p.click('#kirim'); await p.waitForTimeout(800) }
 const ucCount=await p.evaluate(()=>document.querySelectorAll('#ucapan .uc-item').length)
 const lsCount=await p.evaluate(()=>JSON.parse(localStorage.getItem('ucapan:ringga-delvy')||'[]').length)
 console.log('ucapan: itemsRendered='+ucCount+' localStorage='+lsCount)
 // 3) 25 combos preview (one sample: modern+terracotta on ringga-delvy)
 await p.goto(`${BASE}/ringga-delvy/?style=modern&theme=terracotta&cb=${Date.now()}`,{waitUntil:'networkidle',cache:'no-store'}).catch(()=>{})
 await p.waitForTimeout(1200)
 const prev=await p.evaluate(()=>document.documentElement.className)
 console.log('preview modern/terracotta rootClass="'+prev+'"')
 const errs=await p.evaluate(()=>window.__err||0)
 await b.close()
 console.log('DONE')
}
run().catch(e=>{console.error('FATAL',e.message);process.exit(1)})
