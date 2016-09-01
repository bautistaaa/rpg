'use strict';

var Main = (function() {
    // A cross-browser requestAnimationFrame
    // See https://hacks.mozilla.org/2011/08/animating-with-javascript-from-setinterval-to-requestanimationframe/
    var requestAnimFrame = (function() {
        return window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function(callback) {
                window.setTimeout(callback, 1000 / 60);
            };
    })();

    var canvas,
        ctx,
        frame = 0,
        width = 608,
        height = 320,
        up = false,
        right = false,
        down = false,
        left = false,
        direction = 'down',
        sprite_index = 0,
        sprite_index_max = 3;

    var sprite_map = {
        'down': [[0, 0], [32, 0], [64, 0], [96, 0]],
        'left': [[0, 48], [32, 48], [64, 48], [96, 48]],
        'right': [[0, 96], [32, 96], [64, 96], [96, 96]],
        'up': [[0, 144], [32, 144], [64, 144], [96, 144]]
    };

    // The main game loop
    var last_time;

    function main() {
        var now = Date.now();
        var dt = (now - last_time) / 1000.0;

        clearCanvas();
        drawCharacter();
        frame++;
        last_time = now;
        requestAnimFrame(main);
    }

    function init() {
        canvas = document.getElementById('main');
        ctx = canvas.getContext('2d');

        document.addEventListener('keydown', keyDown, false);
        document.addEventListener('keyup', keyUp, false);

        main();
    }

    function keyDown(e) {
        if (e.keyCode === 68) { // d - right
            right = true;
        }
        if (e.keyCode === 83) { // s - down
            down = true;
        }
        if (e.keyCode === 65) { // a - left
            left = true;
        }
        if (e.keyCode === 87) { // w - up
            up = true;
        }
    }

    function keyUp(e) {
        if (e.keyCode === 68) { // d - right
            right = false;
        }
        if (e.keyCode === 83) { // s - down
            down = false;
        }
        if (e.keyCode === 65) { // a - left
            left = false;
        }
        if (e.keyCode === 87) { // w - up
            up = false;
        }
    }

    function drawCharacter() {
        if (up) { // w - up
            player.y -= 2;
            if (player.y <= 0) player.y = 0;
            direction = 'up';
            animateCharacter();
        }

        if (right) { // d - right
            player.x += 2;
            if (player.x + player.width >= width) player.x = width - player.width;
            direction = 'right';
            animateCharacter();
        }

        if (left) { // a - left
            player.x -= 2;
            if (player.x <= 0) player.x = 0;
            direction = 'left';
            animateCharacter();
        }

        if (down) { // s - down
            player.y += 2;
            if (player.y + player.height >= height) player.y = height - player.height;
            direction = 'down';
            animateCharacter();
        }

        player.draw(ctx, sprite_map[direction][sprite_index][0], sprite_map[direction][sprite_index][1]);
        // ctx.drawImage(player.image, sprite_map[direction][sprite_index][0], sprite_map[direction][sprite_index][1], 32, 48, player.x, player.y, 32, 48);
    }

    function animateCharacter() {
        // only increment every 15 frames
        if (frame % 15 === 0) {
            if (sprite_index === sprite_index_max) {
                sprite_index = -1;
            }

            sprite_index++;
        }
    }

    function clearCanvas() {
        ctx.clearRect(0, 0, width, height);
    }

    return {
        init: init,
    }
})();

Main.init();