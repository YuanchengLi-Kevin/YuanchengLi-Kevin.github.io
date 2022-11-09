window.onload = initAll;
const page = window.open('/pages/tetris.html')
var  tempGrid = [
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
];

var  stationGrid = [
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
];

var overlay = [
    `rgb(0, 255, 255)`,
    `rgb(0, 0, 255)`,

    `rgb(255, 127, 0)`,
    `rgb(255, 255, 0)`,

    `rgb(255, 0, 0)`,
    `rgb(128, 0, 128)`,
    `rgb(0, 255, 0)`,
 ];

var overLayColor = `rgb(127, 127, 127)`

var offset = 25;

var inGame = false;
var gameStarted = false;

var gameLoop;
var textOverlay = null;

var temp = null;

var score = 0;

var time = 0;
var yTime = 0;
var xTime = 0;
var waitTime = 0;

var back = 1;
var front = 0; 
var left = 0;
var right = 0;

var leftborder = false;
var rightborder = false;

var blocks = [];
class block {
    constructor(){
        this.index = this.getRandomNumber(0, this.blockOption.length)
        //console.log(this.index);
        this.list = this.blockOption[this.index]
    }
    sizeX = 2;
	sizeY = 3;
	pivotX = 5;
	pivotY = 2;
	landed = false;
	station = false;
	index;
	list = []

    blockOption = [
        [[0,0], [1,0], [-1,0], [2,0]],
        [[0,0], [1,0], [-1,0], [1,1]],
        
        [[0,0], [1,0], [-1,0], [-1,1]],
        [[0,0], [1,0], [0,1], [1,1]],
        
        
        [[0,0], [-1,0], [0,1], [1,1]],
        
        [[0,0], [1,0], [-1,0], [0,1]],
        
        [[0,0], [1,0], [0,1], [-1,1]],
    ]; 

    getRandomNumber(min, max) {
	    return Math.floor(((Math.random() * (max - min)) + min));
	} 
}
function initAll(){
    canvas = document.getElementById("myCanvas");

    ctx = canvas.getContext('2d');
    canvas.width = 300;
    canvas.height = 550;
    temp = new block();
   
    window.addEventListener("keydown", function(event) {
        if (event.code === "ArrowDown"){
            back = -1;
        } else if (event.code === "ArrowUp"){ 
            front = 1;  
        } else if (event.code === "ArrowLeft"){   
            left = -1;         
        } else if (event.code === "ArrowRight"){
            right = 1;
        }
    }, false);

    window.addEventListener("keyup", function(event) {
        if (event.code === "ArrowDown"){
            back = 0;
        } else if (event.code === "ArrowUp"){
            front = 0;
        } else if (event.code === "ArrowLeft"){
            left = 0;
        } else if (event.code === "ArrowRight"){
            right = 0;
        }
    }, false);
    //document.getElementById("gameOver").innerHTML = '<b>Game Over</b>';
    draw();
    //document.getElementById("gameOver").innerHTML = '<b>Game Over</b>';
   // setInterval(draw, 16)
}

function startGame(){
    if (inGame){
        clearInterval(gameLoop);
        inGame = false;
    }
    else if (inGame == false) {

        if (temp!= null){
            temp.pivotY = 2;
            temp.pivotX = 5;
        }
        else if (temp == null) {
            temp = new block();
        }

        //temp = new block();
        for (let x =0; x<10; x++) {
            for (let y =0; y< 20; y++) {
                tempGrid[x][y] = 0;
            }
        }
        for (let x =0; x<10; x++) {
            for (let y =0; y< 20; y++) {
                stationGrid[x][y] = 0;
            }
        }
        inGame = true;
        gameStarted = true;

        gameLoop = setInterval(draw,16);

        score = 0;
        document.getElementById("scoreLabel").innerHTML = "Score: " + score;
        //if (textOverlay != null){
        clearInterval(textOverlay);
        textOverlay = null;
       // }
        document.getElementById("playButton").disabled = true;
        //document.getElementById("gameOver").innerHTML = '<b>Game Over</b>';
        
    }
    
};


function show(){
   //document.getElementById("gameOver").innerHTML = "Game Over";
   ctx.font = "40px monospace";
   ctx.fillText("Game Over", 50, 220);
}

