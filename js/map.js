class Map {

    constructor(game) {
        this.game = game;
        this.tiles = [];
    };

    ready(callback) {
        const tiles = this.tiles;
        const game = this.game;
        const images = game.images;
        this.canvas = document.createElement('canvas');
        this.canvas.setAttribute('width', game.width + 'px');
        this.canvas.setAttribute('height', game.height + 'px');
        const ctx = this.canvas.getContext('2d');
        ctx.scale(game.scale, game.scale);
        for (let i = 0; i < tiles.length; i++) {
            for (let j = 0; j < tiles[i].length; j++) {
                const img = game.images.get(tiles[i][j] ? 'path' : 'grass');
                ctx.drawImage(img, j, i, 1, 1);
            }
        }
        ctx.drawImage(game.images.get('end'), this.end[0], this.end[1], 1, 1);
        this.path = null;
        this.computePath();
        callback();
    };

    computePath() {
        let old;
        let tile = this.start;
        const goal = this.end;
        const path = [tile];
        while (!_.isEqual(tile, goal)) {
            old = tile;
            getPathNeighbors(this, tile).forEach(neighbor => {
                if (!_.any(path, function(x) {return _.isEqual(x, neighbor)})) {
                    tile = neighbor;
                }
            });
            if (tile === old) {
                console.log('No path');
                return;
            }
            path.push(tile);
        }
        path.push(goal);
        this.path = path;
    }
}

const getPathNeighbors = (map, tile) => {
    const out = [];
    const tiles = map.tiles;
    const x = tile[0];
    const y = tile[1];
    if (x + 1 < map.game.columns && tiles[y][x + 1]) {
        out.push([x + 1, y]);
    }
    if (x - 1 > -1 && tiles[y][x - 1]) {
        out.push([x - 1, y]);
    }
    if (y + 1 < map.game.rows && tiles[y + 1][x]) {
        out.push([x, y + 1]);
    }
    if (y - 1 > -1 && tiles[y - 1][x]) {
        out.push([x, y - 1]);
    }
    return out;
};
