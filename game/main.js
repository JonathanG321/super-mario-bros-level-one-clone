window.addEventListener('load', function (event) {
  // 'use strict';

  const AssetsManager = function () {
    this.tileSetImage = undefined;
  };

  AssetsManager.prototype = {
    constructor: Game.AssetsManager,

    loadTileSetImage: function (url, callback) {
      this.tileSetImage = new Image();

      this.tileSetImage.addEventListener(
        'load',
        function (event) {
          callback();
        },
        { once: true },
      );

      this.tileSetImage.src = url;
    },
  };

  const keyDownUp = function (event) {
    controller.keyDownUp(event.type, event.keyCode);
  };

  const resize = function (event) {
    display.resize(
      document.documentElement.clientWidth,
      document.documentElement.clientHeight,
      game.world.height / game.world.width,
    );
    display.render();
  };

  const render = function () {
    display.drawMap(
      assetsManager.tileSetImage,
      game.world.tileSet.columns,
      game.world.map,
      game.world.columns,
      game.world.tileSet.tileSize,
    );

    const frame = game.world.tileSet.frames[game.world.player.frameValue];

    display.drawObject(
      assetsManager.tileSetImage,
      frame.x,
      frame.y,
      game.world.player.x +
        Math.floor(game.world.player.width * 0.5 - frame.width * 0.5) +
        frame.offsetX,
      game.world.player.y + frame.offsetY,
      frame.width,
      frame.height,
    );

    display.render();
  };

  const update = function () {
    if (controller.left.active) {
      game.world.player.moveLeft();
    }
    if (controller.right.active) {
      game.world.player.moveRight();
    }
    if (controller.up.active) {
      game.world.player.jump();
      controller.up.active = false;
    }

    game.update();
  };

  const assetsManager = new AssetsManager();
  const controller = new Controller();
  const display = new Display(document.querySelector('canvas'));
  const game = new Game();
  const engine = new Engine(1000 / 30, render, update);

  display.buffer.canvas.height = game.world.height;
  display.buffer.canvas.width = game.world.width;
  display.buffer.imageSmoothingEnabled = false;

  assetsManager.loadTileSetImage('NES - Super Mario Bros - Tileset.png', () => {
    resize();
    engine.start();
  });

  window.addEventListener('keydown', keyDownUp);
  window.addEventListener('keyup', keyDownUp);
  window.addEventListener('resize', resize);
});
