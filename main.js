"use strict";const t=2,s=1e3,i=1e3,n=19100,e=19850,o=2e4;class a{constructor(t,s){this.x=t,this.y=s}add({x:t,y:s}){return new a(this.x+t,this.y+s)}sub({x:t,y:s}){return new a(this.x-t,this.y-s)}scale(t,s=t){return new a(this.x*t,this.y*s)}rotate(t){return new a(this.x*Math.cos(t)-this.y*Math.sin(t),this.x*Math.sin(t)+this.y*Math.cos(t))}distance({x:t,y:s}){return((this.x-t)**2+(this.y-s)**2)**.5}round(){return new a(Math.round(this.x),Math.round(this.y))}wrap(){for(;this.x<-s/2;)this.x+=s;for(;this.x>s/2;)this.x-=s;return this}static intersection({x:t,y:s},{x:i,y:n},{x:e,y:o},{x:h,y:r}){const l=(r-o)*(i-t)-(h-e)*(n-s);if(0===l)return null;const c=((h-e)*(s-o)-(r-o)*(t-e))/l,d=((i-t)*(s-o)-(n-s)*(t-e))/l;return c>=0&&c<=1&&d>=0&&d<=1?new a(t+c*(i-t),s+c*(n-s)):null}}class h extends a{constructor(t,s,i){super(t,s),this.timestamp=i}static fromPoint(t,s){return new h(t.x,t.y,s)}}const r=new a(s/2,i/2),l=i/18,c={absolute:!1,globalAlpha:1,lineJoin:"round",lineWidth:3,r:0,z:1};var d={parts:[{name:"rock",bounds:[43,84,33,94,0,0],data:[-4288,0,6,-2,4,5,-2,19,-4,5,19,-111,0,-2,5,19,-3,5,6,4,-3,5,-2,19,-3,5,-2,19,5,-98,0,4,-11,5,-2,19,-3,5,6,4,-4,5,19,-4,5,19,5,6,-94,0,-4,4,-2,5,19,-2,5,19,-4,5,-2,19,-4,5,6,4,-4,5,19,-4,5,19,-2,5,6,-93,0,-2,4,-3,5,-2,19,5,-2,19,-3,5,-2,19,-5,5,6,4,-5,5,19,-2,5,-2,19,-3,5,6,-92,0,-2,4,5,-3,19,5,-3,19,-3,5,-3,19,-4,5,6,4,-4,5,-2,19,-2,5,19,-4,5,6,-92,0,-2,4,5,19,-5,5,19,-3,5,19,5,19,-3,5,6,-2,4,-3,5,-2,19,-2,5,19,5,19,-4,5,6,-91,0,-2,4,5,19,-2,5,19,-2,5,19,-3,5,19,-2,5,-2,19,5,6,-2,4,-3,5,-3,19,5,-4,19,-4,5,6,-90,0,4,-2,19,-2,5,-2,19,-2,5,19,-3,5,19,-3,5,19,6,-2,4,-3,5,-2,19,5,-3,19,-2,5,19,-4,5,6,-90,0,-2,19,-3,5,19,-3,5,19,-3,5,19,-3,5,19,6,-2,4,-3,5,19,-3,5,19,-3,5,19,-4,5,6,-89,0,-3,19,-3,5,19,-3,5,19,5,-4,19,-2,5,19,6,-2,4,-2,5,-3,19,-2,5,-2,19,-2,5,-2,19,-3,5,6,-89,0,19,-2,4,19,-2,5,19,-2,5,-4,19,-2,5,19,-3,5,6,-2,4,5,-2,19,5,19,-3,5,19,-3,5,19,-4,5,6,-88,0,19,-2,4,19,-2,5,19,5,-6,19,5,-2,19,-3,5,-2,4,-4,5,19,-3,5,-2,19,-3,5,19,-3,5,6,-88,0,19,-2,4,-2,19,5,19,5,19,-2,5,19,5,19,-2,5,19,-3,5,-2,4,-4,5,19,-4,5,-3,19,5,19,-3,5,6,-89,0,-2,4,5,-3,19,-4,5,19,5,-2,19,5,-2,19,-2,5,-3,4,-4,5,19,-2,5,19,-2,5,19,-2,5,19,-2,5,6,-89,0,-3,4,5,19,-2,5,19,5,-2,19,-2,5,19,-2,5,19,-2,5,-3,4,-4,5,19,-2,5,19,-2,5,19,5,-2,19,-2,5,6,-89,0,-3,4,5,19,-2,5,19,5,19,-3,5,19,5,19,-3,5,6,-3,4,-3,5,19,5,-3,19,-3,5,19,-4,5,6,-88,0,-3,4,5,19,5,-2,19,5,19,-3,5,19,-5,5,6,-4,4,5,19,-2,5,-4,19,-2,5,19,-4,5,6,-88,0,-3,4,5,-3,19,-4,5,-2,19,-2,5,19,-4,5,6,-3,4,-4,5,19,-2,5,-2,19,5,-2,19,-3,5,6,-88,0,4,-2,19,-2,5,19,-4,5,-3,19,-2,5,-2,19,-3,5,6,-4,4,-3,5,19,-2,5,19,5,-3,19,-3,5,6,-88,0,4,19,-2,4,19,-4,5,-2,19,-5,5,19,-4,5,6,-3,4,-6,5,19,5,-4,19,-2,5,6,-88,0,4,19,-2,4,-2,19,-9,5,-2,19,-4,5,6,-4,4,-4,5,-2,19,5,-2,19,5,-2,19,5,6,-89,0,19,-3,4,19,-4,5,19,-4,5,19,-10,4,-4,5,19,5,-2,19,-3,5,19,5,6,-89,0,19,-2,4,-2,19,4,-2,5,-2,19,-2,4,-2,19,-4,4,5,19,-2,5,-4,4,-3,5,19,5,19,-5,5,-2,19,-89,0,19,4,-2,19,-5,4,-4,19,-2,4,-4,5,19,-2,5,6,-2,4,19,4,-2,5,19,5,19,-5,5,-2,19,-89,0,19,4,19,-5,4,-2,19,-2,5,-2,6,4,-5,19,-3,5,-2,6,4,19,4,-9,5,-2,19,-88,0,-2,19,0,19,-5,4,5,-2,19,-2,5,6,4,19,-3,5,-2,19,-4,5,6,-3,19,-2,4,-7,5,-2,19,-87,0,19,-2,0,19,-3,4,-3,5,-2,19,-2,5,6,-2,4,-3,5,-2,19,-4,5,6,4,5,-2,19,-8,4,0,19,-87,0,19,0,19,-3,4,-5,5,19,-3,5,6,4,-2,5,-2,19,-6,5,4,-2,5,19,-4,4,19,-2,5,6,0,19,-89,0,19,0,-2,4,-5,5,19,-3,5,6,-2,4,5,19,-6,5,-2,4,-2,5,-2,19,-3,5,19,5,6,-2,0,19,-89,0,19,0,-2,4,-6,5,19,-3,5,4,19,4,-5,5,-2,4,-5,5,19,-3,5,-3,19,-2,0,19,-89,0,19,0,-3,4,-5,5,19,-3,5,4,-3,19,5,19,-3,4,-5,5,-2,19,-5,5,19,-94,0,-4,4,-4,5,-4,4,5,6,4,-3,19,4,-6,5,-2,19,5,19,-3,5,6,19,-95,0,-3,4,-3,5,-3,4,-4,5,-3,6,-3,4,-4,5,-2,19,-2,5,-2,19,-2,5,6,-2,19,-94,0,-10,4,-5,5,6,-2,4,-3,5,-3,19,-4,5,19,5,6,-2,0,19,-94,0,-5,4,-4,19,-2,4,-4,5,-3,4,-3,5,19,-4,5,-3,19,5,6,-2,0,19,-94,0,4,19,4,-5,5,-2,19,-2,4,-2,5,-5,4,-2,5,-2,19,-2,5,19,-2,5,19,6,-98,0,4,19,4,-5,5,19,5,-10,4,-2,5,-2,19,5,19,-2,5,19,6,-98,0,4,19,4,-4,5,-2,19,-6,5,6,-6,4,-3,5,19,-3,5,19,-99,0,19,4,-4,5,19,-3,5,-2,19,-3,5,-2,6,4,-2,19,-2,4,-2,5,19,-3,5,19,-99,0,19,4,-3,5,-2,19,-4,5,19,-4,5,-2,6,4,-3,19,4,-4,5,6,19,-99,0,19,-2,4,-2,5,19,-5,5,19,-4,5,4,-3,5,-3,19,-4,4,0,-2,19,-98,0,19,-2,4,-2,5,19,-3,5,-3,19,-3,5,4,5,-4,19,-2,5,6,-3,4,-2,0,19,-97,0,-2,19,-2,4,-2,5,-2,19,5,-2,19,5,19,-2,5,-2,4,-2,5,-2,19,-4,5,-3,6,-2,0,19,-97,0,-2,19,-3,4,-2,5,-3,19,-2,5,19,5,-2,4,-4,5,-2,19,-5,5,6,-2,0,19,-98,0,19,0,-2,4,-3,5,-2,19,5,19,5,-2,19,-3,4,-2,5,19,5,-2,19,-2,5,6,-103,0,19,-3,4,-2,5,19,-2,5,-4,4,-2,19,4,5,-2,19,-2,5,-2,19,5,6,-104,0,-4,4,5,19,5,-3,4,5,-2,4,-4,19,-3,5,-3,19,-106,0,4,-2,19,-5,4,-4,5,-2,4,19,-3,4,-2,19,5,19,-106,0,-2,4,19,-3,4,5,19,-4,5,19,6,-7,4,19,-107,0,4,19,4,-3,5,19,-3,5,-2,19,5,-2,6,4,-3,6,0,19,-107,0,4,19,4,-3,5,-4,19,5,19,-3,5,6,-2,5,6,0,19,-108,0,19,-2,4,-3,5,-2,19,-2,5,-2,19,-4,5,4,-2,0,19,-108,0,19,-3,4,-2,5,-3,19,-2,5,19,-3,5,-2,4,-110,0,-2,19,-4,4,5,19,5,19,-2,5,-2,19,5,-2,4,-111,0,19,-2,0,-3,4,-2,19,-2,5,19,5,-2,19,-2,4,-112,0,19,-3,0,-2,4,19,-6,5,-2,19,-113,0,19,-4,0,4,19,4,-3,5,-3,4,19,-119,0,19,-5,4,-2,0,19,-119,0,19,-2,4,-5,0,19,-119,0,19,-127,0,19,-2085059,0]},{name:"wizard",bounds:[42,85,46,81,0,4],data:[-5950,0,-4,29,-123,0,29,-4,1,29,-122,0,29,-4,1,29,-121,0,29,-6,1,29,-120,0,29,-6,1,29,-120,0,29,-6,1,29,-120,0,29,-6,1,29,-120,0,29,-6,1,29,-106,0,-2,29,30,-12,0,29,-4,1,29,-12,0,30,-2,29,-90,0,-2,28,-2,29,30,-3,29,-6,0,30,-10,29,30,-6,0,-3,29,30,-2,29,-2,28,-89,0,28,-2,29,30,-10,29,-3,30,-4,29,-3,30,-10,29,30,-2,29,28,-91,0,-2,29,30,-13,29,-4,30,-13,29,30,-2,29,-92,0,29,30,-32,29,30,29,-92,0,29,30,-12,0,-8,29,-12,0,30,29,-106,0,30,-6,29,30,-120,0,30,-6,29,30,-120,0,29,30,-4,29,30,29,-120,0,29,30,-4,29,30,29,-120,0,29,30,-4,29,30,29,-120,0,29,30,-4,29,30,29,-120,0,29,30,-4,29,30,29,-120,0,30,-6,29,30,-119,0,30,-8,29,30,-118,0,-10,29,-118,0,-10,29,-118,0,-10,29,-118,0,-10,29,-118,0,-10,29,-117,0,-12,29,-116,0,-12,29,-116,0,-12,29,-116,0,-12,30,-116,0,-12,29,-116,0,-12,29,-118,0,-2,28,-4,0,-2,28,-120,0,-2,28,-4,0,-2,28,-13033,0,-2,33,-34,0,-2,33,-89,0,-4,33,-32,0,-4,33,-88,0,-4,33,-32,0,-4,33,-89,0,-2,33,-34,0,-2,33,-15705,0,-4,33,-32,0,-4,33,-87,0,-6,33,-30,0,-6,33,-85,0,-8,33,-28,0,-8,33,-84,0,-3,33,-2,32,-3,33,-28,0,-3,33,-2,32,-3,33,-84,0,-3,33,-2,32,-3,33,-28,0,-3,33,-2,32,-3,33,-84,0,-8,33,-28,0,-8,33,-85,0,-6,33,-30,0,-6,33,-87,0,-4,33,-32,0,-4,33,-15448,0,-4,33,-32,0,-4,33,-87,0,-6,33,-30,0,-6,33,-85,0,-3,33,-2,32,-3,33,-28,0,-3,33,-2,32,-3,33,-84,0,-2,33,-4,32,-2,33,-28,0,-2,33,-4,32,-2,33,-84,0,-2,33,-4,32,-2,33,-28,0,-2,33,-4,32,-2,33,-84,0,-3,33,-2,32,-3,33,-28,0,-3,33,-2,32,-3,33,-85,0,-6,33,-30,0,-6,33,-87,0,-4,33,-32,0,-4,33,-15448,0,-4,33,-32,0,-4,33,-87,0,-2,33,-2,32,-2,33,-30,0,-2,33,-2,32,-2,33,-85,0,-2,33,-4,32,-2,33,-28,0,-2,33,-4,32,-2,33,-84,0,33,-6,32,33,-28,0,33,-6,32,33,-84,0,33,-6,32,33,-28,0,33,-6,32,33,-84,0,-2,33,-4,32,-2,33,-28,0,-2,33,-4,32,-2,33,-85,0,-2,33,-2,32,-2,33,-30,0,-2,33,-2,32,-2,33,-87,0,-4,33,-32,0,-4,33,-2023852,0]},{name:"sparkles",bounds:[60,66,60,66,0,1],data:[-7743,0,33,-127,0,33,-126,0,33,32,33,-123,0,-2,33,-3,32,-2,33,-123,0,33,32,33,-126,0,33,-127,0,33,-15615,0,32,-127,0,32,-126,0,32,31,32,-123,0,-2,32,-3,31,-2,32,-123,0,32,31,32,-126,0,32,-127,0,32,-2072256,0]},{name:"planet",bounds:[5,120,22,106,0,0],data:[-2907,0,-8,6,-112,0,-20,6,-99,0,-33,6,-81,0,-8,33,-4,0,-11,6,5,-2,6,5,-2,6,-2,5,-2,6,5,-2,6,5,6,5,-11,6,-72,0,-19,33,-6,6,-2,5,-20,6,5,-10,6,-66,0,-26,33,-28,6,5,-9,6,-61,0,-30,33,5,-6,6,-3,5,-2,6,5,-2,6,5,-2,6,5,-11,6,5,-8,6,-57,0,-35,33,-17,6,5,-2,6,5,-8,6,5,-7,6,-53,0,29,-39,33,-20,6,5,-7,6,5,-7,6,-52,0,29,-16,33,-3,29,-21,33,6,5,-2,6,5,6,5,-2,6,5,-10,6,5,-14,6,-51,0,-2,29,-12,33,-2,29,-3,33,-3,29,-21,33,-11,6,5,-2,6,5,-6,6,5,-6,6,5,-6,6,-49,0,29,-14,33,29,-3,33,-4,29,-23,33,-7,0,-14,6,5,-12,6,-46,0,-18,33,29,-2,33,-4,29,-24,33,-10,0,-4,6,5,-6,6,5,-5,6,5,-5,6,-44,0,29,-19,33,29,-3,33,-3,29,-11,33,29,-13,33,-10,0,-11,6,5,-11,6,-43,0,-38,33,29,-14,33,-10,0,-4,6,5,-17,6,-42,0,-39,33,29,-15,33,-11,0,-10,6,5,-4,6,5,-4,6,-41,0,-55,33,-2,29,-11,0,-3,6,5,-6,6,5,-8,6,-41,0,-57,33,29,-10,0,-19,6,-40,0,-9,33,-2,29,-42,33,29,-4,33,29,-11,0,-4,6,5,-5,6,5,-3,6,5,-3,6,-39,0,-7,33,-2,29,-2,33,-2,29,-41,33,-2,29,-5,33,-10,0,-18,6,-38,0,-8,33,29,-3,33,-2,29,-42,33,-2,29,-5,33,-10,0,-9,6,5,-7,6,-37,0,-8,33,-2,29,-3,33,-2,29,-43,33,-3,29,-3,33,-11,0,-3,6,5,-8,6,5,-3,6,-37,0,-8,33,-3,29,-2,33,-2,29,-46,33,29,-3,33,-10,0,-4,6,5,-3,6,5,-7,6,-36,0,-10,33,-2,29,-25,33,-2,29,33,-3,29,-23,33,-10,0,-8,6,5,-3,6,5,-3,6,-36,0,-37,33,29,-2,33,-3,29,-24,33,-9,0,-16,6,-35,0,-37,33,-2,29,-3,33,-2,29,-24,33,-9,0,-4,6,5,-11,6,-35,0,-23,33,29,-13,33,29,-4,33,-2,29,-25,33,-7,0,-12,6,5,-3,6,-35,0,-22,33,-2,29,-15,33,29,-4,33,29,-26,33,-6,0,-5,6,5,-3,6,5,-6,6,-34,0,5,-39,33,-3,29,-29,33,-6,0,-15,6,-34,0,-2,5,-72,33,-5,0,-4,6,5,-10,6,-33,0,-2,5,-54,33,29,-18,33,-4,0,-8,6,5,-4,6,5,-2,6,-32,0,-3,5,-73,33,-4,0,-4,6,5,-10,6,-32,0,-4,5,-73,33,-4,0,-7,6,5,-7,6,-31,0,-5,5,-9,33,29,-54,33,29,-9,33,-2,0,-15,6,-31,0,-4,5,4,-10,33,29,-2,33,29,-50,33,-2,29,-9,33,-2,0,-3,6,5,-3,6,5,-4,6,5,-2,6,-30,0,-4,5,4,5,-10,33,29,-64,33,0,-7,6,5,-7,6,-30,0,-7,5,-25,33,-4,29,-12,33,29,-25,33,-2,29,-6,33,0,-15,6,-30,0,-2,5,4,-4,5,29,-22,33,29,-2,33,-4,29,-11,33,29,-2,33,29,-30,33,-12,6,5,-2,6,-30,0,-7,5,4,29,-21,33,-2,29,-4,33,-3,29,-10,33,29,-33,33,-4,6,5,-2,6,5,-6,6,-30,0,-7,5,4,5,-2,29,-19,33,29,-7,33,-2,29,-30,33,29,-12,33,-4,6,5,-9,6,-30,0,-3,5,4,-6,5,-2,29,-19,33,-2,29,-6,33,-2,29,-27,33,-2,29,33,-2,29,-10,33,-8,6,5,-3,6,5,-2,6,-29,0,-11,5,-2,29,-20,33,29,-6,33,-2,29,-27,33,29,-2,33,-2,29,-10,33,-14,6,-30,0,-2,5,4,-4,5,4,-3,5,-3,29,-19,33,29,-6,33,-2,29,-27,33,29,33,-2,29,-10,33,-4,6,5,-10,6,-29,0,-11,5,4,-3,29,-19,33,-2,29,-4,33,-3,29,-40,33,-8,6,5,-3,6,5,-2,6,-29,0,-8,5,4,-4,5,-4,29,-19,33,-2,29,-3,33,-2,29,-40,33,-8,6,5,-6,6,-29,0,-4,5,4,-9,5,-5,29,-19,33,-2,29,-17,33,29,33,29,-23,33,-4,6,5,-3,6,5,-6,6,-30,0,-7,5,4,-5,5,0,-5,29,-10,33,29,-27,33,29,33,29,-22,33,-13,6,5,6,-30,0,-3,5,4,-7,5,4,-2,5,-2,0,-5,29,-2,33,-2,29,-5,33,29,-27,33,29,-23,33,-8,6,5,-7,6,-30,0,-7,5,4,-5,5,-3,0,-5,29,-2,33,-3,29,-55,33,-5,6,5,-2,6,5,-3,6,5,-2,6,-32,0,-2,5,4,-10,5,-3,0,-6,29,-2,33,-2,29,-42,33,29,-11,33,-16,6,-31,0,-13,5,-5,0,-6,29,33,-2,29,-42,33,29,-10,33,-5,6,5,-2,6,5,-4,6,5,6,-33,0,-7,5,4,-2,5,4,-2,5,-5,0,-6,29,33,-2,29,-52,33,-15,6,-33,0,-14,5,-5,0,-9,29,-51,33,-5,6,5,-2,6,5,-3,6,5,-3,6,-33,0,-3,5,4,-3,5,4,-6,5,-5,0,-8,29,-36,33,29,-13,33,-16,6,-35,0,-13,5,-7,0,-7,29,-35,33,-2,29,-12,33,-5,6,5,-3,6,5,-6,6,-35,0,-11,5,4,-2,5,-7,0,-9,29,-46,33,-9,6,5,-3,6,5,-3,6,-35,0,-14,5,-8,0,-9,29,-20,33,29,-20,33,-2,29,33,-4,6,5,-11,6,-36,0,-3,5,4,-4,5,4,-6,5,-9,0,-8,29,-11,33,29,-28,33,-2,29,-9,6,5,-3,6,5,-2,6,-2,33,-36,0,-11,5,4,-3,5,-9,0,-10,29,-9,33,29,-2,33,29,-6,33,29,-18,33,29,-5,6,5,-11,6,33,-37,0,-3,5,4,-3,5,4,-7,5,-10,0,-9,29,-37,33,-5,6,5,-4,6,5,-3,6,5,-3,6,-2,33,-36,0,-12,5,4,-3,5,-10,0,-10,29,-12,33,-5,29,-4,33,-2,29,-11,33,-5,6,5,-4,6,5,-7,6,-3,33,-37,0,-4,5,4,-11,5,-11,0,-10,29,-5,33,-2,29,33,29,-3,33,-4,29,-3,33,-2,29,-10,33,-18,6,-5,33,-37,0,-8,5,4,-8,5,-10,0,-12,29,-2,33,-2,29,33,-2,29,-5,33,-3,29,-2,33,29,-3,33,29,-6,33,-5,6,5,-4,6,5,-5,6,5,6,-5,33,-38,0,-4,5,4,-8,5,4,-4,5,-10,0,-12,29,33,29,-2,33,29,-6,33,-3,29,-2,33,29,-3,33,29,-4,33,-10,6,5,-8,6,-5,33,-39,0,-8,5,4,-9,5,-11,0,-12,29,-3,33,29,-6,33,-4,29,-5,33,29,-2,33,-6,6,5,-4,6,5,-4,6,5,-3,6,-6,33,-39,0,-19,5,-10,0,-13,29,33,-2,29,-7,33,-3,29,-6,33,-6,6,5,-4,6,5,-3,6,5,-4,6,-6,33,-41,0,-9,5,4,-9,5,-11,0,-15,29,-7,33,-3,29,-3,33,-22,6,-7,33,-41,0,-4,5,4,-9,5,4,-5,5,-10,0,-15,29,-7,33,-3,29,33,-7,6,5,-5,6,5,-4,6,5,-3,6,-8,33,-42,0,-10,5,4,-11,5,-10,0,-15,29,-6,33,-13,6,5,-9,6,-9,33,-43,0,-15,5,4,-7,5,-10,0,-15,29,-3,33,-9,6,5,-10,6,5,-2,6,-9,33,29,33,-44,0,-5,5,4,-4,5,4,-5,5,4,-9,5,-6,0,-14,29,-10,6,5,-5,6,5,-9,6,-8,33,-2,29,-46,0,-29,5,-5,0,-4,29,-15,6,5,-5,6,5,-5,6,5,-4,6,-9,33,-2,29,-48,0,-10,5,4,-6,5,4,-14,5,-16,6,5,-18,6,-11,33,29,-50,0,-4,5,4,-14,5,4,-12,5,-12,6,5,-9,6,5,-5,6,5,-4,6,-12,33,-51,0,-10,5,4,-12,5,4,-9,5,-8,6,5,-8,6,5,-6,6,5,-5,6,-12,33,-54,0,-11,5,4,-14,5,4,-2,5,4,-3,5,-2,6,5,-10,6,5,-11,6,-14,33,-56,0,-6,5,4,-6,5,4,-20,5,-9,6,5,-8,6,5,-3,6,-9,33,-3,29,-2,33,-59,0,-15,5,4,-2,5,4,-13,5,4,5,-2,6,5,-2,6,5,-6,6,5,-7,6,-3,29,-7,33,-65,0,-6,5,4,-14,5,4,-3,5,4,-2,5,4,-6,5,-15,6,-8,29,-3,33,-68,0,-8,5,4,-26,5,-5,6,5,-5,6,-10,29,-74,0,-8,5,4,-22,5,4,-3,5,-5,6,-90,0,-8,5,4,-2,5,4,-10,5,4,-2,5,4,-9,5,-2,6,-94,0,-10,5,4,-2,5,4,-2,5,4,-11,5,-104,0,-18,5,-114,0,-9,5,-2083548,0]},{name:"toast",bounds:[14,113,60,72,0,0],data:[-7697,0,-94,15,-34,0,-94,15,-34,0,-94,15,-31,0,-100,9,-28,0,-100,9,-28,0,-100,9,-28,0,-100,9,-28,0,-100,9,-28,0,-100,9,-28,0,-100,9,-28,0,-100,9,-28,0,-100,9,-28,0,-100,9,-2087822,0]},{name:"pillar1",bounds:[58,69,61,66,0,0],data:[-7869,0,-8,6,-117,0,-12,6,-116,0,5,-10,6,5,-116,0,3,-4,5,-4,6,-2,5,3,-116,0,3,-4,4,-6,5,3,-117,0,-4,4,-4,5,-2088637,0]},{name:"pillar2",bounds:[58,69,61,66,0,0],data:[-7867,0,-8,6,-119,0,-12,6,-116,0,-3,5,-8,6,5,-116,0,3,-2,4,-4,5,-4,6,3,-116,0,3,-6,4,-4,5,3,-119,0,-4,4,-4,5,-2088635,0]},{name:"pillar3",bounds:[58,69,61,66,0,0],data:[-7867,0,-10,6,-117,0,-12,6,-116,0,5,-10,6,5,-116,0,3,4,-8,5,6,3,-116,0,-2,3,-8,4,5,3,-117,0,3,-8,4,5,-2088635,0]},{name:"pillar4",bounds:[58,69,61,66,0,0],data:[-7867,0,-5,6,-122,0,-3,5,-6,6,-119,0,3,-2,4,-3,5,-5,6,5,-116,0,-2,3,-4,4,-3,5,-2,6,3,-116,0,-2,3,-7,4,-2,5,3,-117,0,3,-7,4,-2,5,-2088635,0]},{name:"pillar5",bounds:[58,69,61,66,0,0],data:[-7872,0,-5,6,-120,0,-6,6,-2,5,3,-116,0,5,-5,6,-5,5,3,-116,0,3,4,-4,5,-3,4,-2,5,3,-116,0,-2,3,-7,4,-2,5,3,-117,0,3,-7,4,-2,5,-2088635,0]}],palette:[2037811,2829890,4278361,6844794,9478568,11979727,16777215,16564106,11894871,9064510,6044225,13185080,14576184,16756027,16770454,16578912,11851333,5358655,3185763,2321786,2510702,2307683,4289169,5018541,6537929,9753300,12123647,3942720,4597596,8545409,16229515,12743042,8727910,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]};const u=128;function m(t){const s=[];for(let i=0;i<t.length;i+=1)if(t[i]<0){for(let n=t[i];n<0;n+=1)s.push(t[i+1]);i+=1}else s.push(t[i]);return s}function p(t,s,i,n){return t[s+i*u+n*u*u]}function f(t){return[(t>>16)%256,(t>>8)%256,t%256]}function w(t,s,i,n){if(0===n)return;const[e,o,a]=f(i[n-1]);t[s]=e,t[s+1]=o,t[s+2]=a,t[s+3]=255}function g(t,s,i,n){const e=s[1]-s[0]+1,o=s[3]-s[2]+1,a=document.createElement("canvas");a.width=e,a.height=o;const h=a.getContext("2d"),r=h.createImageData(u,u);for(let e=s[0];e<=s[1];e+=1)for(let o=s[2];o<=s[3];o+=1)w(r.data,4*(e+o*u),n,p(t,e,o,i));return h.putImageData(r,-s[0],-s[2]),a}function x({bounds:t,data:s},i){const n=[];for(let e=t[4];e<=t[5];e+=1)n[e]=g(s,t,e,i);return n}const y=new Map;function P(t,s=0){return y.get(t)[s]}const M=[];function b(t){return M[t]}!function(){for(const t of d.parts)t.data=m(t.data),y.set(t.name,x(t,d.palette));for(const s of d.palette)M.push(`rgb(${(t=f(s))[0]}, ${t[1]}, ${t[2]})`);var t}();const v=new a(.5,20),k=30,I=Math.ceil(i/k),C=.95*s;class z{constructor(t=1){this.pointCache=new Map,this.z=t}draw(t,s){const i=this.getMinimumY(t.camera);this.trimExcess(i),this.ensureEnough(i);const n=Math.min(.15*Math.abs(s.dy),1);for(const s of this.pointCache.values())this.drawOne(t,s,n)}getMinimumY(t){return Math.floor((t.y-i/2)/k)}trimExcess(t){for(const s of this.pointCache.keys())s<t&&this.pointCache.delete(s)}ensureEnough(t){const s=t+I;for(let i=t;i<=s;i+=1)this.ensurePoint(i)}ensurePoint(t){this.pointCache.has(t)||this.pointCache.set(t,new a(Math.random()*C-C/2,t*k))}drawOne(t,s,i){t.rect(s.sub(v),s.add(v),{fillStyle:b(26),globalAlpha:i,z:this.z})}}const E=1.5*i,T=[P("pillar1"),P("pillar2"),P("pillar3"),P("pillar4"),P("pillar5")],S=.02,A=E/5/t,O=4;function D(t,s,i,n){const{width:e,height:o}=s;t.drawImage(s,0,O+1,e,o,i,n+O+A,e,o),t.drawImage(s,0,O,e,1,i,n+O,e,A),t.drawImage(s,i,n)}const R=document.createElement("canvas");!function(){const i=function(){const t=[],i=E/6,n=E/2,e=E-n,o=s;for(let s=i;s<n+e;s+=16)for(let e=0-50*Math.random();e<o+50;e+=36+24*Math.random()){const h=1-(s/n)**5;Math.abs(e-o/2)/(o/2)>h&&Math.random()<.75&&t.push([new a(e,s-i+12*Math.random()),T[Math.floor(Math.random()*T.length)]])}return t}();R.width=s/t,R.height=E/t;const n=R.getContext("2d");n.imageSmoothingEnabled=!1;for(const[s,e]of i)D(n,e,(s.x-e.width)/t,(s.y-e.height)/t)}();const L=new a(0,0),F=new a(s,i),H=P("planet"),V=.0015,Y=new a(s/3/V,-i/3/V),$=.002,j=s/2/$,q=i/$,B=new a(-j,i/2.5/$),J=new a(j,q);function W(t){t.rect(L,F,{absolute:!0,fillStyle:b(23)}),t.image(H,Y,{z:V}),t.rect(B,J,{fillStyle:b(22),z:$}),function(t){t.image(R,new a(0,(E+i/3)/2/S),{z:S})}(t)}const X=P("toast"),G=2*X.height,K=2*X.width,N=1.2,Q=.002,U=1e-6,Z=.05,_=.001,tt=25e-5,st=32,it=.2,nt=1e-5,et=[new a(-K/2,-G/2),new a(-K/2,G/2),new a(K/2,G/2),new a(K/2,-G/2)];function ot(t){return t.y>o}class at{constructor(t=0,s=0){this.collisionPoint=null,this.dr=Math.sign(Math.random()-.5)*(.01*Math.random()+.005),this.dx=Math.sign(Math.random()-.5)*(.05*Math.random()+.025),this.dy=N,this.lastPhase=!1,this.mid=new a(t,s),this.r=0}tick(t){const s=this.mid.x,i=this.mid.y,n=this.r;if(null!==this.collisionPoint&&this.handleCollision(this.collisionPoint,t),!this.lastPhase){this.mid.x+=this.dx*t,this.mid.y+=this.dy*t,this.r+=this.dr*t,this.wrap(),this.dy=this.dy*(1-Q*t)+N*Q*t,this.dr=this.dr*(1-U*t)+Math.sign(Math.PI-this.r)*Z*U*t;const e=1-t**this.getDampeningPower();if(this.dx*=e,this.dy*=e,this.dr*=e,this.isColliding()){const[e,o]=this.findCollisionPoint(s,i,n,t);this.collisionPoint=e,this.handleCollision(this.collisionPoint,o)}}}getDampeningPower(){return-3*(this.mid.y<n?1:this.mid.y<e?((e-this.mid.y)/(e-n))**.6:1)}isColliding(){return this.getTransformedPoints().some(ot)}findCollisionPoint(t,s,i,n){let e=this.mid,a=0,h=n;for(let n=0;n<st;n+=1){const n=(a+h)/2;this.mid.x=t+this.dx*n,this.mid.y=s+this.dy*n,this.r=i+this.dr*n,this.wrap();const o=this.getTransformedPoints().find(ot);o?(h=n,e=o):a=n}return this.mid.y+=o-e.y,e.y=o,[e,n-h]}handleCollision(t,s,i=!1){const n=t.sub(this.mid).wrap();if(this.lastPhase){const t=this.getIntersection(this.mid,new a(this.mid.x,o+1));null!==t&&(this.dr-=s/100*tt*Math.sign(n.x)*Math.max(o-t.y,0)**.6)}else this.dx=0,this.dy=0,this.dr=tt*-Math.sign(n.x),this.lastPhase=!0;const e=this.dr*s,h=this.getClosestRightAngle();if(Math.sign(this.r-h)===Math.sign(this.r+e-h)||i){const t=n.rotate(e).sub(n);this.mid=this.mid.sub(t),this.mid.y=Math.min(this.mid.y,o-G/2),this.r+=e,this.wrap()}else{const i=(h-this.r)/this.dr;this.handleCollision(t,i,!0),this.collisionPoint=t.sub(this.mid).scale(-1,1).add(this.mid),this.dr*=it,Math.abs(this.dr)<nt&&(this.dr=0,this.collisionPoint=new a(this.mid.x,o)),this.handleCollision(this.collisionPoint,s-i,!0)}}getClosestRightAngle(){const t=.25*Math.PI;for(const s of[0,.5*Math.PI,Math.PI,1.5*Math.PI])if(Math.abs(this.r-s)<=t)return s;return 2*Math.PI}tryApplyForce(t){if(null===t)return null;const[s,i]=t;if(null===this.getIntersection(this.mid,s))return null;const n=this.getIntersection(s,i);if(null===n)return null;const e=n.sub(s).scale(_),o=n.sub(this.mid);return this.applyForce(o,e),n}getIntersection(t,s){const i=this.getTransformedPoints();i.push(i[0]);let n=null;for(let e=0;e<i.length-1;e+=1){const o=a.intersection(t,s,i[e],i[e+1]);if(null!==o){t.distance(o)<1/0&&(n=o)}}return n}getTransformedPoints(){return et.map(t=>t.rotate(this.r).add(this.mid))}applyForce({x:t,y:s},{x:i,y:n}){this.dx+=i,this.dy+=n,this.dr+=(t*n-s*i)*tt}wrap(){for(this.mid.wrap();this.r>2*Math.PI;)this.r-=2*Math.PI;for(;this.r<0;)this.r+=2*Math.PI}draw(t){t.image(X,this.mid,{r:this.r}),t.rect(new a(-s/2,o-1),new a(s/2,o+1),{fillStyle:"hotpink"})}}const ht=20;const rt=1,lt=20,ct=5,dt=80,ut=400,mt=2*ut,pt=.05*ut,ft={basic:P("sparkles",0),hit:P("sparkles",1)};class wt extends h{constructor(t,s,i){super(t.x+(Math.random()-.5)*dt,t.y+(Math.random()-.5)*dt,t.timestamp+s),this.r=Math.random()*Math.PI,this.dx=(Math.random()-.5)*dt/ut,this.dy=(Math.random()-.5)*dt/ut,this.dr=Math.random()/100,this.isHit=i}isExpired(t){return t-this.timestamp>(this.isHit?mt:ut)}tick(t){this.x+=this.dx*t,this.y+=this.dy*t,this.r+=this.dr*t;const s=1-t**-1.5;this.dx*=s,this.dy*=s,this.dr*=s}draw(t,s){const i=this.isHit?ft.hit:ft.basic,n=function(t,s){return s<pt?s/pt:(t-s)/(t-pt)}(this.isHit?mt:ut,s-this.timestamp)**.5,e=this.isHit?1:.5;t.image(i,new a(this.x,this.y),{absolute:!0,globalAlpha:n*e,r:this.r})}}class gt{constructor(){this.now=-1/0,this.sparkles=new Set}add(t,s=!1){for(let i=0;i<(s?lt:rt);i+=1)this.sparkles.add(new wt(t,ct*i,s))}tick(t,s){this.now=t,this.removeOldSparkles(),this.updateSparkles(s)}removeOldSparkles(){const t=[];for(const s of this.sparkles)s.isExpired(this.now)&&t.push(s);for(const s of t)this.sparkles.delete(s)}updateSparkles(t){for(const s of this.sparkles)s.tick(t)}draw(t){for(const s of this.sparkles)s.draw(t,this.now)}}const xt=[P("wizard"),P("wizard",1),P("wizard",2),P("wizard",3),P("wizard",4)],yt=new a(s/2,i/4),Pt=1,Mt=xt.length-1-Pt,bt=80,vt=2*Math.PI*35e-5,kt=8;class It{constructor(){this.offset=-1/0,this.phase=0,this.startTimestamp=0}tick(t,s){if(this.offset=Math.sin(t*vt)*kt,s){const s=Math.floor((t-this.startTimestamp)/bt);0===this.phase?(this.startTimestamp=t,this.phase=1):this.phase<Pt?this.phase=s%Pt+1:this.phase=(s-Pt)%Mt+Pt+1}else this.phase=0}draw(t){const s=yt.add(new a(0,this.offset));t.image(xt[0],s,{absolute:!0}),this.phase>0&&t.image(xt[this.phase],s,{absolute:!0})}}const Ct=120;const zt=new class{constructor(){this.camera=new a(0,l),this.canvas=canvas,this.canvas.width=s,this.canvas.height=i,this.context=canvas.getContext("2d"),this.context.imageSmoothingEnabled=!1}trackToast(t){this.camera.y=Math.min(o-i/4,t.mid.y+l)}getOffset(){return r.sub(this.camera)}rect(t,s,i){const{absolute:n,r:e,z:o,...a}={...c,...i};Object.assign(this.context,a);const{x:h,y:r}=this.getTransformedPoint(n,t,o),{x:l,y:d}=this.getTransformedPoint(n,s,o);this.setRotation(0),this.context.beginPath(),this.context.rect(h,r,l-h,d-r),this.context.closePath(),a.fillStyle&&this.context.fill(),a.strokeStyle&&this.context.stroke()}image(i,n,e){const{absolute:o,r:a,z:h,...r}={...c,...e};Object.assign(this.context,r);const{x:l,y:d}=this.getTransformedPoint(o,n,h),u=i.width*t,m=i.height*t;this.setRotation(a,l,d),this.context.drawImage(i,l-u/2,d-m/2,u,m),l<s/2?(this.setRotation(a,l+s,d),this.context.drawImage(i,l-u/2+s,d-m/2,u,m)):(this.setRotation(a,l-s,d),this.context.drawImage(i,l-u/2-s,d-m/2,u,m))}getTransformedPoint(t,s,i){return t?s.round():s.sub(this.camera).scale(i).add(r).round()}setRotation(t,s=0,i=0){const n=Math.cos(t),e=Math.sin(t);this.context.setTransform(n,e,-e,n,s*(1-n)+i*e,i*(1-n)-s*e)}clear(){this.context.clearRect(0,0,s,i)}},Et=new class{constructor(){this.lastPoint=null,this.now=-1/0,this.points=new Set,this.pressed=!1,this.sparkles=new gt,this.wizard=new It}init(t){t.canvas.addEventListener("mousedown",s=>{s.preventDefault(),this.start(s,t)}),t.canvas.addEventListener("touchstart",s=>{s.preventDefault(),this.start(this.normalizeTouchEvent(s),t)}),t.canvas.addEventListener("mousemove",s=>{s.preventDefault(),this.move(s,t)}),t.canvas.addEventListener("touchmove",s=>{s.preventDefault(),this.move(this.normalizeTouchEvent(s),t)}),window.addEventListener("mouseup",()=>{this.stop()}),window.addEventListener("touchend",()=>{this.stop()}),window.document.addEventListener("visibilitychange",()=>{this.stop()}),window.addEventListener("contextmenu",t=>{t.preventDefault()})}normalizeTouchEvent(t){return t.touches[0]}start(t,s){this.pressed=!0,this.pushPoint(t,s.canvas)}move(t,s){this.pressed&&this.pushPoint(t,s.canvas)}stop(){this.clearPoints(),this.pressed=!1}pushPoint(t,n){const{left:e,top:o,width:a,height:r}=n.getBoundingClientRect();this.lastPoint=new h((t.clientX-e)*s/a,(t.clientY-o)*i/r,this.now),this.points.add(this.lastPoint),this.sparkles.add(this.lastPoint)}tick(t,s,i,n){if(this.sparkles.tick(t,s),this.wizard.tick(t,this.pressed),this.now=t,!this.pressed)return;this.removeOldPoints();const e=this.getIntersectionPoint(n,i);null!==e&&(this.sparkles.add(h.fromPoint(e.add(i),t),!0),this.clearPoints())}getIntersectionPoint(t,i){const n=t.tryApplyForce(this.getCurrentVector(i));return null!==n?n:null===this.lastPoint?null:t.tryApplyForce(this.getCurrentVector(i.sub(new a(this.lastPoint.x<s/2?s:-s,0))))}getCurrentVector(t){if(this.points.size<2||null===this.lastPoint)return null;const[s]=this.points;return[s.sub(t),this.lastPoint.sub(t)]}removeOldPoints(){const t=[];for(const s of this.points)s.timestamp<this.now-Ct&&t.push(s);for(const s of t)this.points.delete(s);0===this.points.size&&(this.lastPoint=null)}clearPoints(){this.points=new Set,this.lastPoint=null}draw(t){this.sparkles.draw(t),this.wizard.draw(t)}};Et.init(zt),function({display:t,mouse:s}){const i=new at,n=[new z,new z(2),new z(3),i,s];let e=0,o=!0;requestAnimationFrame(function a(h){requestAnimationFrame(a);const r=Math.min(h-e,ht);if(e=h,o)o=!1;else{t.clear(),i.tick(r),t.trackToast(i),s.tick(h,r,t.getOffset(),i),W(t);for(const s of n)s.draw(t,i)}})}({display:zt,mouse:Et});
