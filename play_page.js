var GoodSpaceship = new Object;
var c = document.getElementById("MyCanvas");
var ctx = c.getContext("2d");
var intervalGap = 125;
var GoodSSImg = new Image();
GoodSSImg.src = "goodSpaceship1.png";
var BadSSImg = new Image();
BadSSImg.src = 'badSpaceship.png';
var img_height = c.height/15; 
var img_width = c.width/15;
var shoot = null;
var keyDown;
var badspaceShips;
var spaceshipsMovement = "right";
var start_time;
var time_elapsed;
var goodSScanShoot=true;
var lastShotTime=0;
var shotsTimeGap = 2000;


function initiateBadSSsYLocation(firstSpacehipI){
    badspaceShips[0][0].i=firstSpacehipI;
    badspaceShips[0][0].j=img_height;
    for (var i = 0; i < badspaceShips.length; i++) {
        var j = 0;
        if (i==0){
            j=1;
        }
        for (; j < badspaceShips[i].length; j++) {
            badspaceShips[i][j].alive = true;
            badspaceShips[i][j].i=badspaceShips[0][0].i + img_width * i * 2;
            badspaceShips[i][j].j=badspaceShips[0][0].j + img_height * j * 2;
        
        }
    }
}


function Start() {
    function createBadspaceShips(){
        function initiateObjects(){
            const numRows = 5;
            const numCols = 4;
            badspaceShips = new Array(numRows);
            for (let i = 0; i < numRows; i++) {
                badspaceShips[i] = new Array(numCols);  
              for (let j = 0; j < numCols; j++) {
                badspaceShips[i][j] = new Object();
              }
            }
        }    
        initiateObjects();
        initiateBadSSsYLocation(0);
    }
    createBadspaceShips();
    start_time= new Date();

    GoodSpaceship.i=c.width/2-img_width/2;
    GoodSpaceship.j=c.height - c.height * 0.2 - img_height/2;
    addEventListener("keydown", function (e) {
        keyDown = e.key;}, false);

    interval=setInterval(Update, intervalGap);
}


function Update() {
    var jump_size_vertical = img_height/2;
    var jump_size_horizontal = img_width/2;
    if(keyDown=="ArrowUp")
    {

        if(GoodSpaceship.j>c.height - c.height * 0.4 + jump_size_vertical/2)
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
    if(keyDown=="Escape"){
        window.clearInterval(interval);
        $("#MyCanvas").hide()

    }
    if(keyDown==shoot){
        if(goodSScanShoot){
            lastShotTime = new Date();
            goodSScanShoot = false;

        }
    }
    else{
        if(badspaceShips[0][0].i<img_width*6 && spaceshipsMovement == "right"){
            initiateBadSSsYLocation(badspaceShips[0][0].i+img_width/2,0);
        }
        else{
            spaceshipsMovement = "left";
            if(badspaceShips[0][0].i!=0){
                initiateBadSSsYLocation(badspaceShips[0][0].i-img_width/2);
            }
            else{
                initiateBadSSsYLocation(badspaceShips[0][0].i+img_width/2);
                spaceshipsMovement = "right"
            }
        }
        Draw();
    }
    time_elapsed=(new Date()-start_time)/1000;
    if(new Date()-lastShotTime>shotsTimeGap){
        goodSScanShoot = true;
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
        ctx.lineWidth = 2;
        ctx.moveTo(0, c.height*0.6-1);
        ctx.lineTo(c.width, c.height*0.6-1);
        ctx.stroke();
    }
    function draw_text(){
        ctx.font = "10px fantasy";
        ctx.fillStyle="white"
        ctx.fillText("can't cross", 0, c.height*0.6 - 2);
    }
    function draw_badSpaceships(){
        for (var i = 0; i < badspaceShips.length; i++) {
            for (var j = 0; j < badspaceShips[i].length; j++) {
                ctx.drawImage(BadSSImg, badspaceShips[i][j].i, badspaceShips[i][j].j, img_width,img_height);
            }
        }
    
    }

    c.width=c.width;
    draw_line();
    draw_text();
    ctx.drawImage(GoodSSImg, GoodSpaceship.i, GoodSpaceship.j, img_width,img_height);
    draw_badSpaceships();
    ctx.font = '10px Verdana';
    ctx.fillStyle = 'red';
    if(goodSScanShoot){
    ctx.font = '10px Verdana';
    ctx.fillStyle = 'green';
    }
    ctx.fillText(time_elapsed, 0, 9);
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
    }
}, false);
