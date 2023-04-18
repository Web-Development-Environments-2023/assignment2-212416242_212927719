var GoodSpaceship = new Object;
var c = document.getElementById("MyCanvas");
var ctx = c.getContext("2d");
var intervalGap = 20;
var GoodSSImg = new Image();
GoodSSImg.src = "goodSpaceship1.png";
var BadSSImg = new Image();
BadSSImg.src = 'badSpaceship.png';
var img_height = c.height/4; 
var img_width = c.width/4;
var shoot = null;
var keyDown;
var badspaceShips;
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
    badSSRandomized = badspaceShips[Math.floor(Math.random() * 5)][Math.floor(Math.random() * 4)]
    var shot = new Object();
    shot.i=badSSRandomized.i;
    shot.j=badSSRandomized.j;
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
              }
            }
        }      
        initiateObjects();
        initiateBadSSsYLocation(0);
    }
    createBadspaceShips();
    addBSSshot();
    start_time= new Date();
    GoodSpaceship.i=0;
    GoodSpaceship.j=c.height-  img_height;
    addEventListener("keydown", function (e) {
        keyDown = e.key;}, false);

    interval=setInterval(Update, intervalGap);
}


function Update() {
    function hit(shot, SS){
        if(shot.i>=SS.i&&shot.i<=SS.i+img_width&&shot.j>=SS.j&&shot.j<=SS.j+img_height){
            return true;
        }
        return false;
    }
    function updategbSSshots(){
        for (var i = 0; i < bSSshots.length; i++) {
            bSSshots[i].j+=8;
            if(bSSshots[i].j>c.height){
                bSSshots.splice(i,1);
                i--;
                continue;
            }
        }
    }
    function updategSSshots(){
        for (var i = 0; i < gSSshots.length; i++) {
            gSSshots[i].j-=8;
            if(gSSshots[i].j<0){
                gSSshots.splice(i,1);
                i--;
                continue;
            }
            outerloop:
            for (var k = 0; k < badspaceShips.length; k++) {
                for (var j = 0; j < badspaceShips[k].length; j++) {
                    if(badspaceShips[k][j].alive){
                        if (hit(gSSshots[i],badspaceShips[k][j])){
                            gSSshots.splice(i,1);
                            badspaceShips[k][j].alive = false;
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
    if(keyDown=="Escape"){
        window.clearInterval(interval);
        $("#MyCanvas").hide();
        $("#startButton").show();
        $("#myInput").show();

    }
    else{
        if(badspaceShips[4][0].i<c.width-img_width && spaceshipsMovement == "right"){
            initiateBadSSsYLocation(badspaceShips[0][0].i+img_width/badSSspeed,0);
        }
        else{
            spaceshipsMovement = "left";
            if(badspaceShips[0][0].i>0){
                initiateBadSSsYLocation(badspaceShips[0][0].i-img_width/badSSspeed);
            }
            else{
                initiateBadSSsYLocation(badspaceShips[0][0].i+img_width/badSSspeed);
                spaceshipsMovement = "right"
            }
        }
        Draw();
        updategSSshots();
        updategbSSshots();

    }
    time_elapsed=(new Date()-start_time)/1000;
    if(new Date()-lastShotTime>gSSshotsTimeGap){
        goodSScanShoot = true;
    }
    if(bSSshots[bSSshots.length-1].j>c.height*0.75){
        addBSSshot();
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
            }
        }  
    }
    function draw_time(){
        draw_badSpaceships();
        time_elapsed =Math.floor(time_elapsed * 10) / 10
        ctx.font = '40px Verdana';
        ctx.fillStyle = 'white';
        ctx.fillText(time_elapsed+ "s", 0, 35);
    }
    function draw_gSSshots(){
        function draw_bullet(i,j,loading){
            ctx.strokeStyle ="lightgreen";
            ctx.lineWidth = 4;
            ctx.beginPath();
            var radius = 5
            if(loading){
                ctx.arc(i, j-radius-ctx.lineWidth/2 ,radius, 0, 2*((new Date()-lastShotTime)/gSSshotsTimeGap) * Math.PI);
            }
            else{
                ctx.arc(i, j-radius-ctx.lineWidth/2 ,radius, 0, 2* Math.PI);
            }
            ctx.stroke();
        }
        draw_bullet(GoodSpaceship.i+img_width/2, GoodSpaceship.j,true);   
        for (var i = 0; i < gSSshots.length; i++) {
            draw_bullet(gSSshots[i].i,gSSshots[i].j,false);
        }
    }
    function draw_bSSshots(){
        function draw_bullet(i,j){
            ctx.fillStyle = 'red';
            ctx.fillRect(i+img_width/2, j+img_height, ballSize, ballSize);
        }
        for (var i = 0; i < bSSshots.length; i++) {
            draw_bullet(bSSshots[i].i,bSSshots[i].j);
        }
    }
    c.width=c.width;
    draw_line();
    draw_text();
    ctx.drawImage(GoodSSImg, GoodSpaceship.i, GoodSpaceship.j, img_width,img_height);
    draw_time();
    draw_gSSshots();
    draw_bSSshots();

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

