function newGame(){
    $('#MyCanvas').addClass('GameCanvas');
    var c = document.getElementById("MyCanvas");
    addBackround(c);
    addGoodRocketShip(c);
}

function addBackround(c){
    var ctx = c.getContext("2d");
    ctx.fillStyle = "#FF0000";
    ctx.fillRect(0, 0, c.width, c.height);
}
function addGoodRocketShip(c){
    var ctx = c.getContext("2d");
    var img = new Image();
    img.src = 'spaceship1.png';
    $(img).on('load', function() {
        ctx.drawImage(img, 0, 0, c.width/8,c.height/8);
    });

}

$(document).ready(newGame);
  