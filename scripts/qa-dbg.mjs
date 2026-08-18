import { chromium } from 'playwright'
const BASE='https://ringga-dev.github.io/undangan'
const run=async()=>{
 const b=await chromium.launch({args:['--no-sandbox','--disable-dev-shm-usage','--disable-gpu','--single-process','--no-zygote']})
 const p=await b.newPage({viewport:{width:390,height:844}})
 const fails=[];p.on('response',r=>{if(r.status()>=400)fails.push(r.status()+' '+r.url())})
 await p.goto(BASE+'/ringga-delvy/?to=any&yanto',{waitUntil:'networkidle',cache:'no-store'}).catch(()=>{})
 await p.waitForTimeout(1500)
 const dbg=await p.evaluate(()=>{
   const s=window.location.search
   const m=s.match(/[?&]to=(.*?)(?=&[a-zA-Z0-9_]+=|$)/)
   return {search:s, regexGroup: m?m[1]:'NO_MATCH'}
 })
 console.log('SEARCH=['+dbg.search+'] REGEX=['+dbg.regexGroup+']')
 console.log('FAILS='+JSON.stringify(fails.slice(0,5)))
 await b.close()
}
run().catch(e=>{console.error('FATAL',e.message);process.exit(1)})
