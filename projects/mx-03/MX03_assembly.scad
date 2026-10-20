// MX-03 / original marine instrumentation pivot-arm concept, revision A.
// OpenSCAD parametric visualization only; NOT safe for offshore installation.
// Units mm; angle is the arm elevation above +X.
$fn=48;
angle_deg=40; // [12:1:65]
exploded=false;
assert(angle_deg>=12 && angle_deg<=65, "Nominal design angle range exceeded");
deckX=1250;deckY=900;px=220;py=450;pz=300;armL=1600;
module boxbeam(xlen,w,h,wall){
 difference(){cube([xlen,w,h],center=false);
 translate([-1,wall,wall])cube([xlen+2,w-2*wall,h-2*wall]);}
}
module frame(){
 color([0.3,0.43,0.5]){
 for(y=[0,850])translate([0,y,0])boxbeam(deckX,50,80,5);
 for(x=[0,1170])translate([x,50,0])rotate([0,0,90])boxbeam(800,80,50,5);
 for(x=[45,1205],y=[45,855])
 translate([x,y,0])cylinder(d=45,h=12);
 }}
module bearing(){
 color([0.45,0.51,0.56]){
 for(y=[390,500])translate([px-80,y-25,80])
 cube([160,35,pz-80]);
 translate([px,420,pz])rotate([90,0,0])cylinder(h=100,d=30,center=true);
 }}
module arm(){
 translate([px,py,pz])
 rotate([0,-angle_deg,0]){
 color([0.70,0.77,0.80])
 translate([0,-30,-50])boxbeam(armL,60,100,5);
 color([0.09,0.55,0.59])
 translate([armL-95,-95,-70])cube([95,190,12]);
 // sensor plate and mounting face are illustrative and not the instrument mass
 color([0.3,0.42,0.48])
 translate([armL+10,-90,-65])cube([12,180,130]);
 }
}
module tie_points(){
 // Reference stays / parking position — no sized winch or hydraulic actuator.
 color([0.95,0.68,0.27])translate([400,py,80])sphere(r=16);
}
frame();bearing();arm();tie_points();
