function ImageManager(game) {
    this.game = game;
    this.images = {};
    this.queue = [];
}
ImageManager.prototype.get = function(name) {
    return this.images[name];
};
ImageManager.prototype.add = function(name, src) {
    var images = this.images;
    this.game.initializer.add(function(done) {
        var img = new Image();
        img.onload = done;
        img.src = 'images/' + src;
        images[name] = img;
    });
};


var Game = new Classy(function(cls) {

    /*
        Game should manage:
            Representation of state
                level
                cash
                candy
    */

    var instance = null;

    cls.getInstance = function() {
        if (instance === null) {
            instance = new Game();
        }
        return instance;
    };

    cls.property('cash', Number);
    cls.property('candy', Number);
    cls.property('width', Number);
    cls.property('height', Number);
    cls.property('state', String);
    cls.property('selectedTower', Object);
    cls.property('wave', Number);
    cls.property('level', Number);

    cls.method('init', function() {
        this.options = {};
        this.initializer = new Tasks();
        this.images = new ImageManager(this);
        this.towers = [];
        this.enemies = [];
        this.enemiesQueue = [];
        this.levels = [];
    });

    cls.method('config', [Object], function(changes) {
        _.extend(this.options, changes);
        return this;
    });

    cls.method('config', [String], function(key) {
        return this.options[key];
    });

    cls.method('config', [String, Object], function(key, value) {
        this.options[key] = value;
        return this;
    });

    cls.prototype.ready = function(callback) {
        this.trigger('ready');
        var game = this;
        var options = this.options;
        this.canvas = options.canvas;
        this.columns = options.columns;
        this.rows = options.rows;
        this.on('change:width', function(width) {
            game.canvas.setAttribute('width', width + 'px');
        });
        this.on('change:height', function(height) {
            game.canvas.setAttribute('height', height + 'px');
        });
        this.scale = options.scale || 32;
        this.width = options.columns * this.scale;
        this.height = options.rows * this.scale;
        this.ctx = this.canvas.getContext('2d');
        this.ctx.scale(this.scale, this.scale);
        this.on('change:state', function(state) {
            if (state == 'running') {
                // This delay is to allow the change in state to take place
                setTimeout(function(){
                    game.lastTime = (new Date()).getTime();
                    game.loop()
                }, 10);
            }
        });
        this.on('change:level', function(index) {
            var level = game.levels[index];
            game.towers = [];
            game.enemies = [];
            game.enemiesQueue = [];
            game.wave = 0;
            game.cash = level.cash;
            game.candy = level.candy;
            game.map = new Map(game);
            game.map.start = level.start;
            game.map.end = level.end;
            game.map.tiles = level.tiles.map(function(x) {return x.slice(0)});
            game.map.ready(function() {
                game.render();
            });
        });
        this.initializer.on('progress', function(percent) {
            game.trigger('loading', percent);
        });
        this.initializer.on('ready', callback);
        this.initializer.start();
    };

    cls.prototype.loop = function() {
        var game = this;
        (function loop() {
            game.update();
            game.render();
            if (game.state == 'running') {
                setTimeout(loop, 10);
            }
        })();
    };

    cls.prototype.render = function() {
        var ctx = this.ctx,
            map = this.map;
        ctx.drawImage(map.canvas, 0, 0, this.columns, this.rows);

        _.each(this.towers, function(tower) {
            tower.render(ctx);
        });

        this.enemies.sort(function(a, b) {
            return a.x - b.x;
        });
        this.enemies.sort(function(a, b) {
            return a.y - b.y;
        });
        _.each(this.enemies, function(x) {
            x.render(ctx);
        });

        _.each(this.towers, function(tower) {
            if (tower.postRender) {
                tower.postRender(ctx);
            }
        });

        if (this.cursor) {
            var x = this.cursor[0],
                y = this.cursor[1];
            if (this.map.tiles[y][x] !== 1) {
                ctx.save();
                ctx.translate(x, y);
                if (this.map.tiles[y][x] === 0 && this.selectedTower && !(this.selectedTower instanceof Tower)) {
                    // No tower on map, but valid spot for tower to be built
                    ctx.beginPath();
                    ctx.arc(0.5, 0.5, this.selectedTower.range + 0.5, 0 , 2 * Math.PI, false);
                    ctx.fillStyle = 'rgba(128, 0, 0, 0.25)';
                    ctx.fill();
                    ctx.beginPath();
                    ctx.rect(0, 0, 1, 1);
                    ctx.fillStyle = 'rgba(0, 0, 255, 0.25)';
                    ctx.fill();
                }/* else if (this.map.tiles[y][x]) {
                    // Tower on map
                    ctx.beginPath();
                    ctx.arc(0.5, 0.5, this.map.tiles[y][x].range + 0.5, 0 , 2 * Math.PI, false);
                    ctx.fillStyle = 'rgba(128, 0, 0, 0.25)';
                    ctx.fill();
                }*/
                ctx.restore();
            }
        }
        if (this.selectedTower && this.selectedTower instanceof Tower) {
            ctx.save();
            ctx.translate(this.selectedTower.x, this.selectedTower.y);
            ctx.beginPath();
            ctx.arc(0.5, 0.5, this.selectedTower.range + 0.5, 0 , 2 * Math.PI, false);
            ctx.fillStyle = 'rgba(128, 0, 0, 0.25)';
            ctx.fill();
            ctx.restore();
        }
    };

    cls.prototype.update = function() {
        var game = this;
        var time = (new Date()).getTime();
        var delta = (time - this.lastTime) / 1000;
        _.each(this.enemies.slice(0), function(x, i) {
            x.update(delta);
            if (x.state == 'passed') {
                game.candy -= 1;
                game.enemies.splice(i, 1);
                game.trigger('hit');
            } else if (x.state == 'dead') {
                game.cash += x.worth;
                game.enemies.splice(i, 1);
                game.trigger('death');
            }
        });
        _.each(this.towers, function(tower) {
            tower.update(delta);
        });
        _.each(this.enemiesQueue.slice(0), function(x, i) {
            x.update(delta);
            if (x.progress >= 0) {
                x.state = 'normal';
                game.enemies.push(x);
                game.enemiesQueue.splice(i, 1);
                game.trigger('spawn');
            }
        });
        this.lastTime = time;
    };

    cls.prototype.sendWave = function() {
        var game = this, type = Enemy.installed.zombie, enemy;
        _.each(game.levels[game.level].waves[game.wave++], function(x) {
            if (typeof x == 'string') {
                type = Enemy.installed[x];
            } else {
                enemy = new Enemy(game, type.image, -x, type.health);
                enemy.speed = type.speed;
                enemy.maxSpeed = type.speed;
                enemy.worth = type.worth;
                game.enemiesQueue.push(enemy);
            }
        });
    };

});

