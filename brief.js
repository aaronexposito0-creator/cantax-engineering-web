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
  // Online intake is OFF until the studio obtains a Web3Forms access key and
  // verifies the first genuine delivery. Its access key is public by design.
  const onlineKey=String(window.CANTAX_WEB3FORMS_ACCESS_KEY||'').trim();
  const onlineReady=/^[a-zA-Z0-9-]{16,100}$/.test(onlineKey);
  const onlineControls=document.getElementById('brief-online-controls');
  const unavailable=document.getElementById('brief-online-unavailable');
  if(onlineControls)onlineControls.hidden=!onlineReady;
  if(unavailable)unavailable.hidden=onlineReady;
  const onlineButton=document.getElementById('brief-send-online');
  if(onlineButton && onlineReady){
    onlineButton.addEventListener('click',async()=>{
      const consent=document.getElementById('brief-online-consent');
      const notice=document.getElementById('brief-online-status');
      const show=(t)=>{notice.textContent=t;notice.hidden=false;};
      if(!consent.checked){show('Please read the privacy notice and check the consent box.');consent.focus();return;}
      if(!form.elements.namedItem('description').value.trim() || !document.getElementById('contactName').checkValidity() || !document.getElementById('contactEmail').checkValidity()){
        show('Your contact details or project description are incomplete. Please go back and check them.');return;
      }
      const data={
        access_key:onlineKey,
        subject:'CantaX Engineering — '+value('service').slice(0,100),
        from_name:'CantaX website project enquiry',
        name:value('contactName').slice(0,150),
        email:value('contactEmail').slice(0,180),
        company:value('company').slice(0,160),
        country:value('country').slice(0,120),
        service:value('service').slice(0,100),
        application:value('application').slice(0,100),
        formats:value('formats').slice(0,100),
        timeline:value('timeline').slice(0,100),
        message:generate().slice(0,6500),
        botcheck:''
      };
      onlineButton.disabled=true;
      show('Submitting your enquiry securely…');
      try{
        const controller=new AbortController();
        const timer=setTimeout(()=>controller.abort(),15000);
        let response;
        try{
          response=await fetch('https://api.web3forms.com/submit',{
            method:'POST',headers:{'Content-Type':'application/json','Accept':'application/json'},
            body:JSON.stringify(data),signal:controller.signal
          });
        }finally{clearTimeout(timer);}
        const answer=await response.json();
        if(!response.ok||!answer.success)throw new Error('The delivery provider could not accept the request.');
        show('Your enquiry was accepted by the submission service. Please retain a copy. Email delivery to CantaX may still require confirmation.');
        onlineButton.textContent='Submitted to provider ✓';
      }catch{
        show('Online submission could not be confirmed. Your details are still on this page; please use “Open email app” or “Copy enquiry” instead.');
        onlineButton.disabled=false;
      }
    });
  }
  display(0);
})();
