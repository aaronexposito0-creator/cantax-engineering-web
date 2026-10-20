'use strict';
(()=>{
 const slider=document.getElementById('cx01-travel');
 const carriage=document.getElementById('cx01-slider');
 const label=document.getElementById('cx01-travel-value');
 const reset=document.getElementById('cx01-reset');
 if(!slider||!carriage||!label||!reset)return;
 function update(){
   const travel=Number(slider.value);
   const x=110+(47.5+travel)*2.6;
   const y=60+20*2.6;
   carriage.setAttribute('transform',`translate(${x.toFixed(2)} ${y.toFixed(2)})`);
   label.textContent=`${travel>0?'+':''}${travel.toFixed(1)} mm`;
 }
 slider.addEventListener('input',update);
 reset.addEventListener('click',()=>{slider.value='0';update();slider.focus();});
 update();
})();
