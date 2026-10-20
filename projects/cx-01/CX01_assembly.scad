/*
CantaX Engineering · CX-01 / REV A
Parametric adjustable instrument-mount fixture — open demonstration.
Units: mm. Source of nominal geometry: geometry.json and DXF profiles.
This is a concept-stage CAD demonstration; not load-rated or tested.
Compatible with OpenSCAD (free). Export individual parts to STL via part selector.
STEP requires independent export from a suitable CAD program; not supplied here.
*/
$fn=80;
part="assembly"; // [assembly,base,slider]
travel_mm=0; // [-35.5:0.5:35.5]
show_hardware=true;

base_w=180;
base_h=100;
base_t=8;
base_r=8;
base_clearance_d=6.6;
slot_length=80;
slot_width=9;
slot_ys=[37,63];

slider_w=85;
slider_h=60;
slider_t=6;
slider_r=5;
slider_origin=[47.5+travel_mm,20];
m8_hole_d=9;
m6_payload_d=6.6;

assert(travel_mm>=-35.5 && travel_mm<=35.5, "Travel exceeds nominal slot-centre limits");

module rounded_rectangle(w,h,r){
  hull(){for(x=[r,w-r],y=[r,h-r])translate([x,y]) circle(r=r);}
}
module horizontal_slot(cx,cy,len,d){
  hull(){translate([cx-(len-d)/2,cy])circle(d=d);
         translate([cx+(len-d)/2,cy])circle(d=d);}
}
module base_profile(){
  difference(){
    rounded_rectangle(base_w,base_h,base_r);
    for(x=[20,160],y=[12,88])translate([x,y])circle(d=base_clearance_d);
    for(y=slot_ys) horizontal_slot(90,y,slot_length,slot_width);
  }
}
module slider_profile(){
  difference(){
    rounded_rectangle(slider_w,slider_h,slider_r);
    for(y=[17,43])translate([42.5,y])circle(d=m8_hole_d);
    for(x=[25,60])translate([x,30])circle(d=m6_payload_d);
  }
}
module base_plate(){linear_extrude(height=base_t)base_profile();}
module slider_plate(){linear_extrude(height=slider_t)slider_profile();}
module hardware_at(x,y){
  color([0.26,0.31,0.36]){
    // Simple nominal cylindrical representation, not a thread model.
    translate([x,y,-7.2])cylinder(d=8,h=24);
    translate([x,y,base_t+slider_t])cylinder(d=16,h=1.6);
    translate([x,y,base_t+slider_t+1.6])cylinder(d=13,h=5.3);
    translate([x,y,-2.2])cylinder(d=16,h=1.6);
    translate([x,y,-7.2])cylinder(d=14.5,h=6.5,$fn=6);
  }
}
if(part=="base") base_plate();
else if(part=="slider") slider_plate();
else {
  color([0.12,0.40,0.56])base_plate();
  color([0.12,0.71,0.67])translate([slider_origin[0],slider_origin[1],base_t])slider_plate();
  if(show_hardware)for(y=slot_ys)hardware_at(90+travel_mm,y);
}
