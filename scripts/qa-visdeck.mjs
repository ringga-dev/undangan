import { chromium } from 'playwright'
const BASE='https://ringga-dev.github.io/undangan'
const slugs=[['ringga-delvy','elegant'],['budi-siti','floral'],['demo-minimal','minimal'],['demo-rustic','rustic'],['demo-modern','modern']]
const run=async()=>{
 for(const [slug,name] of slugs){
  const b=await chromium.launch({args:['--no-sandbox','--disable-dev-shm-usage','--disable-gpu','--single-process','--no-zygote']})
  const p=await b.newPage({viewport:{width:390,height:844}})
  await p.goto(BASE+'?to='+slug,{waitUntil:'networkidle',cache:'no-store'}).catch(()=>{})
  await p.waitForTimeout(1400)
  await p.locator('button:has-text("Buka")').first().click({timeout:8000}).catch(()=>{})
  await p.waitForTimeout(1800)
  await p.screenshot({path:'/tmp/dk_'+name+'_home.png'})
  // go to slide index 2 (story)
  for(let k=0;k<2;k++){await p.locator('.deck-arrow').nth(1).click({timeout:5000}).catch(()=>{});await p.waitForTimeout(800)}
  await p.waitForTimeout(600)
  await p.screenshot({path:'/tmp/dk_'+name+'_story.png'})
  await b.close()
 }
 console.log('SHOTS DONE')
}
run().catch(e=>{console.error('FATAL',e.message);process.exit(1)})
