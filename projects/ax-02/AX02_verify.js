// AX-02 / standalone Node geometry check
const assert=require('node:assert/strict'), fs=require('node:fs');
const g=JSON.parse(fs.readFileSync(__dirname+'/AX02_design_spec.json','utf8'));
assert.equal(g.geometry.fullTravel,2*g.carriage.travel);
assert.equal(g.geometry.fullTravel/g.screw.pitchNominal,g.geometry.screwTurnsFullTravel);
for(const x of [-48,0,48]){
 const centre=g.carriage.centreX+x;
 assert.ok(centre-g.carriage.x/2>=0 && centre+g.carriage.x/2<=g.base.x);
}
assert.deepEqual(g.rails.centerY,[44,136]);
assert.equal(g.rails.toX-g.rails.fromX,g.screw.runLength);
console.log('PASS AX-02 concept-level nominal geometric invariants');
