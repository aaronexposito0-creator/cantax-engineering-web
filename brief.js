'use strict';
(()=>{
  const form=document.getElementById('brief-form');if(!form)return;
  const steps=[...document.querySelectorAll('[data-brief-step]')];const next=document.getElementById('brief-next');const back=document.getElementById('brief-back');
  const pct=document.getElementById('brief-progress');const num=document.getElementById('brief-step-num');const status=document.getElementById('brief-status');
  let step=0;let briefText='';
  function display(i){step=i;steps.forEach((el,n)=>{el.hidden=n!==i;});pct.style.width=((i+1)/steps.length*100)+'%';num.textContent=`Step ${i+1} of ${steps.length}`;
    back.hidden=i===0;next.hidden=i===steps.length-1;status.hidden=true;
    if(i===steps.length-1)showReview();
    const heading=steps[i].querySelector('h2');if(heading)heading.setAttribute('tabindex','-1');
  }
  function msg(t){status.textContent=t;status.hidden=false;}
  function validate(i){if(i===0){if(!form.querySelector('input[name="service"]:checked')){msg('Choose a service to continue.');return false;}}
    if(i===1){const detail=form.elements.namedItem('description');if(!detail.value.trim()||detail.value.trim().length<20){msg('Describe the project in at least 20 characters.');detail.focus();return false;}}
    if(i===2){for(const id of ['contactName','contactEmail']){const field=document.getElementById(id);if(!field.checkValidity()){field.reportValidity();msg('Please complete the required contact details.');return false;}}}
    return true;}
  next.addEventListener('click',()=>{if(validate(step))display(step+1);});back.addEventListener('click',()=>display(Math.max(step-1,0)));
  form.addEventListener('submit',e=>e.preventDefault());
  function value(name){const item=form.elements.namedItem(name);return item?.value?.trim()||'Not specified';}
  function generate(){const s=value('service');const details=value('description');const dest=value('formats');const timeline=value('timeline');const use=value('application');const constraints=value('constraints');
    const person=value('contactName'), company=value('company'), email=value('contactEmail'),country=value('country');
    return `CANTAX ENGINEERING — PROJECT ENQUIRY\n\nSERVICE: ${s}\nAPPLICATION: ${use}\nREQUIRED FILE FORMATS: ${dest}\nDESIRED TIMELINE: ${timeline}\n\nPROJECT DESCRIPTION:\n${details}\n\nCONSTRAINTS / ADDITIONAL NOTES:\n${constraints}\n\nCONTACT NAME: ${person}\nCOMPANY: ${company}\nEMAIL: ${email}\nCOUNTRY: ${country}\n\nThis is an initial scoping enquiry, not an order or an engineering certification.\nNo source files are transmitted through this website.`;}
  function showReview(){briefText=generate();const fields=[['Service',value('service')],['Application',value('application')],['Formats',value('formats')],['Timeline',value('timeline')],['Description',value('description')],['Constraints',value('constraints')],['Name',value('contactName')],['Company',value('company')],['Email',value('contactEmail')],['Country',value('country')]];
    const dl=document.getElementById('brief-review');dl.replaceChildren();fields.forEach(([k,v])=>{const dt=document.createElement('dt'),dd=document.createElement('dd');dt.textContent=k;dd.textContent=v;dl.append(dt,dd);});
    const dest=String(window.CANTAX_CONTACT_EMAIL||'').trim();const valid=/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(dest);
    const mail=document.getElementById('brief-mail');mail.hidden=!valid;
    if(valid){const subject=`CAD project enquiry — ${value('service')}`;mail.href=`mailto:${dest}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(briefText.slice(0,3600))}`;}
    document.getElementById('brief-mail-warning').hidden=valid;
  }
  document.getElementById('brief-copy').addEventListener('click',async()=>{try{if(navigator.clipboard?.writeText)await navigator.clipboard.writeText(briefText);else{const t=document.createElement('textarea');t.value=briefText;document.body.appendChild(t);t.select();document.execCommand('copy');t.remove();}msg('Enquiry copied to clipboard.');}catch{msg('Copy was blocked by your browser. Use Download to save the text.');}});
  document.getElementById('brief-download').addEventListener('click',()=>{const blob=new Blob([briefText],{type:'text/plain;charset=utf-8'});const u=URL.createObjectURL(blob);const a=document.createElement('a');a.href=u;a.download='CantaX-project-enquiry.txt';document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(u),2000);msg('Your enquiry was downloaded. No data was sent.');});
  display(0);
})();
