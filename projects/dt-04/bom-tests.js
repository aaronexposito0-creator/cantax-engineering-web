// Run node projects/dt-04/bom-tests.js
const assert=require('node:assert/strict'),tool=require('../../bom-tool.js');
const old=tool.parseBOM('Part;Qty;Rev;Description\nA-1;1;A;Base\nB-2;3;A;Clamp\nC-3;2;A;Bolt');
const next=tool.parseBOM('Part;Qty;Rev;Description\nA-1;2;B;Base\nC-3;2;A;Bolt\nD-4;1;A;Seal');
const diff=tool.compare(old,next);
assert.equal(diff.find(x=>x.part==='A-1').status,'MODIFIED');
assert.equal(diff.find(x=>x.part==='B-2').status,'REMOVED');
assert.equal(diff.find(x=>x.part==='C-3').status,'UNCHANGED');
assert.equal(diff.find(x=>x.part==='D-4').status,'ADDED');
assert.throws(()=>tool.parseBOM('Part,Qty\nA,1\nA,2'),/Repeated/);
assert.throws(()=>tool.parseBOM('Part,Qty\nA,-5'),/Invalid/);
const csv=tool.exportCSV([{part:'=EVIL()',status:'ADDED',oldQty:null,newQty:3,oldRev:'',newRev:'',oldDescription:'',newDescription:''}]);
assert.ok(csv.includes("'=EVIL()"));
console.log('PASS: added, removed, unchanged, revised parts, duplicates, invalid quantities, spreadsheet formula injection escaping');
