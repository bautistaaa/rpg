'use strict';

var player = {
    x: 300,
    y: 150,
    width: 32,
    height: 48,
    blocked: false,
    image: function() {
        var sprite = new Image();
        sprite.src = "assets/sailor-moon.png";

        return sprite;
    },
    draw: function(canvas, sprite_x, sprite_y) {
        canvas.drawImage(player.image(), sprite_x, sprite_y, player.width, player.height, player.x, player.y, player.width, player.height);
    },
    talk: function() { }
};