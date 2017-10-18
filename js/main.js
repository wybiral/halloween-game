class Dialog {

    constructor() {
        this.el = $('<div></div>');
        this.content = $('<div></div>').appendTo(this.el);
        this.buttons = $('<div class="dialog-buttons"></div>').appendTo(this.el);
    }

    open() {
        $('#viewport .overlay').empty().append(this.el);
        $('.overlay').show();
    }

    addButton(title, callback) {
        var button = $('<button></button>').html(title);
        button.click(callback);
        this.buttons.append(button);
        return button;
    }
}

function setHint(html, css) {
    $('#hint').html(html).css(css).fadeIn('slow');
}

function attachTutorial(game) {
    var goals = {
        select: false,
        place: false,
        start: false
    };
    function doSelect() {
        if (goals.select == false) {
            setHint('Click on the Jack-O-Lantern to select that object -->', {
                right: 0,
                top: $('#towers').position().top + 35,
            });
            function towerChanged(tower) {
                if (tower && tower.key == 'jack') {
                    game.off('change:selectedTower', towerChanged);
                    goals.select = true;
                    doPlace();
                }
            }
            game.on('change:selectedTower', towerChanged);
        } else {
            doPlace();
        }
    }
    function doPlace() {
        if (goals.place == false) {
            setHint('Now place the Jack-O-Lantern right next to the path<br>so that the red circle covers part of the path.', {
                top: $('#viewport').height() / 2 - $('#hint').height() / 2,
                right: $('#viewport').width() / 2 - $('#hint').width() / 2
            })
            function towerPlaced(tower) {
                if (game.selectedTower.key == 'jack') {
                    game.off('addTower', towerPlaced);
                    goals.place = true;
                    doStart();
                }
            }
            game.on('addTower', towerPlaced);
        } else {
            doStart();
        }
    }
    function doStart() {
        if (goals.start == false) {
            setHint('Now click the "Start wave" button to begin -->', {
                right: 0,
                top: $('#wave').position().top - 5,
            });
            function start(tower) {
                $('#hint').hide();
                $('#wave').off('click', start);
                goals.start = true;
            }
            $('#wave').on('click', start);
        }
    }
    doSelect();
}

function buildLevelIntro(game, level) {
    /*
    openDialog({
        html: '<h1>' + level.chapter + '<br>' + level.title +'</h1>' +
              '<p style="margin-left: auto; margin-right: auto; width: 550px">' + level.intro + '</p>',
        button: 'Click to begin',
        callback: function() {
            game.state = 'running';
            if (game.level == 0) {
                attachTutorial(game);
            }
        }
    });
    */
    var dialog = new Dialog();
    dialog.content.append('<h1>' + level.chapter + '<br>' + level.title +'</h1>');
    dialog.content.append('<p style="margin-left: auto; margin-right: auto; width: 550px">' + level.intro + '</p>');
    dialog.addButton('Click to begin', function() {
        game.state = 'running';
        if (game.level == 0) {
            attachTutorial(game);
        }
    });
    dialog.open();
}

function buildLevelMenu(game) {
    var bg = $('<div></div>').css({
        width: '100%',
        height: '100%',
        backgroundColor: '000'
    });
    var menu = $('<table></table>').css({
        width: '100%',
        backgroundColor: '000'
    }).appendTo(bg);
    var cols = 0;
    var row = $('<tr></tr>');
    _.each(levels, function(level, i) {
        if (level.unlocked) {
            var div = $('<button class="unlocked">' + level.chapter + '<br>(' + level.title + ')</button>');
            if (level.candySaved && level.cashSaved) {
                div.append('<br>Score: ' + (level.candySaved * level.cashSaved));
            }
            div.click(function() {
                game.level = i;
            });
        } else {
            div = $('<button>' + level.chapter + '<br>(LOCKED)</button>');
        }
        row.append($('<td style="width: 33.33%"></td>').append(div));
        if (++cols == 3) {
            cols = 0;
            menu.append(row);
            row = $('<tr></tr>');
        }
    })
    menu.append(row);
    $('#viewport .overlay').empty().append(bg).show();
    $('#viewport .overlay button').addClass('level-select');
}


