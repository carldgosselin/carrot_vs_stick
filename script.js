//* --- session storage variables --- */

//sessionStorage.setItem("changeTool", "images/woodTrans4.png");
sessionStorage.setItem("changeTool", "images/carrotTrans3.png");
sessionStorage.scoreCounter = 1;
sessionStorage.acrossFinishLine = 1;
sessionStorage.captureCompletedTime = 0;
sessionStorage.randomMovementSequence = 0;
sessionStorage.messageType = 1;
//sessionStorage.setItem("stickmanSpritePage", "images/stickmanSpriteStick.png");
sessionStorage.setItem("stickmanSpritePage", "images/stickmanSpriteCarrot.png");

// -------------------------------------------------------------

// inner variables
var canvas, ctx;

// variables for rounded corners - canvas
//var rectX = 380;
//var rectY = 600;
//var cornerRadius = 50;

var backgroundImage;
var iBgShiftX = 100;
var dragon;
var dragonW = 75; // dragon width
var dragonH = 70; // dragon height
var iSprPos = 0; // initial sprite frame
var iSprDir = 0; // initial dragon direction
var dragonSound; // dragon sound
var wingsSound; // wings sound
//var bMouseDown = false; // mouse down state
var iLastMouseX = 600;
var iLastMouseY = 200;

var imageCarrotOrStick;
var imageCarrotOrStickW = 35;
var imageCarrotOrStickH = 70;

// Draw people across the finish line
var keener;
var keenerW = 35;
var keenerH = 70;
var secondPerson;
var secondPersonW = 35;
var secondPersonH = 70;
var thirdPerson;
var thirdPersonW = 35;
var thirdPersonH = 70;
var fourthperson;
var fourthPersonW = 35;
var fourthPersonH = 70;

var seconds = null; // show elapsed time
var ticker = null;  // show elapsed time

var forceField = 100;  //force field around dragon

var pretty; // timer display

var actualCompletedTime = 9999;

var oDragonImage;

// -------------------------------------------------------------

// objects :
function Dragon(x, y, w, h, image) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.image = image;
    //this.bDrag = false;
}
// -------------------------------------------------------------

// draw functions :
function clear() { // clear canvas function
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}

