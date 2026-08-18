import { chromium } from 'playwright'
const BASE='https://ringga-dev.github.io/undangan'
const run=async()=>{
 let b=await chromium.launch({args:['--no-sandbox','--disable-dev-shm-usage','--disable-gpu','--single-process','--no-zygote']})
 let p=await b.newPage({viewport:{width:390,height:844}})
 await p.goto(BASE+'/ringga-delvy/?to=any&yanto',{waitUntil:'networkidle',cache:'no-store'}).catch(()=>{})
 await p.waitForTimeout(3000)
 const r=await p.evaluate(()=>{
   const h=document.querySelector('.hero')
   return { heroHTML: h? h.innerHTML.slice(0,300):'NO HERO' }
 })
 console.log('HERO>>>'+r.heroHTML)
 await b.close()
}
run().catch(e=>{console.error('FATAL',e.message);process.exit(1)})
