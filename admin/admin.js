
import { firebaseConfig } from '../assets/js/firebase-config.js';
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js';
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js';
import { getFirestore, collection, addDoc, setDoc, doc, serverTimestamp, getDocs, getDoc, deleteDoc, query, orderBy } from 'https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js';
const app=initializeApp(firebaseConfig), auth=getAuth(app), db=getFirestore(app);
const $=id=>document.getElementById(id), v=id=>($(id)?.value||'').trim(), msg=t=>$('status').textContent=t;
const cols=['activities','donations','finances','dhamma','live','downloads','gallery','contact'];
const names={activities:'กิจกรรม',donations:'บอกบุญ',finances:'รายงานการเงิน',dhamma:'คลังธรรมะ',live:'ถ่ายทอดสด',downloads:'ดาวน์โหลด',gallery:'แกลเลอรี',contact:'ติดต่อ'};
onAuthStateChanged(auth,async u=>{$('loginBox').style.display=u?'none':'block';$('adminBox').style.display=u?'block':'none';if(u){await loadSite();await loadLists();}});
$('loginBtn').onclick=()=>signInWithEmailAndPassword(auth,v('email'),v('password')).catch(e=>msg('เข้าไม่ได้: '+e.message));
$('logoutBtn').onclick=()=>signOut(auth);
['heroImage','image'].forEach(id=>$(id).addEventListener('input',()=>preview(id,id==='image'?'preview':'heroPreview')));
function preview(inputId,imgId){const url=v(inputId), img=$(imgId); if(url){img.src=url;img.style.display='block'}else img.style.display='none'}
async function loadSite(){try{const s=await getDoc(doc(db,'settings','site')); if(!s.exists())return; const x=s.data(); ['templeName','phone','heroTitle','heroImage','heroText','address'].forEach(id=>$(id).value=x[id]||''); preview('heroImage','heroPreview')}catch(e){msg('โหลดข้อมูลวัดไม่ได้: '+e.message)}}
$('saveSite').onclick=async()=>{try{await setDoc(doc(db,'settings','site'),{templeName:v('templeName'),phone:v('phone'),heroTitle:v('heroTitle'),heroImage:v('heroImage'),heroText:v('heroText'),address:v('address'),updatedAt:serverTimestamp()},{merge:true});msg('บันทึกข้อมูลวัดแล้ว')}catch(e){msg('บันทึกไม่ได้: '+e.message)}};
$('saveItem').onclick=async()=>{try{const col=v('col'), id=v('editId'); const data={title:v('title'),date:v('date'),type:v('type'),amount:Number(v('amount')||0),image:v('image'),url:v('url'),target:Number(v('target')||0),received:Number(v('received')||0),description:v('description'),updatedAt:serverTimestamp()}; if(id){await setDoc(doc(db,col,id),data,{merge:true});msg('แก้ไขแล้ว')}else{await addDoc(collection(db,col),{...data,createdAt:serverTimestamp()});msg('เพิ่มรายการแล้ว')} clearForm();loadLists()}catch(e){msg('บันทึกไม่ได้: '+e.message)}};
$('clearForm').onclick=clearForm;
function clearForm(){['editId','title','date','amount','image','url','target','received','description'].forEach(id=>$(id).value='');$('type').value='รายรับ';$('mode').textContent='โหมด: เพิ่มใหม่';$('preview').style.display='none'}
async function getDocsSafe(col){try{return await getDocs(query(collection(db,col),orderBy('createdAt','desc')))}catch(e){return await getDocs(collection(db,col))}}
window.editItem=async(col,id)=>{const s=await getDoc(doc(db,col,id)); if(!s.exists())return; const x=s.data(); $('col').value=col;$('editId').value=id;['title','date','type','amount','image','url','target','received','description'].forEach(k=>$(k).value=x[k]??'');preview('image','preview');$('mode').textContent='โหมด: แก้ไข '+names[col];window.scrollTo({top:0,behavior:'smooth'})};
window.delItem=async(col,id)=>{if(confirm('ลบรายการนี้?')){await deleteDoc(doc(db,col,id));msg('ลบแล้ว');loadLists()}};
function item(col,d){const x=d.data();return `<div class="item">${x.image?`<img src="${x.image}" onerror="this.style.display='none'">`:''}<b>${x.title||x.date||d.id}</b><p>${x.description||''}</p><small>${x.url||''}</small><div class="tools"><button class="btn small" onclick="editItem('${col}','${d.id}')">แก้ไข</button><button class="btn small danger" onclick="delItem('${col}','${d.id}')">ลบ</button></div></div>`}
async function loadLists(){let html=''; for(const col of cols){try{const snap=await getDocsSafe(col);html+=`<div class="card"><h3>${names[col]}</h3>${snap.docs.map(d=>item(col,d)).join('')||'<p>ยังไม่มีข้อมูล</p>'}</div>`}catch(e){html+=`<div class="card"><h3>${names[col]}</h3><p>${e.message}</p></div>`}} $('lists').innerHTML=html}
