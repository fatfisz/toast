"use strict";const t=2,s=1e3,i=1e3,n=1e3;class e{constructor(t,s){this.x=t,this.y=s}add({x:t,y:s}){return new e(this.x+t,this.y+s)}sub({x:t,y:s}){return new e(this.x-t,this.y-s)}scale(t,s=t){return new e(this.x*t,this.y*s)}rotate(t){return new e(this.x*Math.cos(t)-this.y*Math.sin(t),this.x*Math.sin(t)+this.y*Math.cos(t))}distance({x:t,y:s}){return((this.x-t)**2+(this.y-s)**2)**.5}round(){return new e(Math.round(this.x),Math.round(this.y))}wrap(){for(;this.x<-s/2;)this.x+=s;for(;this.x>s/2;)this.x-=s;return this}static intersection({x:t,y:s},{x:i,y:n},{x:o,y:a},{x:h,y:r}){const l=(r-a)*(i-t)-(h-o)*(n-s);if(0===l)return null;const c=((h-o)*(s-a)-(r-a)*(t-o))/l,d=((i-t)*(s-a)-(n-s)*(t-o))/l;return c>=0&&c<=1&&d>=0&&d<=1?new e(t+c*(i-t),s+c*(n-s)):null}}class o extends e{constructor(t,s,i){super(t,s),this.timestamp=i}static fromPoint(t,s){return new o(t.x,t.y,s)}}const a=new e(s/2,i/2),h=i/18,r={absolute:!1,globalAlpha:1,lineJoin:"round",lineWidth:3,r:0,z:1};var l={parts:[{name:"rock",bounds:[43,84,33,94,0,0],data:[-4288,0,6,-2,4,5,-2,19,-4,5,19,-111,0,-2,5,19,-3,5,6,4,-3,5,-2,19,-3,5,-2,19,5,-98,0,4,-11,5,-2,19,-3,5,6,4,-4,5,19,-4,5,19,5,6,-94,0,-4,4,-2,5,19,-2,5,19,-4,5,-2,19,-4,5,6,4,-4,5,19,-4,5,19,-2,5,6,-93,0,-2,4,-3,5,-2,19,5,-2,19,-3,5,-2,19,-5,5,6,4,-5,5,19,-2,5,-2,19,-3,5,6,-92,0,-2,4,5,-3,19,5,-3,19,-3,5,-3,19,-4,5,6,4,-4,5,-2,19,-2,5,19,-4,5,6,-92,0,-2,4,5,19,-5,5,19,-3,5,19,5,19,-3,5,6,-2,4,-3,5,-2,19,-2,5,19,5,19,-4,5,6,-91,0,-2,4,5,19,-2,5,19,-2,5,19,-3,5,19,-2,5,-2,19,5,6,-2,4,-3,5,-3,19,5,-4,19,-4,5,6,-90,0,4,-2,19,-2,5,-2,19,-2,5,19,-3,5,19,-3,5,19,6,-2,4,-3,5,-2,19,5,-3,19,-2,5,19,-4,5,6,-90,0,-2,19,-3,5,19,-3,5,19,-3,5,19,-3,5,19,6,-2,4,-3,5,19,-3,5,19,-3,5,19,-4,5,6,-89,0,-3,19,-3,5,19,-3,5,19,5,-4,19,-2,5,19,6,-2,4,-2,5,-3,19,-2,5,-2,19,-2,5,-2,19,-3,5,6,-89,0,19,-2,4,19,-2,5,19,-2,5,-4,19,-2,5,19,-3,5,6,-2,4,5,-2,19,5,19,-3,5,19,-3,5,19,-4,5,6,-88,0,19,-2,4,19,-2,5,19,5,-6,19,5,-2,19,-3,5,-2,4,-4,5,19,-3,5,-2,19,-3,5,19,-3,5,6,-88,0,19,-2,4,-2,19,5,19,5,19,-2,5,19,5,19,-2,5,19,-3,5,-2,4,-4,5,19,-4,5,-3,19,5,19,-3,5,6,-89,0,-2,4,5,-3,19,-4,5,19,5,-2,19,5,-2,19,-2,5,-3,4,-4,5,19,-2,5,19,-2,5,19,-2,5,19,-2,5,6,-89,0,-3,4,5,19,-2,5,19,5,-2,19,-2,5,19,-2,5,19,-2,5,-3,4,-4,5,19,-2,5,19,-2,5,19,5,-2,19,-2,5,6,-89,0,-3,4,5,19,-2,5,19,5,19,-3,5,19,5,19,-3,5,6,-3,4,-3,5,19,5,-3,19,-3,5,19,-4,5,6,-88,0,-3,4,5,19,5,-2,19,5,19,-3,5,19,-5,5,6,-4,4,5,19,-2,5,-4,19,-2,5,19,-4,5,6,-88,0,-3,4,5,-3,19,-4,5,-2,19,-2,5,19,-4,5,6,-3,4,-4,5,19,-2,5,-2,19,5,-2,19,-3,5,6,-88,0,4,-2,19,-2,5,19,-4,5,-3,19,-2,5,-2,19,-3,5,6,-4,4,-3,5,19,-2,5,19,5,-3,19,-3,5,6,-88,0,4,19,-2,4,19,-4,5,-2,19,-5,5,19,-4,5,6,-3,4,-6,5,19,5,-4,19,-2,5,6,-88,0,4,19,-2,4,-2,19,-9,5,-2,19,-4,5,6,-4,4,-4,5,-2,19,5,-2,19,5,-2,19,5,6,-89,0,19,-3,4,19,-4,5,19,-4,5,19,-10,4,-4,5,19,5,-2,19,-3,5,19,5,6,-89,0,19,-2,4,-2,19,4,-2,5,-2,19,-2,4,-2,19,-4,4,5,19,-2,5,-4,4,-3,5,19,5,19,-5,5,-2,19,-89,0,19,4,-2,19,-5,4,-4,19,-2,4,-4,5,19,-2,5,6,-2,4,19,4,-2,5,19,5,19,-5,5,-2,19,-89,0,19,4,19,-5,4,-2,19,-2,5,-2,6,4,-5,19,-3,5,-2,6,4,19,4,-9,5,-2,19,-88,0,-2,19,0,19,-5,4,5,-2,19,-2,5,6,4,19,-3,5,-2,19,-4,5,6,-3,19,-2,4,-7,5,-2,19,-87,0,19,-2,0,19,-3,4,-3,5,-2,19,-2,5,6,-2,4,-3,5,-2,19,-4,5,6,4,5,-2,19,-8,4,0,19,-87,0,19,0,19,-3,4,-5,5,19,-3,5,6,4,-2,5,-2,19,-6,5,4,-2,5,19,-4,4,19,-2,5,6,0,19,-89,0,19,0,-2,4,-5,5,19,-3,5,6,-2,4,5,19,-6,5,-2,4,-2,5,-2,19,-3,5,19,5,6,-2,0,19,-89,0,19,0,-2,4,-6,5,19,-3,5,4,19,4,-5,5,-2,4,-5,5,19,-3,5,-3,19,-2,0,19,-89,0,19,0,-3,4,-5,5,19,-3,5,4,-3,19,5,19,-3,4,-5,5,-2,19,-5,5,19,-94,0,-4,4,-4,5,-4,4,5,6,4,-3,19,4,-6,5,-2,19,5,19,-3,5,6,19,-95,0,-3,4,-3,5,-3,4,-4,5,-3,6,-3,4,-4,5,-2,19,-2,5,-2,19,-2,5,6,-2,19,-94,0,-10,4,-5,5,6,-2,4,-3,5,-3,19,-4,5,19,5,6,-2,0,19,-94,0,-5,4,-4,19,-2,4,-4,5,-3,4,-3,5,19,-4,5,-3,19,5,6,-2,0,19,-94,0,4,19,4,-5,5,-2,19,-2,4,-2,5,-5,4,-2,5,-2,19,-2,5,19,-2,5,19,6,-98,0,4,19,4,-5,5,19,5,-10,4,-2,5,-2,19,5,19,-2,5,19,6,-98,0,4,19,4,-4,5,-2,19,-6,5,6,-6,4,-3,5,19,-3,5,19,-99,0,19,4,-4,5,19,-3,5,-2,19,-3,5,-2,6,4,-2,19,-2,4,-2,5,19,-3,5,19,-99,0,19,4,-3,5,-2,19,-4,5,19,-4,5,-2,6,4,-3,19,4,-4,5,6,19,-99,0,19,-2,4,-2,5,19,-5,5,19,-4,5,4,-3,5,-3,19,-4,4,0,-2,19,-98,0,19,-2,4,-2,5,19,-3,5,-3,19,-3,5,4,5,-4,19,-2,5,6,-3,4,-2,0,19,-97,0,-2,19,-2,4,-2,5,-2,19,5,-2,19,5,19,-2,5,-2,4,-2,5,-2,19,-4,5,-3,6,-2,0,19,-97,0,-2,19,-3,4,-2,5,-3,19,-2,5,19,5,-2,4,-4,5,-2,19,-5,5,6,-2,0,19,-98,0,19,0,-2,4,-3,5,-2,19,5,19,5,-2,19,-3,4,-2,5,19,5,-2,19,-2,5,6,-103,0,19,-3,4,-2,5,19,-2,5,-4,4,-2,19,4,5,-2,19,-2,5,-2,19,5,6,-104,0,-4,4,5,19,5,-3,4,5,-2,4,-4,19,-3,5,-3,19,-106,0,4,-2,19,-5,4,-4,5,-2,4,19,-3,4,-2,19,5,19,-106,0,-2,4,19,-3,4,5,19,-4,5,19,6,-7,4,19,-107,0,4,19,4,-3,5,19,-3,5,-2,19,5,-2,6,4,-3,6,0,19,-107,0,4,19,4,-3,5,-4,19,5,19,-3,5,6,-2,5,6,0,19,-108,0,19,-2,4,-3,5,-2,19,-2,5,-2,19,-4,5,4,-2,0,19,-108,0,19,-3,4,-2,5,-3,19,-2,5,19,-3,5,-2,4,-110,0,-2,19,-4,4,5,19,5,19,-2,5,-2,19,5,-2,4,-111,0,19,-2,0,-3,4,-2,19,-2,5,19,5,-2,19,-2,4,-112,0,19,-3,0,-2,4,19,-6,5,-2,19,-113,0,19,-4,0,4,19,4,-3,5,-3,4,19,-119,0,19,-5,4,-2,0,19,-119,0,19,-2,4,-5,0,19,-119,0,19,-127,0,19,-2085059,0]},{name:"wizard",bounds:[42,85,46,81,0,4],data:[-5950,0,-4,29,-123,0,29,-4,1,29,-122,0,29,-4,1,29,-121,0,29,-6,1,29,-120,0,29,-6,1,29,-120,0,29,-6,1,29,-120,0,29,-6,1,29,-120,0,29,-6,1,29,-106,0,-2,29,30,-12,0,29,-4,1,29,-12,0,30,-2,29,-90,0,-2,28,-2,29,30,-3,29,-6,0,30,-10,29,30,-6,0,-3,29,30,-2,29,-2,28,-89,0,28,-2,29,30,-10,29,-3,30,-4,29,-3,30,-10,29,30,-2,29,28,-91,0,-2,29,30,-13,29,-4,30,-13,29,30,-2,29,-92,0,29,30,-32,29,30,29,-92,0,29,30,-12,0,-8,29,-12,0,30,29,-106,0,30,-6,29,30,-120,0,30,-6,29,30,-120,0,29,30,-4,29,30,29,-120,0,29,30,-4,29,30,29,-120,0,29,30,-4,29,30,29,-120,0,29,30,-4,29,30,29,-120,0,29,30,-4,29,30,29,-120,0,30,-6,29,30,-119,0,30,-8,29,30,-118,0,-10,29,-118,0,-10,29,-118,0,-10,29,-118,0,-10,29,-118,0,-10,29,-117,0,-12,29,-116,0,-12,29,-116,0,-12,29,-116,0,-12,30,-116,0,-12,29,-116,0,-12,29,-118,0,-2,28,-4,0,-2,28,-120,0,-2,28,-4,0,-2,28,-13033,0,-2,33,-34,0,-2,33,-89,0,-4,33,-32,0,-4,33,-88,0,-4,33,-32,0,-4,33,-89,0,-2,33,-34,0,-2,33,-15705,0,-4,33,-32,0,-4,33,-87,0,-6,33,-30,0,-6,33,-85,0,-8,33,-28,0,-8,33,-84,0,-3,33,-2,32,-3,33,-28,0,-3,33,-2,32,-3,33,-84,0,-3,33,-2,32,-3,33,-28,0,-3,33,-2,32,-3,33,-84,0,-8,33,-28,0,-8,33,-85,0,-6,33,-30,0,-6,33,-87,0,-4,33,-32,0,-4,33,-15448,0,-4,33,-32,0,-4,33,-87,0,-6,33,-30,0,-6,33,-85,0,-3,33,-2,32,-3,33,-28,0,-3,33,-2,32,-3,33,-84,0,-2,33,-4,32,-2,33,-28,0,-2,33,-4,32,-2,33,-84,0,-2,33,-4,32,-2,33,-28,0,-2,33,-4,32,-2,33,-84,0,-3,33,-2,32,-3,33,-28,0,-3,33,-2,32,-3,33,-85,0,-6,33,-30,0,-6,33,-87,0,-4,33,-32,0,-4,33,-15448,0,-4,33,-32,0,-4,33,-87,0,-2,33,-2,32,-2,33,-30,0,-2,33,-2,32,-2,33,-85,0,-2,33,-4,32,-2,33,-28,0,-2,33,-4,32,-2,33,-84,0,33,-6,32,33,-28,0,33,-6,32,33,-84,0,33,-6,32,33,-28,0,33,-6,32,33,-84,0,-2,33,-4,32,-2,33,-28,0,-2,33,-4,32,-2,33,-85,0,-2,33,-2,32,-2,33,-30,0,-2,33,-2,32,-2,33,-87,0,-4,33,-32,0,-4,33,-2023852,0]},{name:"sparkles",bounds:[60,66,60,66,0,1],data:[-7743,0,33,-127,0,33,-126,0,33,32,33,-123,0,-2,33,-3,32,-2,33,-123,0,33,32,33,-126,0,33,-127,0,33,-15615,0,32,-127,0,32,-126,0,32,31,32,-123,0,-2,32,-3,31,-2,32,-123,0,32,31,32,-126,0,32,-127,0,32,-2072256,0]},{name:"planet",bounds:[5,120,22,106,0,0],data:[-2907,0,-8,6,-112,0,-20,6,-99,0,-33,6,-81,0,-8,33,-4,0,-11,6,5,-2,6,5,-2,6,-2,5,-2,6,5,-2,6,5,6,5,-11,6,-72,0,-19,33,-6,6,-2,5,-20,6,5,-10,6,-66,0,-26,33,-28,6,5,-9,6,-61,0,-30,33,5,-6,6,-3,5,-2,6,5,-2,6,5,-2,6,5,-11,6,5,-8,6,-57,0,-35,33,-17,6,5,-2,6,5,-8,6,5,-7,6,-53,0,29,-39,33,-20,6,5,-7,6,5,-7,6,-52,0,29,-16,33,-3,29,-21,33,6,5,-2,6,5,6,5,-2,6,5,-10,6,5,-14,6,-51,0,-2,29,-12,33,-2,29,-3,33,-3,29,-21,33,-11,6,5,-2,6,5,-6,6,5,-6,6,5,-6,6,-49,0,29,-14,33,29,-3,33,-4,29,-23,33,-7,0,-14,6,5,-12,6,-46,0,-18,33,29,-2,33,-4,29,-24,33,-10,0,-4,6,5,-6,6,5,-5,6,5,-5,6,-44,0,29,-19,33,29,-3,33,-3,29,-11,33,29,-13,33,-10,0,-11,6,5,-11,6,-43,0,-38,33,29,-14,33,-10,0,-4,6,5,-17,6,-42,0,-39,33,29,-15,33,-11,0,-10,6,5,-4,6,5,-4,6,-41,0,-55,33,-2,29,-11,0,-3,6,5,-6,6,5,-8,6,-41,0,-57,33,29,-10,0,-19,6,-40,0,-9,33,-2,29,-42,33,29,-4,33,29,-11,0,-4,6,5,-5,6,5,-3,6,5,-3,6,-39,0,-7,33,-2,29,-2,33,-2,29,-41,33,-2,29,-5,33,-10,0,-18,6,-38,0,-8,33,29,-3,33,-2,29,-42,33,-2,29,-5,33,-10,0,-9,6,5,-7,6,-37,0,-8,33,-2,29,-3,33,-2,29,-43,33,-3,29,-3,33,-11,0,-3,6,5,-8,6,5,-3,6,-37,0,-8,33,-3,29,-2,33,-2,29,-46,33,29,-3,33,-10,0,-4,6,5,-3,6,5,-7,6,-36,0,-10,33,-2,29,-25,33,-2,29,33,-3,29,-23,33,-10,0,-8,6,5,-3,6,5,-3,6,-36,0,-37,33,29,-2,33,-3,29,-24,33,-9,0,-16,6,-35,0,-37,33,-2,29,-3,33,-2,29,-24,33,-9,0,-4,6,5,-11,6,-35,0,-23,33,29,-13,33,29,-4,33,-2,29,-25,33,-7,0,-12,6,5,-3,6,-35,0,-22,33,-2,29,-15,33,29,-4,33,29,-26,33,-6,0,-5,6,5,-3,6,5,-6,6,-34,0,5,-39,33,-3,29,-29,33,-6,0,-15,6,-34,0,-2,5,-72,33,-5,0,-4,6,5,-10,6,-33,0,-2,5,-54,33,29,-18,33,-4,0,-8,6,5,-4,6,5,-2,6,-32,0,-3,5,-73,33,-4,0,-4,6,5,-10,6,-32,0,-4,5,-73,33,-4,0,-7,6,5,-7,6,-31,0,-5,5,-9,33,29,-54,33,29,-9,33,-2,0,-15,6,-31,0,-4,5,4,-10,33,29,-2,33,29,-50,33,-2,29,-9,33,-2,0,-3,6,5,-3,6,5,-4,6,5,-2,6,-30,0,-4,5,4,5,-10,33,29,-64,33,0,-7,6,5,-7,6,-30,0,-7,5,-25,33,-4,29,-12,33,29,-25,33,-2,29,-6,33,0,-15,6,-30,0,-2,5,4,-4,5,29,-22,33,29,-2,33,-4,29,-11,33,29,-2,33,29,-30,33,-12,6,5,-2,6,-30,0,-7,5,4,29,-21,33,-2,29,-4,33,-3,29,-10,33,29,-33,33,-4,6,5,-2,6,5,-6,6,-30,0,-7,5,4,5,-2,29,-19,33,29,-7,33,-2,29,-30,33,29,-12,33,-4,6,5,-9,6,-30,0,-3,5,4,-6,5,-2,29,-19,33,-2,29,-6,33,-2,29,-27,33,-2,29,33,-2,29,-10,33,-8,6,5,-3,6,5,-2,6,-29,0,-11,5,-2,29,-20,33,29,-6,33,-2,29,-27,33,29,-2,33,-2,29,-10,33,-14,6,-30,0,-2,5,4,-4,5,4,-3,5,-3,29,-19,33,29,-6,33,-2,29,-27,33,29,33,-2,29,-10,33,-4,6,5,-10,6,-29,0,-11,5,4,-3,29,-19,33,-2,29,-4,33,-3,29,-40,33,-8,6,5,-3,6,5,-2,6,-29,0,-8,5,4,-4,5,-4,29,-19,33,-2,29,-3,33,-2,29,-40,33,-8,6,5,-6,6,-29,0,-4,5,4,-9,5,-5,29,-19,33,-2,29,-17,33,29,33,29,-23,33,-4,6,5,-3,6,5,-6,6,-30,0,-7,5,4,-5,5,0,-5,29,-10,33,29,-27,33,29,33,29,-22,33,-13,6,5,6,-30,0,-3,5,4,-7,5,4,-2,5,-2,0,-5,29,-2,33,-2,29,-5,33,29,-27,33,29,-23,33,-8,6,5,-7,6,-30,0,-7,5,4,-5,5,-3,0,-5,29,-2,33,-3,29,-55,33,-5,6,5,-2,6,5,-3,6,5,-2,6,-32,0,-2,5,4,-10,5,-3,0,-6,29,-2,33,-2,29,-42,33,29,-11,33,-16,6,-31,0,-13,5,-5,0,-6,29,33,-2,29,-42,33,29,-10,33,-5,6,5,-2,6,5,-4,6,5,6,-33,0,-7,5,4,-2,5,4,-2,5,-5,0,-6,29,33,-2,29,-52,33,-15,6,-33,0,-14,5,-5,0,-9,29,-51,33,-5,6,5,-2,6,5,-3,6,5,-3,6,-33,0,-3,5,4,-3,5,4,-6,5,-5,0,-8,29,-36,33,29,-13,33,-16,6,-35,0,-13,5,-7,0,-7,29,-35,33,-2,29,-12,33,-5,6,5,-3,6,5,-6,6,-35,0,-11,5,4,-2,5,-7,0,-9,29,-46,33,-9,6,5,-3,6,5,-3,6,-35,0,-14,5,-8,0,-9,29,-20,33,29,-20,33,-2,29,33,-4,6,5,-11,6,-36,0,-3,5,4,-4,5,4,-6,5,-9,0,-8,29,-11,33,29,-28,33,-2,29,-9,6,5,-3,6,5,-2,6,-2,33,-36,0,-11,5,4,-3,5,-9,0,-10,29,-9,33,29,-2,33,29,-6,33,29,-18,33,29,-5,6,5,-11,6,33,-37,0,-3,5,4,-3,5,4,-7,5,-10,0,-9,29,-37,33,-5,6,5,-4,6,5,-3,6,5,-3,6,-2,33,-36,0,-12,5,4,-3,5,-10,0,-10,29,-12,33,-5,29,-4,33,-2,29,-11,33,-5,6,5,-4,6,5,-7,6,-3,33,-37,0,-4,5,4,-11,5,-11,0,-10,29,-5,33,-2,29,33,29,-3,33,-4,29,-3,33,-2,29,-10,33,-18,6,-5,33,-37,0,-8,5,4,-8,5,-10,0,-12,29,-2,33,-2,29,33,-2,29,-5,33,-3,29,-2,33,29,-3,33,29,-6,33,-5,6,5,-4,6,5,-5,6,5,6,-5,33,-38,0,-4,5,4,-8,5,4,-4,5,-10,0,-12,29,33,29,-2,33,29,-6,33,-3,29,-2,33,29,-3,33,29,-4,33,-10,6,5,-8,6,-5,33,-39,0,-8,5,4,-9,5,-11,0,-12,29,-3,33,29,-6,33,-4,29,-5,33,29,-2,33,-6,6,5,-4,6,5,-4,6,5,-3,6,-6,33,-39,0,-19,5,-10,0,-13,29,33,-2,29,-7,33,-3,29,-6,33,-6,6,5,-4,6,5,-3,6,5,-4,6,-6,33,-41,0,-9,5,4,-9,5,-11,0,-15,29,-7,33,-3,29,-3,33,-22,6,-7,33,-41,0,-4,5,4,-9,5,4,-5,5,-10,0,-15,29,-7,33,-3,29,33,-7,6,5,-5,6,5,-4,6,5,-3,6,-8,33,-42,0,-10,5,4,-11,5,-10,0,-15,29,-6,33,-13,6,5,-9,6,-9,33,-43,0,-15,5,4,-7,5,-10,0,-15,29,-3,33,-9,6,5,-10,6,5,-2,6,-9,33,29,33,-44,0,-5,5,4,-4,5,4,-5,5,4,-9,5,-6,0,-14,29,-10,6,5,-5,6,5,-9,6,-8,33,-2,29,-46,0,-29,5,-5,0,-4,29,-15,6,5,-5,6,5,-5,6,5,-4,6,-9,33,-2,29,-48,0,-10,5,4,-6,5,4,-14,5,-16,6,5,-18,6,-11,33,29,-50,0,-4,5,4,-14,5,4,-12,5,-12,6,5,-9,6,5,-5,6,5,-4,6,-12,33,-51,0,-10,5,4,-12,5,4,-9,5,-8,6,5,-8,6,5,-6,6,5,-5,6,-12,33,-54,0,-11,5,4,-14,5,4,-2,5,4,-3,5,-2,6,5,-10,6,5,-11,6,-14,33,-56,0,-6,5,4,-6,5,4,-20,5,-9,6,5,-8,6,5,-3,6,-9,33,-3,29,-2,33,-59,0,-15,5,4,-2,5,4,-13,5,4,5,-2,6,5,-2,6,5,-6,6,5,-7,6,-3,29,-7,33,-65,0,-6,5,4,-14,5,4,-3,5,4,-2,5,4,-6,5,-15,6,-8,29,-3,33,-68,0,-8,5,4,-26,5,-5,6,5,-5,6,-10,29,-74,0,-8,5,4,-22,5,4,-3,5,-5,6,-90,0,-8,5,4,-2,5,4,-10,5,4,-2,5,4,-9,5,-2,6,-94,0,-10,5,4,-2,5,4,-2,5,4,-11,5,-104,0,-18,5,-114,0,-9,5,-2083548,0]},{name:"toast",bounds:[14,113,60,72,0,0],data:[-7697,0,-94,15,-34,0,-94,15,-34,0,-94,15,-31,0,-100,9,-28,0,-100,9,-28,0,-100,9,-28,0,-100,9,-28,0,-100,9,-28,0,-100,9,-28,0,-100,9,-28,0,-100,9,-28,0,-100,9,-28,0,-100,9,-2087822,0]},{name:"pillar1",bounds:[58,69,61,66,0,0],data:[-7869,0,-8,6,-117,0,-12,6,-116,0,5,-10,6,5,-116,0,3,-4,5,-4,6,-2,5,3,-116,0,3,-4,4,-6,5,3,-117,0,-4,4,-4,5,-2088637,0]},{name:"pillar2",bounds:[58,69,61,66,0,0],data:[-7867,0,-8,6,-119,0,-12,6,-116,0,-3,5,-8,6,5,-116,0,3,-2,4,-4,5,-4,6,3,-116,0,3,-6,4,-4,5,3,-119,0,-4,4,-4,5,-2088635,0]},{name:"pillar3",bounds:[58,69,61,66,0,0],data:[-7867,0,-10,6,-117,0,-12,6,-116,0,5,-10,6,5,-116,0,3,4,-8,5,6,3,-116,0,-2,3,-8,4,5,3,-117,0,3,-8,4,5,-2088635,0]},{name:"pillar4",bounds:[58,69,61,66,0,0],data:[-7867,0,-5,6,-122,0,-3,5,-6,6,-119,0,3,-2,4,-3,5,-5,6,5,-116,0,-2,3,-4,4,-3,5,-2,6,3,-116,0,-2,3,-7,4,-2,5,3,-117,0,3,-7,4,-2,5,-2088635,0]},{name:"pillar5",bounds:[58,69,61,66,0,0],data:[-7872,0,-5,6,-120,0,-6,6,-2,5,3,-116,0,5,-5,6,-5,5,3,-116,0,3,4,-4,5,-3,4,-2,5,3,-116,0,-2,3,-7,4,-2,5,3,-117,0,3,-7,4,-2,5,-2088635,0]}],palette:[2037811,2829890,4278361,6844794,9478568,11979727,16777215,16564106,11894871,9064510,6044225,13185080,14576184,16756027,16770454,16578912,11851333,5358655,3185763,2321786,2510702,2307683,4289169,5018541,6537929,9753300,12123647,3942720,4597596,8545409,16229515,12743042,8727910,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]};const c=128;function d(t){const s=[];for(let i=0;i<t.length;i+=1)if(t[i]<0){for(let n=t[i];n<0;n+=1)s.push(t[i+1]);i+=1}else s.push(t[i]);return s}function u(t,s,i,n){return t[s+i*c+n*c*c]}function m(t){return[(t>>16)%256,(t>>8)%256,t%256]}function p(t,s,i,n){if(0===n)return;const[e,o,a]=m(i[n-1]);t[s]=e,t[s+1]=o,t[s+2]=a,t[s+3]=255}function f(t,s,i,n){const e=s[1]-s[0]+1,o=s[3]-s[2]+1,a=document.createElement("canvas");a.width=e,a.height=o;const h=a.getContext("2d"),r=h.createImageData(c,c);for(let e=s[0];e<=s[1];e+=1)for(let o=s[2];o<=s[3];o+=1)p(r.data,4*(e+o*c),n,u(t,e,o,i));return h.putImageData(r,-s[0],-s[2]),a}function w({bounds:t,data:s},i){const n=[];for(let e=t[4];e<=t[5];e+=1)n[e]=f(s,t,e,i);return n}const g=new Map;function x(t,s=0){return g.get(t)[s]}const y=[];function M(t){return y[t]}!function(){for(const t of l.parts)t.data=d(t.data),g.set(t.name,w(t,l.palette));for(const s of l.palette)y.push(`rgb(${(t=m(s))[0]}, ${t[1]}, ${t[2]})`);var t}();const P=new e(.5,20),b=30,v=Math.ceil(i/b),k=.95*s;class I{constructor(t=1){this.pointCache=new Map,this.z=t}draw(t,s){const i=this.getMinimumY(t.camera);this.trimExcess(i),this.ensureEnough(i);const n=Math.min(.15*Math.abs(s.dy),1);for(const s of this.pointCache.values())this.drawOne(t,s,n)}getMinimumY(t){return Math.floor((t.y-i/2)/b)}trimExcess(t){for(const s of this.pointCache.keys())s<t&&this.pointCache.delete(s)}ensureEnough(t){const s=t+v;for(let i=t;i<=s;i+=1)this.ensurePoint(i)}ensurePoint(t){this.pointCache.has(t)||this.pointCache.set(t,new e(Math.random()*k-k/2,t*b))}drawOne(t,s,i){t.rect(s.sub(P),s.add(P),{fillStyle:M(26),globalAlpha:i,z:this.z})}}const C=2*i,z=[x("pillar1"),x("pillar2"),x("pillar3"),x("pillar4"),x("pillar5")],E=.006,T=C/5/t,S=4;function A(t,s,i,n){const{width:e,height:o}=s;t.drawImage(s,0,S+1,e,o,i,n+S+T,e,o),t.drawImage(s,0,S,e,1,i,n+S,e,T),t.drawImage(s,i,n)}const O=document.createElement("canvas");!function(){const i=function(){const t=[],i=C/4,n=C/2,o=C-n,a=s;for(let s=i;s<n+o;s+=16)for(let o=-100;o<a+100;o+=36+24*Math.random()){const h=1-(s/n)**5;Math.abs(o-a/2)/(a/2)>h&&Math.random()<.75&&t.push([new e(o,s-i+12*Math.random()),z[Math.floor(Math.random()*z.length)]])}return t}();O.width=s/t,O.height=C/t;const n=O.getContext("2d");n.imageSmoothingEnabled=!1;for(const[s,e]of i)A(n,e,(s.x-e.width)/t,(s.y-e.height)/t)}();const R=new e(0,0),L=new e(s,i),D=x("planet"),F=.0015,H=new e(s/3/F,-i/3/F),V=.002,Y=s/2/V,$=i/V,j=new e(-Y,i/2.5/V),q=new e(Y,$);function B(t){t.rect(R,L,{absolute:!0,fillStyle:M(23)}),t.image(D,H,{z:F}),t.rect(j,q,{fillStyle:M(22),z:V}),function(t){t.image(O,new e(0,(C+i/3)/2/E),{z:E})}(t)}const J=x("toast"),W=2*J.height,X=2*J.width,G=1.2,K=2e-4,N=1e-6,Q=.05,U=.001,Z=25e-5,_=32,tt=.2,st=1e-5,it=[new e(-X/2,-W/2),new e(-X/2,W/2),new e(X/2,W/2),new e(X/2,-W/2)];function nt(t){return t.y>n}class et{constructor(t=0,s=0){this.collisionPoint=null,this.dr=Math.sign(Math.random()-.5)*(.01*Math.random()+.005),this.dx=Math.sign(Math.random()-.5)*(.05*Math.random()+.025),this.dy=G,this.lastPhase=!1,this.mid=new e(t,s),this.r=0}tick(t){const s=this.mid.x,i=this.mid.y,n=this.r;if(null!==this.collisionPoint&&this.handleCollision(this.collisionPoint,t),!this.lastPhase){this.mid.x+=this.dx*t,this.mid.y+=this.dy*t,this.r+=this.dr*t,this.wrap();const e=1-t**-3;if(this.dx*=e,this.dy*=e,this.dr*=e,this.dy=this.dy*(1-K*t)+G*K*t,this.dr=this.dr*(1-N*t)+Math.sign(Math.PI-this.r)*Q*N*t,this.isColliding()){const[e,o]=this.findCollisionPoint(s,i,n,t);this.collisionPoint=e,this.handleCollision(this.collisionPoint,o)}}}isColliding(){return this.getTransformedPoints().some(nt)}findCollisionPoint(t,s,i,e){let o=this.mid,a=0,h=e;for(let n=0;n<_;n+=1){const n=(a+h)/2;this.mid.x=t+this.dx*n,this.mid.y=s+this.dy*n,this.r=i+this.dr*n,this.wrap();const e=this.getTransformedPoints().find(nt);e?(h=n,o=e):a=n}return this.mid.y+=n-o.y,o.y=n,[o,e-h]}handleCollision(t,s,i=!1){const o=t.sub(this.mid).wrap();if(this.lastPhase){const t=this.getIntersection(this.mid,new e(this.mid.x,n+1));null!==t&&(this.dr-=s/100*Z*Math.sign(o.x)*Math.max(n-t.y,0)**.6)}else this.dx=0,this.dy=0,this.dr=Z*-Math.sign(o.x),this.lastPhase=!0;const a=this.dr*s,h=this.getClosestRightAngle();if(Math.sign(this.r-h)===Math.sign(this.r+a-h)||i){const t=o.rotate(a).sub(o);this.mid=this.mid.sub(t),this.mid.y=Math.min(this.mid.y,n-W/2),this.r+=a,this.wrap()}else{const i=(h-this.r)/this.dr;this.handleCollision(t,i,!0),this.collisionPoint=t.sub(this.mid).scale(-1,1).add(this.mid),this.dr*=tt,Math.abs(this.dr)<st&&(this.dr=0,this.collisionPoint=new e(this.mid.x,n)),this.handleCollision(this.collisionPoint,s-i,!0)}}getClosestRightAngle(){const t=.25*Math.PI;for(const s of[0,.5*Math.PI,Math.PI,1.5*Math.PI])if(Math.abs(this.r-s)<=t)return s;return 2*Math.PI}tryApplyForce(t){if(null===t)return null;const[s,i]=t;if(null===this.getIntersection(this.mid,s))return null;const n=this.getIntersection(s,i);if(null===n)return null;const e=n.sub(s).scale(U),o=n.sub(this.mid);return this.applyForce(o,e),n}getIntersection(t,s){const i=this.getTransformedPoints();i.push(i[0]);let n=null;for(let o=0;o<i.length-1;o+=1){const a=e.intersection(t,s,i[o],i[o+1]);if(null!==a){t.distance(a)<1/0&&(n=a)}}return n}getTransformedPoints(){return it.map(t=>t.rotate(this.r).add(this.mid))}applyForce({x:t,y:s},{x:i,y:n}){this.dx+=i,this.dy+=n,this.dr+=(t*n-s*i)*Z}wrap(){for(this.mid.wrap();this.r>2*Math.PI;)this.r-=2*Math.PI;for(;this.r<0;)this.r+=2*Math.PI}draw(t){t.image(J,this.mid,{r:this.r}),t.rect(new e(-s/2,n-1),new e(s/2,n+1),{fillStyle:"hotpink"})}}const ot=20;const at=1,ht=20,rt=5,lt=80,ct=400,dt=2*ct,ut=.05*ct,mt={basic:x("sparkles",0),hit:x("sparkles",1)};class pt extends o{constructor(t,s,i){super(t.x+(Math.random()-.5)*lt,t.y+(Math.random()-.5)*lt,t.timestamp+s),this.r=Math.random()*Math.PI,this.dx=(Math.random()-.5)*lt/ct,this.dy=(Math.random()-.5)*lt/ct,this.dr=Math.random()/100,this.isHit=i}isExpired(t){return t-this.timestamp>(this.isHit?dt:ct)}tick(t){this.x+=this.dx*t,this.y+=this.dy*t,this.r+=this.dr*t;const s=1-t**-1.5;this.dx*=s,this.dy*=s,this.dr*=s}draw(t,s){const i=this.isHit?mt.hit:mt.basic,n=function(t,s){return s<ut?s/ut:(t-s)/(t-ut)}(this.isHit?dt:ct,s-this.timestamp)**.5,o=this.isHit?1:.5;t.image(i,new e(this.x,this.y),{absolute:!0,globalAlpha:n*o,r:this.r})}}class ft{constructor(){this.now=-1/0,this.sparkles=new Set}add(t,s=!1){for(let i=0;i<(s?ht:at);i+=1)this.sparkles.add(new pt(t,rt*i,s))}tick(t,s){this.now=t,this.removeOldSparkles(),this.updateSparkles(s)}removeOldSparkles(){const t=[];for(const s of this.sparkles)s.isExpired(this.now)&&t.push(s);for(const s of t)this.sparkles.delete(s)}updateSparkles(t){for(const s of this.sparkles)s.tick(t)}draw(t){for(const s of this.sparkles)s.draw(t,this.now)}}const wt=[x("wizard"),x("wizard",1),x("wizard",2),x("wizard",3),x("wizard",4)],gt=new e(s/2,i/4),xt=1,yt=wt.length-1-xt,Mt=80,Pt=2*Math.PI*35e-5,bt=8;class vt{constructor(){this.offset=-1/0,this.phase=0,this.startTimestamp=0}tick(t,s){if(this.offset=Math.sin(t*Pt)*bt,s){const s=Math.floor((t-this.startTimestamp)/Mt);0===this.phase?(this.startTimestamp=t,this.phase=1):this.phase<xt?this.phase=s%xt+1:this.phase=(s-xt)%yt+xt+1}else this.phase=0}draw(t){const s=gt.add(new e(0,this.offset));t.image(wt[0],s,{absolute:!0}),this.phase>0&&t.image(wt[this.phase],s,{absolute:!0})}}const kt=120;const It=new class{constructor(){this.camera=new e(0,h),this.canvas=canvas,this.canvas.width=s,this.canvas.height=i,this.context=canvas.getContext("2d"),this.context.imageSmoothingEnabled=!1}trackToast(t){this.camera.y=Math.min(t.mid.y+h,n-100)}getOffset(){return a.sub(this.camera)}rect(t,s,i){const{absolute:n,r:e,z:o,...a}={...r,...i};Object.assign(this.context,a);const{x:h,y:l}=this.getTransformedPoint(n,t,o),{x:c,y:d}=this.getTransformedPoint(n,s,o);this.setRotation(0),this.context.beginPath(),this.context.rect(h,l,c-h,d-l),this.context.closePath(),a.fillStyle&&this.context.fill(),a.strokeStyle&&this.context.stroke()}image(i,n,e){const{absolute:o,r:a,z:h,...l}={...r,...e};Object.assign(this.context,l);const{x:c,y:d}=this.getTransformedPoint(o,n,h),u=i.width*t,m=i.height*t;this.setRotation(a,c,d),this.context.drawImage(i,c-u/2,d-m/2,u,m),c<s/2?(this.setRotation(a,c+s,d),this.context.drawImage(i,c-u/2+s,d-m/2,u,m)):(this.setRotation(a,c-s,d),this.context.drawImage(i,c-u/2-s,d-m/2,u,m))}getTransformedPoint(t,s,i){return t?s.round():s.sub(this.camera).scale(i).add(a).round()}setRotation(t,s=0,i=0){const n=Math.cos(t),e=Math.sin(t);this.context.setTransform(n,e,-e,n,s*(1-n)+i*e,i*(1-n)-s*e)}clear(){this.context.clearRect(0,0,s,i)}},Ct=new class{constructor(){this.lastPoint=null,this.now=-1/0,this.points=new Set,this.pressed=!1,this.sparkles=new ft,this.wizard=new vt}init(t){t.canvas.addEventListener("mousedown",s=>{s.preventDefault(),this.start(s,t)}),t.canvas.addEventListener("touchstart",s=>{s.preventDefault(),this.start(this.normalizeTouchEvent(s),t)}),t.canvas.addEventListener("mousemove",s=>{s.preventDefault(),this.move(s,t)}),t.canvas.addEventListener("touchmove",s=>{s.preventDefault(),this.move(this.normalizeTouchEvent(s),t)}),window.addEventListener("mouseup",()=>{this.stop()}),window.addEventListener("touchend",()=>{this.stop()}),window.document.addEventListener("visibilitychange",()=>{this.stop()}),window.addEventListener("contextmenu",t=>{t.preventDefault()})}normalizeTouchEvent(t){return t.touches[0]}start(t,s){this.pressed=!0,this.pushPoint(t,s.canvas)}move(t,s){this.pressed&&this.pushPoint(t,s.canvas)}stop(){this.clearPoints(),this.pressed=!1}pushPoint(t,n){const{left:e,top:a,width:h,height:r}=n.getBoundingClientRect();this.lastPoint=new o((t.clientX-e)*s/h,(t.clientY-a)*i/r,this.now),this.points.add(this.lastPoint),this.sparkles.add(this.lastPoint)}tick(t,s,i,n){if(this.sparkles.tick(t,s),this.wizard.tick(t,this.pressed),this.now=t,!this.pressed)return;this.removeOldPoints();const e=this.getIntersectionPoint(n,i);null!==e&&(this.sparkles.add(o.fromPoint(e.add(i),t),!0),this.clearPoints())}getIntersectionPoint(t,i){const n=t.tryApplyForce(this.getCurrentVector(i));return null!==n?n:null===this.lastPoint?null:t.tryApplyForce(this.getCurrentVector(i.sub(new e(this.lastPoint.x<s/2?s:-s,0))))}getCurrentVector(t){if(this.points.size<2||null===this.lastPoint)return null;const[s]=this.points;return[s.sub(t),this.lastPoint.sub(t)]}removeOldPoints(){const t=[];for(const s of this.points)s.timestamp<this.now-kt&&t.push(s);for(const s of t)this.points.delete(s);0===this.points.size&&(this.lastPoint=null)}clearPoints(){this.points=new Set,this.lastPoint=null}draw(t){this.sparkles.draw(t),this.wizard.draw(t)}};Ct.init(It),function({display:t,mouse:s}){const i=new et,n=[new I,new I(2),new I(3),i,s];let e=0,o=!0;requestAnimationFrame(function a(h){requestAnimationFrame(a);const r=Math.min(h-e,ot);if(e=h,o)o=!1;else{t.clear(),i.tick(r),t.trackToast(i),s.tick(h,r,t.getOffset(),i),B(t);for(const s of n)s.draw(t,i)}})}({display:It,mouse:Ct});