function drawScene() { // main drawScene function
    clear(); // clear canvas

    // draw background
    /*
    iBgShiftX -= 4;
    if (iBgShiftX <= 0) {
        iBgShiftX = 1045;
    }*/
    //ctx.drawImage(backgroundImage, 0 + iBgShiftX, 0, 1000, 940, 0, 0, 1000, 600);
    ctx.drawImage(backgroundImage, 0, 0);

    // update sprite positions
    iSprPos++;
    if (iSprPos >= 9) {
        iSprPos = 0;
    }

    // If cursor is a carrot, move dragon closer to the cursor/ carrot
    if (sessionStorage.getItem("changeTool") == "images/carrotTrans3.png") {

        // if mouse X < dragon x and mouse Y < dragon.y.  Mouse position 1, dragon position 3
        if (iLastMouseX < dragon.x && iLastMouseY < dragon.y &&
            iLastMouseX > dragon.x - forceField && iLastMouseY > dragon.y - forceField) {
            
            if (dragon.x < 40) {
                dragon.x = 200;    
            }
            else if (dragon.y < 40) {
                dragon.y = 200;
            }
            else {

                dragon.x -= 5;
                dragon.y -= 5;
            }
        }

        // 2 - if mouse X < dragon.x and mouse Y > dragon.y.  Mouse position 4, dragon position 2 
        if (iLastMouseX < dragon.x && iLastMouseY > dragon.y &&
            iLastMouseX > dragon.x - forceField && iLastMouseY < dragon.y + forceField) {

            if (dragon.x < 40){
                dragon.x = 200;   
            }
            else if (dragon.y > 360){
                dragon.y = 200;   
            }
            else {
            dragon.x -= 5;
            dragon.y += 5;
            }
        }
        
        // 3 - if mouse X > dragon.x and mouse Y > dragon.y.  Mouse position 3, dragon position 1
        if (iLastMouseX > dragon.x && iLastMouseY > dragon.y &&
            iLastMouseX < dragon.x + forceField && iLastMouseY < dragon.y + forceField) {

            dragon.x += 5;
            dragon.y += 5;
            //dragon.y += randomFromInterval(-25,25);

            if (dragon.y > 360 || dragon.y < 40) {

                dragon.y = 200;
            }
        }

        /*
        if (dragon.y > 360){

            dragon.y = 250;
            //dragon.x -=100;
        }*/
        
        // 4 - if mouse X > dragon.x and mouse Y < dragon.y.  Mouse position 2, dragon position 4
        if (iLastMouseX > dragon.x && iLastMouseY < dragon.y &&
            iLastMouseX < dragon.x + forceField && iLastMouseY > dragon.y - forceField) {
            
            dragon.x += 5;
            dragon.y -= 5;
            //dragon.y -= randomFromInterval(-25,25);

            if (dragon.y < 40 || dragon.y > 360) {

            dragon.y = 200;
            //dragon.x = 150;
            }
        }
    }

    // If cursor is a stick, move dragon away from cursor/ stick
    if (sessionStorage.getItem("changeTool") == "images/woodTrans4.png") {

        // if mouse X < dragon x and mouse Y < dragon.y.  Mouse position 1, dragon position 3
        if (iLastMouseX < dragon.x && iLastMouseY < dragon.y &&
            iLastMouseX > dragon.x - forceField && iLastMouseY > dragon.y - forceField) {
            
            dragon.x += 5;
            dragon.y += 5;
        }

        if (dragon.y > 360){

            dragon.y -=100;
            dragon.x -=100;
        }

        // 2 - if mouse X < dragon.x and mouse Y > dragon.y.  Mouse position 4, dragon position 2 
        if (iLastMouseX < dragon.x && iLastMouseY > dragon.y &&
            iLastMouseX > dragon.x - forceField && iLastMouseY < dragon.y + forceField) {

            dragon.x += 5;
            dragon.y -= 5;
        }

        if (dragon.y < 40) {

            dragon.y +=100;
            dragon.x -=100;
        }
        
        // 3 - if mouse X > dragon.x and mouse Y > dragon.y.  Mouse position 3, dragon position 1
        if (iLastMouseX > dragon.x && iLastMouseY > dragon.y &&
            iLastMouseX < dragon.x + forceField && iLastMouseY < dragon.y + forceField) {

            if (dragon.x < 40){
                dragon.x += 100;    
            }
            else if (dragon.y < 40){
                dragon.y += 100;
            }
            else {
            dragon.x -= 5;
            dragon.y -= 5;
            }
        }
        
        // 4 - if mouse X > dragon.x and mouse Y < dragon.y.  Mouse position 2, dragon position 4
        if (iLastMouseX > dragon.x && iLastMouseY < dragon.y &&
            iLastMouseX < dragon.x + forceField && iLastMouseY > dragon.y - forceField) {
            
            if (dragon.x < 40){
                dragon.x += 100;   
            }
            else if (dragon.y > 360){
                dragon.y -= 100;   
            }
            else {
            dragon.x -= 5;
            dragon.y += 5;
            }
        }
    }

    // When crossing the finish line
    if (dragon.x >= 680){

        dragon.x = 60;
        dragon.y = 200;
        sessionStorage.scoreCounter = Number(sessionStorage.scoreCounter)+1;
        sessionStorage.acrossFinishLine = Number(sessionStorage.acrossFinishLine)+1;
        updateScoreboard ();

    }

    // draw dragon
    ctx.drawImage(dragon.image, iSprPos*dragon.w, iSprDir*dragon.h, dragon.w, dragon.h, dragon.x - dragon.w/2, dragon.y - dragon.h/2, dragon.w, dragon.h);

    // draw image following the cursor
    ctx.drawImage(imageCarrotOrStick, iLastMouseX, iLastMouseY, imageCarrotOrStickW, imageCarrotOrStickH);

    // draw the keener who has already crossed the finish line
    ctx.drawImage(keener, 670, 320, keenerW, keenerH);

    
    // draw second character across the finish line
    if (sessionStorage.acrossFinishLine >= 2) {

        ctx.drawImage(secondPerson, 720, 310, secondPersonW, secondPersonH);
    }
    if (sessionStorage.acrossFinishLine >= 3) {

        ctx.drawImage(thirdPerson, 690, 250, thirdPersonW, thirdPersonH);
    }
    if (sessionStorage.acrossFinishLine >= 4) {
     
        ctx.drawImage(fourthPerson, 760, 290, fourthPersonW, fourthPersonH);

        // Capture completed time
        sessionStorage.captureCompletedTime = Number(sessionStorage.captureCompletedTime)+1;
        displayCompletedTime(sessionStorage.captureCompletedTime, pretty); // pretty -> actual time data

        document.getElementById("timer").style.display = 'none';
        seconds = -1;
        
        document.getElementById("scoreKeeping").style.display = 'none';
        document.getElementById("reloadPage").style.display = 'block';
        
        // Display time
        //ctx.fillStyle = "black";
        //ctx.font = "bold 16px Arial";
        //ctx.fillText("Time: " + actualCompletedTime, 200, 220);
        
        
        // Message Type for end of game
        if (sessionStorage.messageType == 1) {
            
            // Display time
            ctx.fillStyle = "black";
            ctx.font = "bold 16px Arial";
            ctx.fillText("Time: " + actualCompletedTime, 200, 220);

            ctx.fillStyle = "black";
            ctx.font = "bold 16px Arial";
            ctx.fillText("Well done. You almost beat my grandmother's time.", 200, 260);

            ctx.fillStyle = "black";
            ctx.font = "bold 16px Arial";
            ctx.fillText("Play again?", 200, 300);
        }
        else if (sessionStorage.messageType == 2) {
            
            // Display time
            ctx.fillStyle = "black";
            ctx.font = "bold 16px Arial";
            ctx.fillText("Time: " + actualCompletedTime, 200, 220);

            ctx.fillStyle = "black";
            ctx.font = "bold 16px Arial";
            ctx.fillText("Good job. But my four year old just chuckled at your time.", 200, 260);

            ctx.fillStyle = "black";
            ctx.font = "bold 16px Arial";
            ctx.fillText("Play again?", 200, 300);
        }
        else if (sessionStorage.messageType >= 3) {
            
            // Display time
            ctx.fillStyle = "black";
            ctx.font = "bold 16px Arial";
            ctx.fillText("Time: " + actualCompletedTime, 300, 220);

            ctx.fillStyle = "black";
            ctx.font = "bold 16px Arial";
            ctx.fillText("You are awesome!", 300, 260);
        }
    }

    // Show cursor position
    //document.getElementById("showCursorPosition").innerHTML = "Mouse Cursor X: " + iLastMouseX + " Y: " + iLastMouseY;
    //document.getElementById("showDragonPosition").innerHTML = "Dragon X: " + dragon.x + " Y: " + dragon.y;
    //document.getElementById("showForceField").innerHTML = "forceField: " + forceField;
    //document.getElementById("showChangeTool").innerHTML = "changeTool: " + sessionStorage.getItem("changeTool");

}

