'use strict';

var Game = (function () {
    // A cross-browser requestAnimationFrame
    // See https://hacks.mozilla.org/2011/08/animating-with-javascript-from-setinterval-to-requestanimationframe/
    var requestAnimFrame = (function () {
        return window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function (callback) {
                window.setTimeout(callback, 1000 / 60);
            };
    })();

    var canvas,
        ctx,
        frame = 0,
        prev_stage,
        stage,
        current_stage = stage,
        keyboard_directions = {
            up: false,
            right: false,
            down: false,
            left: false,
        },
        player,
        collision_type = {
            normal: 2,
            exit: 3
        },
        current_direction,
        last_time,
        loading = true;

    var loop = function loop() {
        var now = Date.now();
        var dt = (now - last_time) / 1000.0;

        clearCanvas();

        if (!loading) {
            update();
            draw();
        } else {
            // clearCanvas();
        }

        frame++;
        last_time = now;
        requestAnimFrame(loop);
    }

    var init = function init() {
        canvas = document.getElementById('main');
        ctx = canvas.getContext('2d');

        document.addEventListener('keydown', keyDown, false);
        document.addEventListener('keyup', keyUp, false);

        current_direction = direction.down,
        stage = new Stage(STAGES.BAR);
        player = new Player(PATHS.image_paths.main_character);

        stage.init();

        loop();
    }

    var keyDown = function keyDown(e) {
        if (e.keyCode === 68) { // d - right
            keyboard_directions.right = true;
        }
        if (e.keyCode === 83) { // s - down
            keyboard_directions.down = true;
        }
        if (e.keyCode === 65) { // a - left
            keyboard_directions.left = true;
        }
        if (e.keyCode === 87) { // w - up
            keyboard_directions.up = true;
        }

    }

    var keyUp = function keyUp(e) {
        if (e.keyCode === 68) { // d - right
            keyboard_directions.right = false;
        }
        if (e.keyCode === 83) { // s - down
            keyboard_directions.down = false;
        }
        if (e.keyCode === 65) { // a - left
            keyboard_directions.left = false;
        }
        if (e.keyCode === 87) { // w - up
            keyboard_directions.up = false;
        }

    }

    var update = function update() {
        player.move();
    }

    var draw = function draw() {
        player.draw(
            ctx
        );
    }

    var checkCollision = function checkCollision(x, y, collisions) {
        var xCol = Math.round(x / 32); // 32 should be set to tile.width
        var yRow = Math.ceil(y / 32); // 32 should be set to tile.height

        for (var ct = 0; ct < collisions.length; ct++) {
            if (collisions[yRow].length > xCol) {
                if (collisions[yRow][xCol] == collision_type.normal) {
                    return true;
                }

                if (collisions[yRow][xCol] == collision_type.exit) {
                    // now replace current stage and redraw main character in the appropriate x y coordinates
                    Sounds.fx.door.play();
                    stage = new Stage(STAGES.VILLAGE);
                    stage.init();
                }
            }
        }

        return false;
    }

    var clearCanvas = function clearCanvas() {
        ctx.clearRect(0, 0, stage.width, stage.height);
    }

    return {
        init: init,
        checkCollision: checkCollision,
        keyboardDirections: keyboard_directions,
        stage: function () {
            return stage;
        },
        getFrame: function () {
            return frame;
        },
        getCurrentDirection: function () {
            return current_direction;
        },
        setCurrentDirection: function (val) {
            current_direction = val;
        },
        setGameLoading: function (val) {
            loading = val;
        },
        getGameLoading: function () {
            return loading;
        }
    }
})();