/* DT-04 · BOM Revision Auditor · original browser-side demo
 * Pure JavaScript, no external dependencies or network requests.
 * Not for customer-confidential files on shared computers without reviewing local policies.
 */
(function(root){
'use strict';
function parseRows(text){
 text=String(text||'').replace(/^\uFEFF/,'').replace(/\r\n?/g,'\n');
 if(!text.trim())throw Error('Paste or upload a CSV file first.');
 const first=(text.split('\n').find(x=>x.trim())||'');
 const candidate=[',',';','\t'].map(d=>({d,n:first.split(d).length}));
 candidate.sort((a,b)=>b.n-a.n);
 const delim=candidate[0].n>1?candidate[0].d:',';
 const rows=[],row=[];let field='',quoted=false;
 for(let i=0;i<text.length;i++){const ch=text[i];
 if(quoted){if(ch==='"'){if(text[i+1]==='"'){field+='"';i++}else quoted=false;}else field+=ch;continue;}
 if(ch==='"'){if(field.trim())throw Error('Invalid CSV quoting near row '+(rows.length+1));quoted=true;continue;}
 if(ch===delim){row.push(field);field='';continue;}
 if(ch==='\n'){row.push(field);if(row.some(x=>String(x).trim()))rows.push(row.slice());row.length=0;field='';continue;}
 field+=ch;
 }
 if(quoted)throw Error('An opening quote was not closed.');
 row.push(field);if(row.some(x=>String(x).trim()))rows.push(row);
 if(rows.length<2)throw Error('CSV needs a header and at least one part row.');
 return rows;
}
function normalize(t){return String(t||'').trim().toLowerCase().replace(/[\s_/-]+/g,'');}
function parseBOM(text){
 const rows=parseRows(text);let header=rows.shift();
 const match=(aliases)=>header.findIndex(h=>aliases.includes(normalize(h)));
 const id=match(['part','partnumber','partno','item','itemnumber','partid','reference','ref']);
 const qty=match(['qty','quantity','count','units','q']);
 const rev=match(['revision','rev','version']);
 const description=match(['description','desc','name','itemdescription']);
 if(id<0||qty<0)throw Error('Required CSV columns: Part and Qty (or common alternatives).');
 const map=new Map();
 for(let i=0;i<rows.length;i++){
  const row=rows[i],part=String(row[id]||'').trim();
  if(!part)throw Error('Missing Part at data row '+(i+2));
  if(map.has(part.toUpperCase()))throw Error('Repeated Part ID: '+part+'. Resolve duplicates before comparing.');
  const raw=String(row[qty]??'').trim();
  if(!/^\d+(\.\d+)?$/.test(raw))throw Error('Invalid nonnegative quantity for '+part+': '+raw);
  const val=Number(raw);if(!Number.isFinite(val)||val>100000000)throw Error('Quantity out of permitted range for '+part);
  map.set(part.toUpperCase(),{part,qty:val,rev:rev<0?'':String(row[rev]||'').trim(),description:description<0?'':String(row[description]||'').trim()});
 }
 if(map.size>10000)throw Error('For performance, compare at most 10,000 items per BOM.');
 return map;
}
function compare(oldMap,newMap){
 const ids=[...new Set([...oldMap.keys(),...newMap.keys()])].sort((a,b)=>a.localeCompare(b));
 const changes=[];
 for(const id of ids){
 const a=oldMap.get(id),b=newMap.get(id);
 let type=!a?'ADDED':!b?'REMOVED':a.qty!==b.qty||a.rev!==b.rev||a.description!==b.description?'MODIFIED':'UNCHANGED';
 changes.push({part:(b||a).part,status:type,oldQty:a?.qty??null,newQty:b?.qty??null,oldRev:a?.rev??'',newRev:b?.rev??'',oldDescription:a?.description??'',newDescription:b?.description??''});
 }
 return changes;
}
function safeCsvCell(v){let text=String(v??'');if(/^[=+\-@\t\r]/.test(text))text="'"+text;return '"'+text.replace(/"/g,'""')+'"';}
function exportCSV(rows){const keys=['part','status','oldQty','newQty','oldRev','newRev','oldDescription','newDescription'];return [keys.join(','),...rows.map(row=>keys.map(k=>safeCsvCell(row[k])).join(','))].join('\r\n')+'\r\n';}
const api={parseRows,parseBOM,compare,exportCSV};
if(typeof module!=='undefined'&&module.exports)module.exports=api;
if(typeof root!=='undefined')root.CantaXBOM=api;
if(typeof document==='undefined')return;
const start=()=>{const oldIn=document.getElementById('bom-old'),newIn=document.getElementById('bom-new'),output=document.getElementById('bom-status'),tbody=document.getElementById('bom-body'),download=document.getElementById('bom-download');
if(!oldIn||!newIn||!tbody)return;
let result=[];
const oldDemo='Part,Qty,Rev,Description\nBRK-101,2,A,Mounting bracket\nSHA-220,1,A,Drive shaft\nWAS-008,8,A,M8 washer';
const newDemo='Part,Qty,Rev,Description\nBRK-101,3,B,Mounting bracket\nWAS-008,8,A,M8 washer\nCOV-003,1,A,Protective cover';
const setStatus=(t,error=false)=>{output.textContent=t;output.style.color=error?'#a83e33':'#164b59';};
const compareNow=()=>{try{
result=compare(parseBOM(oldIn.value),parseBOM(newIn.value));const changed=result.filter(x=>x.status!=='UNCHANGED');tbody.replaceChildren();
for(const r of result){
 const tr=document.createElement('tr');tr.className='bom-'+r.status.toLowerCase();
 for(const v of [r.part,r.status,r.oldQty??'—',r.newQty??'—',r.oldRev||'—',r.newRev||'—']){const td=document.createElement('td');td.textContent=String(v);tr.appendChild(td);}
 tbody.appendChild(tr);
}
setStatus(result.length+' part IDs checked · '+changed.length+' differences found. No data leaves this browser.');
download.disabled=false;
}catch(e){result=[];tbody.replaceChildren();download.disabled=true;setStatus(e.message,true);}};
document.getElementById('bom-demo')?.addEventListener('click',()=>{oldIn.value=oldDemo;newIn.value=newDemo;compareNow()});
document.getElementById('bom-compare')?.addEventListener('click',compareNow);
for(const [id,area] of [['bom-old-file',oldIn],['bom-new-file',newIn]]){
document.getElementById(id)?.addEventListener('change',async(e)=>{const file=e.target.files?.[0];if(!file)return;if(file.size>1024*1024){setStatus('Maximum CSV size is 1 MB.',true);return;}area.value=await file.text();setStatus('File loaded locally. Press Compare revisions.');});}
download.addEventListener('click',()=>{if(!result.length)return;const blob=new Blob([exportCSV(result)],{type:'text/csv;charset=utf-8'}),a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='CantaX_BOM_Revision_Comparison.csv';a.click();setTimeout(()=>URL.revokeObjectURL(a.href),2000)});
document.getElementById('bom-demo')?.click();
};
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start);else start();
})(typeof window!=='undefined'?window:undefined);
