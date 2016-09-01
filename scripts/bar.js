var Bar = (function() {

    // represents a bar tileset
    var bar_tile_size = 32, // The size of a tile (32×32)
        bar_column_tile_count = 19, // The number of tiles in a column of our background
        bar_row_tile_count = 10, // The number of tiles in a row of our background
        bar_tiles_per_row = 8, // The number of tiles per row in the tileset image
        tile_set_image,
        bg_canvas,
        bg_ctx,
        main_canvas,
        main_ctx;

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

    var wall = [
        [16, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 16, 17, 17, 17, 17, 17, 17, 17],
        [24, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 24, 25, 25, 25, 25, 25, 25, 25],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        []
    ];

    // tile that will stop our player from moving
    var collidableTiles = [16, 17, 24, 25];

    function init() {
        bg_canvas = document.getElementById('bg');
        bg_ctx = bg_canvas.getContext('2d');

        main_canvas = document.getElementById('main');
        main_ctx = bg_canvas.getContext('2d');

        loadBar('assets/cafe.png', function() {
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
                var tile = floor[r][c];
                var tile_row = (tile / bar_tiles_per_row) | 0; // Bitwise OR operation
                var tile_col = (tile % bar_tiles_per_row) | 0;

                bg_ctx.drawImage(tile_set_image, (tile_col * bar_tile_size), (tile_row * bar_tile_size), bar_tile_size, bar_tile_size, (c * bar_tile_size), (r * bar_tile_size), bar_tile_size, bar_tile_size);

                tile = wall[r][c];
                tile_row = (tile / bar_tiles_per_row) | 0;
                tile_col = (tile % bar_tiles_per_row) | 0;

                // console.log(tile, tile_row, tile_col)
                // console.log((tile_col * bar_tile_size), (tile_row * bar_tile_size), bar_tile_size, bar_tile_size, (c * bar_tile_size), (r * bar_tile_size), bar_tile_size, bar_tile_size);

                main_ctx.drawImage(tile_set_image, (tile_col * bar_tile_size), (tile_row * bar_tile_size), bar_tile_size, bar_tile_size, (c * bar_tile_size), (r * bar_tile_size), bar_tile_size, bar_tile_size);
            }
        }
    }

    /**
     * Detect if player collides with objects
     */
    function handleCollision() {

    }

    return {
        init: init
    }
})();

Bar.init();
