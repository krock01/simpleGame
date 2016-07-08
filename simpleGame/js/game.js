/**
 * Created by krock on 2016/7/8.
 */
//创建canvas画布
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
var screenWidth = canvas.width = 512;
var screenHeight = canvas.height = 480;

//测试
//ctx.fillStyle= "blue";
//ctx.fillRect(0,0,150,75);
//ctx.fill();
//加入到body中
document.body.appendChild(canvas);

//引入背景图片
var bgready = false;
var bgimage = new Image();
bgimage.onload=function(){
    bgready = true;
};
bgimage.src="images/background.png";
//引入英雄图片
var hReady = false;
var hImage = new Image();
hImage.onload = function () {
    hReady = true;
};
hImage.src="images/hero.png";
//引入怪物的图片
var mReady = false;
var mImage = new Image();
mImage.onload = function () {
    mReady = true;
};
mImage.src="images/monster.png";

//定义hero对象
var hero = {
    speed :256,//速度每秒256像素
    x:0,
    y:0
};
//定义怪物对象
var monster = {
    x:0,
    y:0
};
//抓到的怪物数量
var monsterCaught  = 0;
//定义一个存储keycode的对象
var keyDown = {};
//定义一个监听事件 按下键盘事件添加keycode属性
addEventListener("keydown", function (e) {
    keyDown[e.keyCode] = true;
},false);
//定义一个监听事件 抬起键盘事件移除keyDown中的keycode属性
addEventListener("keyup", function (e) {
    delete keyDown[e.keyCode];
},false);
//初始化游戏
var resetGame  = function () {
    //初始化英雄的位置
    hero.x = screenWidth/2;
    hero.y = screenHeight/2;
    //初始化怪物的位置
    monster.x = 32+(Math.random()*(screenWidth-64));
    monster.y = 32+(Math.random()*(screenHeight-64));
    monster.x=monster.x>416?416:monster.x;
    monster.y=monster.y>384?384:monster.x;
};
//更新对象
var update = function (modifier) {
    //向上
    if (38 in keyDown&&hero.y>32) {
        hero.y -=hero.speed * modifier;
    }
    //向下
    if (40 in keyDown&&hero.y<416) {
        hero.y +=hero.speed * modifier;
    }
    //向左
    if (37 in keyDown&&hero.x>32) {
        hero.x -=hero.speed * modifier;
    }
    //向左
    if (39 in keyDown&&hero.x<448) {
        hero.x +=hero.speed * modifier;
    }
    //判断hero是否抓到怪物
    if(hero.x<=monster.x+32
        && monster.x<=hero.x+32
        &&hero.y<=monster.y+32
        &&monster.y<=hero.y+32
    ){
        ++monsterCaught;
        //每次抓到怪物重置位置
        resetGame();
    }
};
//渲染
var render = function () {
    if(bgready){
        ctx.drawImage(bgimage,0,0);
    }
      if(hReady){
          ctx.drawImage(hImage,hero.x,hero.y);
      }
    if(mReady){
        ctx.drawImage(mImage,monster.x,monster.y);
    }

    //绘制左上角的分数显示
    ctx.fillStyle = "rgb(250, 250, 250)";
    ctx.font = "24px Helvetica";
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    ctx.fillText("Goblins caught: " + monsterCaught, 32, 32);
};
// 主循环
var main = function () {
    var now = Date.now();
    var delta = now - then;

    update(delta / 1000);
    render();

    then = now;

    // Request to do this again ASAP
    requestAnimationFrame(main);
};
// Let's play this game!
var then = Date.now();
resetGame();
main();
