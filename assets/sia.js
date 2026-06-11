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
  // simple intersection reveal
  document.addEventListener('DOMContentLoaded',()=>{
    const obs=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.style.opacity=1;e.target.style.transform='none';obs.unobserve(e.target);}}),{threshold:.06});
    document.querySelectorAll('[data-reveal]').forEach((el,i)=>{el.style.opacity=0;el.style.transform='translateY(16px)';el.style.transition=`opacity .5s ${i*.04}s, transform .5s ${i*.04}s`;obs.observe(el);});
  });
})();
