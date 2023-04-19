var GoodSpaceship = new Object;
var c = document.getElementById("MyCanvas");
var ctx = c.getContext("2d");
var intervalGap = 20;
var GoodSSImg = new Image();
GoodSSImg.src = "goodSpaceShip1.png";
var BadSSImg = new Image();
BadSSImg.src = 'chicken.png';
var bomb_img = new Image();
bomb_img.src = 'bomb.png';
var egg_img = new Image();
egg_img.src = 'egg.png';
var shot_img = new Image();
shot_img.src = 'shot.png';
var img_height = c.height/4; 
var img_width = c.width/4;
var shoot = null;
var keyDown;
var badspaceShips;
var bSSAlive = []
var spaceshipsMovement = "right";
var start_time;
var time_elapsed;
var goodSScanShoot=true;
var bSScanShoot = false;
var lastShotTime=0;
var gSSshotsTimeGap = 1000;
var gSSshots=[];
var bSSshots=[];
var ballSize=10;
var badSSspeed = 8; 
var egg_size = img_width/4;
var shot_jump = 8;
var startPoint;
var badSSJump = img_width/badSSspeed;
var to_load;



function initiateBadSSsYLocation(firstSpacehipI){
    badspaceShips[0][0].i=firstSpacehipI;
    badspaceShips[0][0].j=img_height*2;
    for (var i = 0; i < badspaceShips.length; i++) {
        var j = 0;
        if (i==0){
            j=1;
        }
        for (; j < badspaceShips[i].length; j++) {
            badspaceShips[i][j].i=badspaceShips[0][0].i + img_width * i * 2;
            badspaceShips[i][j].j=badspaceShips[0][0].j + img_height * j * 2;
        
        }
    }
}

function addBSSshot(){
    badSSRandomized = bSSAlive[Math.floor(Math.random() * bSSAlive.length)]
    var shot = new Object();
    shot.i=badSSRandomized.i+img_width/2;
    shot.j=badSSRandomized.j+img_height;
    bSSshots.push(shot);
}

function Start() {
   $('#MyCanvas').attr("width",$(window).width());
   $('#MyCanvas').attr("height",$(window).height());
    function createBadspaceShips(){    
        function initiateObjects(){
            const numRows = 5;
            const numCols = 4;
            badspaceShips = new Array(numRows);
            for (let i = 0; i < numRows; i++) {
                badspaceShips[i] = new Array(numCols);  
              for (let j = 0; j < numCols; j++) {
                badspaceShips[i][j] = new Object();
                badspaceShips[i][j].alive = true;
                badspaceShips[i][j].death_time=0;
                bSSAlive.push(badspaceShips[i][j])
              }
            }
        }      
        initiateObjects();
        initiateBadSSsYLocation(0);
    }
    createBadspaceShips();
    start_time= new Date();
    startPoint = img_width * Math.floor(Math.random() * Math.floor(c.width/img_width));
    GoodSpaceship.i=startPoint;
    GoodSpaceship.j=c.height- img_height;
    GoodSpaceship.time_shot = 0
    GoodSpaceship.dead = false
    addEventListener("keydown", function (e) {
        keyDown = e.key;}, false);

    interval=setInterval(Update, intervalGap);
}


