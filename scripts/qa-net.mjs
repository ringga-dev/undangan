import { chromium } from 'playwright'
const BASE='https://ringga-dev.github.io/undangan'
const main=async()=>{
 const b=await chromium.launch({args:['--no-sandbox','--disable-dev-shm-usage','--disable-gpu','--single-process','--no-zygote']})
 const p=await b.newPage({viewport:{width:390,height:844}})
 const nuxt=[]
 p.on('response',r=>{ if(r.url().includes('_nuxt')) nuxt.push(r.status()+' '+r.url().split('/').pop()) })
 await p.goto(BASE,{waitUntil:'networkidle',cache:'no-store'}).catch(()=>{})
 await p.waitForTimeout(3000)
 console.log('NUXT_CHUNKS:',nuxt.slice(0,20).join(' | '))
 await b.close()
}
main().catch(e=>{console.error('FATAL',e);process.exit(1)})