function randomFromInterval(from,to)
{
    return Math.floor(Math.random()*(to-from+1)+from);
}

function reloadCanvas () {

    document.getElementById("reloadPage").style.display = 'none';
    sessionStorage.scoreCounter = 1;
    sessionStorage.acrossFinishLine = 1;
    sessionStorage.captureCompletedTime = 0;
    clear();

    document.getElementById("scoreKeeping2").src = "images/YESGray2.png";
    document.getElementById("scoreKeeping3").src = "images/YESGray2.png";
    document.getElementById("scoreKeeping4").src = "images/YESGray2.png";
    document.getElementById("scoreKeeping").style.display = 'block';
    document.getElementById("timer").style.display = 'block';

    if (sessionStorage.getItem("changeTool") == "images/carrotTrans3.png") {

        changeToStick();
    }
    else {

        changeToCarrot();
    }

    // Change message at end of game
    sessionStorage.messageType = Number(sessionStorage.messageType)+1;

    /*
    if (sessionStorage.messageType == 1) {

        sessionStorage.messageType = 2;
    }
    else if (sessionStorage.messageType == 2) {

        sessionStorage.messageType = 3;
    }
    else if (sessionStorage == 3) {

        sessionStorage.messageType = 1;

    }
    */

}  

// display completed time on canvas after fourth character crossed the finish line
function displayCompletedTime (completedTimeIndicator, actualTime) {

    if (completedTimeIndicator == 1) {

        actualCompletedTime = actualTime;
    }

}


