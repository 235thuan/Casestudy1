let myGamePiece;
let myObstacles = [];
let myObstacles1 = [];
let myObstacles2 = [];
let myScore;
let value_Height = 600;
let value_Width = 1000;
let value_Score_width = value_Width * 0.8;
let value_Score_height = value_Height / 12;
let value_Obstacle1_width = 30;
let value_Obstacle1_height = 30;
let value_Obstacle2_width = 40;
let value_Obstacles2_height = 40;
let value_Obstacles3_width = 40;
let value_Obstacles3_height = 40;
let value_Game_width = 100;
let value_game_height = 100;
let size= Math.random()*50;

let Explosion = function () {
    let self = this;
    //có 10 ảnh nổ nên index=10
    let index = 10;
    this.size = 100;
    this.setPosition = function (x, y) {
        this.x = x;
        this.y = y;
    };
    this.start = function () {
        if (index >= 0) {
            let img = new Image();
            let x = this.x;
            let y = this.y;
            let width = this.size;
            let height = this.size;
            img.src = 'explosive' + index + '.png';
            ctx.shadowColor = 'red';
            ctx.shadowBlur = 60;
            ctx.drawImage(img, x, y, width, height);
            setTimeout(function () {
                ctx.clearRect(0, 0, width, height);
                index--;
                self.start();
            }, 100);
        }
    }
}




function startGame() {
    docReady();
    myGamePiece = new component(value_game_height, value_Game_width, 200, 200);
    myScore = new component("30px", "Consolas", value_Score_width, value_Score_height, "text", "white");
    myGameArea.start();
}

let myGameArea = {
    canvas: document.createElement("canvas"),
    start: function () {
        this.canvas.width = value_Width;
        this.canvas.height = value_Height;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.frameNo = 0;
        this.interval = setInterval(updateGameArea, 20);
    },
    clear: function () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    stop: function () {
        clearInterval(this.interval);
    }
};

function component(width, height, x, y, type, color) {
    this.type = type;
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;
    this.image = new Image();
    this.image.src = 'ship.png';
    this.image2 = new Image();
    this.image2.src = 'planet9-removebg.png';
    this.image3 = new Image();
    this.image3.src = 'explosive3.png';
    this.image4 = new Image();
    this.image4.src = 'explosive9.png';
    this.x = x;
    this.y = y;
    this.angle = 0;
    this.hitBottom = function () {
        let rockbottom = myGameArea.canvas.height - this.height;
        if (this.y > rockbottom) {
            this.y = rockbottom;
        }
    };
    this.hitTop = function () {
        let rockTop = 0;
        if (this.y < rockTop) {
            this.y = rockTop;
        }
    };
    this.hitLeft = function () {
        let rockleft = 0;
        if (this.x < rockleft) {
            this.x = rockleft
        }
    };
    this.hitRight = function () {
        let rockRight = value_Width - this.width;
        if (this.x > rockRight) {
            this.x = rockRight;
        }
    };
    this.update = function () {

        ctx = myGameArea.context;
        if (this.type === "text") {
            ctx.font = this.width + " " + this.height;
            ctx.fillStyle = color;
            ctx.fillText(this.text, this.x, this.y);
        } else {
            let x = this.x;
            let y = this.y;
            let width = this.width;
            let height = this.height;
            ctx.shadowBlur = 20;
            ctx.shadowColor = "yellow";
            ctx.drawImage(this.image, x, y, width, height);


        }
    };
    this.update4 = function () {
        let x = this.x;
        let y = this.y;
        let width = this.width;
        let height = this.height;
        ctx.shadowBlur = 10;
        ctx.shadowColor = "white";
        ctx.drawImage(this.image4, x, y, width, height);
    };
    this.update2 = function () {

        ctx = myGameArea.context;
        if (this.type === "text") {
            ctx.font = this.width + " " + this.height;
            ctx.fillStyle = color;
            ctx.fillText(this.text, this.x, this.y);
        } else {

            let width = this.width;
            let height = this.height;
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.angle);
            ctx.shadowBlur = 10;
            ctx.shadowColor = "blue";
            ctx.drawImage(this.image2, width / 2, height / 2, width, height);
            ctx.restore();

        }
    };
    this.update3 = function () {
        let x = this.x;
        let y = this.y;
        let width = this.width;
        let height = this.height;
        ctx.shadowBlur = 10;
        ctx.shadowColor = "white";
        ctx.drawImage(this.image3, x, y, width, height);
        };

    this.newPos4 = function () {
        this.x += this.speedX;
        this.y += this.speedY;
    };
    this.newPos2 = function () {
        this.x += this.speedX;
        this.y += this.speedY;
    };
    this.newPos3 = function () {
        this.x += -this.speedX;
        this.y += this.speedY;

    };
    this.newPos = function () {
        this.x += this.speedX;
        this.y += this.speedY;
        this.hitTop();
        this.hitBottom();
        this.hitLeft();
        this.hitRight()
    };
    this.crashWith = function (otherobj) {
        let myleft = this.x;
        let myright = this.x + (this.width);
        let mytop = this.y;
        let mybottom = this.y + (this.height);

        let otherleft = otherobj.x;
        let otherright = otherobj.x + (otherobj.width);
        let othertop = otherobj.y;
        let otherbottom = otherobj.y + (otherobj.height);

        let crash = true;


        if ((mybottom < othertop) || (mytop > otherbottom) || (myright < otherleft) || (myleft > otherright)) {
            crash = false;
        }
        return crash;
    }
}

