/* Shared helpers — Sia x Cosumar toolkit */
(function(){
  // Toast
  window.toast = function(msg){
    let t = document.getElementById('toast');
    if(!t){ t=document.createElement('div'); t.id='toast'; document.body.appendChild(t); }
    t.textContent = msg;
    t.classList.add('show');
    clearTimeout(window.__toastT);
    window.__toastT = setTimeout(()=>t.classList.remove('show'), 3200);
  };
  // CSV download
  window.downloadCSV = function(filename, rows){
    const esc = v => '"'+String(v??'').replace(/"/g,'""')+'"';
    const csv = rows.map(r=>r.map(esc).join(',')).join('\r\n');
    const blob = new Blob(['﻿'+csv], {type:'text/csv;charset=utf-8;'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href=url; a.download=filename; a.click();
    URL.revokeObjectURL(url);
    window.toast && window.toast('Export '+filename+' généré');
  };
  // localStorage state
  window.store = {
    get(k,def){ try{ const v=localStorage.getItem('cosumar.'+k); return v?JSON.parse(v):def; }catch(e){ return def; } },
    set(k,v){ try{ localStorage.setItem('cosumar.'+k, JSON.stringify(v)); }catch(e){} }
  };
  // MAD formatter
  window.fmtMAD = n => new Intl.NumberFormat('fr-FR').format(Math.round(n))+' MAD';
  window.fmtK = n => (n/1000).toLocaleString('fr-FR',{maximumFractionDigits:0})+'K';
  // ---- Global mission state: export / import all cosumar.* keys ----
  window.exportMissionState = function(){
    const data={_meta:{app:'Sia x Cosumar — Roadmap IA',exported:new Date().toISOString(),version:1},keys:{}};
    for(let i=0;i<localStorage.length;i++){
      const k=localStorage.key(i);
      if(k && k.startsWith('cosumar.')){ try{ data.keys[k]=JSON.parse(localStorage.getItem(k)); }catch(e){ data.keys[k]=localStorage.getItem(k); } }
    }
    const blob=new Blob([JSON.stringify(data,null,2)],{type:'application/json'});
    const url=URL.createObjectURL(blob);
    const a=document.createElement('a');
    const d=new Date().toISOString().slice(0,10);
    a.href=url; a.download='Cosumar_Mission_'+d+'.json'; a.click();
    URL.revokeObjectURL(url);
    window.toast && window.toast('Sauvegarde mission exportée ('+Object.keys(data.keys).length+' éléments)');
  };
  window.importMissionState = function(file, cb){
    const r=new FileReader();
    r.onload=e=>{
      try{
        const data=JSON.parse(e.target.result);
        const keys=data.keys||data;
        let n=0;
        Object.entries(keys).forEach(([k,v])=>{ if(k.startsWith('cosumar.')){ localStorage.setItem(k,JSON.stringify(v)); n++; } });
        window.toast && window.toast(n+' éléments restaurés — rechargement…');
        cb && cb(n);
      }catch(err){ window.toast && window.toast('Fichier invalide'); }
    };
    r.readAsText(file);
  };
  window.resetMissionState = function(){
    const ks=[]; for(let i=0;i<localStorage.length;i++){ const k=localStorage.key(i); if(k&&k.startsWith('cosumar.')) ks.push(k); }
    ks.forEach(k=>localStorage.removeItem(k));
    window.toast && window.toast('État mission réinitialisé');
  };
  // simple intersection reveal
  document.addEventListener('DOMContentLoaded',()=>{
    const obs=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.style.opacity=1;e.target.style.transform='none';obs.unobserve(e.target);}}),{threshold:.06});
    document.querySelectorAll('[data-reveal]').forEach((el,i)=>{el.style.opacity=0;el.style.transform='translateY(16px)';el.style.transition=`opacity .5s ${i*.04}s, transform .5s ${i*.04}s`;obs.observe(el);});
  });
})();