// show elapsed time
//seconds = null;
//ticker = null;

function startTimer( )  {
    seconds = -1;
    ticker = setInterval("tick( )", 1000);
    tick( );
}

function tick( )  {
    ++seconds;
    var secs = seconds;
    var hrs = Math.floor( secs / 3600 );
    secs %= 3600;
    var mns = Math.floor( secs / 60 );
    secs %= 60;
    pretty = ( hrs < 10 ? "0" : "" ) + hrs
               + ":" + ( mns < 10 ? "0" : "" ) + mns
               + ":" + ( secs < 10 ? "0" : "" ) + secs;
    document.getElementById("timer").innerHTML = pretty;
}
// -------------------------------------------------------------

// Change image following cursor to a stick

function changeToStick () {

     // Update sessionStorage item - changeTool
    sessionStorage.setItem("changeTool", "images/woodTrans4.png");
    imageCarrotOrStick.src = sessionStorage.getItem("changeTool");

    // Update sessionStorage item - stickmanSpritePage
    sessionStorage.setItem("stickmanSpritePage", "images/stickmanSpriteStick.png");
    oDragonImage.src = sessionStorage.getItem("stickmanSpritePage");
    dragon.image = oDragonImage;
    //dragon.image = sessionStorage.getItem("stickmanSpritePage");
}
// -------------------------------------------------------------

function changeToCarrot () {
    
    // Update sessionStorage item - changeTool
    sessionStorage.setItem("changeTool", "images/carrotTrans3.png");
    imageCarrotOrStick.src = sessionStorage.getItem("changeTool");

    // Update sessionStorage item - stickmanSpritePage
    sessionStorage.setItem("stickmanSpritePage", "images/stickmanSpriteCarrot.png");
    oDragonImage.src = sessionStorage.getItem("stickmanSpritePage");
    dragon.image = oDragonImage;
    //dragon.image = sessionStorage.getItem("stickmanSpritePage");

}
// -------------------------------------------------------------

function backToCarldgosselin() {

    window.location.href = 'http://carldgosselin.com';

}
// -------------------------------------------------------------

// Update scoreboard

function updateScoreboard () {

        if (sessionStorage.scoreCounter == 2) {
            document.getElementById("scoreKeeping2").src = "images/YES.png";
        }
        if (sessionStorage.scoreCounter == 3) {

            document.getElementById("scoreKeeping3").src = "images/YES.png";
        }
        if (sessionStorage.scoreCounter == 4) {

            document.getElementById("scoreKeeping4").src = "images/YES.png";
        } 
}

// -------------------------------------------------------------

