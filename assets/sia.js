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
  // ---- Shared value model (gisements de bénéfices) — utilisé par ROI & Monte-Carlo ----
  // Hypothèses de valorisation partagées (persistées sous 'roi.params')
  const PARAM_DEF={portage:5,salEmp:150,salCadre:300,energie:100,rendement:100,arret:100,transport:100};
  // base = gain annuel K MAD aux hypothèses par défaut ; cat = hypothèse pilote
  const BENEFITS={
   1:[{l:"Réduction des arrêts non planifiés",h:"-30% d'arrêts ; coût d'arrêt turbine élevé en campagne",base:250,cat:"arret"},
      {l:"Baisse de la maintenance corrective",h:"Curatif → préventif planifié",base:100,cat:"generic"}],
   2:[{l:"Gain de rendement d'extraction",h:"+2 pts valorisés sur le tonnage (prix du sucre)",base:450,cat:"rendement"},
      {l:"Réduction consommation vapeur",h:"Pilotage fin diffusion/cristallisation",base:150,cat:"energie"}],
   3:[{l:"Optimisation planning de broyage & appro",h:"Prévision tonnage → logistique amont lissée",base:180,cat:"generic"},
      {l:"Réduction des pertes (saccharose)",h:"Récolte/transport synchronisés",base:70,cat:"generic"}],
   4:[{l:"Réduction du coût de stock (BFR)",h:"-15% de stock × coût de portage sur l'encours sucre",base:250,cat:"portage"},
      {l:"Réduction des ruptures / ventes perdues",h:"Meilleur taux de service B2B/B2C",base:150,cat:"generic"}],
   5:[{l:"Temps de saisie comptable évité",h:"≈1,5 ETP comptable libéré",base:130,cat:"etpEmp"},
      {l:"Escomptes & pénalités de retard évités",h:"Délais P2P raccourcis",base:50,cat:"generic"}],
   6:[{l:"Tickets RH N1 absorbés",h:"-40% → ≈1 ETP RH redéployé",base:120,cat:"etpEmp"},
      {l:"Temps collaborateurs gagné",h:"Réponses RH instantanées 24/7",base:100,cat:"generic"}],
   7:[{l:"Réduction de la facture énergétique",h:"-8% sur la facture vapeur+électricité",base:300,cat:"energie"}],
   8:[{l:"Temps de revue juridique évité",h:"-50% → ≈0,8 ETP juriste (cadre)",base:100,cat:"etpCadre"},
      {l:"Risques contractuels réduits",h:"Échéances/clauses sécurisées",base:50,cat:"generic"}],
   9:[{l:"Coûts de remplacement évités",h:"-12% turnover × coût recrutement+formation",base:150,cat:"etpCadre"},
      {l:"Réduction de l'absentéisme",h:"Détection précoce, actions ciblées",base:50,cat:"generic"}],
   10:[{l:"Réduction des coûts de transport",h:"-14% sur le poste transport",base:250,cat:"transport"},
      {l:"Optimisation du taux de remplissage",h:"Tournées & chargements optimisés",base:100,cat:"generic"}],
  };
  function scale(params,cat){
    switch(cat){
      case"portage":return params.portage/PARAM_DEF.portage;
      case"etpEmp":return params.salEmp/PARAM_DEF.salEmp;
      case"etpCadre":return params.salCadre/PARAM_DEF.salCadre;
      case"rendement":return params.rendement/100;
      case"energie":return params.energie/100;
      case"arret":return params.arret/100;
      case"transport":return params.transport/100;
      default:return 1;
    }
  }
  window.COSUMAR_VALUE={
    PARAM_DEF, BENEFITS,
    loadParams(){ return Object.assign({},PARAM_DEF, window.store.get('roi.params',{})); },
    saveParams(p){ window.store.set('roi.params',p); },
    benefitLines(params,ucId){ return (BENEFITS[ucId]||[]).map(l=>({...l,v:Math.round(l.base*scale(params,l.cat))})); },
    benefitTotal(params,ucId){ return this.benefitLines(params,ucId).reduce((a,l)=>a+l.v,0); }
  };
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