function Update() {
    function addBSSshot(){
        badSSRandomized = bSSAlive[Math.floor(Math.random() * bSSAlive.length)]
        var shot = new Object();
        shot.i=badSSRandomized.i+img_width/2;
        shot.j=badSSRandomized.j+img_height;
        bSSshots.push(shot);
    }
    function hit(shot,shot_width, shot_height, SS){
        if(shot.i>=SS.i-shot_width&&shot.i<=SS.i+img_width+shot_width&&shot.j>=SS.j-shot_height&&shot.j<=SS.j+img_height+shot_height){
            return true;
        }
        return false;
    }
    function updategbSSshots(){
        for (var i = 0; i < bSSshots.length; i++) {
            bSSshots[i].j+=shot_jump;
            if(bSSshots[i].j>c.height){
                bSSshots.splice(i,1);
                i--;
                continue;
            }
        }
        for (var j = 0; j < bSSshots.length; j++) {
            if (hit(bSSshots[j],egg_size,egg_size,GoodSpaceship)){
                bSSshots.splice(j,1);
                GoodSpaceship.time_shot = new Date();
                return
            }
        }
    }  
    function updategSSshots(){
        for (var i = 0; i < gSSshots.length; i++) {
            gSSshots[i].j-=shot_jump;
            if(gSSshots[i].j<0){
                gSSshots.splice(i,1);
                i--;
                continue;
            }
            outerloop:
            for (var k = 0; k < badspaceShips.length; k++) {
                for (var j = 0; j < badspaceShips[k].length; j++) {
                    if(badspaceShips[k][j].alive){
                        if (hit(gSSshots[i],egg_size,egg_size,badspaceShips[k][j])){
                            gSSshots.splice(i,1);
                            badspaceShips[k][j].alive = false;
                            badspaceShips[k][j].death_time=new Date();
                            bSSAlive.splice(bSSAlive.indexOf(badspaceShips[k][j]), 1)
                            i--;
                            break outerloop;
                        }
                    }
                }
            }  
        }
    }
    var jump_size_vertical = img_height/2;
    var jump_size_horizontal = img_width/2;
    if (!(GoodSpaceship.dead)){

    if(keyDown=="ArrowUp")
    {

        if(GoodSpaceship.j>c.height - c.height * 0.4 + jump_size_vertical)
        {
            GoodSpaceship.j-=jump_size_vertical;
        }
    }
    if(keyDown=="ArrowDown")
    {
        if(GoodSpaceship.j<c.height - img_height - jump_size_vertical/2)
        {
            GoodSpaceship.j+=jump_size_vertical;
        }
    }
    if(keyDown=="ArrowLeft")
    {
        if(GoodSpaceship.i>0)
        {
            GoodSpaceship.i-=jump_size_horizontal;
        }
    }
    if(keyDown=="ArrowRight")
    {
        if(GoodSpaceship.i<c.width - img_width)
        {
            GoodSpaceship.i+=jump_size_horizontal;
        }
    }
    if(keyDown==shoot){
        if(goodSScanShoot){
            lastShotTime = new Date();
            goodSScanShoot = false;
            var shot = new Object();
            shot.i=GoodSpaceship.i+img_width/2;
            shot.j=GoodSpaceship.j;
            gSSshots.push(shot);
          }
    }
}
    if(keyDown=="Escape"){
        window.clearInterval(interval);
        $("#MyCanvas").hide();
        $("#startButton").show();
        $("#myInput").show();

    }
    else{
        if(!GoodSpaceship.dead){

        if(badspaceShips[4][0].i<c.width-img_width && spaceshipsMovement == "right"){
            initiateBadSSsYLocation(badspaceShips[0][0].i+img_width/badSSspeed,0);
        }
        else{
            spaceshipsMovement = "left";
            if(badspaceShips[0][0].i>0){
                initiateBadSSsYLocation(badspaceShips[0][0].i-badSSJump);
            }
            else{
                initiateBadSSsYLocation(badspaceShips[0][0].i+badSSJump);
                spaceshipsMovement = "right"
            }
        }
    }
        if( GoodSpaceship.dead&&new Date()-GoodSpaceship.time_shot>=500){
            GoodSpaceship.i=startPoint;
            GoodSpaceship.j=c.height- img_height;
        }
        GoodSpaceship.dead = GoodSpaceship.time_shot>0&&new Date()-GoodSpaceship.time_shot<=1000;

        Draw();
        if(!GoodSpaceship.dead){
        updategSSshots();
        updategbSSshots();
        }

    }
    if(!GoodSpaceship.dead){
    time_elapsed=(new Date()-start_time)/1000;
    }
    if(new Date()-lastShotTime>gSSshotsTimeGap){
        goodSScanShoot = true;
    }
    if(bSSshots.length==0){
        addBSSshot();

}
    else{
        if(bSSshots[bSSshots.length-1].j>c.height*0.75){
            addBSSshot();
        }

    }
    keyDown=null;
}

