import { chromium } from 'playwright'
const BASE='https://ringga-dev.github.io/undangan'
const run=async()=>{
 let b=await chromium.launch({args:['--no-sandbox','--disable-dev-shm-usage','--disable-gpu','--single-process','--no-zygote']})
 let ctx=await b.newContext({viewport:{width:390,height:844}})
 let p=await ctx.newPage()
 await p.goto(BASE+'/ringga-delvy/?to=any&yanto',{waitUntil:'networkidle',cache:'no-store'}).catch(()=>{})
 await p.evaluate(()=>localStorage.clear())
 await p.reload({waitUntil:'networkidle'})
 await p.waitForTimeout(2500)
 const r=await p.evaluate(()=>{
   const g=document.querySelector('.hero .guest')
   return {
     search: window.location.search,
     guestExists: !!g,
     guestText: g?g.innerText:'',
     heroExists: !!document.querySelector('.hero'),
     styleRoot: document.querySelector('[class*="style-"]')?.className||''
   }
 })
 console.log(JSON.stringify(r,null,0))
 await b.close()
}
run().catch(e=>{console.error('FATAL',e.message);process.exit(1)})
