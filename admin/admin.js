import { firebaseConfig } from '../assets/js/firebase-config.js';
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js';
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js';
import { getFirestore, collection, addDoc, setDoc, doc, serverTimestamp, getDocs, deleteDoc, query, orderBy } from 'https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js';
const app=initializeApp(firebaseConfig), auth=getAuth(app), db=getFirestore(app);
const $=id=>document.getElementById(id); const v=id=>$(id).value.trim(); const msg=t=>$('status').textContent=t;
onAuthStateChanged(auth,u=>{ $('loginBox').style.display=u?'none':'block'; $('adminBox').style.display=u?'block':'none'; if(u) loadLists(); });
$('loginBtn').onclick=()=>signInWithEmailAndPassword(auth,v('email'),v('password')).catch(e=>msg('เข้าไม่ได้: '+e.message)); $('logoutBtn').onclick=()=>signOut(auth);
$('saveSite').onclick=async()=>{await setDoc(doc(db,'settings','site'),{templeName:v('templeName'),phone:v('phone'),heroTitle:v('heroTitle'),heroImage:v('heroImage'),heroText:v('heroText'),address:v('address')},{merge:true});msg('บันทึกหน้าแรกแล้ว');};
window.addGeneric=async(col,p)=>{await addDoc(collection(db,col),{title:v(p+'Title'),date:v(p+'Date'),image:v(p+'Image'),description:v(p+'Desc'),category:'กิจกรรม',createdAt:serverTimestamp()});msg('เพิ่มข้อมูลแล้ว');loadLists();};
window.addDonation=async()=>{await addDoc(collection(db,'donations'),{title:v('donTitle'),image:v('donImage'),target:Number(v('donTarget')||0),received:Number(v('donReceived')||0),description:v('donDesc'),createdAt:serverTimestamp()});msg('เพิ่มโครงการแล้ว');loadLists();};
window.addFinance=async()=>{await addDoc(collection(db,'finances'),{date:v('finDate'),title:v('finTitle'),type:v('finType'),amount:Number(v('finAmount')||0),createdAt:serverTimestamp()});msg('เพิ่มรายการการเงินแล้ว');loadLists();};
window.addOther=async()=>{await addDoc(collection(db,v('genCol')),{title:v('genTitle'),url:v('genUrl'),description:v('genDesc'),createdAt:serverTimestamp()});msg('เพิ่มรายการแล้ว');loadLists();};
window.del=async(col,id)=>{if(confirm('ลบรายการนี้?')){await deleteDoc(doc(db,col,id));loadLists();}};
async function loadLists(){ const cols=['activities','donations','finances','dhamma','live','downloads','gallery','contact']; let html=''; for(const col of cols){try{const snap=await getDocs(query(collection(db,col),orderBy('createdAt','desc'))); html+=`<div class="card"><h3>${col}</h3>`+snap.docs.slice(0,10).map(d=>`<div class="status"><b>${d.data().title||d.data().date||d.id}</b><br><button onclick="del('${col}','${d.id}')">ลบ</button></div>`).join('')+'</div>';}catch(e){html+=`<div class="card"><h3>${col}</h3><p>${e.message}</p></div>`}} $('lists').innerHTML=html;}