function Draw(){
    function draw_line(){
        ctx.strokeStyle = "black"; 
        var gradient = ctx.createLinearGradient(0, 0, c.width, 0);
        gradient.addColorStop(0, "black");
        gradient.addColorStop(1, "transparent");
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 10;
        ctx.moveTo(0, c.height*0.6-1);
        ctx.lineTo(c.width, c.height*0.6-1);
        ctx.stroke();
    }
    function draw_text(){
        ctx.font = "30px fantasy";
        ctx.fillStyle="white"
        ctx.fillText("can't cross", 0, c.height*0.6);
    }
    function draw_badSpaceships(){
        for (var i = 0; i < badspaceShips.length; i++) {
            for (var j = 0; j < badspaceShips[i].length; j++) {
                if(badspaceShips[i][j].alive){
                    ctx.drawImage(BadSSImg, badspaceShips[i][j].i, badspaceShips[i][j].j, img_width,img_height);
                }
                else{
                    if((new Date() - badspaceShips[i][j].death_time)<1000){
                        ctx.drawImage(bomb_img, badspaceShips[i][j].i, badspaceShips[i][j].j, img_width,img_height);
                    }
                }
            }
        }  
    }
    function draw_time(){

        time_elapsed =Math.floor(time_elapsed * 10) / 10
        ctx.font = '40px Verdana';
        ctx.fillStyle = 'white';
        ctx.fillText(time_elapsed+ "s", 0, 35);
    }
    function draw_gSSshots(){
        function draw_bullet(i,j,loading){
            function draw_shot(i,j){
                ctx.drawImage(shot_img, i-egg_size/2, j-egg_size, egg_size,egg_size);
            }
            ctx.beginPath();
            ctx.strokeStyle ="lightblue";
            ctx.lineWidth = 4;
            ctx.beginPath();
            var radius = 5
                if(loading){
                    if(!( GoodSpaceship.dead)){
                        to_load = ((new Date()-lastShotTime)/gSSshotsTimeGap)

                    if (to_load<=1){
                        ctx.arc(i, j-radius-ctx.lineWidth/2 ,radius, 0, 2 * to_load * Math.PI);
                    }
                    else{
                        draw_shot(i,j);
                    }
                }
                if( GoodSpaceship.dead&&new Date()-GoodSpaceship.time_shot>=500){

                        draw_shot(i,j);
                    }
                }
                else{

                    draw_shot(i,j);
                }
                ctx.stroke();
            
        }
        draw_bullet(GoodSpaceship.i+img_width/2, GoodSpaceship.j,true);
           
        for (var i = 0; i < gSSshots.length; i++) {
            draw_bullet(gSSshots[i].i,gSSshots[i].j,false);
        }
    }
    function draw_bSSshots(){
        function draw_egg(i,j){
            ctx.drawImage(egg_img, i, j, egg_size,egg_size);
        }
        
        for (var i = 0; i < bSSshots.length; i++) {
            draw_egg(bSSshots[i].i,bSSshots[i].j);
        }
    }
    function Draw_gSS(){
        if (GoodSpaceship.dead){
            if( GoodSpaceship.dead&&new Date()-GoodSpaceship.time_shot>=500){
            ctx.drawImage(GoodSSImg, GoodSpaceship.i, GoodSpaceship.j, img_width,img_height);

            }
            else{
            ctx.drawImage(bomb_img, GoodSpaceship.i, GoodSpaceship.j, img_width,img_height);
            }
        }
        else{
            ctx.drawImage(GoodSSImg, GoodSpaceship.i, GoodSpaceship.j, img_width,img_height);
        }
    }
    c.width=c.width;
    draw_line();
    draw_text();
    Draw_gSS();
    draw_gSSshots();
    draw_bSSshots();
    draw_badSpaceships();
    draw_time();

}

$("#MyCanvas").hide();
const input = document.getElementById("myInput");
input.addEventListener('keydown',function(e) {
  if (input.value.length > 0) {
    input.value =null;
  }
  shoot = e.key;
  $("#mytextarea").empty();
  $("#mytextarea").append(" you will shoot with: '");
  $("#mytextarea").append(shoot);
  $("#mytextarea").append("'");


}, false);
const myButton = document.getElementById("startButton")
startButton.addEventListener("click",function(){
    if(shoot==null){
        $("#mytextarea").empty();
        $("#mytextarea").append(" *fill the box");
    }
    else{
        $("#MyCanvas").show();
        $(document).ready(Start);
        $("#startButton").hide();
        $("#myInput").hide();

        

    }
}, false);

