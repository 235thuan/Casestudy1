const ORIENTATION_UP = 'up';
const ORIENTATION_DOWN = 'down';
const ORIENTATION_LEFT = 'left';
const ORIENTATION_RIGHT = 'right';
const DEFAULT_ORIENTATION = ORIENTATION_UP;
const PLAYER_RATIO = 0.25;
const CV_WIDTH = myCanvas.width;
const CV_HEIGHT = myCanvas.height;
const DEFAULT_POSISION_Y = CV_HEIGHT - 100;
const DEFAULT_POSISION_X = CV_WIDTH / 2;
const DEFAULT_SPEED = 2.5;
const PLAYER_HP = 10;
const CTRL_KEY = 17;
const SPACE_KEY = 32;
const LEFT_ARROW_KEY = 37;
const UP_ARROW_KEY = 38;
const RIGHT_ARROW_KEY = 39;
const DOWN_ARROW_KEY = 40;
const ENTER_KEY = 13;

let Player = function () {
    //để tránh nhầm lẫn trong việc thực thi từ 'this' trong function, ta đặt self=this ở ngay đầu khai báo lớp để dùng trong function
    let self = this;
    this.x = DEFAULT_POSISION_X;
    this.y = DEFAULT_POSISION_Y;
    this.hp = PLAYER_HP;
    this.image = new Image();
    this.image.src = './images/combat_Aircrafts.png';
    this.width = this.image.naturalWidth * PLAYER_RATIO;
    this.height = this.image.naturalHeight * PLAYER_RATIO;
    this.speed = DEFAULT_SPEED;
    this.orientation = DEFAULT_ORIENTATION;
    this.show = function () {
        let x = this.x;
        let y = this.y;
        let width = this.width;
        let height = this.height;
        ctxGame.drawImage(self.image, x, y, width, height);

    };
    //cho phương thức này khai báo ở thẻ body với sự kiện onkeydown
    this.changeOrientation = function (event) {
        //khi game over thì sự kiện bị vô hiệu hóa, ngoại trừ phím Enter để chơi lại Game
        if (game.ready) {
            switch (event.keyCode) {
                case LEFT_ARROW_KEY:
                    this.orientation = ORIENTATION_LEFT;
                    break;
                case RIGHT_ARROW_KEY:
                    this.orientation = ORIENTATION_RIGHT;
                    break;
                case CTRL_KEY:
                    this.shoot();
                    for (let i = 0; i < obstacles.length; i++) {
                        game.obstacles[i].shoot();
                    }
                    break;
            }
        }
    };
    this.move = function () {
        switch (this.orientation) {
            case ORIENTATION_LEFT:
                if (this.x <= 0) {
                    this.x = CV_WIDTH;
                }
                this.x -= this.speed;
                break;
            case ORIENTATION_RIGHT:
                if (this.x >= CV_WIDTH) {
                    this.x = 0;
                }
                this.x += this.speed;
                break;
        }
    };
    this.shoot = function () {
        let name = 'bulletOfPlayer';
        let link = "./images/rocket2.png";
        let size = 30;
        let speed = -10;
        let damage = 1;
        let bullet = new Bullet();
        bullet.setType(name, link, size, speed, damage);
        this.bullet = bullet;
        //gán tọa độ của Player cho tọa độ của đạn
        this.bullet.x = this.x + this.width / 2 - this.bullet.width / 2;
        this.bullet.y = this.y;
        soundShoot.play();
        // soundShoot.stop();
        this.bullet.move();
    }
    //tạo thuộc tính nổ cho Obstacle
    this.explosive = new Explosion();
};