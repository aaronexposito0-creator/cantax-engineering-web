'use strict';
(function(){
  const menu = document.querySelector('[data-mobile-toggle]');
  const mobile = document.querySelector('#mobile-nav');
  if (menu && mobile) {
    function closeMenu(){menu.setAttribute('aria-expanded','false'); mobile.classList.remove('open');}
    menu.addEventListener('click',()=>{let expanded=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(expanded));mobile.classList.toggle('open',expanded);});
    mobile.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
    document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu();});
  }
  document.querySelectorAll('[data-year]').forEach(el=>el.textContent=String(new Date().getFullYear()));
  const cadence=document.querySelector('[data-assembly-viewer]');
  if(cadence){cadence.querySelectorAll('[data-view]').forEach(btn=>btn.addEventListener('click',()=>{
    let exploded=btn.dataset.view==='exploded';cadence.querySelector('.cad-render').classList.toggle('is-exploded',exploded);
    cadence.querySelectorAll('[data-view]').forEach(el=>el.setAttribute('aria-pressed',String(el===btn)));
  }));}
  const tabs=document.querySelectorAll('[role="tab"][data-service-tab]');
  if(tabs.length){tabs.forEach(tab=>tab.addEventListener('click',()=>activateTab(tab)));
    function activateTab(target){tabs.forEach(t=>{let a=t===target;t.setAttribute('aria-selected',String(a));t.tabIndex=a?0:-1;});
      document.querySelectorAll('[role="tabpanel"][data-service-panel]').forEach(p=>p.hidden=p.dataset.servicePanel!==target.dataset.serviceTab);
      history.replaceState(null,'','#'+target.dataset.serviceTab);
    }
    tabs.forEach((tab,index)=>tab.addEventListener('keydown',e=>{if(['ArrowDown','ArrowRight','ArrowUp','ArrowLeft','Home','End'].includes(e.key)){
      e.preventDefault();let n=index;if(e.key==='Home')n=0;else if(e.key==='End')n=tabs.length-1;else n=(index+((e.key==='ArrowDown'||e.key==='ArrowRight')?1:-1)+tabs.length)%tabs.length;
      tabs[n].focus();activateTab(tabs[n]);
    }}));
    let initial=decodeURIComponent(location.hash.replace('#',''));
    const target=[...tabs].find(t=>t.dataset.serviceTab===initial);if(target)activateTab(target);
  }
  document.querySelectorAll('[data-filter]').forEach(b=>b.addEventListener('click',()=>{
    const val=b.dataset.filter;
    document.querySelectorAll('[data-filter]').forEach(x=>x.setAttribute('aria-pressed',String(x===b)));
    document.querySelectorAll('[data-category]').forEach(c=>c.classList.toggle('hidden-by-filter',val!=='all'&&!c.dataset.category.split(' ').includes(val)));
  }));
  // Official CantaX Engineering LinkedIn page (public company ID).
  const linkedinUrl='https://www.linkedin.com/company/146767950/';
  document.querySelectorAll('.footer-col').forEach(col=>{
    if(!col.querySelector('h4') || col.querySelector('h4').textContent.trim()!=='Work together')return;
    if(col.querySelector('[data-cantax-linkedin]'))return;
    const link=document.createElement('a');
    link.href=linkedinUrl;link.target='_blank';link.rel='noopener noreferrer';
    link.textContent='LinkedIn ↗';link.setAttribute('aria-label','CantaX Engineering on LinkedIn (opens new tab)');
    link.dataset.cantaxLinkedin='';col.appendChild(link);
  });
  const contactGrid=document.querySelector('.contact-grid');
  if(contactGrid && !contactGrid.querySelector('[data-cantax-linkedin]')){
    const link=document.createElement('a');link.href=linkedinUrl;link.target='_blank';link.rel='noopener noreferrer';
    link.textContent='Connect on LinkedIn ↗';link.dataset.cantaxLinkedin='';link.className='contact-address';
    contactGrid.querySelector('.contact-tile:last-child')?.appendChild(link);
  }
  const contact=String(window.CANTAX_CONTACT_EMAIL||'').trim();
  const valid=/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact);
  document.querySelectorAll('[data-contact-link]').forEach(a=>{
    if(valid){a.href='mailto:'+contact;a.textContent=contact;}
    else{a.textContent='Contact address to be confirmed';a.removeAttribute('href');a.classList.add('pending');}
  });
  document.querySelectorAll('[data-contact-availability]').forEach(e=>{e.textContent=valid?contact:'Contact email is currently unavailable.';});
})();
