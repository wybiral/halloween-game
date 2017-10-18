class Tower {

    constructor(game, x, y, image) {
        this.game = game;
        this.x = x;
        this.y = y;
        this.angle = 0.0;
        this.image = image;
        this.range = Tower.range;
        this.damage = Tower.damage;
    }

    render(ctx) {
        var img = this.game.images.get(this.image);
        ctx.save();
        ctx.translate(this.x + 0.5, this.y + 0.5);
        ctx.rotate(this.angle);
        ctx.translate(-0.5, -0.5);
        ctx.drawImage(img, 0, 0, 1, 1);
        ctx.restore();
    }
}

Tower.installed = {};
Tower.cost = 5;
Tower.range = 1;
Tower.damage = 1.25;


class JackTower extends Tower {

    constructor(game, x, y) {
        super(game, x, y, 'jack');
        this.phase = 0.0;
        this.beam = 0.0;
        this.range = JackTower.range;
        this.damage = JackTower.damage;
    }

    render(ctx) {
        const img = this.game.images.get(this.image);
        const light = this.game.images.get('jack-light');
        ctx.save();
        ctx.translate(this.x + 0.5, this.y + 0.5);
        ctx.rotate(this.angle);
        ctx.translate(-0.5, -0.5);
        ctx.drawImage(img, 0, 0, 1, 1);
        ctx.save();
        ctx.translate(1.0, 0.55);
        ctx.rotate(Math.PI / 2);
        ctx.globalAlpha = this.beam;
        ctx.drawImage(light, 0, 0, 2, 1);
        ctx.restore();
        ctx.restore();
    }

    update(delta) {
        const game = this.game;
        const x = this.x;
        const y = this.y;
        let angle = 0;
        let beam = 0.0;
        if (game.enemies.length) {
            game.enemies.forEach(enemy => {
                const xd = x - enemy.x;
                const yd = y - enemy.y;
                enemy.distance = Math.sqrt(xd * xd + yd * yd);
            });
            var target = _.min(game.enemies, x => x.distance);
            if (target.distance < this.range + 0.5) {
                this.phase += delta;
                beam = Math.pow(Math.sin(this.phase * 4) * 0.5 + 0.5, 2);
                angle = getAngle(target.x, target.y, x, y);
                if (target.distance < this.range + 0.5) {
                    target.health -= (delta * beam * this.damage) * 5;
                }
                this.angle = (angle - 90) * (Math.PI / 180);
            } else {
                this.phase = 0;
            }
        }
        this.beam = beam;
    }
}

JackTower.key = 'jack';
JackTower.cost = 5;
JackTower.range = 1;
JackTower.damage = 0.1;
JackTower.note = 'A scary jack-o-lantern is effective but can only target one monster at a time.';
Tower.installed.jack = JackTower;


class ScareCrowTower extends Tower {

    constructor(game, x, y) {
        super(game, x, y, 'scarecrow');
        this.phase = 0.0;
        this.range = ScareCrowTower.range;
        this.damage = ScareCrowTower.damage;
    }

    render(ctx) {
        const img = this.game.images.get(this.image);
        ctx.save();
        ctx.translate(this.x + 0.5, this.y + 1.0);
        ctx.rotate(this.angle);
        ctx.translate(-0.5, -1.0);
        ctx.drawImage(img, 0, 0, 1, 1);
        ctx.restore();
    }

    update(delta) {
        const game = this.game;
        const x = this.x;
        const y = this.y;
        let moving = false;
        if (game.enemies.length) {
            game.enemies.forEach(enemy => {
                const xd = x - enemy.x;
                const yd = y - enemy.y;
                const distance = Math.sqrt(xd * xd + yd * yd);
                if (distance < this.range + 0.5) {
                    moving = true;
                    enemy.speed *= 0.75;
                    enemy.health -= this.damage * delta;
                }
            });
        }
        if (moving) {
            this.phase += delta;
        }
        this.angle = Math.sin(this.phase) * 0.25;
    }
}

ScareCrowTower.key = 'scarecrow';
ScareCrowTower.cost = 10;
ScareCrowTower.range = 2;
ScareCrowTower.damage = 0.05;
ScareCrowTower.note = 'A scarecrow will slow down any monster near it by 20% but won\'t reduce it\'s courage much.';
Tower.installed.scarecrow = ScareCrowTower;


class GraveTower extends Tower {

    constructor(game, x, y) {
        super(game, x, y, 'grave');
        this.phase = 0.0;
        this.range = GraveTower.range;
        this.damage = GraveTower.damage;
        this.ghosts = [];
        this.lastGhost = Infinity;
        this.rate = 1;
    }

    render(ctx) {
        const img = this.game.images.get(this.image);
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.drawImage(img, 0, 0, 1, 1);
        ctx.restore();
    };

    postRender(ctx) {
        const ghostimg = this.game.images.get('ghost');
        this.ghosts.forEach(ghost => {
            const value = ghost.offset + ghost.time * ghost.direction;
            ctx.save();
            ctx.globalAlpha = Math.sqrt(1 - (ghost.time / ghost.maxTime));
            ctx.translate(ghost.x - Math.cos(value) * 0.5 + 0.25, ghost.y + Math.sin(value) * 0.5 - 0.25);
            ctx.drawImage(ghostimg, 0, 0, 0.5, 0.5);
            ctx.restore();
        });
    }

    update(delta) {
        const x = this.x;
        const y = this.y;
        const angle = 0;
        const game = this.game;
        const validEnemies = game.enemies.filter(enemy => {
            return enemy.image != 'phantom';
        });
        if (game.enemies.length) {
            validEnemies.forEach(enemy => {
                const xd = x - enemy.x;
                const yd = y - enemy.y;
                enemy.distance = Math.sqrt(xd * xd + yd * yd);
            });
            var target = _.min(validEnemies, x => x.distance);
            this.lastGhost += delta;
            if (target.distance < this.range + 0.5) {
                if (this.lastGhost > this.rate) {
                    this.ghosts.push({
                        x: x + 0.5,
                        y: y + 0.5,
                        target: target,
                        offset: Math.random() * Math.PI * 2,
                        time: 0,
                        maxTime: 3.0,
                        direction: Math.random() > 0.5 ? 1 : -1
                    });
                    this.lastGhost = 0;
                }
            }
        }
        this.ghosts = this.ghosts.filter(ghost => {
            return ghost.target.state == 'normal' && ghost.time < ghost.maxTime;
        });
        this.ghosts.forEach(ghost => {
            const dx = ghost.x - ghost.target.x;
            const dy = ghost.y - ghost.target.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < 2) {
                ghost.target.health -= this.damage * delta;
            }
            if (distance > 0.5) {
                ghost.x -= (dx / distance) * delta * 2.5;
                ghost.y -= (dy / distance) * delta * 2.5;
            }
            ghost.time += delta;
        });
    }
}

GraveTower.key = 'grave';
GraveTower.cost = 15;
GraveTower.range = 2;
GraveTower.damage = 0.2;
GraveTower.note = 'A spooky grave';
Tower.installed.grave = GraveTower;


const getAngle = (x1, y1, x2, y2, x3, y3) => {
    if (x3 == null) {
        const x = x1 - x2;
        const y = y1 - y2;
        if (!x && !y) {
            return 0;
        }
        return (180 + Math.atan2(-y, -x) * 180 / Math.PI + 360) % 360;
    } else {
        return getAngle(x1, y1, x3, y3) - getAngle(x2, y2, x3, y3);
    }
}
