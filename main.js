"use strict";const t=900,s=1600,i=t/2,n=s/2,e={lineJoin:"round",lineWidth:1};const o=20;class h{constructor(t,s){this.x=t,this.y=s}add({x:t,y:s}){return new h(this.x+t,this.y+s)}sub({x:t,y:s}){return new h(this.x-t,this.y-s)}scale(t){return new h(this.x*t,this.y*t)}rotate(t){return new h(this.x*Math.cos(t)-this.y*Math.sin(t),this.x*Math.sin(t)+this.y*Math.cos(t))}distance({x:t,y:s}){return((this.x-t)**2+(this.y-s)**2)**.5}static intersection({x:t,y:s},{x:i,y:n},{x:e,y:o},{x:r,y:c}){const a=(c-o)*(i-t)-(r-e)*(n-s);if(0===a)return null;const l=((r-e)*(s-o)-(c-o)*(t-e))/a,d=((i-t)*(s-o)-(n-s)*(t-e))/a;return l>=0&&l<=1&&d>=0&&d<=1?new h(t+l*(i-t),s+l*(n-s)):null}}class r extends h{constructor(t,s,i){super(t,s),this.timestamp=i}}const c=120;const a=1,l=.01,d=.001,u=1/4200,p=200,x=.01,y=[new h(-100,-10),new h(-100,10),new h(100,10),new h(100,-10)],w=[new h(-90,-15),new h(-90,-10),new h(90,-10),new h(90,-15)];const g=new class{constructor(){this.canvas=canvas,this.canvas.width=t,this.canvas.height=s,this.context=canvas.getContext("2d"),this.width=t,this.height=s}trackPoint({x:t,y:s}){console.log(t,s)}lines([{x:t,y:s},...o],h){Object.assign(this.context,e,h),this.context.beginPath(),this.context.moveTo(t+i,s+n);for(const{x:t,y:s}of o)this.context.lineTo(t+i,s+n);this.context.closePath(),h.fillStyle&&this.context.fill(),h.strokeStyle&&this.context.stroke()}clear(){this.context.clearRect(0,0,t,s)}},f=new class{constructor(t,s=0,i=0){this.display=t,this.position=new h(s,i),this.r=.4,this.dx=.1,this.dy=0,this.dr=.01}draw(){this.drawToast(),this.drawButter()}getTransformedPoints(t){return t.map(t=>t.rotate(this.r).add(this.position))}drawToast(){const t=this.getTransformedPoints(y);this.display.lines(t,{fillStyle:"rgba(195, 134, 68, 1)",strokeStyle:"rgba(195, 134, 68, 1)",lineWidth:3})}drawButter(){const t=this.getTransformedPoints(w);this.display.lines(t,{fillStyle:"rgba(248, 239, 204, 1)",strokeStyle:"rgba(248, 239, 204, 1)",lineWidth:2})}tick(t){this.position.x+=this.dx*t,this.position.y+=this.dy*t,this.r+=this.dr*t;const s=1-t**-Math.E;this.dx*=s,this.dy*=s,this.dr*=s,this.dy=this.dy*(1-l)+a*l}applyForce({x:t,y:s},{x:i,y:n}){this.dx+=i,this.dy+=n,this.dr+=(t*n-s*i)*u}ensureWithinWalls(){Math.abs(this.position.x)>p&&(this.dx+=x*-Math.sign(this.position.x))}tryApplyForce(t){if(null===t)return!1;const[s,i]=t;if(null===this.getIntersection(this.position,s))return!1;const n=this.getIntersection(s,i);if(null===n)return!1;const e=n.sub(s).scale(d),o=n.sub(this.position);return this.applyForce(o,e),!0}getIntersection(t,s){const i=this.getTransformedPoints(y);i.push(i[0]);let n=null;for(let e=0;e<i.length-1;e+=1){const o=h.intersection(t,s,i[e],i[e+1]);if(null!==o){t.distance(o)<1/0&&(n=o)}}return n}}(g);!function({display:t,gui:s,mouse:i,toast:n}){i.init();let e=0,h=!0;requestAnimationFrame(function s(r){requestAnimationFrame(s);const c=Math.min(r-e,o);e=r,h?h=!1:(t.clear(),n.tick(c),n.ensureWithinWalls(),t.trackPoint(n.position),n.draw(),i.tick(r),i.draw())})}({display:g,mouse:new class{constructor(t,s){this.canvas=t.canvas,this.context=t.context,this.width=t.width,this.height=t.height,this.toast=s,this.now=-1/0,this.points=new Set,this.lastPoint=null,this.pressed=!1}start(){this.pressed=!0}clearPoints(){this.points=new Set,this.lastPoint=null}stop(){this.clearPoints(),this.pressed=!1}pushPoint(t){const{left:s,top:i,width:n,height:e}=this.canvas.getBoundingClientRect();this.lastPoint=new r((t.clientX-s)*this.width/n,(t.clientY-i)*this.height/e,this.now),this.points.add(this.lastPoint)}init(){this.canvas.addEventListener("mousedown",t=>{t.preventDefault(),this.pressed=!0,this.pushPoint(t)}),this.canvas.addEventListener("mousemove",t=>{this.pressed&&this.pushPoint(t)}),window.addEventListener("mouseup",()=>{this.stop()})}getCurrentVector(){if(this.points.size<2||null===this.lastPoint)return null;const[t]=this.points;return[t,this.lastPoint]}tick(t){this.now=t,this.pressed&&(this.removeOldPoints(t),this.toast.tryApplyForce(this.getCurrentVector())&&this.clearPoints())}removeOldPoints(t){const s=[];for(const i of this.points)i.timestamp<t-c&&s.push(i);for(const t of s)this.points.delete(t);0===this.points.size&&(this.lastPoint=null)}draw(){if(0===this.points.size)return;this.context.fillStyle="rgba(255, 105, 180, 0.2)",this.context.strokeStyle="rgba(255, 105, 180, 1)";for(const{x:t,y:s}of this.points)this.context.beginPath(),this.context.arc(t,s,5,0,2*Math.PI),this.context.fill();const t=this.getCurrentVector();if(null!==t){const[s,i]=t;this.context.beginPath(),this.context.moveTo(s.x,s.y),this.context.lineTo(i.x,i.y),this.context.stroke()}}}(g,f),toast:f});
