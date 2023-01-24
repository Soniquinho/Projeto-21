var patrick;

var waffles, honey;

var hive, bee;

var patrickImg, wafflesImg, floorImg, hiveImg, honeyImg, beeImg, gameOverImg, enterImg, beeEnd, patrickDeadImg, honeycombImg;

var PLAY = 1;

var END = 0;

var wafflesScore, honeyScore;

var gameState = PLAY;

var wafflesGroup, honeyGroup, hiveGroup, beesGroup;

var gameOver, pressEnter;

var honeycomb;


function preload(){
  patrickImg = loadAnimation("patrick_running1.png", "patrick_running2.png", "patrick_running3.png");
  wafflesImg = loadImage("waffles.png");
  floorImg = loadImage("floor.png");
  hiveImg = loadImage("hive.png");
  honeyImg = loadImage("honey.png");
  beeImg = loadAnimation("bee1.png", "bee2.png");
  gameOverImg = loadImage("game_over.png");
  enterImg = loadImage("press_enter.png");
  beeEnd = loadImage("bee1.png");
  patrickDeadImg = loadAnimation("patrick_dead.png");
  honeycombImg = loadImage("honeycomb.png");
}

function setup(){
  createCanvas(1519, 745);
  
  honeycomb = createSprite(759, 350);
  honeycomb.addImage(honeycombImg);
 
  floor = createSprite(width/2, 750, 3038, 100);
  floor.addImage(floorImg)
  
  
  patrick = createSprite(70, 680);
  patrick.addAnimation("running", patrickImg);
  patrick.addAnimation("dead", patrickDeadImg);
  patrick.scale = 0.2;
  patrick.setCollider("circle", 0, 0, 300);

  wafflesGroup = createGroup();
  hiveGroup = createGroup();
  honeyGroup = createGroup();
  beesGroup = createGroup();

  wafflesScore = 0;
  honeyScore = 0;


  gameOver = createSprite(759, 379);
  gameOver.addImage(gameOverImg);
  gameOver.scale = 0.4;

  pressEnter = createSprite(759, 480);
  pressEnter.addImage(enterImg);
  pressEnter.scale = 0.2;
}


function draw() {
  background(0);

  textSize(20);
  text("Waffle points: " + wafflesScore, 1300, 100);

  textSize(20)
  text("Honey points: " + honeyScore, 1300, 50);

  if (gameState === PLAY) {
  
  //velocidade do solo
   floor.velocityX = -(8 + 4* wafflesScore/500);
   honeycomb.velocityX = -(8 + 4* honeyScore/250);
   
   //solo infinito
   if (floor.x < 0){
    floor.x = floor.width/2;
   }

   if (honeycomb.x < 0){
    honeycomb.x = honeycomb.width/2;
   }

   //pulo
   if(keyDown("space")&& patrick.y >= 626) {
     patrick.velocityY = -13;
   }

   //gravidade
   patrick.velocityY = patrick.velocityY + 0.8

   //gerar waffles
   generateWaffles();

   //gerar mel
   generateHoney();

   //gerar colmeias
   spawnHive();

   //gerar abelhas
   spawnBees();

   //coletar waffles
   if(patrick.isTouching(wafflesGroup)) {
      wafflesGroup.destroyEach();
      wafflesScore = wafflesScore +100
   }
  
   //coletar mel
   if(patrick.isTouching(honeyGroup)) {
    honeyGroup.destroyEach();
    honeyScore = honeyScore +50
   }
   //fim de jogo
   if(patrick.isTouching(hiveGroup)) {
    gameState = END;
    }

    //visibilidade da tela de morte
    gameOver.visible = false;
    pressEnter.visible = false;
  }

  else if(gameState === END) {

    //redefinindo a velocidade para 0
    hiveGroup.setVelocityXEach(0);
    wafflesGroup.setVelocityXEach(0);
    honeyGroup.setVelocityXEach(0);
    beesGroup.setVelocityXEach(0);
    floor.velocityX = 0;
    honeycomb.velocityX = 0;
    patrick.velocityY = 0;

    //visibilidade da tela de morte
    gameOver.visible = true;
    pressEnter.visible = true;

    //mudar animação de patrick
    patrick.changeAnimation("dead", patrickDeadImg);

    //resetar
    if(keyDown("enter")) {
      reset();
    }
  }
  

  patrick.collide(floor);

 
  drawSprites();
  
}



function generateWaffles() {
 if (frameCount % 435 === 0) {
  waffles = createSprite(1519, 610);
  waffles.setCollider("circle",20 ,90 ,100);
  waffles.addImage("waffles", wafflesImg);
  waffles.scale = 0.2;
  waffles.velocityX = -(10 + wafflesScore/500);
  wafflesGroup.add(waffles);
 }
}

function spawnHive() {
  if (frameCount % 80 === 0) {
    hive = createSprite(1519, 640, 70, 70); 
    hive.setCollider("circle", -10, 40, 150);
    hive.scale = 0.2;
    hive.addImage(hiveImg);
    hive.velocityX = -(10 + wafflesScore/500);
    hiveGroup.add(hive);
  }
}

function generateHoney() {
  if (frameCount % 340 === 0) {
   honey = createSprite(1519, 610);
   honey.setCollider("circle",20 ,90 ,100);
   honey.addImage("honey", honeyImg);
   honey.scale = 0.2;
   honey.velocityX = -(10 + honeyScore/500);
   honeyGroup.add(honey);
  }
 }

 function spawnBees() {
  if(frameCount % 65 === 0) {
    bee = createSprite(0,100);
    bee.y = Math.round(random(100, 450));
    bee.addAnimation("bee", beeImg);
    bee.scale = 0.1;
    bee.velocityX = +15;
    beesGroup.add(bee);
    
  }
 }

 function reset() {

  //mudando o estado de jogo
  gameState = PLAY;

  //redefinir scores para 0
  wafflesScore = 0;
  honeyScore = 0;

  //visibilidade da tela de morte
  gameOver.visible = false;
  pressEnter.visible = false;

  //destruir todos objetos
  hiveGroup.destroyEach();
  wafflesGroup.destroyEach();
  honeyGroup.destroyEach();
  beesGroup.destroyEach();

  //mudar a animação de patrick
  patrick.changeAnimation("running", patrickImg);

  //redefinindo a posição de patrick
  patrick.y = 680;
  patrick.x = 70;
 }


 







