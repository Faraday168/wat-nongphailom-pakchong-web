import { firebaseConfig } from './firebase-config.js';
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js';
import { getFirestore, collection, getDocs, getDoc, doc, query, orderBy, limit } from 'https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js';

let db=null;
try{ const app=initializeApp(firebaseConfig); db=getFirestore(app); }catch(e){ console.warn('Firebase not configured yet', e); }

async function getSite(){
  if(!db) return null;
  try{ const s=await getDoc(doc(db,'settings','site')); return s.exists()?s.data():null; }catch(e){return null;}
}
async function list(name,n=20){
  if(!db) return [];
  try{ const snap=await getDocs(query(collection(db,name), orderBy('createdAt','desc'), limit(n))); return snap.docs.map(d=>({id:d.id,...d.data()})); }catch(e){return [];}
}
function replaceText(find, value){
  if(!value) return;
  document.querySelectorAll('h1,h2,h3,h4,p,span,div,a,button').forEach(el=>{
    if(el.childNodes.length===1 && el.textContent.trim()===find) el.textContent=value;
  });
}
function setByContains(selector, contains, value){
  if(!value) return;
  document.querySelectorAll(selector).forEach(el=>{ if(el.textContent.includes(contains)) el.textContent=value; });
}
function card(item){
  return `<article style="background:#fff;border:1px solid #e9e1dc;border-radius:14px;overflow:hidden"><img src="${item.image||''}" style="width:100%;height:190px;object-fit:cover;background:#eee" onerror="this.style.display='none'"><div style="padding:20px"><b style="color:#735c00">${item.category||''}</b><h3 style="margin:8px 0;color:#1e1b18">${item.title||''}</h3><p style="color:#4d4635;line-height:1.7">${item.description||''}</p><small>${item.date||''}</small></div></article>`;
}
function injectSection(title, items){
  if(!items.length) return;
  const main=document.querySelector('main')||document.body;
  const sec=document.createElement('section');
  sec.style.cssText='max-width:1120px;margin:80px auto;padding:0 24px';
  sec.innerHTML=`<h2 style="font-size:32px;color:#735c00;margin-bottom:24px">${title}</h2><div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:24px">${items.map(card).join('')}</div>`;
  main.appendChild(sec);
}

(async()=>{
  const site=await getSite();
  if(site){
    replaceText('วัดหนองไผ่ล้อม ปากช่อง', site.templeName||'วัดหนองไผ่ล้อม ปากช่อง');
    setByContains('h1','สถานที่พักพิง', site.heroTitle);
    setByContains('p','สัมผัสภูมิปัญญา', site.heroText);
  }
  const path=location.pathname;
  if(path.endsWith('activities.html')) injectSection('กิจกรรมจากระบบหลังบ้าน', await list('activities',50));
  if(path.endsWith('donation.html')) injectSection('โครงการบอกบุญจากระบบหลังบ้าน', await list('donations',50));
  if(path.endsWith('dhamma.html')) injectSection('คลังธรรมะจากระบบหลังบ้าน', await list('dhamma',50));
    if(path.endsWith('contact.html')){
    replaceText('ยังไม่ได้ตั้งค่า Firebase', site?.address || 'ยังไม่ได้ตั้งค่าที่อยู่');
  }
})();