function draw(){
    leftborder = false;
    rightborder = false;
    //console.log(left);
    yTime += 1;
    xTime += 1;
    time++;
   // ctx.clearRect(0,0,canvas.width, canvas.height);
   // ctx.beginPath();
   // ctx.fillStyle = 'red';
   // ctx.blocks(5,5)
   // ctx.fillRect(5,5,5,5);
   // ctx.fill();
    
    for (let x =0; x<10; x++) {
        for (let y =0; y< 20; y++) {
            tempGrid[x][y] = 0;
        }
    }

    let amt = makeOverlay();

    if (temp.landed == false) {
        for (let x = 0; x < temp.list.length; x++) {
            let i = temp.list[x];

            let tempx = Number(temp.pivotX) + Number(i[0]);
            let tempy = Number(temp.pivotY) + Number(i[1]);
            //console.log(i);
            if(tempy>19) {
                //System.out.println("landed here");
                temp.landed = true;
            }
            
            else if(tempx >=1) {
                //console.log(tempx);
                if (stationGrid[tempx-1][tempy] > 0){
                    if (temp.pivotY == 2){
                        console.log("Game over");
                        inGame = false;
                       // ctx.beginPath();
                       //document.getElementById("gameOver").innerHTML = '<b>Game Over</b>';
                        document.getElementById("playButton").disabled = false;
                        clearInterval(gameLoop);
                        //show();
                        if(textOverlay == null){
                            textOverlay = setInterval(show, 500);
                        }
                        
                    
                    }
                    else{
                        temp.landed = true;	
                    }
                    
                }
            }
            
            if (tempx >= 10) {
                rightborder = true;
            }
            if (tempx < 2) {
               leftborder = true;
            }
            
            if (tempx < 10) {
                if (stationGrid[tempx][tempy-1] >0) {
                    rightborder = true;
                }
            }
            
            if( tempx >=2) {
                if(stationGrid[tempx-2][tempy-1] > 0 ) {
                    leftborder = true;
                }
            }
            
            tempGrid[tempx-1][tempy-1] = temp.index + 1;
            //console.log(tempx + ", " + tempy);
            //console.log(tempGrid[tempx-1][tempy-1]);
        }
       // console.log(tempGrid);
        canSpawn = false;
    }
    else if (temp.landed == true){
        //System.out.println("landed");
        
        if (waitTime > 40) {
            for (let x = 0; x < temp.list.length; x++) {
                let i = temp.list[x];

                let tempx = temp.pivotX + i[0];
                let tempy = temp.pivotY + i[1];
                stationGrid[tempx-1][tempy-1] = temp.index +1;
                
            }
            temp.station = true;
            canSpawn = true;
            waitTime = 0;
        }
        else {
            waitTime ++;
            for (let x = 0; x < temp.list.length; x++) {
                let i = temp.list[x];
                let tempx = temp.pivotX + i[0];
                let tempy = temp.pivotY + i[1];
                
                if (tempx >= 10) {
                    rightborder = true;
                }
                if (tempx < 2) {
                    leftborder = true;
                }
                
                if (tempx < 10) {
                    if (stationGrid[tempx][tempy-1] >0) {
                        rightborder = true;
                    }
                }
                
                if( tempx >=2) {
                    if(stationGrid[tempx-2][tempy-1] > 0 ) {
                        leftborder = true;
                    }
                }
                if(amt != temp.pivotY) {
                    temp.landed = false;
                    waitTime = 0;
                }
                
                tempGrid[tempx-1][tempy-1] = temp.index +1;
            }
        }
    }
    //console.log(tempGrid);
    
    if(temp.landed == false) {
        //System.out.println("move while not landed");
        if (back <0 ) {
            temp.pivotY += (1);
        }
        else if( yTime > 30) {
            yTime = 0;
            temp.pivotY += (1);
        }

        if (xTime > 2) {
            xTime = 0;
            if (leftborder && rightborder) {
					
            }
            else if (leftborder) {
                temp.pivotX += (1*(0+right));
            }
            else if (rightborder) {
                temp.pivotX += (1*(left+0));
            }
            else {
                temp.pivotX += (1*(left+right));
            }
            
        }
        if (time > 7) {
            if (front >0){
                time = 0;
                if (!leftborder && !rightborder) {
                    console.log("rotate");
                    rotatePeice(temp);
                }
            }
        }
    }
    else if (temp.landed== true && temp.station == false) {
        //System.out.println("move while landed");
        if(xTime >2) {
            xTime = 0;
            if (leftborder && rightborder) {
                
            }
            else if (leftborder) {
                temp.pivotX += (1*(0+right));
            }
            else if (rightborder) {
                temp.pivotX += (1*(left+0));
            }
            else {
                temp.pivotX += (1*(left+right));
            }
        }
        
    }
       
    
    for (let x = 0; x <10; x++) {
        for (let y =0; y<20; y++) {
            //console.log(tempGrid);

            if(tempGrid[x][y] == 0) {
                
                ctx.fillStyle = 'black'
                ctx.fillRect(offset + (25*x), (25*y), 25, 25);
            }
            else if (tempGrid[x][y]>=8) {
                
                ctx.fillStyle = overLayColor
                ctx.fillRect(offset + (25*x), (25*y), 25, 25);
            }
            else if (Number(tempGrid[x][y]) <8) {	
                
               ctx.fillStyle = (overlay[temp.index]);
                ctx.fillRect(offset + (25*x), (25*y), 25, 25);
            }
            
        }
    }

    for (let x = 0; x < 10; x++) {
        for (let y =0; y<20; y++) {
            if(stationGrid[x][y] == 0) {
                
            }
            else {
                
                ctx.fillStyle = overlay[(stationGrid[x][y])-1];
                ctx.fillRect(offset + (25*x), (25*y), 25, 25);
            }
        }
    }
    
    for (let x =0; x<=10; x++) {
        for (let y =0; y< 20; y++) {
            ctx.fillStyle = 'white';
            ctx.fillRect(offset + (x*25), 22 + (y*25), 2, 2);
        }
    }
        
    for (let count = 0; count < 20; count++) {
        let fullRow = true;
        
        for (let x = 0; x < 10; x++) {
            if(stationGrid[x][count] == 0) {
                fullRow = false;
            }
        }
        if (fullRow) {
            score+= 10;
            document.getElementById("scoreLabel").innerHTML = "Score: " + score;		
            for (let x = 0; x < 10; x++) {
                for(let y = count; y>0; y--) {
                    stationGrid[x][y] = stationGrid[x][y-1];
                    
                }
            }
        }
    }

    if (canSpawn) {
        temp = new block();
    }

    if (gameStarted == true && inGame == false){
        //document.getElementById("gameOver").innerHTML = '<b>Game Over</b>';
        //setInterval(show, 1000);
        console.log("Game over message");
    }
    
}

