window.onload = initAll;

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

var temp;

var blocks = [];
class block {
    constructor(){
        this.index = this.getRandomNumber(0, this.blockOption.length)
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
    canvas.width = 800;
    canvas.height = 800;
    temp = new block();
    setInterval(draw, 100)
}

function draw(){
    ctx.clearRect(0,0,canvas.width, canvas.height);
    ctx.beginPath();
    ctx.fillStyle = 'red';
   // ctx.blocks(5,5)
    ctx.fillRect(5,5,5,5);
    ctx.fill();

    for (let x =0; x<=10; x++) {
        for (let y =0; y< 20; y++) {
            //g.setColor(new Color(221, 222, 230));
            ctx.fillRect(328+(x*25), 22 + (y*25), 2, 2);
        }
    }

    if (temp.landed == false) {
			
        for (let i in temp.list) {
            
            let tempx = Number(temp.pivotX) + Number(i[0]);
            let tempy = Number(temp.pivotY) + Number(i[1]);
            
            if(tempy>19) {
                //System.out.println("landed here");
                temp.landed = true;
            }
            
            else if(tempx >=1) {
                //console.log(tempx);
                if (stationGrid[tempx-1][1] > 0){
                    temp.landed = true;	
                }
            }
            
            if (tempx >= 10) {
                //rightborder = true;
            }
            if (tempx < 2) {
               // leftborder = true;
            }
            
            if (tempx < 10) {
                if (stationGrid[tempx][tempy-1] >0) {
                    //rightborder = true;
                }
            }
            
            if( tempx >=2) {
                if(stationGrid[tempx-2][tempy-1] > 0 ) {
                    //leftborder = true;
                }
            }
            
            tempGrid[tempx-1][tempy-1] = 5;
            //console.log(tempy-1);
            //console.log(tempGrid[tempx-1][tempy-1]);
        }
        canSpawn = false;
    }

    for (let x = 0; x <=10; x++) {
        for (let y =0; y<=20; y++) {

            console.log(tempGrid[x][y]);

            if(Number(tempGrid[x][y]) == 0) {
                //g.setColor(Color.BLACK);
                ctx.fillRect(330+(25*x), (25*y), 25, 25);
            }
            if (tempGrid[x][y]>=8) {
                //g.setColor(overlay[temp.index]);
                //g.setColor(Color.WHITE);
                //ctx.fillRect(330+(25*x), (25*y), 25, 25);
            }
            if (Number(tempGrid[x][y]) <8) {	
                //console.log("here");			
                //g.setColor(colors[temp.index]);
               // ctx.fillStyle = 'blue'
                //ctx.fillRect(330+(25*x), (25*y), 25, 25);
            }
            
        }
    }
}