var backgroundImage;
var balloon, balloonImage1, balloonImage2;
var position;
var balloonPosition;
var database;
var height; 

function preload(){
  bg = loadImage("cityImage.png")
  balloonImage1 = loadAnimation("hotairballoon1.png");
  balloonImage2 = loadAnimation("hotairballoon1.png","hotairballoon1.png",
  "hotairballoon2.png","hotairballoon2.png",
  "hotairballoon3.png","hotairballoon3.png");
}

function setup() {
  database = firebase.database();
  createCanvas(1500,700);

  balloon = createSprite(250, 650, 150, 150);
  balloon.addAnimation("hotairballoon",balloonImage1);
  balloon.scale = 0.6;
  //balloon.velocityX = 0.2;
  //balloon.velocityY = -0.2;
  var balloonHeight = database.ref('balloon/height');
  balloonHeight.on("value",readHeight, showError);
}

function draw() {
  background(bg);
  
 
    if(keyDown(LEFT_ARROW)){
      updateHeight(-10,0);
      balloon.addAnimation("hotairballoon",balloonImage2);
    }
    else if(keyDown(RIGHT_ARROW)){
      updateHeight(10,0);
      balloon.addAnimation("hotairballoon",balloonImage2)
    }
    else if(keyDown(UP_ARROW)){
      updateHeight(0,-10);
      balloon.addAnimation("hotairballoon",balloonImage2)
      balloon.scale = balloon.scale-0.005
    }
    else if(keyDown(DOWN_ARROW)){
      updateHeight(0,10);
      balloon.addAnimation("hotairballoon",balloonImage2)
      balloon.scale = balloon.scale+0.005
    }

  drawSprites();
  text(mouseX+","+mouseY,mouseX,mouseY); 

  fill(0);
  textSize(15);
  text("Use arrow keys to move the HOT AIR BALLOON..",15,25); 

}

function updateHeight(x,y){
  database.ref('balloon/height').set({
    'x' : height.x + x,
    'y' : height.y + y
  })
}

function readHeight(data){
  height = data.val();
  balloon.x = height.x;
  balloon.y = height.y;
}

function showError(){
  console.log("error in database")
}