$(function() {

    document.getElementById('music').addEventListener('ended', function() {
        this.currentTime = 0;
        this.play();
    }, false);


    var game = Game.getInstance();

    game.levels = levels;

    game.config({
        rows: 11,
        columns: 15,
        scale: 45,
        canvas: document.getElementById('canvas'),
    });

    game.images.add('path', 'tiles/path.png');
    game.images.add('grass', 'tiles/grass.png');
    game.images.add('end', 'tiles/end.png');
    game.images.add('jack', 'towers/jack.png');
    game.images.add('jack-light', 'towers/jack-light.png');
    game.images.add('scarecrow', 'towers/scarecrow.png');
    game.images.add('grave', 'towers/grave.png');
    game.images.add('ghost', 'towers/ghost.png');

    game.images.add('zombie', 'enemies/zombie.png');
    game.images.add('witch', 'enemies/witch.png');
    game.images.add('mummy', 'enemies/mummy.png');
    game.images.add('goblin', 'enemies/goblin.png');
    game.images.add('death', 'enemies/death.png');
    game.images.add('rat', 'enemies/rat.png');
    game.images.add('pirate', 'enemies/pirate.png');
    game.images.add('phantom', 'enemies/ghost.png');

    game.on('change:level', function(index) {
        var level = game.levels[index];
        $('#viewport .overlay').empty().append(buildLevelIntro(game, level));
        $('#wave').show().text('Start wave 1 of ' + level.waves.length);
        $('.overlay').fadeIn('slow');
    });

    game.on('loading', function(percent) {
        $('#progress-bar').width(400 * percent);
    });

    var playing = null;

    game.ready(function() {
        buildLevelMenu(game);
        document.getElementById('music').play();
    });

    function checkForLevelEnd() {
        if (game.state == 'gameover') {
            return
        }
        var lastWave = game.wave == game.levels[game.level].waves.length;
        var noEnemies = !(game.enemies.length || game.enemiesQueue.length);
        if (lastWave && noEnemies) {
            game.state = 'stopped';
            var oldCashSaved = levels[game.level].cashSaved || 0;
            var oldCandySaved = levels[game.level].CandySaved || 0;
            levels[game.level].cashSaved = Math.max(oldCashSaved, game.cash);
            levels[game.level].candySaved = Math.max(oldCandySaved, game.candy);
            var nextLevel = game.level + 1;
            var stats = '<p>';
            stats += '<div>Score: ' + (game.cash * game.candy) + '</div>';
            stats += '</p>';
            /*
            openDialog({
                html: '<h1 style="margin-top: 100px">Chapter ' + nextLevel + '<br>Complete!<br></h1>' + stats,
                button: 'Continue',
                callback: function() {
                    buildLevelMenu(game);
                }
            });
            */
            var dialog = new Dialog();
            dialog.content.append('<h1 style="margin-top: 100px">Chapter ' + nextLevel + '<br>Complete!<br></h1>' + stats);
            dialog.addButton('Menu', function() {
                buildLevelMenu(game);
            });
            if (nextLevel < levels.length) {
                levels[nextLevel].unlocked = true;
                dialog.addButton('Next Level', function() {
                    game.level = nextLevel
                });
            }
            dialog.open();

        }
    }
    game.on('hit', checkForLevelEnd);
    game.on('death', checkForLevelEnd);

    game.on('change:state', function(state) {
        if (!playing) {
        } else if (playing.paused) {
            playing.play();
        }
        if (state == 'paused') {
            if (playing) {
                playing.pause();
            }
            var dialog = new Dialog();
            dialog.content.append('<h1 style="margin-top: 100px">Paused</h1>');
            dialog.addButton('Return to game', function() {
                    game.state = 'running';
            });
            dialog.open();
        } else if (state == 'gameover') {
            var dialog = new Dialog();
            dialog.content.append('<h1 style="margin-top: 100px">Game over!</h1>');
            dialog.addButton('Try again', function() {
                buildLevelMenu(game);
            });
            dialog.open();
        } else if (state == 'running') {
            $('.overlay').fadeOut('slow', function() {
                $('#wave').removeAttr('disabled');
            });
        }
    });

    game.on('change:cash', function(value) {
        $('#cash').text(value);
    });
    game.cash = 0;

    game.on('change:candy', function(value) {
        $('#candy').width(value * 10);
        if (value <= 0) {
            game.state = 'gameover'
        }
    });
    game.candy = 5;

    game.on('change:selectedTower', function(selected) {
        $('#towers img').removeClass('selected');
        $('#stats div.create').hide();
        if (selected) {
            if (selected instanceof Tower) {
                $('#stats div.create .cost').text(selected.cost);
                $('#stats div.create .range').text(selected.range);
                $('#stats div.create .damage').text(selected.damage);
                $('#stats div.create .note').text(selected.note);
                $('#stats div.create').show();
            } else {
                $('#towers img').filter(function() {
                    return $(this).data('tower') == selected.key;
                }).addClass('selected');
                $('#stats div.create .cost').text(selected.cost);
                $('#stats div.create .range').text(selected.range);
                $('#stats div.create .damage').text(selected.damage);
                $('#stats div.create .note').text(selected.note);
                $('#stats div.create').show();
            }
        }
    });

    var towers = Tower.installed;
    var enemies = Enemy.installed;

    $('#canvas').mousemove(function(evt) {
        var x, y;
        if (typeof evt.offsetX == 'undefined') {
            x = evt.clientX - $('#canvas').offset().left;
            y = evt.clientY - $('#canvas').offset().top;
        } else {
            x = evt.offsetX;
            y = evt.offsetY;
        }
        x = Math.floor(x / game.scale);
        y = Math.floor(y / game.scale);
        game.cursor = [x, y];
    });

    $('#canvas').mouseout(function() {
        game.cursor = null;
    });

    $('#canvas').click(function(evt) {
        var x, y;
        if (typeof evt.offsetX == 'undefined') {
            x = evt.clientX - $('#canvas').offset().left;
            y = evt.clientY - $('#canvas').offset().top;
        } else {
            x = evt.offsetX;
            y = evt.offsetY;
        }
        x = Math.floor(x / game.scale);
        y = Math.floor(y / game.scale);
        if (!game.map.tiles[y][x]) {
            if (game.selectedTower && !(game.selectedTower instanceof Tower) && game.cash >= game.selectedTower.cost) {
                game.map.tiles[y][x] = new game.selectedTower(game, x, y);
                game.towers.push(game.map.tiles[y][x]);
                game.cash -= game.selectedTower.cost;
                game.trigger('addTower', game.map.tiles[y][x]);
                game.selectedTower = null;
            } else {
                game.selectedTower = null;
            }
        } else {
            if (game.map.tiles[y][x] instanceof Tower) {
                game.selectedTower = game.map.tiles[y][x];
            } else {
                game.selectedTower = null;
            }
        }
    });

    $('#towers img').click(function(evt) {
        game.selectedTower = towers[$(this).data('tower')];
        evt.stopPropagation();
    });

    $('#panel').click(function() {
        game.selectedTower = null;
    });

    $('#restart').click(function(evt) {
        var ok = confirm('Restart level?');
        if (ok) {
            game.level = game.level;
        }
    });

    $('#wave').click(function(evt) {
        game.sendWave();
        if (game.wave < game.levels[game.level].waves.length) {
            $('#wave').text('Start wave ' + (game.wave + 1) + ' of ' + game.levels[game.level].waves.length);
        } else {
            $('#wave').hide();
        }
        evt.stopPropagation();
    });

    $(window).blur(function() {
        if (game.state == 'running') {
            game.state = 'paused';
        }
    });

    $('.overlay').click(function() {
        return false;
    });

    function buttonState() {
        if (game.enemiesQueue.length > 0) {
            $('#wave').attr('disabled', 'disabled');
        } else {
            $('#wave').removeAttr('disabled');
        }
    }
    game.on('spawn', buttonState);

});