function updateGameArea() {

    for (let i = 0; i < myObstacles.length; i += 1) {
        if (myGamePiece.crashWith(myObstacles[i]) || myGamePiece.crashWith(myObstacles1[i])||myGamePiece.crashWith((myObstacles2[i]))) {
            myGameArea.stop();
            return;
        }
    }

    myGameArea.clear();
    myGameArea.frameNo += 1;
    let randomHeight1 = Math.random() * value_Height;
    let randomHeight = randomNumber(0.1, 1) * value_Width;
    let randomWidth = randomNumber(0.1, 1) * value_Width;
    if (myGameArea.frameNo === 1 || everyinterval(60)) {
        myObstacles.push(new component(value_Obstacle1_width, value_Obstacle1_height, randomWidth, randomHeight));
        myObstacles1.push(new component(value_Obstacle2_width, value_Obstacles2_height, randomWidth, randomHeight1));
        myObstacles2.push(new component(value_Obstacles3_width, value_Obstacles3_height, randomWidth, randomHeight1));
    }
    for (let i = 0; i < myObstacles.length; i += 1) {
        myObstacles[i].speedX = 1;
        myObstacles[i].newPos2();
        myObstacles[i].update2();
        myObstacles[i].angle += 10*Math.PI / 180;
    }
    for (let i = 0; i < myObstacles1.length; i += 1) {
        myObstacles1[i].speedX = -1;
        myObstacles1[i].newPos3();
        myObstacles1[i].update3();
    }
    for (let i = 0; i < myObstacles2.length; i += 1) {
        myObstacles2[i].speedX = -1;
        myObstacles2[i].newPos4();
        myObstacles2[i].update4();

    }
    myScore.text = "SCORE: " + Math.floor(myGameArea.frameNo * 0.1);
    myScore.update();
    myGamePiece.newPos();
    myGamePiece.update();
}

function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function everyinterval(n) {
    if ((myGameArea.frameNo) / n % 1 === 0) {
        return true;
    }
    return false;
}

function upArrowPressed() {
    myGamePiece.speedY = -3;
}

function downArrowPressed() {
    myGamePiece.speedY = 3;
}

function leftArrowPressed() {
    myGamePiece.speedX = -3;
}

function rightArrowPressed() {
    myGamePiece.speedX = 3;

}

function moveSelection(evt) {
    switch (evt.keyCode) {
        case 37:
            leftArrowPressed();
            break;
        case 39:
            rightArrowPressed();
            break;
        case 38:
            upArrowPressed();
            break;
        case 40:
            downArrowPressed();
            break;
    }
}

function docReady() {
    window.addEventListener('keydown', moveSelection);
}


