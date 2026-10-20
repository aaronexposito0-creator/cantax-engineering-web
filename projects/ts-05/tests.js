// Run with: node projects/ts-05/tests.js
const assert=require('node:assert/strict'), {calc}=require('../../ts05.js');
const parts=[
 {name:'Housing',sign:1,nominal:50,tol:.1},
 {name:'Shaft',sign:-1,nominal:20,tol:.05},
 {name:'Spacer',sign:-1,nominal:29.5,tol:.03}
];
const a=calc(parts,.35,.65,12000,20261020);
assert.ok(Math.abs(a.nominal-.5)<1e-11,'signed nominal');
assert.ok(Math.abs(a.min-.32)<1e-11,'worst-case lower');
assert.ok(Math.abs(a.max-.68)<1e-11,'worst-case upper');
assert.ok(Math.abs(a.sigma-Math.sqrt((.1**2+.05**2+.03**2)/3))<1e-12,'independent uniform sigma');
assert.equal(a.samples,12000);
assert.equal(a.hist.reduce((s,n)=>s+n,0),12000,'sample conservation');
assert.ok(a.out>0&&a.out<12000,'meaningful example rejection count');
assert.deepEqual(calc(parts,.35,.65,12000,20261020).hist,a.hist,'repeatability');
assert.equal(calc(parts,0,1,1000,123).out,0,'bounds respected');
assert.throws(()=>calc([],0,1),/1–16/,'empty chain');
assert.throws(()=>calc([{name:'x',sign:1,nominal:1,tol:2}],0,1),/Invalid/,'invalid tolerance');
assert.throws(()=>calc(parts,1,1),/Acceptance/,'limits ordered');
assert.throws(()=>calc(parts,0,1,10),/count/,'sample count bounds');
assert.throws(()=>calc([{name:'x',sign:0,nominal:1,tol:0}],0,1),/Sign/,'sign valid');
console.log('TS-05 PASS — analytic nominal/range, uniform variance, reproducibility, 12,000-sample accounting, limits, errors.');
