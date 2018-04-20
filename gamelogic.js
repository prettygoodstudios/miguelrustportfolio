var myWorld = document.getElementById("myWorld");
var myReality = myWorld.getContext("2d");
var mySurroundings = {
  fps: 60,
  groundColor: '#7B92AD',
  gravity: 10,
  groundHeight: 100,
  backgroundColor: "#ECF5FF",
  iconSize: 100,
  iconSpacing: 500,
  iconOffsetX: 300,
  mode: "intro",
  icons: {
    angular: {
      show: true,
      animate: false,
      frames: 0,
      itts: 0,
      reset: false,
      name: "Angular"
    },
    react: {
      show: true,
      animate: false,
      frames: 0,
      itts: 0,
      reset: false,
      name: "React"
    },
    gem: {
      show: true,
      animate: false,
      frames: 0,
      itts: 0,
      reset: false,
      name: "Ruby on Rails"
    }
  },
  congratulationsAnim:{
    frames: 0,
    itts: 0,
    skills: [],
    seed: true
  },
  introAnimation: {
    frames: 0,
    itts: 0
  }
};
var me = {
  health: 3,
  frame: 0,
  offsetX: 50,
  itterations: 0,
  frameSwitch: 20,
  speed: 10,
  walkSpeed: 20,
  x: 0,
  y: 0,
  height: 240,
  width: 136,
  ground: true,
  hops: 50,
  frames:[]
};
var controller = {
  direction: "",
  left: false,
  right: false
};
onload = function(){
  for(var i = 1;i < 5; i++){
    var img = new Image();
    img.src = "character/frame"+i+".png";
    me.frames.push(img);
  }
  var bck = new Image();
  bck.src = "Hills.svg";
  var grn = new Image();
  grn.src = "Ground.png";
  var cl = new Image();
  cl.src = "Clouds.png";
  var gm = new Image();
  gm.src = "Gem.svg";
  var ng = new Image();
  ng.src = "Angular.svg";
  var fb = new Image();
  fb.src = "React.svg";
  var wd = new Image();
  wd.src = "WoodPanel.svg";
  mySurroundings.hills = bck;
  mySurroundings.ground = grn;
  mySurroundings.clouds = cl;
  mySurroundings.icons.angular.image = ng;
  mySurroundings.icons.react.image = fb;
  mySurroundings.icons.gem.image = gm;
  myWorld.width = window.innerWidth;
  myWorld.height = window.innerHeight;
  me.y = myWorld.height - mySurroundings.groundHeight - me.height;
}
me.render = function(){
  me.itterations++;
  if(me.itterations > me.frameSwitch){
    if(controller.direction == "right"){
      me.frame++;
    }else if(controller.direction == "left"){
      me.frame--;
    }
    me.itterations = 0;
    me.physics();
  }
  if(me.frame > me.frames.length - 1){
    me.frame = 0;
  }
  if(me.frame < 0){
    me.frame = me.frames.length-1;
  }
  myReality.drawImage(me.frames[me.frame],me.offsetX,me.y,me.width,me.height);
}
me.physics = function(){
  if(controller.direction == "right"){
    me.x+=me.walkSpeed;
  }else if(controller.direction == "left"){
    me.x-=me.walkSpeed;
  }
  if(controller.direction == "up" || !me.ground){
    console.log(me.speed);
    if(me.ground == true){
      me.speed = me.hops;
      me.ground = false;
      me.y-=me.speed;
      controller.resetDirection();
    }else{
      me.speed -= mySurroundings.gravity;
      me.y -= me.speed;
      if(me.y + me.height > myWorld.height-mySurroundings.groundHeight){
        me.ground = true;
        me.y = myWorld.height-mySurroundings.groundHeight-me.height;
        controller.resetDirection();
      }
    }
  }
}
mySurroundings.renderBackground = function(){
  myReality.fillStyle = mySurroundings.backgroundColor;
  myReality.fillRect(0,0,myWorld.width,myWorld.height);
  mySurroundings.renderTileset(mySurroundings.hills,myWorld.height-mySurroundings.groundHeight-mySurroundings.hills.height,0.3);
  mySurroundings.renderTileset(mySurroundings.clouds,0,0.2);
}
mySurroundings.renderIcons = function(){
  var width = mySurroundings.iconSpacing*3;
  var itts = Math.floor(myWorld.width/width);
  var displacement = me.x;
  var moved = Math.floor(displacement/width)*width;
  if (itts == Infinity) itts = 0;
  itts+=2;
  for(var i=0; i < itts; i ++){
    if(mySurroundings.icons.gem.show) myReality.drawImage(mySurroundings.icons.gem.image,i*width+mySurroundings.iconOffsetX-displacement+moved,myWorld.height-mySurroundings.groundHeight-me.height-mySurroundings.iconSize,mySurroundings.iconSize,mySurroundings.iconSize);
    if(mySurroundings.icons.react.show) myReality.drawImage(mySurroundings.icons.react.image,i*width+mySurroundings.iconOffsetX+mySurroundings.iconSpacing-displacement+moved,myWorld.height-mySurroundings.groundHeight-me.height-mySurroundings.iconSize,mySurroundings.iconSize,mySurroundings.iconSize);
    if(mySurroundings.icons.angular.show) myReality.drawImage(mySurroundings.icons.angular.image,i*width+mySurroundings.iconOffsetX+mySurroundings.iconSpacing*2-displacement+moved,myWorld.height-mySurroundings.groundHeight-me.height-mySurroundings.iconSize,mySurroundings.iconSize,mySurroundings.iconSize);
  }
}
mySurroundings.animateIcons = function(){
  //console.log("animate",mySurroundings.icons.size);
  for(var i = 0;i < Object.keys(mySurroundings.icons).length;i++){
    var key = Object.keys(mySurroundings.icons)[i];
    if(mySurroundings.icons[key].animate){
      mySurroundings.icons[key].itts++;
      if(mySurroundings.icons[key].itts > 3){
        mySurroundings.icons[key].itts = 0;
        mySurroundings.icons[key].frames++;
      }
      var size = Math.pow(Math.E,mySurroundings.icons[key].frames*0.5-Math.E*2)/(Math.pow(Math.E,mySurroundings.icons[key].frames*0.5-Math.E*2)+1)*myWorld.height*0.8;
      var fontSize = Math.pow(Math.E,mySurroundings.icons[key].frames*0.5-Math.E*2)/(Math.pow(Math.E,mySurroundings.icons[key].frames*0.5-Math.E*2)+1)*100;
      if(size > myWorld.height*0.8-20 || mySurroundings.icons[key].reset){
        if(!mySurroundings.icons[key].reset){
          mySurroundings.icons[key].reset = true;
          mySurroundings.icons[key].frames = 0;
        }
        if(mySurroundings.icons[key].frames > 700){
          mySurroundings.icons[key].frames = 700;
        }
        var smallIconSize = Math.pow(Math.E,mySurroundings.icons[key].frames-Math.E*2)/(Math.pow(Math.E,mySurroundings.icons[key].frames-Math.E*2)+1)*mySurroundings.iconSize;
        myReality.drawImage(mySurroundings.icons[key].image,myWorld.width-mySurroundings.iconSize*1.5*(i+1),mySurroundings.iconSize*0.5,smallIconSize,smallIconSize);
      }else{
        myReality.drawImage(mySurroundings.icons[key].image,myWorld.width/2-size/2,myWorld.height/2-size/2,size,size);
        myReality.font = Math.floor(fontSize)+"px Avenir";
        myReality.textAlign = "center";
        myReality.fillStyle = "black";
        myReality.fillText(mySurroundings.icons[key].name,myWorld.width/2,myWorld.height/2-size/2);
      }
    }
  }
}
mySurroundings.congratulations = function(){
  if(mySurroundings.congratulationsAnim.seed){
    mySurroundings.congratulationsAnim.seed = false;
    var rows = Math.ceil(myWorld.width/mySurroundings.iconSize);
    for(var i =0; i < rows;i++){
      for(var j=0; j< 5; j++){
        var tempObj = {
          key: Object.keys(mySurroundings.icons)[Math.floor(Math.random()*3)],
          row: i,
          y: -mySurroundings.iconSize,
          falling: false
        }
        mySurroundings.congratulationsAnim.skills.push(tempObj);
      }
    }
  }
  for(var i=0;i<mySurroundings.congratulationsAnim.skills.length;i++){
    if(mySurroundings.congratulationsAnim.skills[i].falling){
      mySurroundings.congratulationsAnim.skills[i].y+=2;
      if(mySurroundings.congratulationsAnim.skills[i].y > myWorld.height){
        mySurroundings.congratulationsAnim.skills[i].y = - mySurroundings.iconSize;
        mySurroundings.congratulationsAnim.skills[i].falling = false;
      }
      myReality.drawImage(mySurroundings.icons[mySurroundings.congratulationsAnim.skills[i].key].image,mySurroundings.congratulationsAnim.skills[i].row*mySurroundings.iconSize,mySurroundings.congratulationsAnim.skills[i].y,mySurroundings.iconSize,mySurroundings.iconSize);
    }else{
      if(Math.floor(Math.random()*400) == 4){
        mySurroundings.congratulationsAnim.skills[i].falling = true;
      }
    }
  }
  myReality.textAlign = "center";
  myReality.font = "40px Avenir";
  myReality.fillStyle = "black";
  myReality.fillText("You Collected All the Skills!",myWorld.width/2,myWorld.height/2-50);
}
mySurroundings.iconCollisions = function(){
  if(me.y + me.height >  myWorld.height-mySurroundings.groundHeight-me.height-mySurroundings.iconSize && me.y < myWorld.height-mySurroundings.groundHeight-me.height){
    console.log("In Y Range!");
    var width = mySurroundings.iconSpacing*3;
    var netDisplacement = Math.floor(me.x/width)*width-me.x;
    for(var i = 0;i < 3;i++){
        if(me.offsetX + me.width > mySurroundings.iconOffsetX+netDisplacement+mySurroundings.iconSpacing*i && me.offsetX < mySurroundings.iconOffsetX+netDisplacement+mySurroundings.iconSpacing*i+mySurroundings.iconSize){
          switch(i){
            case 0:
              mySurroundings.icons.gem.show = false;
              mySurroundings.icons.gem.animate = true;
              console.log(mySurroundings.icons);
              mySurroundings.checkGameStatus();
              break;
            case 1:
              mySurroundings.icons.react.show = false;
              mySurroundings.icons.react.animate = true;
              console.log(mySurroundings.icons);
              mySurroundings.checkGameStatus();
              break;
            case 2:
              mySurroundings.icons.angular.show = false;
              mySurroundings.icons.angular.animate = true;
              console.log(mySurroundings.icons);
              mySurroundings.checkGameStatus();
              break;
            default:
              break;
          }
        }
    }
  }
}
mySurroundings.checkGameStatus = function(){
  var gameOver = true;
  for(var i=0;i< 3;i++){
    var key = Object.keys(mySurroundings.icons)[i];
    if(!mySurroundings.icons[key].reset){
      gameOver = false;
    }
  }
  if(gameOver){
    mySurroundings.mode = "gameOver";
  }
}
mySurroundings.renderGround = function(){
  mySurroundings.renderTileset(mySurroundings.ground,myWorld.height-mySurroundings.groundHeight,1);
}
mySurroundings.renderTileset = function(image,y,speed){
  var itts = Math.floor(myWorld.width/image.width);
  var displacement = me.x * speed;
  var moved = Math.floor(displacement/image.width)*image.width;
  if (itts == Infinity) itts = 0;
  itts+=2;
  for(var i = 0; i < itts; i++){
    myReality.drawImage(image,i*image.width-displacement+moved,y);
  }
}
mySurroundings.renderIntro = function(text){
  var tileWidth = 100;
  var tileX = 7;
  var tileY = 2;
  myReality.drawImage(mySurroundings.clouds,myWorld.width/2-mySurroundings.clouds.width/4+mySurroundings.introAnimation.frames*0.4,myWorld.height*0.2-mySurroundings.introAnimation.frames*0.3);
  myReality.drawImage(mySurroundings.clouds,myWorld.width/2-mySurroundings.clouds.width/3-mySurroundings.introAnimation.frames*0.7,myWorld.height*0.2-mySurroundings.introAnimation.frames*0.5);
  myReality.fillStyle = "black";
  myReality.textAlign = "center";
  myReality.font = "40px Avenir";
  if(text){
    myReality.fillText("Use the Arrow or WASD Keys",myWorld.width/2,myWorld.height*0.3333);
    myReality.fillText("To Collect All the Skills!",myWorld.width/2,myWorld.height*0.3333+80);
  }
}
mySurroundings.render = function(){
  mySurroundings.renderBackground();
  mySurroundings.renderGround();
  mySurroundings.renderIcons();
  if(mySurroundings.mode == "intro"){
    mySurroundings.renderIntro(true);
  }
  if(mySurroundings.mode == "introAnimation"){
    mySurroundings.introAnimation.itts++;
    if(mySurroundings.introAnimation.itts > 2){
        mySurroundings.introAnimation.frames++;
        mySurroundings.introAnimation.itts = 0;
    }
    if(mySurroundings.introAnimation.frames > 10000){
      mySurroundings.mode = "play";
    }
    mySurroundings.renderIntro(false);
  }
  me.render();
  if(mySurroundings.mode == "gameOver"){
    mySurroundings.congratulations();
  }else{
    mySurroundings.animateIcons();
  }
  mySurroundings.iconCollisions();
}
setInterval(mySurroundings.render,1000/me.fps);

addEventListener("keydown",function(e){
  console.log(e);
  if(mySurroundings.mode == "intro") mySurroundings.mode = "introAnimation";
  if(e.key == "d" || e.key == "D" || e.key == "ArrowRight"){
    controller.direction = "right";
    controller.right = true;
  }
  if(e.key == "a" || e.key == "A" || e.key == "ArrowLeft"){
    controller.direction = "left";
    controller.left = true;
  }
  if(e.key == "w" || e.key == "W" || e.key == "ArrowUp"){
    controller.direction = "up";
  }
});
addEventListener("keyup",function(e){
  console.log(e);
  if(e.key == "d" || e.key == "D" || e.key == "ArrowRight"){
    controller.right = false;
    controller.resetDirection();
  }
  if(e.key == "a" || e.key == "A" || e.key == "ArrowLeft"){
    controller.left = false;
    controller.resetDirection();
  }
});
controller.resetDirection = function(){
  if(controller.left){
    controller.direction = "left";
  }else if(controller.right){
    controller.direction = "right";
  }else{
    controller.direction = "";
  }
}
