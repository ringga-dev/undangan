import { chromium } from 'playwright'
const BASE='https://ringga-dev.github.io/undangan'
const slugs=['ringga-delvy','budi-siti','demo-minimal','demo-rustic','demo-modern']
const vps=[{w:360,h:740,n:'360'},{w:390,h:844,n:'390'},{w:768,h:1024,n:'768'}]
const run=async()=>{
 let b=await chromium.launch({args:['--no-sandbox','--disable-dev-shm-usage','--disable-gpu','--single-process','--no-zygote']})
 for(const s of slugs){
  for(const vp of vps){
   const p=await b.newPage({viewport:{width:vp.w,height:vp.h}})
   await p.goto(`${BASE}/${s}/?to=any&yanto&cb=${Date.now()}`,{waitUntil:'networkidle',cache:'no-store'}).catch(()=>{})
   await p.waitForTimeout(1200)
   const res=await p.evaluate(()=>{
     const vw=window.innerWidth
     const de=document.documentElement
     const overflowX = de.scrollWidth - vw
     // find elements wider than viewport
     const wide=[]
     document.querySelectorAll('*').forEach(el=>{
       const r=el.getBoundingClientRect()
       if(r.width>vw+2 && r.height>0 && r.width<vw*3){ wide.push(el.className.toString().slice(0,40)+' w='+Math.round(r.width)) }
     })
     return {vw, overflowX, wide:wide.slice(0,6)}
   })
   const flag = res.overflowX>2 ? 'OVERFLOW_X='+res.overflowX : 'ok'
   console.log(`${s} @${vp.n}: ${flag}` + (res.wide.length?(' WIDE: '+res.wide.join(' | ')):''))
   await p.close()
  }
 }
 await b.close()
}
run().catch(e=>{console.error('FATAL',e.message);process.exit(1)})