function makeOverlay() {
    let amt = temp.pivotY;
    outerloop:
    for(let i = temp.pivotY; i<=(20); i++) {
        for (let x = 0; x < temp.list.length; x++) {
            let z = temp.list[x];
            
            let tempx = temp.pivotX + z[0];
            let tempy = i + z[1];
            //System.out.println(tempy);
            if(tempx >=1 && tempy<=19 && stationGrid[tempx-1][tempy] > 0) {
                amt = i;
                //System.out.println("hit other piece");
                break outerloop;
                //System.out.println("hit other piece");
            }
            else if (tempy > 19){
                amt = i;
                //System.out.println("hit ground");
                break outerloop;
            }
        }
    }
    
    if( amt != temp.pivotY) {
        for (let x = 0; x < temp.list.length; x++) {
            let z = temp.list[x];
            //console.log(z);
            let tempx = temp.pivotX + z[0];
            let tempy = amt + z[1];
            if(tempGrid[tempx-1][tempy-1] ==0 ) {
                tempGrid[tempx-1][tempy-1] = temp.index +8;
                
            }
        }
    }
    return amt;
}

function rotatePeice(current) {
		
    for (let index = 0; index < current.list.length; index++) {
        let i = current.list[index];
        let x = i[0];
        let y = i[1];
        i[0] =  Math.round((x * Math.cos(Math.PI/2)) - (y * Math.sin(Math.PI/2)));
        i[1] =  Math.round( (x * Math.sin(Math.PI/2)) + (y * Math.cos(Math.PI/2)) );	
        
    }
            
}
