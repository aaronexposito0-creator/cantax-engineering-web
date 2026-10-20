/* CX-01 geometry verification. Run with: node CX01_checks.js */
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const root=__dirname;
const g=JSON.parse(fs.readFileSync(path.join(root,'geometry.json'),'utf8'));
const b=g.base,s=g.slider;
const baseSlotEnds=[90-(b.slotLen-b.slotW)/2,90+(b.slotLen-b.slotW)/2];
assert.deepEqual(baseSlotEnds,[54.5,125.5]);
for(let i=0;i<2;i++){
 const lock=s.lockHoles[i],slot=b.slots[i];
 assert.equal(g.assembly.sliderZero[0]+lock[0],slot[0]);
 assert.equal(g.assembly.sliderZero[1]+lock[1],slot[1]);
}
for(const travel of [-g.assembly.travel,0,g.assembly.travel]){
 const left=g.assembly.sliderZero[0]+travel,right=left+s.w;
 assert.ok(left>=0 && right<=b.w);
 assert.ok(90+travel>=baseSlotEnds[0] && 90+travel<=baseSlotEnds[1]);
}
const dxf=fs.readFileSync(path.join(root,'CX01_base_profile.dxf'),'utf8');
assert.ok(dxf.includes('$INSUNITS\n70\n4'));
for(const label of ['M6_MOUNT','M8_SLOTS','OUTER'])assert.ok(dxf.includes(label));
const area=(w,h,r)=>w*h-(4-Math.PI)*r*r;
const slotArea=(L,D)=>(L-D)*D+Math.PI*D*D/4;
const massBase=(area(b.w,b.h,b.r)-4*Math.PI*b.holeD**2/4-2*slotArea(b.slotLen,b.slotW))*b.t*0.0027/1000;
const massSlider=(area(s.w,s.h,s.r)-2*Math.PI*s.lockHoleD**2/4-2*Math.PI*s.payloadHoleD**2/4)*s.t*0.0027/1000;
assert.ok(Math.abs(massBase-0.3543)<0.00005);
assert.ok(Math.abs(massSlider-0.0791)<0.00005);
console.log('PASS: slot alignment, ±35.5 mm travel, DXF units and material mass calculations');
