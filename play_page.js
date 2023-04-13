var spaceShip = new Object;
var c = document.getElementById("MyCanvas");
var img = new Image();
var img_height = c.height/10;
var img_width = c.width/10;



function Start() {
    spaceShip.i=c.width/2-img_width/2;
    spaceShip.j=c.height - c.height * 0.2 - img_height/2;
    keysDown = {};
    addEventListener("keydown", function (e) {
        keysDown[e.keyCode] = true;
    }, false);
    addEventListener("keyup", function (e) {
        keysDown[e.keyCode] = false;
    }, false);
    interval=setInterval(UpdatePosition, 250);
}

function GetKeyPressed() {

      if (keysDown[27]) { 
        return "esc";
    } 
    if (keysDown[37]) { 
        return "left";
    } 
    if (keysDown[38]) {
        return "up";
    }
    if (keysDown[39]) { 
        return "right";
    }
 
    if (keysDown[40]) { 
        return "down";
    }
}

function UpdatePosition() {
    var x = GetKeyPressed();
    var jump_size_vertical = img_height/2;
    var jump_size_horizontal = img_width/2;

    if(x=="up")
    {
        if(spaceShip.j>c.height - c.height * 0.4 + jump_size_vertical/2)
        {
            spaceShip.j-=jump_size_vertical;
        }
    }
    if(x=="down")
    {
        if(spaceShip.j<c.height - img_height - jump_size_vertical/2)
        {
            spaceShip.j+=jump_size_vertical;
        }
    }
    if(x=="left")
    {
        if(spaceShip.i>0)
        {
            spaceShip.i-=jump_size_horizontal;
        }
    }
    if(x=="right")
    {
        if(spaceShip.i<c.width - img_width)
        {
            spaceShip.i+=jump_size_horizontal;
        }
    }
    if(x=="esc"){
        window.clearInterval(interval);
        window.alert("Game completed");

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
$(document).ready(Start);
  