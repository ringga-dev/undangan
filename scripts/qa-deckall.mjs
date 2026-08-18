import { chromium } from 'playwright'
const BASE='https://ringga-dev.github.io/undangan'
const slugs=[['ringga-delvy','elegant'],['budi-siti','floral'],['demo-minimal','minimal'],['demo-rustic','rustic'],['demo-modern','modern']]
const run=async()=>{
 for(const [slug,name] of slugs){
  const b=await chromium.launch({args:['--no-sandbox','--disable-dev-shm-usage','--disable-gpu','--single-process','--no-zygote']})
  const p=await b.newPage({viewport:{width:390,height:844}})
  const errs=[];p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>{if(m.type()==='error')errs.push(m.text())})
  await p.goto(BASE+'?to='+slug,{waitUntil:'networkidle',cache:'no-store'}).catch(()=>{})
  await p.waitForTimeout(1400)
  await p.locator('button:has-text("Buka")').first().click({timeout:8000}).catch(()=>{})
  await p.waitForTimeout(1800)
  const info=await p.evaluate(()=>{const s=[...document.querySelectorAll('[data-slide]')];const act=s.findIndex(e=>e.classList.contains('is-active'));return{n:s.length,active:act,deck:!!document.querySelector('.deck'),nav:!!document.querySelector('.deck-nav')}})
  // click next 2x
  for(let k=0;k<2;k++){await p.locator('.deck-arrow').nth(1).click({timeout:5000}).catch(()=>{});await p.waitForTimeout(800)}
  const moved=await p.evaluate(()=>[...document.querySelectorAll('[data-slide]')].findIndex(e=>e.classList.contains('is-active')))
  console.log(name,'slides='+info.n,'deck='+info.deck,'nav='+info.nav,'active0='+info.active,'activeAfter2next='+moved,'ERR='+(errs.length?errs[0].slice(0,60):'0'))
  await b.close()
 }
}
run().catch(e=>{console.error('FATAL',e.message);process.exit(1)})
