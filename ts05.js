/* TS-05 · Open, independent, one-dimensional tolerance-stack study.
   Demonstration only; no manufacturing/process capability claim. */
(function(root){
'use strict';
function calc(parts,lo,hi,samples=12000,seed=20261020){
  if(!Array.isArray(parts)||!parts.length||parts.length>16)throw Error('Enter 1–16 dimensions.');
  const x=parts.map((p,i)=>{
    const name=String(p.name||'').trim(), n=Number(p.nominal),t=Number(p.tol),sign=p.sign;
    if(!name||name.length>100)throw Error('Dimension '+(i+1)+' needs a short label.');
    if(String(p.nominal).trim()===''||String(p.tol).trim()===''||!Number.isFinite(n)||!Number.isFinite(t)||n<0||n>10000||t<0||t>n)throw Error('Invalid nominal/tolerance for '+name+'. Values: nominal 0–10000, tolerance 0–nominal mm.');
    if(sign!==1&&sign!==-1)throw Error('Sign must be +1 or -1.');
    return {name,nominal:n,tol:t,sign};
  });
  lo=Number(lo);hi=Number(hi);
  if(!Number.isFinite(lo)||!Number.isFinite(hi)||lo>=hi)throw Error('Acceptance limits must be two numbers with lower < upper.');
  if(!Number.isInteger(samples)||samples<100||samples>100000)throw Error('Sample count out of range.');
  const nominal=x.reduce((a,p)=>a+p.sign*p.nominal,0);
  const sumTol=x.reduce((a,p)=>a+p.tol,0);
  const sigma=Math.sqrt(x.reduce((a,p)=>a+p.tol*p.tol/3,0));
  let state=seed>>>0;function rnd(){state=(Math.imul(1664525,state)+1013904223)>>>0;return state/4294967296;}
  const hist=Array(20).fill(0),values=[];let out=0;
  for(let k=0;k<samples;k++){
    let v=nominal;
    for(const p of x)v+=p.sign*p.tol*(2*rnd()-1);
    values.push(v);if(v<lo||v>hi)out++;
    const bucket=sumTol?Math.floor((v-(nominal-sumTol))/(2*sumTol)*20):10;
    hist[Math.max(0,Math.min(19,bucket))]++;
  }
  values.sort((a,b)=>a-b);
  return {nominal,min:nominal-sumTol,max:nominal+sumTol,sigma,out,rate:out/samples,samples,
    p05:values[Math.floor(.05*(samples-1))],p95:values[Math.floor(.95*(samples-1))],
    hist,parts:x,lo,hi};
}
const api={calc};if(typeof module!=='undefined'&&module.exports)module.exports=api;
if(root)root.CantaXStack=api;
if(typeof document==='undefined')return;
const start=()=>{
const tbody=document.querySelector('#ts-rows'),status=document.querySelector('#ts-status'),exportBtn=document.querySelector('#ts-export');
if(!tbody||!status)return;
let last=null;
function row(name,sign,nominal,tol){
 const tr=document.createElement('tr');
 const cells=[['text',name],['sign',sign],['number',nominal],['number',tol]];
 cells.forEach(([type,value],i)=>{
   const td=document.createElement('td'),el=document.createElement(type==='sign'?'select':'input');
   if(type==='sign'){for(const [v,title] of [['1','+ add'],['-1','− subtract']]){const o=document.createElement('option');o.value=v;o.textContent=title;el.append(o);}el.value=String(value);}
   else{el.type=type;el.value=String(value);if(type==='number'){el.step='any';el.min='0';el.max='10000';}else{el.maxLength=100;}}
   el.setAttribute('aria-label',['Dimension name','Signed contribution','Nominal millimetres','Symmetric tolerance millimetres'][i]);td.append(el);tr.append(td);
 });
 const td=document.createElement('td'),btn=document.createElement('button');btn.type='button';btn.textContent='×';btn.setAttribute('aria-label','Remove dimension row');
 btn.className='remove';btn.addEventListener('click',()=>{tr.remove();markStale();});td.append(btn);tr.append(td);tbody.append(tr);
}
function markStale(){last=null;exportBtn.disabled=true;status.textContent='Inputs edited. Run analysis to update results.';}
tbody.addEventListener('input',markStale);
function example(){tbody.replaceChildren();row('Housing shoulder',1,50,.1);row('Shaft reach',-1,20,.05);row('Spacer stack',-1,29.5,.03);document.querySelector('#ts-low').value='.35';document.querySelector('#ts-high').value='.65';analyse();}
function read(){return [...tbody.querySelectorAll('tr')].map(tr=>{const inputs=tr.querySelectorAll('input,select');return {name:inputs[0].value,sign:Number(inputs[1].value),nominal:inputs[2].value,tol:inputs[3].value};});}
function write(id,s){document.getElementById(id).textContent=s;}
const mm=n=>n.toFixed(3)+' mm';
function analyse(){
try{
 const a=calc(read(),document.querySelector('#ts-low').value,document.querySelector('#ts-high').value);
 last=a;exportBtn.disabled=false;
 write('ts-nominal',mm(a.nominal));write('ts-range',mm(a.min)+' … '+mm(a.max));
 write('ts-sigma',mm(a.sigma));write('ts-reject',(100*a.rate).toFixed(2)+'%');
 write('ts-detail','Simulated 5th–95th percentiles: '+mm(a.p05)+' to '+mm(a.p95)+'; '+a.out+' of '+a.samples+' samples outside limits.');
 const chart=document.getElementById('ts-hist');chart.replaceChildren();const max=Math.max(...a.hist,1);
 a.hist.forEach((count,i)=>{const bar=document.createElement('div');bar.className='bar';bar.style.height=Math.max(2,100*count/max)+'%';bar.title='Bin '+(i+1)+': '+count+' samples';chart.append(bar);});
 status.textContent='Completed locally. No input was uploaded or transmitted.';
}catch(e){
 last=null;exportBtn.disabled=true;status.textContent=e.message;
 for(const id of ['ts-nominal','ts-range','ts-sigma','ts-reject','ts-detail'])write(id,'—');
 document.getElementById('ts-hist').replaceChildren();
}}
document.querySelector('#ts-add').addEventListener('click',()=>{if(tbody.rows.length>=16){status.textContent='Maximum 16 dimensions.';return;}row('New dimension',1,1,.05);markStale();});
document.querySelector('#ts-example').addEventListener('click',example);
document.querySelector('#ts-run').addEventListener('click',analyse);
for(const id of ['ts-low','ts-high'])document.getElementById(id).addEventListener('input',markStale);
function cell(v){let s=String(v??'');if(/^[=+\-@\t\r]/.test(s))s="'"+s;return '"'+s.replace(/"/g,'""')+'"';}
exportBtn.addEventListener('click',()=>{
 if(!last)return;
 const out=['Record,Label,Sign,Nominal_or_result_mm,Tolerance_mm'];
 for(const p of last.parts)out.push(['Part',p.name,p.sign,p.nominal,p.tol].map(cell).join(','));
 for(const [k,v] of Object.entries({'Nominal stack':last.nominal,'Worst case minimum':last.min,'Worst case maximum':last.max,'Uniform model sigma':last.sigma,'Simulated outside fraction':last.rate,'Acceptance minimum':last.lo,'Acceptance maximum':last.hi,'Simulation sample count':last.samples}))out.push(['Result',k,'',v,''].map(cell).join(','));
 const blob=new Blob([out.join('\r\n')+'\r\n'],{type:'text/csv;charset=utf-8'}),u=URL.createObjectURL(blob),link=document.createElement('a');
 link.href=u;link.download='CantaX_TS05_Tolerance_Stack.csv';link.click();setTimeout(()=>URL.revokeObjectURL(u),1500);
});
example();
};
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start);else start();
})(typeof window!=='undefined'?window:undefined);
