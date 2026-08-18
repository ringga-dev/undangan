import { chromium } from 'playwright'
const BASE='https://ringga-dev.github.io/undangan'
const run=async()=>{
 let b=await chromium.launch({args:['--no-sandbox','--disable-dev-shm-usage','--disable-gpu','--single-process','--no-zygote']})
 let p=await b.newPage({viewport:{width:390,height:844}})
 let errs=[]
 p.on('console',m=>{if(m.type()==='error')errs.push(m.text())})
 p.on('pageerror',e=>errs.push('PAGEERR:'+e.message))
 // preview modern/terracotta
 await p.goto(`${BASE}/ringga-delvy/?style=modern&theme=terracotta&cb=${Date.now()}`,{waitUntil:'networkidle',cache:'no-store'}).catch(()=>{})
 await p.waitForTimeout(1500)
 const prev=await p.evaluate(()=>({style:document.documentElement.getAttribute('data-style'),theme:document.documentElement.getAttribute('data-theme')}))
 console.log('preview modern/terracotta ->', JSON.stringify(prev))
 // preview minimal/paper
 await p.goto(`${BASE}/ringga-delvy/?style=minimal&theme=paper&cb=${Date.now()}`,{waitUntil:'networkidle',cache:'no-store'}).catch(()=>{})
 await p.waitForTimeout(1200)
 const prev2=await p.evaluate(()=>({style:document.documentElement.getAttribute('data-style'),theme:document.documentElement.getAttribute('data-theme')}))
 console.log('preview minimal/paper ->', JSON.stringify(prev2))
 // ucapan still works
 await p.goto(`${BASE}/ringga-delvy/?to=any&yanto&cb=${Date.now()}`,{waitUntil:'networkidle',cache:'no-store'}).catch(()=>{})
 await p.waitForTimeout(1200)
 const uc=await p.$('#ucapan')
 if(uc){await uc.scrollIntoViewIfNeeded();await p.fill('#ucapan input[type=text]','Tester2');await p.selectOption('#ucapan select','2');await p.fill('#ucapan textarea','Doa terbaik!');await p.click('#kirim');await p.waitForTimeout(700)}
 const ls=await p.evaluate(()=>JSON.parse(localStorage.getItem('ucapan:ringga-delvy')||'[]').length)
 console.log('ucapan localStorage count='+ls)
 console.log('consoleErrors='+errs.length)
 await b.close()
 console.log('DONE')
}
run().catch(e=>{console.error('FATAL',e.message);process.exit(1)})
