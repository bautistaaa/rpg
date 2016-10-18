/**
 * Represents the bar scene
 */
var Bar = (function () {

    // represents a bar tileset
    var bar_tile_size = 32, // The size of a tile (32×32)
        bar_column_tile_count = 19, // The number of tiles in a column of our background
        bar_row_tile_count = 10, // The number of tiles in a row of our background
        bar_tiles_per_row = 8, // The number of tiles per row in the tileset image
        tile_set_image,
        bg_canvas,
        bg_ctx,
        main_canvas,
        main_ctx,
        music = Sounds.music.dreamscape,
        width = 608,
        height = 320;

    var floor = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ];

    var tile_layer1 = [
        [16, 17, 17, 17, 17, 17, 17, 17, 17, 17, 16, 17, 17, 17, 17, 17, 17, 17, 17],
        [24, 25, 25, 25, 25, 25, 25, 25, 25, 25, 24, 25, 25, 25, 25, 25, 25, 25, 25],
        [3, 3, 3, 34],
        [3, 3, 3, 42, 3, 3, 34, 3, 3, 3, 3, 3, 3, 38],
        [3, 3, 3, 3, 3, 3, 42, 3, 3, 3, 3, 3, 3, 46],
        [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 54],
        [],
        [],
        [],
        []
    ];

    var tile_layer2 = [
        [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
        [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
        [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
        [3, 3, 32, 33, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
        [3, 3, 40, 41, 3, 3, 32, 33, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
        [3, 3, 3, 3, 3, 3, 40, 41, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
        [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
        [3, 3, 3, 3, 32, 33, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
        [3, 3, 3, 3, 40, 41, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
        [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3]
    ];

    var tile_layer3 = [
        [3, 3, 7, 3, 3, 110, 3, 3, 7, 3, 3, 7, 3, 3, 110, 3, 3, 7, 3],
        [3, 3, 15, 3, 3, 3, 3, 3, 15, 3, 3, 15, 3, 3, 3, 3, 3, 15, 3],
        [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
        [3, 3, 74, 75, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
        [3, 3, 3, 3, 3, 3, 80, 3, 3, 3, 3, 3, 3, 72, 3, 3, 3, 3, 3],
        [3, 3, 3, 3, 3, 3, 82, 100, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
        [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
        [3, 3, 3, 3, 80, 80, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
        [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
        [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 23]
    ];

    var collisions = [
        [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
        [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
        [0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 2, 2, 0, 0, 2, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0],
        [0, 0, 2, 2, 0, 0, 2, 2, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3]
    ];

    function init() {
        Game.setGameLoading(true);
        bg_canvas = document.getElementById('bg');
        bg_ctx = bg_canvas.getContext('2d');

        main_canvas = document.getElementById('main');

        bg_canvas.width = width;
        bg_canvas.height = height;

        main_canvas.width = width;
        main_canvas.height = height;

        loadBar('assets/cafe.png', function () {
            draw();
            Game.setGameLoading(false);
        });
    }

    function loadBar(src, callback) {
        tile_set_image = new Image();
        tile_set_image.onload = callback;
        tile_set_image.src = src;
    }

    function draw() {
        for (var r = 0; r < bar_row_tile_count; r++) {
            for (var c = 0; c < bar_column_tile_count; c++) {
                // draw the floor
                var tile = floor[r][c];
                var tile_row = (tile / bar_tiles_per_row) | 0; // Bitwise OR operation
                var tile_col = (tile % bar_tiles_per_row) | 0;

                bg_ctx.drawImage(tile_set_image, (tile_col * bar_tile_size), (tile_row * bar_tile_size), bar_tile_size, bar_tile_size, (c * bar_tile_size), (r * bar_tile_size), bar_tile_size, bar_tile_size);

                // draw layer 1 tables and shit
                tile = tile_layer1[r][c];
                tile_row = (tile / bar_tiles_per_row) | 0;
                tile_col = (tile % bar_tiles_per_row) | 0;

                bg_ctx.drawImage(tile_set_image, (tile_col * bar_tile_size), (tile_row * bar_tile_size), bar_tile_size, bar_tile_size, (c * bar_tile_size), (r * bar_tile_size), bar_tile_size, bar_tile_size);

                // draw layer 2 tables and shit
                tile = tile_layer2[r][c];
                tile_row = (tile / bar_tiles_per_row) | 0;
                tile_col = (tile % bar_tiles_per_row) | 0;

                bg_ctx.drawImage(tile_set_image, (tile_col * bar_tile_size), (tile_row * bar_tile_size), bar_tile_size, bar_tile_size, (c * bar_tile_size), (r * bar_tile_size), bar_tile_size, bar_tile_size);

                // draw layer 3( bread and shit )
                tile = tile_layer3[r][c];
                tile_row = (tile / bar_tiles_per_row) | 0;
                tile_col = (tile % bar_tiles_per_row) | 0;

                // console.log(tile, tile_row, tile_col)
                // console.log((tile_col * bar_tile_size), (tile_row * bar_tile_size), bar_tile_size, bar_tile_size, (c * bar_tile_size), (r * bar_tile_size), bar_tile_size, bar_tile_size);

                bg_ctx.drawImage(tile_set_image, (tile_col * bar_tile_size), (tile_row * bar_tile_size), bar_tile_size, bar_tile_size, (c * bar_tile_size), (r * bar_tile_size), bar_tile_size, bar_tile_size);

            }
        }
    }

    return {
        getCollisions: function () {
            return collisions;
        },
        init: init,
        height: height,
        width: width,
        music: music
    }
})();
