'use strict';

var Sounds = (function () {
    var currentMusic = '',
        currentMusicId = '',
        domain = location.protocol + '//' + location.host,
        fx = {
            bump    : new Audio(domain + '/assets/sounds/bump.wav'),
            door    : new Audio(domain + '/assets/sounds/door.wav'),
            enter   : new Audio(domain + '/assets/sounds/enter.wav'),
        },
        music = {
            amongTheClouds: domain + '/assets/sounds/among-the-clouds.ogg',
            dreamscape: domain + '/assets/sounds/dreamscape.ogg'
        },

        changeMusic = function changeMusic(newMusic) {
            if (currentMusic) {
                fade(currentMusic, 0);
            }

            Game.setGameLoading(true);

            currentMusic = new Audio(newMusic);

            currentMusic.canplaythrough = playMusic();
        },

        fade = function fade(sound, volume, callback) {
            var
                offset = 0.0001,
                steps = Math.abs(sound.volume - volume) / 0.0001;

            if (sound.volume > volume) {
                offset = -0.0001;
            }

            for (var i = 1; i <= steps; i++) {
                sound.volume += offset;
            }

            if (callback) {
                callback();
            }
        },

        playMusic = function playMusic() {
            console.log('play music now')
            Game.setGameLoading(false);
            currentMusic.loop = true;
            currentMusic.play();
        };

    return {
        changeMusic: changeMusic,
        fx: fx,
        music: music
    }
})();
