// MX-03: reproducible planar kinematic checks (node MX03_verify.js)
const assert=require('node:assert/strict'),fs=require('node:fs');
const s=JSON.parse(fs.readFileSync(__dirname+'/MX03_design_spec.json','utf8'));
const toRad=Math.PI/180;
function tip(a){return [s.pivot.x+s.arm.length*Math.cos(a*toRad),s.pivot.z+s.arm.length*Math.sin(a*toRad)]}
for(const angle of [12,20,35,50,65]){
 const [x,z]=tip(angle);
 assert.ok(Number.isFinite(x)&&Number.isFinite(z));
 const L=Math.hypot(x-s.pivot.x,z-s.pivot.z);
 assert.ok(Math.abs(L-s.arm.length)<1e-8);
}
for(const [a,expected] of [[12,s.tipPositions.stowed],[65,s.tipPositions.deployed]]){
 const result=tip(a);assert.ok(Math.abs(result[0]-expected[0])<0.2);
 assert.ok(Math.abs(result[1]-expected[1])<0.2);
}
console.log('PASS MX-03 two-end rigid-pivot planar geometry; NOT load or structural certification');
