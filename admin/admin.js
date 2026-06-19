import { firebaseConfig } from '../assets/js/firebase-config.js';
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js';
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js';
import { getFirestore, collection, addDoc, setDoc, doc, serverTimestamp, getDocs, getDoc, deleteDoc, query, orderBy } from 'https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'https://www.gstatic.com/firebasejs/10.12.5/firebase-storage.js';

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

const $ = id => document.getElementById(id);
const v = id => ($(id)?.value || '').trim();
const msg = t => $('status').textContent = t;
const cols = ['activities','donations','finances','dhamma','live','downloads','gallery','contact'];

onAuthStateChanged(auth, async u => {
  $('loginBox').style.display = u ? 'none' : 'block';
  $('adminBox').style.display = u ? 'block' : 'none';
  if (u) {
    await loadSite();
    await loadLists();
  }
});

$('loginBtn').onclick = () => signInWithEmailAndPassword(auth, v('email'), v('password')).catch(e => msg('เข้าไม่ได้: ' + e.message));
$('logoutBtn').onclick = () => signOut(auth);

async function uploadImage(fileInputId, folder='uploads') {
  const input = $(fileInputId);
  if (!input || !input.files || !input.files[0]) return '';
  const file = input.files[0];
  const safeName = file.name.replace(/[^\w.\-ก-๙]/g, '_');
  const path = `${folder}/${Date.now()}_${safeName}`;
  msg('กำลังอัปโหลดรูป...');
  const storageRef = ref(storage, path);
  await uploadBytes(storageRef, file);
  const url = await getDownloadURL(storageRef);
  msg('อัปโหลดรูปสำเร็จ');
  return url;
}

function showPreview(urlId, imgId){
  const url = v(urlId);
  const img = $(imgId);
  if (url) { img.src = url; img.style.display='block'; }
  else { img.removeAttribute('src'); img.style.display='none'; }
}
['hero','act','don','gen'].forEach(prefix=>{
  const urlId = prefix === 'hero' ? 'heroImage' : prefix + 'Image';
  const fileId = prefix + 'File';
  const previewId = prefix + 'Preview';
  if ($(urlId)) $(urlId).addEventListener('input', ()=>showPreview(urlId, previewId));
  if ($(fileId)) $(fileId).addEventListener('change', ()=>{
    const file = $(fileId).files[0];
    if (file) {
      $(previewId).src = URL.createObjectURL(file);
      $(previewId).style.display='block';
    }
  });
});

async function loadSite(){
  try{
    const snap = await getDoc(doc(db,'settings','site'));
    if(!snap.exists()) return;
    const s = snap.data();
    $('templeName').value = s.templeName || '';
    $('phone').value = s.phone || '';
    $('heroTitle').value = s.heroTitle || '';
    $('heroImage').value = s.heroImage || '';
    $('heroText').value = s.heroText || '';
    $('address').value = s.address || '';
    showPreview('heroImage','heroPreview');
  }catch(e){ msg('โหลดข้อมูลหน้าแรกไม่ได้: '+e.message); }
}

$('saveSite').onclick = async () => {
  try{
    let heroImage = v('heroImage');
    const uploaded = await uploadImage('heroFile','site');
    if(uploaded) { heroImage = uploaded; $('heroImage').value = uploaded; showPreview('heroImage','heroPreview'); }
    await setDoc(doc(db,'settings','site'),{
      templeName:v('templeName'), phone:v('phone'), heroTitle:v('heroTitle'), heroImage,
      heroText:v('heroText'), address:v('address'), updatedAt:serverTimestamp()
    },{merge:true});
    msg('บันทึกหน้าแรกแล้ว');
  }catch(e){ msg('บันทึกไม่ได้: '+e.message); }
};

window.saveActivity = async () => {
  try{
    let image = v('actImage');
    const uploaded = await uploadImage('actFile','activities');
    if(uploaded) { image = uploaded; $('actImage').value = uploaded; showPreview('actImage','actPreview'); }
    const data = {title:v('actTitle'),date:v('actDate'),image,description:v('actDesc'),category:'กิจกรรม',updatedAt:serverTimestamp()};
    const id = v('actEditId');
    if(id){ await setDoc(doc(db,'activities',id),data,{merge:true}); msg('แก้ไขกิจกรรมแล้ว'); }
    else { await addDoc(collection(db,'activities'),{...data,createdAt:serverTimestamp()}); msg('เพิ่มกิจกรรมแล้ว'); }
    clearActivity(); loadLists();
  }catch(e){ msg('บันทึกกิจกรรมไม่ได้: '+e.message); }
};

window.saveDonation = async () => {
  try{
    let image = v('donImage');
    const uploaded = await uploadImage('donFile','donations');
    if(uploaded) { image = uploaded; $('donImage').value = uploaded; showPreview('donImage','donPreview'); }
    const data = {title:v('donTitle'),image,target:Number(v('donTarget')||0),received:Number(v('donReceived')||0),description:v('donDesc'),updatedAt:serverTimestamp()};
    const id = v('donEditId');
    if(id){ await setDoc(doc(db,'donations',id),data,{merge:true}); msg('แก้ไขบอกบุญแล้ว'); }
    else { await addDoc(collection(db,'donations'),{...data,createdAt:serverTimestamp()}); msg('เพิ่มโครงการแล้ว'); }
    clearDonation(); loadLists();
  }catch(e){ msg('บันทึกบอกบุญไม่ได้: '+e.message); }
};

