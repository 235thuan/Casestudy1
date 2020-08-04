const BULLET_SIZE = 30;
const BULLET_SPEED = 8;
const BULLET_RATIO = 0.08;

//khai báo lớp Kiểu đạn
let Bullet_Type = function (name, link, size, speed, damage) {
    this.name = name;
    this.link = link;
    this.size = size;
    this.speed = speed;
    this.damage = damage;
}

//khai báo lớp Đạn
let Bullet = function () {
    let self = this;
    this.x;
    this.y;
    this.img = new Image();
    this.setType = function (name, link, size, speed, damage) {
        this.type = new Bullet_Type(name, link, size, speed, damage)
        this.img.src = this.type.link;
        if (this.type.speed <= 0) {
            //vận tốc đạn âm là của Player
            this.width = this.type.size / 3;
            this.height = this.type.size;
        } else {
            //vận tốc đạn dương là của Obstacle
            this.width = this.type.size / 4;
            this.height = this.type.size / 2;
        }
    }
    this.draw = function () {
        let x = this.x;
        let y = this.y;
        let width = this.width;
        let height = this.height;
        ctxBullet.drawImage(self.img, x, y, width, height);
    }
    this.move = function () {
        if (self.destroy()) {
            ctxBullet.clearRect(self.x, self.y, self.width, self.height)
            return;
        }
        callBackBulletMove = requestAnimationFrame(self.move)
        ctxBullet.clearRect(self.x, self.y, self.width, self.height)
        self.y += self.type.speed;
        self.draw();
    }
    this.destroy = function () {
        //nếu là đạn do Player bắn
        if (this.type.name == 'bulletOfPlayer') {
            let bulletCollideTopEdge = this.y <= 0;
            //khi đạn chạm vào cạnh trên Canvas thì trả về True
            if (bulletCollideTopEdge) {
                return true;
            }
            //xét va chạm giữa Bullet và Obstacles
            for (let i = 0; i < obstacles.length; i++) {
                let bulletCollideObstacle = (this.x + this.width >= obstacles[i].x &&
                    this.x <= obstacles[i].x + obstacles[i].width &&
                    this.y <= obstacles[i].y + obstacles[i].height);
                //khi đạn chạm vào chướng ngại vật thì gọi hàm hủy chướng ngại vật và trả về True
                if (bulletCollideObstacle) {
                    obstacles[i].hp--; //giảm lượng máu của Obstacle
                    obstacles[i].isDestroyed(i); //hủy Obstacle
                    return true;
                }
            }
            //nếu là đạn do Obstacle bắn
        } else {
            let bulletCollideBottomEdge = this.y + this.height >= CV_HEIGHT;
            //khi đạn va chạm vào cạnh trên Canvas thì trả về True
            if (bulletCollideBottomEdge) {
                return true;
            }
            //điều kiện chuẩn để Player die
            // bulletCollidePlayer = this.x + this.width >= game.player.x &&
            //     this.x <= game.player.x + game.player.width &&
            //     this.y + this.height >= game.player.y;
            //sửa lại cho khó chết hơn
            bulletCollidePlayer = this.x + this.width >= game.player.x + game.player.width / 4 &&
                this.x <= game.player.x + game.player.width * 0.75 &&
                this.y + this.height >= game.player.y + game.player.height / 4;
            //nếu đạn chạm vao player thì giảm máu, =0 thì game over
            if (bulletCollidePlayer) {
                if (game.player.hp > 0) game.player.hp--;
                if (game.player.hp == 0) {
                    game.over = true;
                }
                return true;
            }
        }

    }
}