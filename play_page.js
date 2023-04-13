var spaceShip = new Object;
var c = document.getElementById("MyCanvas");
var img = new Image();
var img_height = c.height/10;
var img_width = c.width/10;
var shoot = null;
var keyDown;


function Start() {
    spaceShip.i=c.width/2-img_width/2;
    spaceShip.j=c.height - c.height * 0.2 - img_height/2;
    addEventListener("keydown", function (e) {
        keyDown = e.key;}, false);
    addEventListener("keyup", function (e) {
        console.log(e.key);
        keyDown = null;}, false);
    interval=setInterval(UpdatePosition, 250);
}


function UpdatePosition() {

    var jump_size_vertical = img_height/2;
    var jump_size_horizontal = img_width/2;

    if(keyDown=="ArrowUp")
    {

        if(spaceShip.j>c.height - c.height * 0.4 + jump_size_vertical/2)
        {
            spaceShip.j-=jump_size_vertical;
        }
    }
    if(keyDown=="ArrowDown")
    {
        if(spaceShip.j<c.height - img_height - jump_size_vertical/2)
        {
            spaceShip.j+=jump_size_vertical;
        }
    }
    if(keyDown=="ArrowLeft")
    {
        if(spaceShip.i>0)
        {
            spaceShip.i-=jump_size_horizontal;
        }
    }
    if(keyDown=="ArrowRight")
    {
        if(spaceShip.i<c.width - img_width)
        {
            spaceShip.i+=jump_size_horizontal;
        }
    }
    if(keyDown=="Escape"){
        window.clearInterval(interval);
        $("#MyCanvas").hide()

    }
    if(keyDown==shoot){
        window.clearInterval(interval);
        $("#MyCanvas").hide()

    }
    else{
        Draw();
    }
}

function Draw() {
    DrawGoodRocketShip();
    
}

function DrawGoodRocketShip(){
    $(img).on('load', function() {
        ctx.clearRect(0, 0, c.width, c.height);
    });
    var ctx = c.getContext("2d");
    img.src = 'spaceship1.png';
    $(img).on('load', function() {
        ctx.strokeStyle = "black"; 
        var gradient = ctx.createLinearGradient(0, 0, c.width, 0);
        gradient.addColorStop(0, "black");
        gradient.addColorStop(1, "transparent");
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2;
        ctx.moveTo(0, c.height*0.6-1);
        ctx.lineTo(c.width, c.height*0.6-1);
        ctx.stroke();
        ctx.font = "10px fantasy";
        ctx.fillStyle="white"
        ctx.fillText("can't cross", 0, c.height*0.6 - 2);
        ctx.drawImage(img, spaceShip.i, spaceShip.j, img_width,img_height);
    });
}

$("#MyCanvas").hide()
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
        $("#mytextarea").append(" *fill the box");
    }
    else{
        $("#MyCanvas").show();
        $(document).ready(Start);
    }
}, false);
  