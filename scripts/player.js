'use strict';

function Player(image_url) {
    this.x                = 300;
    this.y                = 150;
    this.speed            = 2;
    this.width            = 32;
    this.height           = 48;
    this.blocked          = false;
    this.image_url        = image_url;
    this.sprite_index     = 0;
    this.sprite_index_max = 3;

    this.sprite_map = {
        'down'  :     [[0, 0],   [32, 0],   [64, 0],   [96, 0]],
        'left'  :     [[0, 48],  [32, 48],  [64, 48],  [96, 48]],
        'right' :     [[0, 96],  [32, 96],  [64, 96],  [96, 96]],
        'up'    :     [[0, 144], [32, 144], [64, 144], [96, 144]]
    };
}

Player.prototype.draw = function (canvas, starting_x, starting_y) {
    canvas.drawImage(
        this.image(),
        this.sprite_map[Game.getCurrentDirection()][this.sprite_index][0],
        this.sprite_map[Game.getCurrentDirection()][this.sprite_index][1],
        this.width,
        this.height,
        starting_x || this.x,
        starting_y || this.y,
        this.width,
        this.height);
}

Player.prototype.image = function () {
    var sprite = new Image();
    sprite.src = this.image_url;

    return sprite;
}

Player.prototype.talk = function () {

}

Player.prototype.move = function () {
    if (Game.keyboardDirections.up) { // w - up
        if (!Game.checkCollision(this.x, this.y - this.speed, Game.stage().collision_map)) this.y -= this.speed; //make sure player doesn't collide
        if (this.y <= 0) this.y = 0;
        Game.setCurrentDirection(direction.up);
    }

    if (Game.keyboardDirections.right) { // d - right
        if (!Game.checkCollision(this.x + this.speed, this.y, Game.stage().collision_map)) this.x += this.speed; //make sure player doesn't collide
        if (this.x + this.width >= Game.stage().width) this.x = Game.stage().width - this.width;
        Game.setCurrentDirection(direction.right);
    }

    if (Game.keyboardDirections.left) { // a - left
        if (!Game.checkCollision(this.x - this.speed, this.y, Game.stage().collision_map)) this.x -= this.speed;
        if (this.x <= 0) this.x = 0;
        Game.setCurrentDirection(direction.left);
    }

    if (Game.keyboardDirections.down) { // s - down
        if (!Game.checkCollision(this.x, this.y + this.speed, Game.stage().collision_map)) this.y += this.speed;
        if (this.y + this.height >= Game.stage().height) this.y = Game.stage().height - this.height;
        Game.setCurrentDirection(direction.down);
    }

    if (Game.keyboardDirections.up ||
        Game.keyboardDirections.down ||
        Game.keyboardDirections.left ||
        Game.keyboardDirections.right) {
        this.animatePlayer();
    }
}

Player.prototype.animatePlayer = function () {
    // only increment every 15 frames
    if (Game.getFrame() % 15 === 0) {
        if (this.sprite_index === this.sprite_index_max) {
            this.sprite_index = -1;
        }

        this.sprite_index++;
    }
}