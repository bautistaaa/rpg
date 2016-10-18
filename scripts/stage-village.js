/**
 * Represents the bar scene
 */
var Village = (function () {

    // represents a bar tileset
    var bar_tile_size = 32, // The size of a tile (32×32)
        bar_column_tile_count = 25, // The number of tiles in a column of our background
        bar_row_tile_count = 19, // The number of tiles in a row of our background
        bar_tiles_per_row = 8, // The number of tiles per row in the tileset image
        tile_set_image,
        bg_canvas,
        bg_ctx,
        main_canvas,
        main_ctx,
        width = 800,
        height = 608,
        music = Sounds.music.amongTheClouds,
        starting_player_x = 0,
        starting_player_y = 0,
        floor = [
            [16, 16, 16, 16, 16, 16, 165, 166, 166, 166, 166, 166, 167, 168, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16],
            [24, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16],
            [32, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16],
            [40, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16],
            [48, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16],
            [56, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16],
            [64, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16],
            [72, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16],
            [80, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16],
            [88, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16],
            [16, 16, 16, 16, 16, 16, 165, 166, 166, 166, 166, 166, 167, 168, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16],
            [24, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16],
            [32, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16],
            [40, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16],
            [48, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16],
            [56, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16],
            [64, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16],
            [72, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16],
            [80, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16],
            [88, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16],
            [56, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16],
            [64, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16],
            [72, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16],
            [80, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16],
            [88, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16]
        ];

    function init() {
        bg_canvas = document.getElementById('bg');
        bg_ctx = bg_canvas.getContext('2d');

        main_canvas = document.getElementById('main');

        bg_canvas.width = width;
        bg_canvas.height = height;

        main_canvas.width = width;
        main_canvas.height = height;

        loadBar('assets/japanesevillage.png', function () {
            draw();
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
                console.log(r, c);
                var tile = floor[r][c];
                var tile_row = (tile / bar_tiles_per_row) | 0; // Bitwise OR operation
                var tile_col = (tile % bar_tiles_per_row) | 0;
                console.log(tile, tile_row, tile_col)
                console.log((tile_col * bar_tile_size), (tile_row * bar_tile_size), bar_tile_size, bar_tile_size, (c * bar_tile_size), (r * bar_tile_size), bar_tile_size, bar_tile_size);

                bg_ctx.drawImage(tile_set_image, (tile_col * bar_tile_size), (tile_row * bar_tile_size), bar_tile_size, bar_tile_size, (c * bar_tile_size), (r * bar_tile_size), bar_tile_size, bar_tile_size);
            }
        }
    }

    return {
        init: init,
        height: height,
        width: width,
        music: music,
        getCollisions: function () {
            return [];
        },
    }
})();
