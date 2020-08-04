const EASY_SPEED = 0.45;
const MEDIUM_SPEED = 0.6;
const HARD_SPEED = 1;
const INCREASE_SPEED = 2;
const NUMBERS_OBSTACLES = 10;
const OBSTACLES_SIZE = 70;
const OBSTACLES_RATIO = 0.4;
const BLUR_LEVEL = 30;
const BLUR_COLOR = 'aqua';

//khai báo lớp Chướng ngại vật
let Obstacles = function () {
    let self = this;
    this.x = Math.floor(Math.random() * (CV_WIDTH - OBSTACLES_SIZE * 2) + OBSTACLES_SIZE);
    this.y = Math.floor(Math.random() * (-CV_HEIGHT));
    this.img = new Image();
    this.setType = function (link, size, speed) {
        this.img.src = link;
        // this.width=this.img.naturalWidth*OBSTACLES_RATIO;
        // this.height=this.img.naturalHeight*OBSTACLES_RATIO;
        this.width = size;
        this.height = size;
        //set hp cho từng obstacle
        type = Number(link[link.length - 5]);
        switch (type) {
            case 0:
            case 1:
            case 2:
            case 3:
            case 4:
                self.hp = 1;
                break;
            case 5:
            case 6:
            case 7:
            case 8:
            case 9:
                self.hp = 2;
                break;
        }
        this.speed = speed;
    }
    this.draw = function () {
        let x = this.x;
        let y = this.y;
        let width = this.width;
        let height = this.height;
        ctxGame.shadowColor = getRandomColor();
        ctxGame.shadowBlur = BLUR_LEVEL;
        ctxGame.drawImage(self.img, x, y, width, height);
    }
    this.move = function () {
        this.y += this.speed;
    }
    this.shoot = function () {
        let obstacleAppear = this.y + this.height >= 0
        //khi obstacle xuất hiện thì enable shoot cho nó
        if (obstacleAppear) {
            let name = 'bulletOfObstacle';
            let link = "./images/bullet5.png"
            let size = 30;
            let speed = 4;
            let damage = 1;
            //mỗi lần bắn là tạo mới 1 viên đạn
            let bullet = new Bullet();
            bullet.setType(name, link, size, speed, damage);
            this.bullet = bullet;
            //gán tọa độ của Obstacle cho tọa độ của đạn
            this.bullet.x = this.x + this.width / 2 - this.bullet.width / 2;
            this.bullet.y = this.y + this.height / 2;
            this.bullet.move();
        }
    }
    //tạo thuộc tính nổ cho Obstacle
    this.explosive = new Explosion();
    this.isDestroyed = function (index) {
        //xóa obstacle khi hết máu (hp=0) bằng cách remove phần tử đó (dựa vào index truyền vào) trong mảng Obstacles
        //sau đó sinh lại 1 obstacle bù lại vào mảng
        if (obstacles[index].hp == 0) {
            let posX = obstacles[index].x + obstacles[index].width / 2 - obstacles[index].explosive.size / 2;
            let posY = obstacles[index].y + obstacles[index].height / 2 - obstacles[index].explosive.size / 2;
            //gán tọa độ của Obstacle cho đối tượng ảnh nổ
            self.explosive.setPosition(posX, posY);
            soundExplosive.play();
            obstacles[index].explosive.start();
            let removeItem = obstacles.splice(index, 1);
            let obstacle = new Obstacles();
            let link = './images/ufo' + Math.floor(Math.random() * NUMBERS_UFO_IMAGES) + '.png'
            obstacle.setType(link, OBSTACLES_SIZE, EASY_SPEED)
            obstacles.push(obstacle);
            //mỗi 1 obstacle bị phá hủy sẽ đc tính 1 điểm
            scores++;
        }
    }
};