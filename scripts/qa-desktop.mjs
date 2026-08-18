import { chromium } from 'playwright'
const BASE='https://ringga-dev.github.io/undangan'
const slug=process.argv[2]||'ringga-delvy'
const b=await chromium.launch()
const p=await b.newPage({viewport:{width:1280,height:800}})
await p.goto(BASE+'/'+slug+'?v='+Date.now(),{waitUntil:'networkidle'})
await p.waitForTimeout(2500)
const n=await p.evaluate(()=>document.querySelectorAll('.deck-slide').length)
let bad=0
for(let i=0;i<n;i++){
  await p.evaluate((i)=>{const t=document.querySelector('.deck-track');const s=t.children[i];t.style.transform=`translateX(${-i*100}%)`;s.scrollIntoView()},i)
  await p.waitForTimeout(400)
  const r=await p.evaluate((i)=>{const s=document.querySelector('.deck-track').children[i];const bl=s.querySelector('.block')||s;return{title:(s.id||s.querySelector('h2')?.textContent||i),h:bl.scrollHeight,vh:window.innerHeight}},i)
  if(r.h>r.vh+2){bad++;console.log(JSON.stringify({...r,overflow:true}))}
}
console.log(slug+': slides='+n+' overflowDesktop='+bad)
await b.close()
