import { chromium } from 'playwright'
const BASE='https://ringga-dev.github.io/undangan'
const run=async()=>{
 // LANDING
 let b=await chromium.launch({args:['--no-sandbox','--disable-dev-shm-usage','--disable-gpu','--single-process','--no-zygote']})
 let p=await b.newPage({viewport:{width:390,height:844}})
 let errs=[];p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>{if(m.type()==='error')errs.push(m.text())})
 await p.goto(BASE+'/',{waitUntil:'networkidle',cache:'no-store'}).catch(()=>{})
 await p.waitForTimeout(1500)
 const land=await p.evaluate(()=>({title:document.querySelector('h1')?.innerText||'',cards:document.querySelectorAll('a[href*="/ringga-delvy"]').length,navbar:!!document.querySelector('.navbar')}))
 console.log('LANDING h1="'+land.title.replace(/\n/g,' ').slice(0,40)+'" linksToDemo='+land.cards+' navbar='+land.navbar+' ERR='+(errs.length?errs[0].slice(0,60):'0'))
 await b.close()
 // DETAIL with guest to=any&yanto
 b=await chromium.launch({args:['--no-sandbox','--disable-dev-shm-usage','--disable-gpu','--single-process','--no-zygote']})
 p=await b.newPage({viewport:{width:390,height:844}})
 errs=[];p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>{if(m.type()==='error')errs.push(m.text())})
 await p.goto(BASE+'/ringga-delvy/?to=any&yanto',{waitUntil:'networkidle',cache:'no-store'}).catch(()=>{})
 await p.waitForTimeout(1600)
 const det=await p.evaluate(()=>({deck:!!document.querySelector('.deck'),nav:!!document.querySelector('.deck-nav'),navbar:!!document.querySelector('.navbar'),switcher:!!document.querySelector('.theme-switcher'),guest:(document.querySelector('.guest-line')?document.querySelector('.guest-line').innerText:'')}))
 console.log('DETAIL deck='+det.deck+' decknav='+det.nav+' navbar='+det.navbar+' switcher='+det.switcher+' guest="'+det.guest+'" ERR='+(errs.length?errs[0].slice(0,60):'0'))
 await b.close()
}
run().catch(e=>{console.error('FATAL',e.message);process.exit(1)})
