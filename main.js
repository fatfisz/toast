"use strict";class t{constructor(t,s){this.x=t,this.y=s}add({x:s,y:e}){return new t(this.x+s,this.y+e)}sub({x:s,y:e}){return new t(this.x-s,this.y-e)}scale(s){return new t(this.x*s,this.y*s)}rotate(s){return new t(this.x*Math.cos(s)-this.y*Math.sin(s),this.x*Math.sin(s)+this.y*Math.cos(s))}distance({x:t,y:s}){return((this.x-t)**2+(this.y-s)**2)**.5}round(){return new t(Math.round(this.x),Math.round(this.y))}wrap(t,s){const e=s-t;for(;this.x<t;)this.x+=e;for(;this.x>s;)this.x-=e}static intersection({x:s,y:e},{x:i,y:n},{x:a,y:o},{x:r,y:h}){const c=(h-o)*(i-s)-(r-a)*(n-e);if(0===c)return null;const d=((r-a)*(e-o)-(h-o)*(s-a))/c,l=((i-s)*(e-o)-(n-e)*(s-a))/c;return d>=0&&d<=1&&l>=0&&l<=1?new t(s+d*(i-s),e+d*(n-e)):null}}class s extends t{constructor(t,s,e){super(t,s),this.timestamp=e}static fromPoint(t,e){return new s(t.x,t.y,e)}}const e=2,i=1e3,n=1e3,a=new t(i/2,n/2),o=n/18,r={absolute:!1,globalAlpha:1,lineJoin:"round",lineWidth:3,r:0,z:1};var h={parts:[{name:"rock",bounds:[43,84,33,94,0,0],data:[-4288,0,6,-2,4,5,-2,19,-4,5,19,-111,0,-2,5,19,-3,5,6,4,-3,5,-2,19,-3,5,-2,19,5,-98,0,4,-11,5,-2,19,-3,5,6,4,-4,5,19,-4,5,19,5,6,-94,0,-4,4,-2,5,19,-2,5,19,-4,5,-2,19,-4,5,6,4,-4,5,19,-4,5,19,-2,5,6,-93,0,-2,4,-3,5,-2,19,5,-2,19,-3,5,-2,19,-5,5,6,4,-5,5,19,-2,5,-2,19,-3,5,6,-92,0,-2,4,5,-3,19,5,-3,19,-3,5,-3,19,-4,5,6,4,-4,5,-2,19,-2,5,19,-4,5,6,-92,0,-2,4,5,19,-5,5,19,-3,5,19,5,19,-3,5,6,-2,4,-3,5,-2,19,-2,5,19,5,19,-4,5,6,-91,0,-2,4,5,19,-2,5,19,-2,5,19,-3,5,19,-2,5,-2,19,5,6,-2,4,-3,5,-3,19,5,-4,19,-4,5,6,-90,0,4,-2,19,-2,5,-2,19,-2,5,19,-3,5,19,-3,5,19,6,-2,4,-3,5,-2,19,5,-3,19,-2,5,19,-4,5,6,-90,0,-2,19,-3,5,19,-3,5,19,-3,5,19,-3,5,19,6,-2,4,-3,5,19,-3,5,19,-3,5,19,-4,5,6,-89,0,-3,19,-3,5,19,-3,5,19,5,-4,19,-2,5,19,6,-2,4,-2,5,-3,19,-2,5,-2,19,-2,5,-2,19,-3,5,6,-89,0,19,-2,4,19,-2,5,19,-2,5,-4,19,-2,5,19,-3,5,6,-2,4,5,-2,19,5,19,-3,5,19,-3,5,19,-4,5,6,-88,0,19,-2,4,19,-2,5,19,5,-6,19,5,-2,19,-3,5,-2,4,-4,5,19,-3,5,-2,19,-3,5,19,-3,5,6,-88,0,19,-2,4,-2,19,5,19,5,19,-2,5,19,5,19,-2,5,19,-3,5,-2,4,-4,5,19,-4,5,-3,19,5,19,-3,5,6,-89,0,-2,4,5,-3,19,-4,5,19,5,-2,19,5,-2,19,-2,5,-3,4,-4,5,19,-2,5,19,-2,5,19,-2,5,19,-2,5,6,-89,0,-3,4,5,19,-2,5,19,5,-2,19,-2,5,19,-2,5,19,-2,5,-3,4,-4,5,19,-2,5,19,-2,5,19,5,-2,19,-2,5,6,-89,0,-3,4,5,19,-2,5,19,5,19,-3,5,19,5,19,-3,5,6,-3,4,-3,5,19,5,-3,19,-3,5,19,-4,5,6,-88,0,-3,4,5,19,5,-2,19,5,19,-3,5,19,-5,5,6,-4,4,5,19,-2,5,-4,19,-2,5,19,-4,5,6,-88,0,-3,4,5,-3,19,-4,5,-2,19,-2,5,19,-4,5,6,-3,4,-4,5,19,-2,5,-2,19,5,-2,19,-3,5,6,-88,0,4,-2,19,-2,5,19,-4,5,-3,19,-2,5,-2,19,-3,5,6,-4,4,-3,5,19,-2,5,19,5,-3,19,-3,5,6,-88,0,4,19,-2,4,19,-4,5,-2,19,-5,5,19,-4,5,6,-3,4,-6,5,19,5,-4,19,-2,5,6,-88,0,4,19,-2,4,-2,19,-9,5,-2,19,-4,5,6,-4,4,-4,5,-2,19,5,-2,19,5,-2,19,5,6,-89,0,19,-3,4,19,-4,5,19,-4,5,19,-10,4,-4,5,19,5,-2,19,-3,5,19,5,6,-89,0,19,-2,4,-2,19,4,-2,5,-2,19,-2,4,-2,19,-4,4,5,19,-2,5,-4,4,-3,5,19,5,19,-5,5,-2,19,-89,0,19,4,-2,19,-5,4,-4,19,-2,4,-4,5,19,-2,5,6,-2,4,19,4,-2,5,19,5,19,-5,5,-2,19,-89,0,19,4,19,-5,4,-2,19,-2,5,-2,6,4,-5,19,-3,5,-2,6,4,19,4,-9,5,-2,19,-88,0,-2,19,0,19,-5,4,5,-2,19,-2,5,6,4,19,-3,5,-2,19,-4,5,6,-3,19,-2,4,-7,5,-2,19,-87,0,19,-2,0,19,-3,4,-3,5,-2,19,-2,5,6,-2,4,-3,5,-2,19,-4,5,6,4,5,-2,19,-8,4,0,19,-87,0,19,0,19,-3,4,-5,5,19,-3,5,6,4,-2,5,-2,19,-6,5,4,-2,5,19,-4,4,19,-2,5,6,0,19,-89,0,19,0,-2,4,-5,5,19,-3,5,6,-2,4,5,19,-6,5,-2,4,-2,5,-2,19,-3,5,19,5,6,-2,0,19,-89,0,19,0,-2,4,-6,5,19,-3,5,4,19,4,-5,5,-2,4,-5,5,19,-3,5,-3,19,-2,0,19,-89,0,19,0,-3,4,-5,5,19,-3,5,4,-3,19,5,19,-3,4,-5,5,-2,19,-5,5,19,-94,0,-4,4,-4,5,-4,4,5,6,4,-3,19,4,-6,5,-2,19,5,19,-3,5,6,19,-95,0,-3,4,-3,5,-3,4,-4,5,-3,6,-3,4,-4,5,-2,19,-2,5,-2,19,-2,5,6,-2,19,-94,0,-10,4,-5,5,6,-2,4,-3,5,-3,19,-4,5,19,5,6,-2,0,19,-94,0,-5,4,-4,19,-2,4,-4,5,-3,4,-3,5,19,-4,5,-3,19,5,6,-2,0,19,-94,0,4,19,4,-5,5,-2,19,-2,4,-2,5,-5,4,-2,5,-2,19,-2,5,19,-2,5,19,6,-98,0,4,19,4,-5,5,19,5,-10,4,-2,5,-2,19,5,19,-2,5,19,6,-98,0,4,19,4,-4,5,-2,19,-6,5,6,-6,4,-3,5,19,-3,5,19,-99,0,19,4,-4,5,19,-3,5,-2,19,-3,5,-2,6,4,-2,19,-2,4,-2,5,19,-3,5,19,-99,0,19,4,-3,5,-2,19,-4,5,19,-4,5,-2,6,4,-3,19,4,-4,5,6,19,-99,0,19,-2,4,-2,5,19,-5,5,19,-4,5,4,-3,5,-3,19,-4,4,0,-2,19,-98,0,19,-2,4,-2,5,19,-3,5,-3,19,-3,5,4,5,-4,19,-2,5,6,-3,4,-2,0,19,-97,0,-2,19,-2,4,-2,5,-2,19,5,-2,19,5,19,-2,5,-2,4,-2,5,-2,19,-4,5,-3,6,-2,0,19,-97,0,-2,19,-3,4,-2,5,-3,19,-2,5,19,5,-2,4,-4,5,-2,19,-5,5,6,-2,0,19,-98,0,19,0,-2,4,-3,5,-2,19,5,19,5,-2,19,-3,4,-2,5,19,5,-2,19,-2,5,6,-103,0,19,-3,4,-2,5,19,-2,5,-4,4,-2,19,4,5,-2,19,-2,5,-2,19,5,6,-104,0,-4,4,5,19,5,-3,4,5,-2,4,-4,19,-3,5,-3,19,-106,0,4,-2,19,-5,4,-4,5,-2,4,19,-3,4,-2,19,5,19,-106,0,-2,4,19,-3,4,5,19,-4,5,19,6,-7,4,19,-107,0,4,19,4,-3,5,19,-3,5,-2,19,5,-2,6,4,-3,6,0,19,-107,0,4,19,4,-3,5,-4,19,5,19,-3,5,6,-2,5,6,0,19,-108,0,19,-2,4,-3,5,-2,19,-2,5,-2,19,-4,5,4,-2,0,19,-108,0,19,-3,4,-2,5,-3,19,-2,5,19,-3,5,-2,4,-110,0,-2,19,-4,4,5,19,5,19,-2,5,-2,19,5,-2,4,-111,0,19,-2,0,-3,4,-2,19,-2,5,19,5,-2,19,-2,4,-112,0,19,-3,0,-2,4,19,-6,5,-2,19,-113,0,19,-4,0,4,19,4,-3,5,-3,4,19,-119,0,19,-5,4,-2,0,19,-119,0,19,-2,4,-5,0,19,-119,0,19,-127,0,19,-2085059,0]},{name:"wizard",bounds:[42,85,46,81,0,4],data:[-5950,0,-4,29,-123,0,29,-4,1,29,-122,0,29,-4,1,29,-121,0,29,-6,1,29,-120,0,29,-6,1,29,-120,0,29,-6,1,29,-120,0,29,-6,1,29,-120,0,29,-6,1,29,-106,0,-2,29,30,-12,0,29,-4,1,29,-12,0,30,-2,29,-90,0,-2,28,-2,29,30,-3,29,-6,0,30,-10,29,30,-6,0,-3,29,30,-2,29,-2,28,-89,0,28,-2,29,30,-10,29,-3,30,-4,29,-3,30,-10,29,30,-2,29,28,-91,0,-2,29,30,-13,29,-4,30,-13,29,30,-2,29,-92,0,29,30,-32,29,30,29,-92,0,29,30,-12,0,-8,29,-12,0,30,29,-106,0,30,-6,29,30,-120,0,30,-6,29,30,-120,0,29,30,-4,29,30,29,-120,0,29,30,-4,29,30,29,-120,0,29,30,-4,29,30,29,-120,0,29,30,-4,29,30,29,-120,0,29,30,-4,29,30,29,-120,0,30,-6,29,30,-119,0,30,-8,29,30,-118,0,-10,29,-118,0,-10,29,-118,0,-10,29,-118,0,-10,29,-118,0,-10,29,-117,0,-12,29,-116,0,-12,29,-116,0,-12,29,-116,0,-12,30,-116,0,-12,29,-116,0,-12,29,-118,0,-2,28,-4,0,-2,28,-120,0,-2,28,-4,0,-2,28,-13033,0,-2,33,-34,0,-2,33,-89,0,-4,33,-32,0,-4,33,-88,0,-4,33,-32,0,-4,33,-89,0,-2,33,-34,0,-2,33,-15705,0,-4,33,-32,0,-4,33,-87,0,-6,33,-30,0,-6,33,-85,0,-8,33,-28,0,-8,33,-84,0,-3,33,-2,32,-3,33,-28,0,-3,33,-2,32,-3,33,-84,0,-3,33,-2,32,-3,33,-28,0,-3,33,-2,32,-3,33,-84,0,-8,33,-28,0,-8,33,-85,0,-6,33,-30,0,-6,33,-87,0,-4,33,-32,0,-4,33,-15448,0,-4,33,-32,0,-4,33,-87,0,-6,33,-30,0,-6,33,-85,0,-3,33,-2,32,-3,33,-28,0,-3,33,-2,32,-3,33,-84,0,-2,33,-4,32,-2,33,-28,0,-2,33,-4,32,-2,33,-84,0,-2,33,-4,32,-2,33,-28,0,-2,33,-4,32,-2,33,-84,0,-3,33,-2,32,-3,33,-28,0,-3,33,-2,32,-3,33,-85,0,-6,33,-30,0,-6,33,-87,0,-4,33,-32,0,-4,33,-15448,0,-4,33,-32,0,-4,33,-87,0,-2,33,-2,32,-2,33,-30,0,-2,33,-2,32,-2,33,-85,0,-2,33,-4,32,-2,33,-28,0,-2,33,-4,32,-2,33,-84,0,33,-6,32,33,-28,0,33,-6,32,33,-84,0,33,-6,32,33,-28,0,33,-6,32,33,-84,0,-2,33,-4,32,-2,33,-28,0,-2,33,-4,32,-2,33,-85,0,-2,33,-2,32,-2,33,-30,0,-2,33,-2,32,-2,33,-87,0,-4,33,-32,0,-4,33,-2023852,0]},{name:"sparkles",bounds:[60,66,60,66,0,1],data:[-7743,0,33,-127,0,33,-126,0,33,32,33,-123,0,-2,33,-3,32,-2,33,-123,0,33,32,33,-126,0,33,-127,0,33,-15615,0,32,-127,0,32,-126,0,32,31,32,-123,0,-2,32,-3,31,-2,32,-123,0,32,31,32,-126,0,32,-127,0,32,-2072256,0]},{name:"planet",bounds:[5,120,22,106,0,0],data:[-2907,0,-8,6,-112,0,-20,6,-99,0,-33,6,-81,0,-8,33,-4,0,-11,6,5,-2,6,5,-2,6,-2,5,-2,6,5,-2,6,5,6,5,-11,6,-72,0,-19,33,-6,6,-2,5,-20,6,5,-10,6,-66,0,-26,33,-28,6,5,-9,6,-61,0,-30,33,5,-6,6,-3,5,-2,6,5,-2,6,5,-2,6,5,-11,6,5,-8,6,-57,0,-35,33,-17,6,5,-2,6,5,-8,6,5,-7,6,-53,0,29,-39,33,-20,6,5,-7,6,5,-7,6,-52,0,29,-16,33,-3,29,-21,33,6,5,-2,6,5,6,5,-2,6,5,-10,6,5,-14,6,-51,0,-2,29,-12,33,-2,29,-3,33,-3,29,-21,33,-11,6,5,-2,6,5,-6,6,5,-6,6,5,-6,6,-49,0,29,-14,33,29,-3,33,-4,29,-23,33,-7,0,-14,6,5,-12,6,-46,0,-18,33,29,-2,33,-4,29,-24,33,-10,0,-4,6,5,-6,6,5,-5,6,5,-5,6,-44,0,29,-19,33,29,-3,33,-3,29,-11,33,29,-13,33,-10,0,-11,6,5,-11,6,-43,0,-38,33,29,-14,33,-10,0,-4,6,5,-17,6,-42,0,-39,33,29,-15,33,-11,0,-10,6,5,-4,6,5,-4,6,-41,0,-55,33,-2,29,-11,0,-3,6,5,-6,6,5,-8,6,-41,0,-57,33,29,-10,0,-19,6,-40,0,-9,33,-2,29,-42,33,29,-4,33,29,-11,0,-4,6,5,-5,6,5,-3,6,5,-3,6,-39,0,-7,33,-2,29,-2,33,-2,29,-41,33,-2,29,-5,33,-10,0,-18,6,-38,0,-8,33,29,-3,33,-2,29,-42,33,-2,29,-5,33,-10,0,-9,6,5,-7,6,-37,0,-8,33,-2,29,-3,33,-2,29,-43,33,-3,29,-3,33,-11,0,-3,6,5,-8,6,5,-3,6,-37,0,-8,33,-3,29,-2,33,-2,29,-46,33,29,-3,33,-10,0,-4,6,5,-3,6,5,-7,6,-36,0,-10,33,-2,29,-25,33,-2,29,33,-3,29,-23,33,-10,0,-8,6,5,-3,6,5,-3,6,-36,0,-37,33,29,-2,33,-3,29,-24,33,-9,0,-16,6,-35,0,-37,33,-2,29,-3,33,-2,29,-24,33,-9,0,-4,6,5,-11,6,-35,0,-23,33,29,-13,33,29,-4,33,-2,29,-25,33,-7,0,-12,6,5,-3,6,-35,0,-22,33,-2,29,-15,33,29,-4,33,29,-26,33,-6,0,-5,6,5,-3,6,5,-6,6,-34,0,5,-39,33,-3,29,-29,33,-6,0,-15,6,-34,0,-2,5,-72,33,-5,0,-4,6,5,-10,6,-33,0,-2,5,-54,33,29,-18,33,-4,0,-8,6,5,-4,6,5,-2,6,-32,0,-3,5,-73,33,-4,0,-4,6,5,-10,6,-32,0,-4,5,-73,33,-4,0,-7,6,5,-7,6,-31,0,-5,5,-9,33,29,-54,33,29,-9,33,-2,0,-15,6,-31,0,-4,5,4,-10,33,29,-2,33,29,-50,33,-2,29,-9,33,-2,0,-3,6,5,-3,6,5,-4,6,5,-2,6,-30,0,-4,5,4,5,-10,33,29,-64,33,0,-7,6,5,-7,6,-30,0,-7,5,-25,33,-4,29,-12,33,29,-25,33,-2,29,-6,33,0,-15,6,-30,0,-2,5,4,-4,5,29,-22,33,29,-2,33,-4,29,-11,33,29,-2,33,29,-30,33,-12,6,5,-2,6,-30,0,-7,5,4,29,-21,33,-2,29,-4,33,-3,29,-10,33,29,-33,33,-4,6,5,-2,6,5,-6,6,-30,0,-7,5,4,5,-2,29,-19,33,29,-7,33,-2,29,-30,33,29,-12,33,-4,6,5,-9,6,-30,0,-3,5,4,-6,5,-2,29,-19,33,-2,29,-6,33,-2,29,-27,33,-2,29,33,-2,29,-10,33,-8,6,5,-3,6,5,-2,6,-29,0,-11,5,-2,29,-20,33,29,-6,33,-2,29,-27,33,29,-2,33,-2,29,-10,33,-14,6,-30,0,-2,5,4,-4,5,4,-3,5,-3,29,-19,33,29,-6,33,-2,29,-27,33,29,33,-2,29,-10,33,-4,6,5,-10,6,-29,0,-11,5,4,-3,29,-19,33,-2,29,-4,33,-3,29,-40,33,-8,6,5,-3,6,5,-2,6,-29,0,-8,5,4,-4,5,-4,29,-19,33,-2,29,-3,33,-2,29,-40,33,-8,6,5,-6,6,-29,0,-4,5,4,-9,5,-5,29,-19,33,-2,29,-17,33,29,33,29,-23,33,-4,6,5,-3,6,5,-6,6,-30,0,-7,5,4,-5,5,0,-5,29,-10,33,29,-27,33,29,33,29,-22,33,-13,6,5,6,-30,0,-3,5,4,-7,5,4,-2,5,-2,0,-5,29,-2,33,-2,29,-5,33,29,-27,33,29,-23,33,-8,6,5,-7,6,-30,0,-7,5,4,-5,5,-3,0,-5,29,-2,33,-3,29,-55,33,-5,6,5,-2,6,5,-3,6,5,-2,6,-32,0,-2,5,4,-10,5,-3,0,-6,29,-2,33,-2,29,-42,33,29,-11,33,-16,6,-31,0,-13,5,-5,0,-6,29,33,-2,29,-42,33,29,-10,33,-5,6,5,-2,6,5,-4,6,5,6,-33,0,-7,5,4,-2,5,4,-2,5,-5,0,-6,29,33,-2,29,-52,33,-15,6,-33,0,-14,5,-5,0,-9,29,-51,33,-5,6,5,-2,6,5,-3,6,5,-3,6,-33,0,-3,5,4,-3,5,4,-6,5,-5,0,-8,29,-36,33,29,-13,33,-16,6,-35,0,-13,5,-7,0,-7,29,-35,33,-2,29,-12,33,-5,6,5,-3,6,5,-6,6,-35,0,-11,5,4,-2,5,-7,0,-9,29,-46,33,-9,6,5,-3,6,5,-3,6,-35,0,-14,5,-8,0,-9,29,-20,33,29,-20,33,-2,29,33,-4,6,5,-11,6,-36,0,-3,5,4,-4,5,4,-6,5,-9,0,-8,29,-11,33,29,-28,33,-2,29,-9,6,5,-3,6,5,-2,6,-2,33,-36,0,-11,5,4,-3,5,-9,0,-10,29,-9,33,29,-2,33,29,-6,33,29,-18,33,29,-5,6,5,-11,6,33,-37,0,-3,5,4,-3,5,4,-7,5,-10,0,-9,29,-37,33,-5,6,5,-4,6,5,-3,6,5,-3,6,-2,33,-36,0,-12,5,4,-3,5,-10,0,-10,29,-12,33,-5,29,-4,33,-2,29,-11,33,-5,6,5,-4,6,5,-7,6,-3,33,-37,0,-4,5,4,-11,5,-11,0,-10,29,-5,33,-2,29,33,29,-3,33,-4,29,-3,33,-2,29,-10,33,-18,6,-5,33,-37,0,-8,5,4,-8,5,-10,0,-12,29,-2,33,-2,29,33,-2,29,-5,33,-3,29,-2,33,29,-3,33,29,-6,33,-5,6,5,-4,6,5,-5,6,5,6,-5,33,-38,0,-4,5,4,-8,5,4,-4,5,-10,0,-12,29,33,29,-2,33,29,-6,33,-3,29,-2,33,29,-3,33,29,-4,33,-10,6,5,-8,6,-5,33,-39,0,-8,5,4,-9,5,-11,0,-12,29,-3,33,29,-6,33,-4,29,-5,33,29,-2,33,-6,6,5,-4,6,5,-4,6,5,-3,6,-6,33,-39,0,-19,5,-10,0,-13,29,33,-2,29,-7,33,-3,29,-6,33,-6,6,5,-4,6,5,-3,6,5,-4,6,-6,33,-41,0,-9,5,4,-9,5,-11,0,-15,29,-7,33,-3,29,-3,33,-22,6,-7,33,-41,0,-4,5,4,-9,5,4,-5,5,-10,0,-15,29,-7,33,-3,29,33,-7,6,5,-5,6,5,-4,6,5,-3,6,-8,33,-42,0,-10,5,4,-11,5,-10,0,-15,29,-6,33,-13,6,5,-9,6,-9,33,-43,0,-15,5,4,-7,5,-10,0,-15,29,-3,33,-9,6,5,-10,6,5,-2,6,-9,33,29,33,-44,0,-5,5,4,-4,5,4,-5,5,4,-9,5,-6,0,-14,29,-10,6,5,-5,6,5,-9,6,-8,33,-2,29,-46,0,-29,5,-5,0,-4,29,-15,6,5,-5,6,5,-5,6,5,-4,6,-9,33,-2,29,-48,0,-10,5,4,-6,5,4,-14,5,-16,6,5,-18,6,-11,33,29,-50,0,-4,5,4,-14,5,4,-12,5,-12,6,5,-9,6,5,-5,6,5,-4,6,-12,33,-51,0,-10,5,4,-12,5,4,-9,5,-8,6,5,-8,6,5,-6,6,5,-5,6,-12,33,-54,0,-11,5,4,-14,5,4,-2,5,4,-3,5,-2,6,5,-10,6,5,-11,6,-14,33,-56,0,-6,5,4,-6,5,4,-20,5,-9,6,5,-8,6,5,-3,6,-9,33,-3,29,-2,33,-59,0,-15,5,4,-2,5,4,-13,5,4,5,-2,6,5,-2,6,5,-6,6,5,-7,6,-3,29,-7,33,-65,0,-6,5,4,-14,5,4,-3,5,4,-2,5,4,-6,5,-15,6,-8,29,-3,33,-68,0,-8,5,4,-26,5,-5,6,5,-5,6,-10,29,-74,0,-8,5,4,-22,5,4,-3,5,-5,6,-90,0,-8,5,4,-2,5,4,-10,5,4,-2,5,4,-9,5,-2,6,-94,0,-10,5,4,-2,5,4,-2,5,4,-11,5,-104,0,-18,5,-114,0,-9,5,-2083548,0]},{name:"toast",bounds:[14,113,60,72,0,0],data:[-7697,0,-94,15,-34,0,-94,15,-34,0,-94,15,-31,0,-100,9,-28,0,-100,9,-28,0,-100,9,-28,0,-100,9,-28,0,-100,9,-28,0,-100,9,-28,0,-100,9,-28,0,-100,9,-28,0,-100,9,-28,0,-100,9,-2087822,0]},{name:"pillar1",bounds:[58,69,61,66,0,0],data:[-7869,0,-8,6,-117,0,-12,6,-116,0,5,-10,6,5,-116,0,3,-4,5,-4,6,-2,5,3,-116,0,3,-4,4,-6,5,3,-117,0,-4,4,-4,5,-2088637,0]},{name:"pillar2",bounds:[58,69,61,66,0,0],data:[-7867,0,-8,6,-119,0,-12,6,-116,0,-3,5,-8,6,5,-116,0,3,-2,4,-4,5,-4,6,3,-116,0,3,-6,4,-4,5,3,-119,0,-4,4,-4,5,-2088635,0]},{name:"pillar3",bounds:[58,69,61,66,0,0],data:[-7867,0,-10,6,-117,0,-12,6,-116,0,5,-10,6,5,-116,0,3,4,-8,5,6,3,-116,0,-2,3,-8,4,5,3,-117,0,3,-8,4,5,-2088635,0]},{name:"pillar4",bounds:[58,69,61,66,0,0],data:[-7867,0,-5,6,-122,0,-3,5,-6,6,-119,0,3,-2,4,-3,5,-5,6,5,-116,0,-2,3,-4,4,-3,5,-2,6,3,-116,0,-2,3,-7,4,-2,5,3,-117,0,3,-7,4,-2,5,-2088635,0]},{name:"pillar5",bounds:[58,69,61,66,0,0],data:[-7872,0,-5,6,-120,0,-6,6,-2,5,3,-116,0,5,-5,6,-5,5,3,-116,0,3,4,-4,5,-3,4,-2,5,3,-116,0,-2,3,-7,4,-2,5,3,-117,0,3,-7,4,-2,5,-2088635,0]}],palette:[2037811,2829890,4278361,6844794,9478568,11979727,16777215,16564106,11894871,9064510,6044225,13185080,14576184,16756027,16770454,16578912,11851333,5358655,3185763,2321786,2510702,2307683,4289169,5018541,6537929,9753300,12123647,3942720,4597596,8545409,16229515,12743042,8727910,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]};const c=128;function d(t){const s=[];for(let e=0;e<t.length;e+=1)if(t[e]<0){for(let i=t[e];i<0;i+=1)s.push(t[e+1]);e+=1}else s.push(t[e]);return s}function l(t,s,e,i){return t[s+e*c+i*c*c]}function u(t){return[(t>>16)%256,(t>>8)%256,t%256]}function m(t,s,e,i){if(0===i)return;const[n,a,o]=u(e[i-1]);t[s]=n,t[s+1]=a,t[s+2]=o,t[s+3]=255}function p(t,s,e,i){const n=s[1]-s[0]+1,a=s[3]-s[2]+1,o=document.createElement("canvas");o.width=n,o.height=a;const r=o.getContext("2d"),h=r.createImageData(c,c);for(let n=s[0];n<=s[1];n+=1)for(let a=s[2];a<=s[3];a+=1)m(h.data,4*(n+a*c),i,l(t,n,a,e));return r.putImageData(h,-s[0],-s[2]),o}function w({bounds:t,data:s},e){const i=[];for(let n=t[4];n<=t[5];n+=1)i[n]=p(s,t,n,e);return i}const f=new Map;function g(t,s=0){return f.get(t)[s]}const x=[];function y(t){return x[t]}!function(){for(const t of h.parts)t.data=d(t.data),f.set(t.name,w(t,h.palette));for(const s of h.palette)x.push(`rgb(${(t=u(s))[0]}, ${t[1]}, ${t[2]})`);var t}();const M=new t(.5,20),b=30,v=Math.ceil(n/b),P=.95*i;class k{constructor(t=1){this.pointCache=new Map,this.z=t}draw(t,s){const e=this.getMinimumY(t.camera);this.trimExcess(e),this.ensureEnough(e);const i=Math.min(.15*Math.abs(s.dy),1);for(const s of this.pointCache.values())this.drawOne(t,s,i)}getMinimumY(t){return Math.floor((t.y-n/2)/b)}trimExcess(t){for(const s of this.pointCache.keys())s<t&&this.pointCache.delete(s)}ensureEnough(t){const s=t+v;for(let e=t;e<=s;e+=1)this.ensurePoint(e)}ensurePoint(s){this.pointCache.has(s)||this.pointCache.set(s,new t(Math.random()*P-P/2,s*b))}drawOne(t,s,e){t.rect(s.sub(M),s.add(M),{fillStyle:y(26),globalAlpha:e,z:this.z})}}const z=2*n,E=[g("pillar1"),g("pillar2"),g("pillar3"),g("pillar4"),g("pillar5")],I=.006,T=z/5/e,S=4;function C(t,s,e,i){const{width:n,height:a}=s;t.drawImage(s,0,S+1,n,a,e,i+S+T,n,a),t.drawImage(s,0,S,n,1,e,i+S,n,T),t.drawImage(s,e,i)}const O=document.createElement("canvas");!function(){const s=function(){const s=[],e=z/4,n=z/2,a=z-n,o=i;for(let i=e;i<n+a;i+=16)for(let a=-100;a<o+100;a+=36+24*Math.random()){const r=1-(i/n)**5;Math.abs(a-o/2)/(o/2)>r&&Math.random()<.75&&s.push([new t(a,i-e+12*Math.random()),E[Math.floor(Math.random()*E.length)]])}return s}();O.width=i/e,O.height=z/e;const n=O.getContext("2d");n.imageSmoothingEnabled=!1;for(const[t,i]of s)C(n,i,(t.x-i.width)/e,(t.y-i.height)/e)}();const A=new t(0,0),L=new t(i,n),D=g("planet"),F=.0015,R=new t(i/3/F,-n/3/F),H=.002,V=i/2/H,Y=n/H,$=new t(-V,n/2.5/H),j=new t(V,Y);function q(s){s.rect(A,L,{absolute:!0,fillStyle:y(23)}),s.image(D,R,{z:F}),s.rect($,j,{fillStyle:y(22),z:H}),function(s){s.image(O,new t(0,(z+n/3)/2/I),{z:I})}(s)}const B=20;const J=1,W=20,X=5,G=80,K=400,N=2*K,Q=.05*K,U={basic:g("sparkles",0),hit:g("sparkles",1)};class Z extends s{constructor(t,s,e){super(t.x+(Math.random()-.5)*G,t.y+(Math.random()-.5)*G,t.timestamp+s),this.r=Math.random()*Math.PI,this.dx=(Math.random()-.5)*G/K,this.dy=(Math.random()-.5)*G/K,this.dr=Math.random()/100,this.isHit=e}isExpired(t){return t-this.timestamp>(this.isHit?N:K)}tick(t){this.x+=this.dx*t,this.y+=this.dy*t,this.r+=this.dr*t;const s=1-t**-1.5;this.dx*=s,this.dy*=s,this.dr*=s}draw(s,e){const i=this.isHit?U.hit:U.basic,n=function(t,s){return s<Q?s/Q:(t-s)/(t-Q)}(this.isHit?N:K,e-this.timestamp)**.5,a=this.isHit?1:.5;s.image(i,new t(this.x,this.y),{absolute:!0,globalAlpha:n*a,r:this.r})}}class _{constructor(){this.now=-1/0,this.sparkles=new Set}add(t,s=!1){for(let e=0;e<(s?W:J);e+=1)this.sparkles.add(new Z(t,X*e,s))}tick(t,s){this.now=t,this.removeOldSparkles(),this.updateSparkles(s)}removeOldSparkles(){const t=[];for(const s of this.sparkles)s.isExpired(this.now)&&t.push(s);for(const s of t)this.sparkles.delete(s)}updateSparkles(t){for(const s of this.sparkles)s.tick(t)}draw(t){for(const s of this.sparkles)s.draw(t,this.now)}}const tt=[g("wizard"),g("wizard",1),g("wizard",2),g("wizard",3),g("wizard",4)],st=new t(i/2,n/4),et=1,it=tt.length-1-et,nt=80,at=2*Math.PI*35e-5,ot=8;class rt{constructor(){this.offset=-1/0,this.phase=0,this.startTimestamp=0}tick(t,s){if(this.offset=Math.sin(t*at)*ot,s){const s=Math.floor((t-this.startTimestamp)/nt);0===this.phase?(this.startTimestamp=t,this.phase=1):this.phase<et?this.phase=s%et+1:this.phase=(s-et)%it+et+1}else this.phase=0}draw(s){const e=st.add(new t(0,this.offset));s.image(tt[0],e,{absolute:!0}),this.phase>0&&s.image(tt[this.phase],e,{absolute:!0})}}const ht=120;const ct=g("toast"),dt=2*ct.height,lt=2*ct.width,ut=1.2,mt=2e-4,pt=1e-6,wt=.05,ft=.001,gt=25e-5,xt=[new t(-lt/2,-dt/2),new t(-lt/2,dt/2),new t(lt/2,dt/2),new t(lt/2,-dt/2)];const yt=new class{constructor(){this.camera=new t(0,o),this.canvas=canvas,this.canvas.width=i,this.canvas.height=n,this.context=canvas.getContext("2d"),this.context.imageSmoothingEnabled=!1}trackToast(t){this.camera.y=t.mid.y+o}getOffset(){return a.sub(this.camera)}rect(t,s,e){const{absolute:i,r:n,z:a,...o}={...r,...e};Object.assign(this.context,o);const{x:h,y:c}=this.getTransformedPoint(i,t,a),{x:d,y:l}=this.getTransformedPoint(i,s,a);this.setRotation(0),this.context.beginPath(),this.context.rect(h,c,d-h,l-c),this.context.closePath(),o.fillStyle&&this.context.fill(),o.strokeStyle&&this.context.stroke()}image(t,s,n){const{absolute:a,r:o,z:h,...c}={...r,...n};Object.assign(this.context,c);const{x:d,y:l}=this.getTransformedPoint(a,s,h),u=t.width*e,m=t.height*e;this.setRotation(o,d,l),this.context.drawImage(t,d-u/2,l-m/2,u,m),d<i/2?(this.setRotation(o,d+i,l),this.context.drawImage(t,d-u/2+i,l-m/2,u,m)):(this.setRotation(o,d-i,l),this.context.drawImage(t,d-u/2-i,l-m/2,u,m))}getTransformedPoint(t,s,e){return t?s.round():s.sub(this.camera).scale(e).add(a).round()}setRotation(t,s=0,e=0){const i=Math.cos(t),n=Math.sin(t);this.context.setTransform(i,n,-n,i,s*(1-i)+e*n,e*(1-i)-s*n)}clear(){this.context.clearRect(0,0,i,n)}},Mt=new class{constructor(s=0,e=0){this.dr=Math.sign(Math.random()-.5)*(.01*Math.random()+.005),this.dx=Math.sign(Math.random()-.5)*(.51*Math.random()+.05),this.dy=ut,this.mid=new t(s,e),this.r=0}tick(t){for(this.mid.x+=this.dx*t,this.mid.y+=this.dy*t,this.mid.wrap(-i/2,i/2),this.r+=this.dr*t;this.r>2*Math.PI;)this.r-=2*Math.PI;for(;this.r<0;)this.r+=2*Math.PI;const s=1-t**-3;this.dx*=s,this.dy*=s,this.dr*=s,this.dy=this.dy*(1-mt*t)+ut*mt*t,this.dr=this.dr*(1-pt*t)+Math.sign(Math.PI-this.r)*wt*pt*t}tryApplyForce(t){if(null===t)return null;const[s,e]=t;if(null===this.getIntersection(this.mid,s))return null;const i=this.getIntersection(s,e);if(null===i)return null;const n=i.sub(s).scale(ft),a=i.sub(this.mid);return this.applyForce(a,n),i}getIntersection(s,e){const i=this.getTransformedPoints(xt);i.push(i[0]);let n=null;for(let a=0;a<i.length-1;a+=1){const o=t.intersection(s,e,i[a],i[a+1]);if(null!==o){s.distance(o)<1/0&&(n=o)}}return n}getTransformedPoints(t){return t.map(t=>t.rotate(this.r).add(this.mid))}applyForce({x:t,y:s},{x:e,y:i}){this.dx+=e,this.dy+=i,this.dr+=(t*i-s*e)*gt}draw(t){t.image(ct,this.mid,{r:this.r})}},bt=[new k,new k(2),new k(3)],vt=new class{constructor(){this.lastPoint=null,this.now=-1/0,this.points=new Set,this.pressed=!1,this.sparkles=new _,this.wizard=new rt}init(t){t.canvas.addEventListener("mousedown",s=>{s.preventDefault(),this.start(s,t)}),t.canvas.addEventListener("touchstart",s=>{s.preventDefault(),this.start(this.normalizeTouchEvent(s),t)}),t.canvas.addEventListener("mousemove",s=>{s.preventDefault(),this.move(s,t)}),t.canvas.addEventListener("touchmove",s=>{s.preventDefault(),this.move(this.normalizeTouchEvent(s),t)}),window.addEventListener("mouseup",()=>{this.stop()}),window.addEventListener("touchend",()=>{this.stop()}),window.document.addEventListener("visibilitychange",()=>{this.stop()}),window.addEventListener("contextmenu",t=>{t.preventDefault()})}normalizeTouchEvent(t){return t.touches[0]}start(t,s){this.pressed=!0,this.pushPoint(t,s.canvas)}move(t,s){this.pressed&&this.pushPoint(t,s.canvas)}stop(){this.clearPoints(),this.pressed=!1}pushPoint(t,e){const{left:a,top:o,width:r,height:h}=e.getBoundingClientRect();this.lastPoint=new s((t.clientX-a)*i/r,(t.clientY-o)*n/h,this.now),this.points.add(this.lastPoint),this.sparkles.add(this.lastPoint)}tick(t,e,i,n){if(this.sparkles.tick(t,e),this.wizard.tick(t,this.pressed),this.now=t,!this.pressed)return;this.removeOldPoints();const a=this.getIntersectionPoint(n,i);null!==a&&(this.sparkles.add(s.fromPoint(a.add(i),t),!0),this.clearPoints())}getIntersectionPoint(s,e){const n=s.tryApplyForce(this.getCurrentVector(e));return null!==n?n:null===this.lastPoint?null:s.tryApplyForce(this.getCurrentVector(e.sub(new t(this.lastPoint.x<i/2?i:-i,0))))}getCurrentVector(t){if(this.points.size<2||null===this.lastPoint)return null;const[s]=this.points;return[s.sub(t),this.lastPoint.sub(t)]}removeOldPoints(){const t=[];for(const s of this.points)s.timestamp<this.now-ht&&t.push(s);for(const s of t)this.points.delete(s);0===this.points.size&&(this.lastPoint=null)}clearPoints(){this.points=new Set,this.lastPoint=null}draw(t){this.sparkles.draw(t),this.wizard.draw(t)}};!function({drawables:t,display:s,mouse:e,toast:i}){e.init(s);let n=0,a=!0;requestAnimationFrame(function o(r){requestAnimationFrame(o);const h=Math.min(r-n,B);if(n=r,a)a=!1;else{s.clear(),i.tick(h),s.trackToast(i),q(s);for(const e of t)e.draw(s,i);i.draw(s),e.tick(r,h,s.getOffset(),i),e.draw(s)}})}({display:yt,drawables:bt,mouse:vt,toast:Mt});
