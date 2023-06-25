(()=>{"use strict";class e{static isEnum(e,t){return Object.values(e).includes(t)}}class t{constructor(){this.element=document.createElement("div"),this.element.style.position="absolute",this.x=0,this.y=0,this.width=0,this.height=0,this.speed=0,this.update()}update(){this.element.style.left=`${this.x}px`,this.element.style.top=`${this.y}px`}collision(e){return this.x<e.x+e.width&&this.x+this.width>e.x&&this.y<e.y+e.height&&this.height+this.y>e.y}}class s extends t{constructor(){super(),this.keyState={},this.setSize=(e,t)=>{this.width=e,this.height=t,this.element.style.width=`${e}px`,this.element.style.height=`${t}px`},this.keyHandler=(t,s)=>{console.log(t.code,e.isEnum(i,t.code)),e.isEnum(i,t.code)&&(this.keyState[t.code]=s)},this.update=()=>{this.keyState[i.KeyW]&&(this.y-=this.speed),this.keyState[i.left]&&(this.x-=this.speed),this.keyState[i.down]&&(this.y+=this.speed),this.keyState[i.right]&&(this.x+=this.speed),super.update()},this.x=500,this.y=500,this.setSize(50,50),this.element.style.backgroundColor="blue",this.speed=5,window.addEventListener("keydown",(e=>this.keyHandler(e,!0))),window.addEventListener("keyup",(e=>this.keyHandler(e,!1)))}}var i;!function(e){e.KeyW="KeyW",e.down="KeyS",e.left="KeyA",e.right="KeyD"}(i||(i={}));class h extends t{constructor(){super(...arguments),this.getDistance=()=>Math.sqrt(this.dx*this.dx+this.dy*this.dy)}}class a extends h{constructor(e,t,s){super(),this.target=null,this.attackCount=2,this.element.style.width="10px",this.element.style.height="10px",this.element.style.backgroundColor="red",this.width=10,this.height=10,this.x=e,this.y=t,this.speed=5;let i=1/0;for(let e of s){const t=e.x-this.x,s=e.y-this.y,h=Math.sqrt(t*t+s*s);h<i&&(i=h,this.dx=t/h,this.dy=s/h,this.target=e)}this.update()}update(){this.x+=this.speed*this.dx,this.y+=this.speed*this.dy,super.update()}}class l extends t{constructor(e,t,s){super(),this.target=null,this.element.style.width="50px",this.element.style.height="50px",this.element.style.backgroundColor="green",this.width=50,this.height=50,this.x=e,this.y=t,this.speed=2,this.target=s,this.update()}update(){if(this.target){let e=this.target.x-this.x,t=this.target.y-this.y,s=Math.sqrt(e*e+t*t);this.x+=this.speed*e/s,this.y+=this.speed*t/s}super.update()}}class n{constructor(){this.bullets=[],this.enemies=[],this.lastBulletTime=0,this.lastEnemyTime=0,this.lastFrameTime=0,this.keyState={},this.with=1e3,this.height=1e3,this.gameArea=document.createElement("div"),this.gameArea.style.width=`${this.with}px`,this.gameArea.style.height=`${this.height}px`,this.gameArea.style.border="1px solid black",document.body.appendChild(this.gameArea),this.character=new s,this.gameArea.appendChild(this.character.element),window.requestAnimationFrame((e=>this.gameLoop(e)))}gameLoop(e){if(e-this.lastFrameTime<1e3/60)window.requestAnimationFrame((e=>this.gameLoop(e)));else{this.lastFrameTime=e,this.character.update();for(let e=this.bullets.length-1;e>=0;e--){let t=this.bullets[e];if(t.update(),t.y<0||t.x<0||t.x>this.with||t.y>this.height)this.gameArea.removeChild(t.element),this.bullets.splice(e,1);else for(let s=this.enemies.length-1;s>=0;s--){let i=this.enemies[s];if(t.collision(i)){t.attackCount-=1,0===t.attackCount&&(this.gameArea.removeChild(t.element),this.bullets.splice(e,1)),this.gameArea.removeChild(i.element),this.enemies.splice(s,1);break}}}for(let e=this.enemies.length-1;e>=0;e--){let t=this.enemies[e];if(t.update(),t.y>this.height||t.x<0||t.x>this.with)this.gameArea.removeChild(t.element),this.enemies.splice(e,1);else if(t.collision(this.character))return this.gameArea.removeChild(t.element),this.enemies.splice(e,1),void alert("Game Over!")}if(0!==this.enemies.length&&e-this.lastBulletTime>1e3){let t=new a(this.character.x,this.character.y,this.enemies);this.bullets.push(t),this.gameArea.appendChild(t.element),this.lastBulletTime=e}if(e-this.lastEnemyTime>500){let t=new l(1e3*Math.random(),1e3*Math.random(),this.character);this.enemies.push(t),this.gameArea.appendChild(t.element),this.lastEnemyTime=e}window.requestAnimationFrame((e=>this.gameLoop(e)))}}}window.onload=()=>{new n}})();