// initialization
$(function(){
    canvas = document.getElementById('scene');
    ctx = canvas.getContext('2d');

    var width = canvas.width;
    var height = canvas.height;

    // load background image
    backgroundImage = new Image();
    backgroundImage.src = 'images/arrowv6.png';
    backgroundImage.onload = function() {
    }
    backgroundImage.onerror = function() {
        console.log('Error loading the background image.');
    }

    // load CarrotOrStick image to follow cursor
    imageCarrotOrStick = new Image();
    imageCarrotOrStick.src = sessionStorage.getItem("changeTool");
    imageCarrotOrStick.onload = function() {
    }
    imageCarrotOrStick.onerror = function() {
        console.log('Error loading the image that will follow the cursor.');
    }

    // load keener character - already crossed the finish line
    keener = new Image();
    keener.src = 'images/YES.png';
    keener.onload = function() {
    }
    keener.onerror = function() {
        console.log('Error loading the keener image.');
    }

    // load secondPerson across the finish line
    secondPerson = new Image();
    secondPerson.src = 'images/YES.png';
    secondPerson.onload = function() {
    }
    secondPerson.onerror = function() {
        console.log('Error loading the secondPerson image.');
    }

    // load thirdPerson across the finish line
    thirdPerson = new Image();
    thirdPerson.src = 'images/YES.png';
    thirdPerson.onload = function() {
    }
    thirdPerson.onerror = function() {
        console.log('Error loading the thirdPerson image.');
    }

    // load fourthPerson across the finish line
    fourthPerson = new Image();
    fourthPerson.src = 'images/YES.png';
    fourthPerson.onload = function() {
    }
    fourthPerson.onerror = function() {
        console.log('Error loading the fourthPerson image.');
    }

    /*
    // 'Dragon' music init
    dragonSound = new Audio('media/dragon.wav');
    dragonSound.volume = 0.9;

    // 'Wings' music init
    wingsSound = new Audio('media/wings.wav');
    wingsSound.volume = 0.9;
    wingsSound.addEventListener('ended', function() { // looping wings sound
        this.currentTime = 0;
        this.play();
    }, false);
    wingsSound.play();
    */

    // initialization of dragon
    oDragonImage = new Image();
    oDragonImage.src = sessionStorage.getItem("stickmanSpritePage");
    //oDragonImage.src = 'images/stickmanSpritev1.png';
    //oDragonImage.src = 'images/bouncingBallsv1test.png';
    //oDragonImage.src = 'images/dragon.gif';
    //oDragonImage.src = 'images/StickmanTest1.gif';
    oDragonImage.onload = function() {
    }
    dragon = new Dragon(100, 100, dragonW, dragonH, oDragonImage);

    /*
    $('#scene').mousedown(function(e) { // binding mousedown event (for dragging)
        var mouseX = e.layerX || 0;
        var mouseY = e.layerY || 0;
        if(e.originalEvent.layerX) { // changes for jquery 1.7
            mouseX = e.originalEvent.layerX;
            mouseY = e.originalEvent.layerY;
        }

        bMouseDown = true;

        if (mouseX > dragon.x- dragon.w/2 && mouseX < dragon.x- dragon.w/2 +dragon.w &&
            mouseY > dragon.y- dragon.h/2 && mouseY < dragon.y-dragon.h/2 +dragon.h) {

            //alert ("inside dragging if statement");

            dragon.bDrag = true;
            dragon.x = mouseX;
            dragon.y = mouseY;
        }
    });
    */

    $('#scene').mousemove(function(e) { // binding mousemove event
        var mouseX = e.layerX || 0;
        var mouseY = e.layerY || 0;
        if(e.originalEvent.layerX) { // changes for jquery 1.7
            mouseX = e.originalEvent.layerX;
            mouseY = e.originalEvent.layerY;
        }

        // saving last coordinates
        iLastMouseX = mouseX;
        iLastMouseY = mouseY;

        /*
        // perform dragon dragging
        if (dragon.bDrag) {
            dragon.x = mouseX;
            dragon.y = mouseY;
            //alert ("inside another dragging if statement");
        }
        */

        // change direction of dragon (depends on mouse position)
        if (mouseX > dragon.x && Math.abs(mouseY-dragon.y) < dragon.w/2) {
            iSprDir = 0;
        } else if (mouseX < dragon.x && Math.abs(mouseY-dragon.y) < dragon.w/2) {
            iSprDir = 4;
        } else if (mouseY > dragon.y && Math.abs(mouseX-dragon.x) < dragon.h/2) {
            iSprDir = 2;
        } else if (mouseY < dragon.y && Math.abs(mouseX-dragon.x) < dragon.h/2) {
            iSprDir = 6;
        } else if (mouseY < dragon.y && mouseX < dragon.x) {
            iSprDir = 5;
        } else if (mouseY < dragon.y && mouseX > dragon.x) {
            iSprDir = 7;
        } else if (mouseY > dragon.y && mouseX < dragon.x) {
            iSprDir = 3;
        } else if (mouseY > dragon.y && mouseX > dragon.x) {
            iSprDir = 1;
        }

    });

    /*
    $('#scene').mouseup(function(e) { // binding mouseup event
        dragon.bDrag = false;
        bMouseDown = false;

        // play dragon sound
        //dragonSound.currentTime = 0;
        //dragonSound.play();

    });
    */

    setInterval(drawScene, 60); // loop drawScene
    //setInterval(drawScene, 30); // loop drawScene

    //show elapsed time
    startTimer( );

});