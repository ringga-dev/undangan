import { chromium } from 'playwright'
const BASE='https://ringga-dev.github.io/undangan'
const s=process.argv[2]
const vps=[{w:360,h:740,n:'360'},{w:390,h:844,n:'390'},{w:768,h:1024,n:'768'}]
const run=async()=>{
 let b=await chromium.launch({args:['--no-sandbox','--disable-dev-shm-usage','--disable-gpu','--single-process','--no-zygote']})
 for(const vp of vps){
  const p=await b.newPage({viewport:{width:vp.w,height:vp.h}})
  await p.goto(`${BASE}/${s}/?to=any&yanto&cb=${Date.now()}`,{waitUntil:'networkidle',cache:'no-store'}).catch(()=>{})
  await p.waitForTimeout(1000)
  const res=await p.evaluate(()=>{
    const vw=window.innerWidth
    const overflowX=document.documentElement.scrollWidth-vw
    const wide=[]
    document.querySelectorAll('*').forEach(el=>{const r=el.getBoundingClientRect();if(r.width>vw+2&&r.height>0&&r.width<vw*3)wide.push((el.className||el.tagName).toString().slice(0,40)+'='+Math.round(r.width))})
    return {overflowX,wide:wide.slice(0,5)}
  })
  console.log(`${s} @${vp.n}: ${res.overflowX>2?'OVERFLOW_X='+res.overflowX:'ok'}`+(res.wide.length?' WIDE: '+res.wide.join(' | '):''))
  await p.close()
 }
 await b.close()
}
run().catch(e=>{console.error('FATAL',e.message);process.exit(1)})
