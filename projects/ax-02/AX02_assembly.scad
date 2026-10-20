// AX-02 | CantaX Engineering | Original motion concept REV A
// Units mm. A nominal geometry demonstration, NOT a tested positioning stage.
// Requires only OpenSCAD. No proprietary or customer models used.
$fn=40;
travel=0; // [-48:1:48]
exploded=false;
assert(abs(travel)<=48,"Travel outside nominal geometric design");
baseX=320;baseY=180;baseT=16;carX=130;carY=150;carT=12;
railY=[44,136];railZ=36;railD=12;lead=4;
zoff=exploded?28:0;
module roundbox(w,h,t,r=5){linear_extrude(t)offset(r=r)offset(delta=-r)square([w,h]);}
module alongX(x0,y,z,L,d){translate([x0,y,z])rotate([0,90,0])cylinder(h=L,d=d);}
module base(){color([0.18,0.37,0.48]){roundbox(baseX,baseY,baseT,9);
 for(x=[25,295],y=[20,160])translate([x,y,baseT])cylinder(d=16,h=2);}}
module guiding(){
 for(y=railY){
 color([0.76,0.83,0.84])alongX(30,y,railZ,260,railD);
 for(x=[30,290])color([0.24,0.34,0.38])
 translate([x-9,y-14,baseT])cube([18,28,13]);
 for(x=[112+travel-42,112+travel+42])
 color([0.32,0.44,0.50])translate([x-17,y-18,railZ-11+zoff])cube([34,36,22]);
 }}
module screw(){
 color([0.78,0.76,0.66])alongX(30,90,36,260,12);
 for(x=[30,290]) color([0.2,0.26,0.32])
 translate([x-9,73,baseT])cube([18,34,20]);
 // geometry-only coupling / nut housing, not verified fit
 color([0.68,0.70,0.76])
 translate([151+travel-14,75,railZ-13+zoff])cube([28,30,22]);
}
module moving(){
 color([0.08,0.70,0.65])
 translate([95+travel,15,55+zoff])roundbox(carX,carY,carT,7);
 for(x=[117+travel,203+travel],y=[36,144])
 color([0.11,0.34,0.42])translate([x,y,67+zoff])cylinder(h=2,d=10);
 color([0.14,0.40,0.44])translate([160+travel,90,67+zoff])
 difference(){cylinder(d=44,h=9);translate([0,0,-1])cylinder(d=20,h=11);}
}
base(); guiding();screw();moving();
