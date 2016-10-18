function Stage(stage_object) {
    this.stage_object = stage_object;
    this.collision_map = stage_object.getCollisions();
    this.width = stage_object.width;
    this.height = stage_object.height;
}

/**
 * Just going to assume all the stage_object will have an init function
 */
Stage.prototype.init = function () {
    Game.setGameLoading(true);

    // we will need to redraw the stage everytime this is called
    this.stage_object.init();
    Sounds.changeMusic(this.stage_object.music);
}