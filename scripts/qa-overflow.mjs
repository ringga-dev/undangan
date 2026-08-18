import { chromium } from 'playwright'
const BASE='https://ringga-dev.github.io/undangan'
const run=async(slug)=>{
 let b=await chromium.launch({args:['--no-sandbox','--disable-dev-shm-usage','--disable-gpu','--single-process','--no-zygote']})
 let p=await b.newPage({viewport:{width:360,height:740}})
 await p.goto(`${BASE}/${slug}/?to=any&yanto&cb=${Date.now()}`,{waitUntil:'networkidle'}).catch(()=>{})
 await p.waitForTimeout(1500)
 const res=await p.evaluate(()=>{
  const vh=window.innerHeight
  const slides=[...document.querySelectorAll('.deck-slide')]
  return slides.map((s,i)=>{
    const block=s.querySelector('.block')||s
    const ch=block.scrollHeight
    const title=s.id||s.querySelector('h2')?.textContent?.slice(0,18)||i
    return {i, title, contentH:ch, vh, overflow: ch>vh+2}
  })
 })
 console.log(slug+': '+JSON.stringify(res))
 await b.close()
}
run(process.argv[2]).catch(e=>{console.error('FATAL',e.message);process.exit(1)})
