class Enemy {

    constructor(game, image, progress, maxHealth) {
        this.game = game;
        this.image = image;
        this.progress = typeof progress == 'undefined' ? 0.0 : progress;
        this.maxProgress = game.map.path.length - 2;
        this.x = game.map.path[0][0];
        this.y = game.map.path[0][1];
        this.angle = 0.0;
        this.state = this.progress < 0 ? 'waiting' : 'normal';
        this.health = maxHealth;
        this.maxHealth = maxHealth;
        this.speed = 1.0;
        this.maxSpeed = 1.0;
        this.direction = 0;
    }

    render(ctx) {
        if (this.state == 'normal') {
            var img = this.game.images.get(this.image);
            ctx.save();
            ctx.translate(this.x + 0.5, this.y + 0.5);
            ctx.beginPath();
            ctx.rect(-0.25, -0.95, 0.5 * (this.health / this.maxHealth), 0.1);
            ctx.fillStyle = 'rgb(255, 0, 0)'
            ctx.fill();
            ctx.rotate(this.angle);
            ctx.translate(-0.5, -0.8);
            var frame = [0, 1, 2, 1][Math.floor(this.progress * 4) % 4];
            ctx.drawImage(img, frame * 32, this.direction * 32, 32, 32, 0, 0, 1, 1);
            ctx.restore();
        }
    };

    update(delta) {
        if (this.health <= 0) {
            this.state = 'dead';
        } else {
            if (this.state == 'normal') {
                this.progress += delta * this.speed;
                this.speed = this.maxSpeed;
                const path = this.game.map.path;
                const index = Math.floor(this.progress);
                const p1 = this.progress - index;
                const p0 = 1 - p1;
                if (this.progress < this.maxProgress) {
                    this.x = path[index][0] * p0 + path[index + 1][0] * p1;
                    this.y = path[index][1] * p0 + path[index + 1][1] * p1;
                    if (this.y < path[index + 1][1]) {
                        this.direction = 0;
                    } else if (this.y > path[index + 1][1]) {
                        this.direction = 3
                    } else if (this.x < path[index + 1][0]) {
                        this.direction = 2
                    } else if (this.x > path[index + 1][0]) {
                        this.direction = 1
                    }
                } else {
                    this.state = 'passed';
                }
            } else if (this.state == 'waiting') {
                this.progress += delta * 2;
            }
        }
    };
}

Enemy.installed = {
    weakzombie: {health: 0.25, speed: 2.0, image: 'zombie', worth: 1},
    weakwitch: {health: 0.5, speed: 2.0, image: 'witch', worth: 2},
    zombie: {health: 0.5, speed: 2.0, image: 'zombie', worth: 1},
    witch: {health: 1.0, speed: 2.0, image: 'witch', worth: 2},
    mummy: {health: 2.0, speed: 1.5, image: 'mummy', worth: 2},
    goblin: {health: 1.5, speed: 2.5, image: 'goblin', worth: 5},
    pirate: {health: 7.0, speed: 1.5, image: 'pirate', worth: 10},
    ghost: {health: 8.0, speed: 1.125, image: 'phantom', worth: 15},
    death: {health: 50.0, speed: 0.5, image: 'death', worth: 20},
};

