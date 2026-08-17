import { chromium } from 'playwright'
const BASE='https://ringga-dev.github.io/undangan'
const main=async()=>{
 const b=await chromium.launch({args:['--no-sandbox','--disable-dev-shm-usage','--disable-gpu','--single-process','--no-zygote']})
 const p=await b.newPage({viewport:{width:390,height:844}})
 const errs=[]; p.on('pageerror',e=>errs.push('PE:'+e.message)); p.on('console',m=>{if(m.type()==='error')errs.push('C:'+m.text())})
 await p.goto(BASE,{waitUntil:'networkidle'}).catch(()=>{})
 await p.waitForTimeout(1500)
 await p.locator('button:has-text("Buka")').first().click({timeout:8000}).catch(()=>{})
 await p.waitForTimeout(2500)
 const r=await p.evaluate(()=>{
   const c=document.querySelector('canvas')
   if(!c) return {canvas:false}
   const ctx=c.getContext('2d')
   const w=c.width,h=c.height
   let nonEmpty=0
   try{ const d=ctx.getImageData(0,0,Math.min(w,200),Math.min(h,200)).data; for(let i=3;i<d.length;i+=4){ if(d[i]>0) nonEmpty++ } }catch(e){ return {canvas:true,w,h,err:String(e)} }
   const illu=document.querySelector('img.illu')
   return {canvas:true,w,h,nonEmpty,illuSrc:illu?.getAttribute('src'),illuComplete:illu?.complete,illuNatural:illu?.naturalWidth}
 })
 console.log('RESULT',JSON.stringify(r))
 console.log('ERRS',errs.slice(0,5))
 await b.close()
}
main().catch(e=>{console.error('FATAL',e);process.exit(1)})
