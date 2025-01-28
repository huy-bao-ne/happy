window.onload = function(){
 var canvas = document.getElementById("canvas"),
  ctx = canvas.getContext("2d"),
  cw = window.innerWidth,
  ch = window.innerHeight,
  fireworks = [],
  particles = [],
  hue = 120,
  limiterTotal = 20,
  limiterTick = 0,
  timerTotal = 30,
  randomTime = 0,
  timerTick = 0,
  mousedown = false,
  mx,
  my;
 canvas.width = cw;
 canvas.height = ch;
 var snd = new Audio("http://soundjax.com/reddo/51715%5Efirework.mp3");
 function random( min, max ) {
  return min + Math.random()*(max-min);
 }
 function calculateDistance( p1x, p1y, p2x, p2y ) {
  return Math.sqrt((p1x-p2x)*(p1x-p2x) + (p1y-p2y)*(p1y-p2y));
 }
 function Firework( sx, sy, tx, ty ) {
  this.x = sx;
  this.y = sy;
  this.sx = sx;
  this.sy = sy;
  this.tx = tx;
  this.ty = ty;

  this.distanceToTarget = calculateDistance(sx, sy, tx, ty);
  this.distanceTraveled = 0;
  this.coordinates = [];
  this.coordinateCount = 2;

  while(this.coordinateCount--) {
   this.coordinates.push( [this.x, this.y ]);
  }
  this.angle = Math.atan2(ty - sy, tx - sx);
  this.speed = 1;
  this.acceleration = 1.2;
  this.brightness = random(50, 70);
  this.tragetRadius = 1;
 }

 Firework.prototype.update = function( index ) {
  if( this.targetRadius < 8){
   this.targetRadius += 0.3;
  }else{
   this.targetRadius = 1;
  }
  this.speed *= this.acceleration;
  var vx = Math.cos(this.angle)*this.speed,
   vy = Math.sin(this.angle)*this.speed;
  this.distanceTraveled = calculateDistance(this.sx, this.sy, this.x + vx, this.y + vy);

  if(this.distanceTraveled >= this.distanceToTarget ){
   this.coordinates.pop();  
   this.coordinates.unshift([this.tx, this.ty]);
   createParticles(this.x, this.y);
   snd.play();
   this.draw();
   fireworks.splice(index, 1);
  } else {
   this.x += vx;
   this.y += vy;
  }
  this.coordinates.pop();  
  this.coordinates.unshift([this.x, this.y]);
 };
 Firework.prototype.draw = function() {
  ctx.beginPath();
  ctx.moveTo( this.coordinates[ this.coordinates.length - 1][ 0 ], this.coordinates[ this.coordinates.length - 1][ 1 ] );
  ctx.lineTo( this.x, this.y );
  ctx.strokeStyle = 'hsl(' + hue + ', 100%, ' + this.brightness + '%)';
  ctx.stroke();
 }
 function Particle( x, y, type ) {
  this.x = x;
  this.y = y;
  this.type = type;
  this.coordinates = [];
  this.coordinateCount = 6;
  while( this.coordinateCount-- ) {
   this.coordinates.push( [ this.x, this.y ] );
  }
  switch (type)
  {
   case 1: var variation = random(1, 5);
     if (variation < 2) 
     {
      this.angle = random( 0, Math.PI * 2 );
      this.speed = random( 1, 15 );
      this.friction = 0.95;
      this.gravity = 4;
      this.hue = random( hue - 50, hue + 50 );
      this.brightness = random( 50, 80 );
      this.alpha = 1;
      this.decay = random( 0.01, 0.02 );
     }else if (variation < 3)
     {
      this.angle = random( 0, Math.PI * 2 );
      this.speed = random( 1, 5 );
      this.friction = 0.95;
      this.gravity = 3;
      this.hue = random( hue - 50, hue );
      this.brightness = random( 50, 80 );
      this.alpha = 1;
      this.decay = random( 0.015, 0.03 );
     }else if (variation < 4)
     {
      this.angle = random( 0, Math.PI * 2 );
      this.speed = random( 1, 8 );
      this.friction = 0.95;
      this.gravity = 3;
      this.hue = random( hue, hue + 50 );
      this.brightness = random( 50, 80 );
      this.alpha = 1;
      this.decay = random( 0.015, 0.03 );
     }else
     {
      this.angle = random( 0, Math.PI * 2 );
      this.speed = random( 1, 15 );
      this.friction = 0.95;
      this.gravity = 3;
      this.hue = random( hue - 50, hue + 50 );
      this.brightness = random( 10, 20 );
      this.alpha = 1;
      this.decay = random( 0.015, 0.3 );
     }
     break;
   case 2: var variation = random(1, 5);
     if (variation < 2) 
     {
      this.angle = random( 0, Math.PI * 2 );
      this.speed = random( 1, 10 );
      this.friction = 0.95;
      this.gravity = 4;
      this.hue = 100;
      this.brightness = random( 50, 80 );
      this.alpha = 1;
      this.decay = random( 0.01, 0.02 );

     }else if (variation < 3)
     {
      this.angle = random( 0, Math.PI * 2 );
      this.speed = random( 1, 21 );
      this.friction = 0.95;
      this.gravity = 3;
      this.hue = 100;
      this.brightness = random( 50, 80 );
      this.alpha = 1;
      this.decay = random( 0.015, 0.03 );
     }else if (variation < 4)
     {
      this.angle = random( 0, Math.PI * 2 );
      this.speed = random( 1, 3 );
      this.friction = 0.95;
      this.gravity = 3;
      this.hue = 100;
      this.brightness = random( 50, 80 );
      this.alpha = 1;
      this.decay = random( 0.015, 0.03 );
     }else
     {
      this.angle = random( 0, Math.PI * 2 );
      this.speed = random( 1, 5 );
      this.friction = 0.95;
      this.gravity = 3;
      this.hue = 100;
      this.brightness = random( 10, 20 );
      this.alpha = 1;
      this.decay = random( 0.015, 0.3 );
     }
     break;
   case 3: var variation = random(1, 5);
     // var hue = 10;
     if (variation < 2) 
     {
      this.angle = random( 0, Math.PI * 2 );
      this.speed = random( 10, 15 );
      this.friction = 0.95;
      this.gravity = 4;
      this.hue = 60;
      this.brightness = random( 10, 20 );
      this.alpha = 1;
      this.decay = random( 0.01, 0.02 );

     }else if (variation < 3)
     {
      this.angle = random( 0, Math.PI * 2 );
      this.speed = random( 11, 15 );
      this.friction = 0.95;
      this.gravity = 3;
      this.hue = 10;
      this.brightness = random( 10, 20);
      this.alpha = 1;
      this.decay = random( 0.015, 0.03 );


     }else if (variation < 4)
     {
      this.angle = random( 0, Math.PI * 2 );
      this.speed = random( 11, 18 );
      this.friction = 0.95;
      this.gravity = 3;
      this.hue = 90;
      this.brightness = random( 10, 20 );
      this.alpha = 1;
      this.decay = random( 0.015, 0.03 );
     }else
     {
      this.angle = random( 0, Math.PI * 2 );
      this.speed = random( 11, 15 );
      this.friction = 0.95;
      this.gravity = 3;
      this.hue = 120;
      this.brightness = random( 10, 20 );
      this.alpha = 1;
      this.decay = random( 0.015, 0.3 );
     }
     break;
   case 4: var variation = random(1, 5);
     if (variation < 2) 
     {
      this.angle = random( 0, Math.PI * 2 );
      this.speed = random( 1, 10 );
      this.friction = 0.95;
      this.gravity = 4;
      this.hue = 300;
      this.brightness = random( 50, 80 );
      this.alpha = 1;
      this.decay = random( 0.01, 0.02 );
     }else if (variation < 3)
     {
      this.angle = random( 0, Math.PI * 2 );
      this.speed = random( 1, 21 );
      this.friction = 0.95;
      this.gravity = 3;
      this.hue = 300;
      this.brightness = random( 50, 80 );
      this.alpha = 1;
      this.decay = random( 0.015, 0.03 );
     }else if (variation < 4)
     {
      this.angle = random( 0, Math.PI * 2 );
      this.speed = random( 1, 3 );
      this.friction = 0.95;
      this.gravity = 3;
      this.hue = 300;
      this.brightness = random( 50, 80 );
      this.alpha = 1;
      this.decay = random( 0.015, 0.03 );
     }else
     {
      this.angle = random( 0, Math.PI * 2 );
      this.speed = random( 1, 5 );
      this.friction = 0.95;
      this.gravity = 3;
      this.hue = 100;
      this.brightness = random( 10, 20 );
      this.alpha = 1;
      this.decay = random( 0.015, 0.3 );
     }
     break;
   default:
  }
 }
 Particle.prototype.update = function( index ) {
  this.speed *= this.friction;
  // apply velocity
  this.x += Math.cos( this.angle ) * this.speed;
  this.y += Math.sin( this.angle ) * this.speed + this.gravity;
  this.alpha -= this.decay;
  if (this.type == 4 && this.alpha <= 0.5){
   this.brightness += 50;
   this.hue += 200;
   if (this.brightness >= 200)
    this.brightness = 0;
  }
  if( this.alpha <= this.decay ) {
   particles.splice( index, 1 );
  }
  this.coordinates.pop();
  this.coordinates.unshift( [ this.x, this.y ] );
 }
 Particle.prototype.draw = function() {
  ctx. beginPath();
  ctx.moveTo( this.coordinates[ this.coordinates.length - 1 ][ 0 ], this.coordinates[ this.coordinates.length - 1 ][ 1 ] );
  ctx.lineTo( this.x, this.y );
  ctx.strokeStyle = 'hsla(' + this.hue + ', 100%, ' + this.brightness + '%, ' + this.alpha + ')';
  ctx.stroke();
 }
 // create particle group/explosion
 function createParticles( x, y ) {
  var particleCount = 300;
  var type = Math.floor(random(1, 5));
  while(particleCount--){
   particles.push(new Particle(x, y, type));
  }
 }
 function loop() {
  //requestAnimFrame(loop);
  hue += 0.5;
  ctx.globalCompositeOperation = "destination-out";
  ctx.fillStyle =  'rgba(0, 0, 0, 0.3)';
  ctx.fillRect(0, 0, cw, ch);
  ctx.globalCompositeOperation = "lighter";
  var i = fireworks.length;
  while(i--)
  {
   fireworks[i].draw();
   fireworks[i].update(i);
  }
  var i = particles.length;
  while( i-- ) {
   particles[ i ].draw();
   particles[ i ].update( i );
  }

  if( timerTick >= timerTotal + randomTime ){
   if (!mousedown){
    var xPos = Math.pow(Math.floor((random(-Math.pow(cw/2, 1/3), Math.pow(cw/2, 1/3)))), 3);
    xPos += cw/2;
    fireworks.push( new Firework(cw/2, ch, xPos, random(0, ch/2)));
    timerTick = 0;
    randomTime = Math.pow(random(2, 4), 2);
   } 
  } else {
   timerTick++;
  }
  if( limiterTick >= limiterTotal ) {
   if( mousedown ) {
    fireworks.push( new Firework( cw / 2, ch, mx, my ) );
    limiterTick = 0;
   } else {
    limiterTick= limiterTotal;
   }
  } else {
   limiterTick++;
  } 
 }
 canvas.addEventListener( 'mousemove', function( e ) {
  mx = e.pageX - canvas.offsetLeft;
  my = e.pageY - canvas.offsetTop;
 });
 canvas.addEventListener( 'mousedown', function( e ) {
  e.preventDefault();
  mousedown = true;
 });
 canvas.addEventListener( 'mouseup', function( e ) {
  e.preventDefault();
  mousedown = false;
 });
 setInterval(loop, 25);
};