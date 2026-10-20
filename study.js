'use strict';
(()=>{
 const ax=document.getElementById('ax02-slider');
 if(ax){
  const moving=document.getElementById('ax02-moving'),value=document.getElementById('ax02-value'),turns=document.getElementById('ax02-turns');
  const draw=()=>{const mm=Number(ax.value);moving?.setAttribute('transform','translate('+(mm*2.2).toFixed(2)+' 0)');value.textContent=(mm>0?'+':'')+mm.toFixed(1)+' mm';turns.textContent=(mm/4).toFixed(2)+' turns from centre (ideal)';};
  ax.addEventListener('input',draw);document.getElementById('ax02-reset')?.addEventListener('click',()=>{ax.value='0';draw();ax.focus();});draw();
 }
 const mx=document.getElementById('mx03-slider');
 if(mx){
  const moving=document.getElementById('mx03-moving'),value=document.getElementById('mx03-value'),tip=document.getElementById('mx03-tip');
  const draw=()=>{const deg=Number(mx.value);moving?.setAttribute('transform','rotate('+(-deg)+' 225 399)');value.textContent=deg+'°';const rad=deg*Math.PI/180;tip.textContent=(220+1600*Math.cos(rad)).toFixed(0)+' / '+(300+1600*Math.sin(rad)).toFixed(0)+' mm';};
  mx.addEventListener('input',draw);document.getElementById('mx03-reset')?.addEventListener('click',()=>{mx.value='40';draw();mx.focus();});draw();
 }
})();
