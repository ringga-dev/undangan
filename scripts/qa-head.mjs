import { chromium } from 'playwright'
const BASE='https://ringga-dev.github.io/undangan'
const chk=async(slug)=>{const b=await chromium.launch({args:['--no-sandbox','--disable-dev-shm-usage','--disable-gpu','--single-process','--no-zygote']});const p=await b.newPage({viewport:{width:390,height:844}});await p.goto(BASE+'?to='+slug,{waitUntil:'networkidle',cache:'no-store'}).catch(()=>{});await p.waitForTimeout(1500);await p.locator('button:has-text("Buka")').first().click({timeout:8000}).catch(()=>{});await p.waitForTimeout(2000);await p.evaluate(()=>document.querySelector('#story').scrollIntoView());await p.waitForTimeout(800);
const info=await p.evaluate(()=>{const h=document.querySelector('#story .rheading');const cs=getComputedStyle(h);const card=document.querySelector('#story .tl-item');const hr=h.getBoundingClientRect();const cr=card.getBoundingClientRect();return{text:h.textContent,fontSize:cs.fontSize,position:cs.position,opacity:cs.opacity,zIndex:cs.zIndex,marginBottom:cs.marginBottom,headingBottom:Math.round(hr.bottom),cardTop:Math.round(cr.top),overlap:hr.bottom>cr.top+2}})
console.log(slug,JSON.stringify(info));await b.close()}
const m=async()=>{for(const s of ['budi-siti','demo-minimal','demo-rustic','demo-modern'])await chk(s)}
m().catch(e=>{console.error('FATAL',e.message);process.exit(1)})
