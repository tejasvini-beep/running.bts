var  street,  streetImg, running, runningImgs;
var  heartImg, heartGroup;
var armyBombImg, armyBombGroup;
var invisibleGround;
var score = 0;
var bombstick = 0;
var distance=0;
var stoneImg, stoneGroup;
var collidedSound;
var butterSound;
var resetButton, restart;
var PLAY = 1;
var END = 0;
var gameState = PLAY;


function preload () {
  streetImg= loadImage("images/street.jpg");
  runningImgs= loadAnimation("images/running1.png", "images/running2.png", "images/running3.png", "images/running4.png", "images/running5.png", "images/running6.png", "images/running7.png");
  heartImg= loadImage("images/heart.png");
  armyBombImg=loadImage("images/armybomb.png");
  stoneImg=loadImage("images/stone.png");
  collidedSound=loadSound("images/collided.wav");
  butterSound=loadSound("Butter.mp3");
  resetButton=loadImage("images/reset.png");

  butterSound.looping= true;
 
}

function setup() {
  createCanvas(800,400);
  running= createSprite(50, 350, 50, 50);
  running.addAnimation("btsRunning", runningImgs);
  running.scale= 0.5;
 
  running.frameDelay = 3;
  running.setCollider("circle",0,0,50,);
  running.debug = true
 
  street= createSprite(800,180,0,0);
  street.addImage("street2", streetImg);
  street.x= width/2;
  street.velocityX= -10

  invisibleGround = createSprite(500,400,1000,50);  
  invisibleGround.shapeColor = "grey"
  invisibleGround.visible=false;

  restart = createSprite(400, 220, 40, 40);
  restart.scale=0.6;
  restart.addImage(resetButton);
  restart.visible = false;

  
  butterSound.setVolume(0.5);
  butterSound.play();

 
 

  heartGroup= new Group();
  armyBombGroup= new Group();
  stoneGroup= new Group();
   
}

function draw() {
  background("black");
  drawSprites();

  if (gameState===PLAY) {
    
    if (street.x<150) {
      street.x=street.width/2;
    }

    spawnHeart();
spawnBomb();
spawnStone();
    running.collide(invisibleGround);
    distance = distance + Math.round(getFrameRate()/50);
    street.velocityX = -(7 + 2*distance/150);

    if (keyDown("SPACE")) {
      running.velocityY=-10;
    }

    

    
running.velocityY=running.velocityY+0.5;


      if(stoneGroup.isTouching(running)){
      gameState=END;
      stoneGroup.destroyEach()
      
      }
          
    if(heartGroup.isTouching(running)){
      score=score+1;
      collidedSound.play()
      heartGroup.destroyEach() 
    
    }

if(armyBombGroup.isTouching(running)){
 score=score+3;
 armyBombGroup.destroyEach() 

 }
}

 else if (gameState===END) {

    restart.visible = true;
   
    if(mousePressedOver(restart)) {      
      reset();
    }

    

    heartGroup.setLifetimeEach(-1);
    armyBombGroup.setLifetimeEach(-1);
    stoneGroup.setLifetimeEach(-1);

    street.velocityX=0;
    running.velocityX=0;
    running.velocityY=0;
    butterSound.stop();

    heartGroup.setVelocityXEach(0);
    stoneGroup.setVelocityXEach(0);
    armyBombGroup.setVelocityXEach(0);

    
  }

 
 
  fill("black");
  textSize(20);
  text(`Score:${score}`, width - 200, 50);
  textAlign(CENTER, CENTER);

  fill("black");
  textSize(20);
  text("press space key to jump",120,20);
  textAlign(CENTER, CENTER);

  running.depth=street.depth;
  running.depth=running.depth+1;

  running.depth=invisibleGround.depth;
  running.depth=running.depth+1;

 


  }

 


function spawnHeart() {
  if (frameCount % 35 === 0) {
    var heart = createSprite(800,height-25,22,40);
   // heart.x= Math.round(random(50,220));
    heart.addImage(heartImg);
    heart.scale = 0.04;
    heart.lifetime = 300;
    heart.velocityX= -12;
    heartGroup.add(heart);
  }
  
}

function spawnBomb() {
  if (frameCount % 400 === 0) {
    var bomb = createSprite(950,height-25,20,30);
    //bomb.x= Math.round(random(50,220));
    bomb.addImage(armyBombImg);
    bomb.scale = 0.1;
    bomb.lifetime = 300;
    bomb.velocityX= -10;
    armyBombGroup.add(bomb);
  }
  
}

function spawnStone() {
  if (frameCount % 150 === 0) {
    var stone = createSprite(700,height-25,20,30);
    stone.addImage(stoneImg);
    stone.scale = 0.2;
    stone.lifetime = 300;
    stone.velocityX= -15;
    stoneGroup.add(stone);
  }
  
}

function reset () {
  gameState=PLAY;
  restart.visible=false;
  heartGroup.destroyEach();
  armyBombGroup.destroyEach();
  stoneGroup.destroyEach();
  butterSound.play();
  
  running.addAnimation("btsrunning", runningImgs);

  score = 0;

}