window.saveFinance = async () => {
  try{
    const data = {date:v('finDate'),title:v('finTitle'),type:v('finType'),amount:Number(v('finAmount')||0),updatedAt:serverTimestamp()};
    const id = v('finEditId');
    if(id){ await setDoc(doc(db,'finances',id),data,{merge:true}); msg('แก้ไขรายการการเงินแล้ว'); }
    else { await addDoc(collection(db,'finances'),{...data,createdAt:serverTimestamp()}); msg('เพิ่มรายการการเงินแล้ว'); }
    clearFinance(); loadLists();
  }catch(e){ msg('บันทึกรายการการเงินไม่ได้: '+e.message); }
};

window.saveOther = async () => {
  try{
    const col = v('genCol');
    let image = v('genImage');
    const uploaded = await uploadImage('genFile',col);
    if(uploaded) { image = uploaded; $('genImage').value = uploaded; showPreview('genImage','genPreview'); }
    const data = {title:v('genTitle'),url:v('genUrl'),image,description:v('genDesc'),updatedAt:serverTimestamp()};
    const id = v('genEditId');
    if(id){ await setDoc(doc(db,col,id),data,{merge:true}); msg('แก้ไขรายการแล้ว'); }
    else { await addDoc(collection(db,col),{...data,createdAt:serverTimestamp()}); msg('เพิ่มรายการแล้ว'); }
    clearOther(); loadLists();
  }catch(e){ msg('บันทึกรายการไม่ได้: '+e.message); }
};

window.del = async (col,id) => {
  if(confirm('ลบรายการนี้?')){
    try{ await deleteDoc(doc(db,col,id)); msg('ลบแล้ว'); loadLists(); }
    catch(e){ msg('ลบไม่ได้: '+e.message); }
  }
};

window.editItem = async (col,id) => {
  try{
    const snap = await getDoc(doc(db,col,id));
    if(!snap.exists()) return msg('ไม่พบข้อมูล');
    const x = snap.data();
    if(col==='activities'){
      $('actEditId').value=id; $('actTitle').value=x.title||''; $('actDate').value=x.date||''; $('actImage').value=x.image||''; $('actDesc').value=x.description||''; showPreview('actImage','actPreview'); $('actMode').textContent='โหมด: แก้ไข '+id; window.scrollTo({top:0,behavior:'smooth'});
    }else if(col==='donations'){
      $('donEditId').value=id; $('donTitle').value=x.title||''; $('donImage').value=x.image||''; $('donTarget').value=x.target||''; $('donReceived').value=x.received||''; $('donDesc').value=x.description||''; showPreview('donImage','donPreview'); $('donMode').textContent='โหมด: แก้ไข '+id; window.scrollTo({top:0,behavior:'smooth'});
    }else if(col==='finances'){
      $('finEditId').value=id; $('finDate').value=x.date||''; $('finTitle').value=x.title||''; $('finType').value=x.type||'รายรับ'; $('finAmount').value=x.amount||''; $('finMode').textContent='โหมด: แก้ไข '+id; window.scrollTo({top:0,behavior:'smooth'});
    }else{
      $('genCol').value=col; $('genEditId').value=id; $('genTitle').value=x.title||''; $('genUrl').value=x.url||''; $('genImage').value=x.image||''; $('genDesc').value=x.description||''; showPreview('genImage','genPreview'); $('genMode').textContent='โหมด: แก้ไข '+col+' / '+id; window.scrollTo({top:0,behavior:'smooth'});
    }
  }catch(e){ msg('โหลดข้อมูลเพื่อแก้ไขไม่ได้: '+e.message); }
};

window.clearActivity = () => { ['actEditId','actTitle','actDate','actImage','actDesc'].forEach(id=>$(id).value=''); $('actFile').value=''; $('actPreview').style.display='none'; $('actMode').textContent='โหมด: เพิ่มใหม่'; };
window.clearDonation = () => { ['donEditId','donTitle','donImage','donTarget','donReceived','donDesc'].forEach(id=>$(id).value=''); $('donFile').value=''; $('donPreview').style.display='none'; $('donMode').textContent='โหมด: เพิ่มใหม่'; };
window.clearFinance = () => { ['finEditId','finDate','finTitle','finAmount'].forEach(id=>$(id).value=''); $('finType').value='รายรับ'; $('finMode').textContent='โหมด: เพิ่มใหม่'; };
window.clearOther = () => { ['genEditId','genTitle','genUrl','genImage','genDesc'].forEach(id=>$(id).value=''); $('genFile').value=''; $('genPreview').style.display='none'; $('genMode').textContent='โหมด: เพิ่มใหม่'; };

async function getDocsSafe(col){
  try { return await getDocs(query(collection(db,col),orderBy('createdAt','desc'))); }
  catch(e) { return await getDocs(collection(db,col)); }
}
function line(col,d){
  const x=d.data();
  const title = x.title || x.date || x.description || d.id;
  const sub = col==='finances' ? `${x.type||''} ${x.amount||''}` : (x.url || x.date || '');
  const img = x.image ? `<img src="${x.image}" style="width:100%;max-height:120px;object-fit:cover;border-radius:8px;margin:8px 0">` : '';
  return `<div class="status-item"><b>${title}</b><br><span class="muted">${sub}</span>${img}<div class="admin-tools"><button class="btn mini" onclick="editItem('${col}','${d.id}')">แก้ไข</button><button class="btn mini danger" onclick="del('${col}','${d.id}')">ลบ</button></div></div>`;
}
async function loadLists(){
  let html='';
  for(const col of cols){
    try{
      const snap=await getDocsSafe(col);
      const rows=snap.docs.slice(0,20).map(d=>line(col,d)).join('');
      html+=`<div class="card"><h3>${col}</h3>${rows || '<p class="muted">ยังไม่มีข้อมูล</p>'}</div>`;
    }catch(e){
      html+=`<div class="card"><h3>${col}</h3><p>${e.message}</p></div>`;
    }
  }
  $('lists').innerHTML=html;
}
