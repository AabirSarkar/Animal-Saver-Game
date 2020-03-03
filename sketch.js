var PLAY = 1;
var END = 0;
var START=2

var gameState =START;

var start
var player;
var ground,ivisibleGround, groundImage;

var animalsGroup, animalImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3;
var gameOver,restart

var animals =0;


function preload(){
  
 
    playerImg = loadImage("truck.png")
    groundImage = loadImage("forest.jpg");
    gameOverImg = loadImage("gameOver.jpg")

    startImg = loadImage("start.jpg")
     restartImg = loadImage("reset.png")
    
    
    obstacle1 = loadImage("trap1.png");
    obstacle2 = loadImage("trap2.png");
    obstacle3 = loadImage("trap3.png");

    animal1Image = loadImage("gorrila.png");

   animal2Image = loadImage("leopard.png");
   
   animal3Image = loadImage("rhino.png");
  
  }

  function setup() {
    
    createCanvas(1520, 725);
    
   
    invisibleGround = createSprite(200,600,400,20);
    start = createSprite(750,360,400,20);
    start.addImage(startImg);
    start.visible = false;

    
    ground = createSprite(200,180,400,20);
    ground.addImage(groundImage);
    ground.x = ground.width /2;
    ground.velocityX = -30;
    ground.visible = false;
   

    player = createSprite(350,600,20,50);
    player.addImage(playerImg);
    player.scale = 0.2;
    player.visible = false;
    


    
    
    animalsGroup = new Group();
    obstaclesGroup = new Group();
    
    score = 0;
  }

function draw() {
  background(0);
if(gameState===START){
  start.visible = true;
  var ok = 1;
  if(keyDown("space")){
    gameState=PLAY;
  }
}


  
  player.collide(invisibleGround);



 if (gameState===PLAY){
  ground.visible = true;
  player.visible = true;

    if(keyDown("space") && player.y >= 500) {
      
      player.velocityY = -14;
    }
  
    player.velocityY = player.velocityY + 0.8
  
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
 
     spawnAnimals();
    spawnObstacles();
   player.setCollider("rectangle", 0, 0, 750, 600, -90);

   // player.setCollider("circle",0,0,250);
   if(obstaclesGroup.isTouching(player)){
      gameState = END;


    }
    if(animalsGroup.isTouching(player)){
      
      animals =animals + 1;
      animalsGroup.destroyEach();

  
    }

  }

  else if (gameState === END) {
 

    ground.velocityX = 0;
    player.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    animalsGroup.setVelocityXEach(0);
    
    gameOver = createSprite(displayWidth/2,displayHeight/2-95,displayWidth,displayHeight);
    gameOver.addImage(gameOverImg);

    reset = createSprite(displayWidth/2,displayHeight/2,30,40)
    reset.addImage(restartImg);
    reset.scale = 0.5;
    
    obstaclesGroup.setLifetimeEach(-1);
    animalsGroup.setLifetimeEach(-1);


  if(mousePressedOver(reset)){
    location.reload()
  }

  }


  

  drawSprites();
  showText();
}

function spawnAnimals() {
  if (frameCount % 250 === 0) {
    var animal = createSprite(1400,120,40,10);

    animal.y = Math.round(random(400,600));
    animal.setCollider("rectangle",0,0,250,450);
  var rand1 = Math.round(random(1,3));
 
    switch(rand1) {
      case 1:  animal.addImage(animal3Image);
              break;
      case 2: animal.addImage(animal2Image);
              break;
      case 3:  animal.addImage(animal1Image);
              break;
      default: break;
    }
 
    animal.scale = 0.35;
    animal.velocityX = -20;
    

    animal.lifetime =50;
    
    animal.depth = player.depth;
    player.depth = player.depth + 1;
    
   
    animalsGroup.add(animal);
  }
  
}

function spawnObstacles() {
  if(frameCount % 55 === 0) {
    var obstacle = createSprite(1200,505,10,40);
    obstacle.y =600;
    obstacle.velocityX = -35;
    

    var rand2 = Math.round(random(1,3));
   switch(rand2) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      default: break;
    }
    
  
    obstacle.scale = 0.5;
    obstacle.lifetime = 250;
   
    obstaclesGroup.add(obstacle);
  }
}
function showText(){
  textFont("Georgia");
  textStyle(BOLD);
    
    fill("white");
    textSize(50);
    text("Animals Saved: "+ animals,displayHeight/2+600, 60);
}




