const Game = function () {
  this.world = new Game.World();

  this.update = function () {
    this.world.update();
  };
};

Game.prototype = {
  constructor: Game,
};

Game.World = function (friction = 0.9, gravity = 0.9) {
  this.collider = new Game.World.Collider();

  this.friction = friction;
  this.gravity = gravity;

  this.columns = 48;
  this.rows = 16;

  this.tileSet = new Game.World.TileSet(12, 16);
  this.player = new Game.World.Object.Player(100, 100);

  this.map = [
    10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
    10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 21, 22, 23, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
    10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 33, 34, 35, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
    10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 21, 22, 22, 22, 23, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
    10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 33, 34, 34, 34, 35, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
    10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 07, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
    10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
    10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
    10, 10, 00, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
    10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 07, 10, 10, 10, 02, 07, 02, 07, 02, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
    10, 10, 30, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 24, 25, 10,
    10, 29, 41, 31, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 30, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 24, 25, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 36, 37, 10,
    29, 41, 42, 41, 31, 10, 10, 10, 10, 10, 10, 44, 45, 45, 45, 46, 29, 41, 31, 10, 10, 10, 10, 10, 10, 10, 10, 44, 45, 46, 10, 10, 36, 37, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 36, 37, 10,
    00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00,
    00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00,
    00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00,
  ];
  this.collisionMap = [
    00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00,
    00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00,
    00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00,
    00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00,
    00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00,
    00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 15, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00,
    00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00,
    00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00,
    00, 00, 15, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00,
    00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 15, 00, 00, 00, 15, 15, 15, 15, 15, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00,
    00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 09, 03, 00,
    00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 09, 03, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 08, 02, 00,
    00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 08, 02, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 08, 02, 00,
    01, 01, 01, 01, 01, 01, 01, 01, 01, 01, 01, 01, 01, 01, 01, 01, 01, 01, 01, 01, 01, 01, 01, 01, 01, 01, 01, 01, 01, 01, 01, 01, 01, 01, 01, 01, 01, 01, 01, 01, 01, 01, 01, 01, 01, 01, 01, 01,
    01, 01, 01, 01, 01, 01, 01, 01, 01, 01, 01, 01, 01, 01, 01, 01, 01, 01, 01, 01, 01, 01, 01, 01, 01, 01, 01, 01, 01, 01, 01, 01, 01, 01, 01, 01, 01, 01, 01, 01, 01, 01, 01, 01, 01, 01, 01, 01,
    01, 01, 01, 01, 01, 01, 01, 01, 01, 01, 01, 01, 01, 01, 01, 01, 01, 01, 01, 01, 01, 01, 01, 01, 01, 01, 01, 01, 01, 01, 01, 01, 01, 01, 01, 01, 01, 01, 01, 01, 01, 01, 01, 01, 01, 01, 01, 01,
  ];

  this.height = this.tileSet.tileSize * this.rows; 
  this.width = this.tileSet.tileSize * this.columns;
};

Game.World.prototype = {
  constructor: Game.World,

  collideObject: function (object) {
    if (object.getLeft() < 0) {
      object.setLeft(0);
      object.velocityX = 0;
    } else if (object.getRight() > this.width) {
      object.setRight(this.width);
      object.velocityX = 0;
    }
    if (object.getTop() < 0) {
      object.setTop(0);
      object.velocityY = 0;
    } else if (object.getBottom() > this.height) {
      object.setBottom(this.height);
      object.velocityY = 0;
      object.jumping = false;
    }

    let bottom, left, right, top, value;

    top = Math.floor(object.getTop() / this.tileSet.tileSize);
    left = Math.floor(object.getLeft() / this.tileSet.tileSize);
    value = this.collisionMap[top * this.columns + left];
    this.collider.collide(
      value,
      object,
      left * this.tileSet.tileSize,
      top * this.tileSet.tileSize,
      this.tileSet.tileSize,
    );

    top = Math.floor(object.getTop() / this.tileSet.tileSize);
    right = Math.floor(object.getRight() / this.tileSet.tileSize);
    value = this.collisionMap[top * this.columns + right];
    this.collider.collide(
      value,
      object,
      right * this.tileSet.tileSize,
      top * this.tileSet.tileSize,
      this.tileSet.tileSize,
    );

    bottom = Math.floor(object.getBottom() / this.tileSet.tileSize);
    left = Math.floor(object.getLeft() / this.tileSet.tileSize);
    value = this.collisionMap[bottom * this.columns + left];
    this.collider.collide(
      value,
      object,
      left * this.tileSet.tileSize,
      bottom * this.tileSet.tileSize,
      this.tileSet.tileSize,
    );

    bottom = Math.floor(object.getBottom() / this.tileSet.tileSize);
    right = Math.floor(object.getRight() / this.tileSet.tileSize);
    value = this.collisionMap[bottom * this.columns + right];
    this.collider.collide(
      value,
      object,
      right * this.tileSet.tileSize,
      bottom * this.tileSet.tileSize,
      this.tileSet.tileSize,
    );
  },

  update: function () {
    this.player.updatePosition(this.gravity, this.friction);

    this.collideObject(this.player);

    this.player.updateAnimation();
  },
};

Game.World.Collider = function () {
  this.collide = function (value, object, tileX, tileY, tileSize) {
    switch (value) {
      case 1:
        this.collidePlatformTop(object, tileY);
        break;
      case 2:
        this.collidePlatformRight(object, tileX + tileSize);
        break;
      case 3:
        if (this.collidePlatformTop(object, tileY)) return; 
        this.collidePlatformRight(object, tileX + tileSize);
        break;
      case 4:
        this.collidePlatformBottom(object, tileY + tileSize);
        break;
      case 5:
        if (this.collidePlatformTop(object, tileY)) return;
        this.collidePlatformBottom(object, tileY + tileSize);
        break;
      case 6:
        if (this.collidePlatformRight(object, tileX + tileSize)) return;
        this.collidePlatformBottom(object, tileY + tileSize);
        break;
      case 7:
        if (this.collidePlatformTop(object, tileY)) return;
        if (this.collidePlatformRight(object, tileX + tileSize)) return;
        this.collidePlatformBottom(object, tileY + tileSize);
        break;
      case 8:
        this.collidePlatformLeft(object, tileX);
        break;
      case 9:
        if (this.collidePlatformTop(object, tileY)) return;
        this.collidePlatformLeft(object, tileX);
        break;
      case 10:
        if (this.collidePlatformLeft(object, tileX)) return;
        this.collidePlatformRight(object, tileX + tileSize);
        break;
      case 11:
        if (this.collidePlatformTop(object, tileY)) return;
        if (this.collidePlatformLeft(object, tileX)) return;
        this.collidePlatformRight(object, tileX + tileSize);
        break;
      case 12:
        if (this.collidePlatformLeft(object, tileX)) return;
        this.collidePlatformBottom(object, tileY + tileSize);
        break;
      case 13:
        if (this.collidePlatformTop(object, tileY)) return;
        if (this.collidePlatformLeft(object, tileX)) return;
        this.collidePlatformBottom(object, tileY + tileSize);
        break;
      case 14:
        if (this.collidePlatformLeft(object, tileX)) return;
        if (this.collidePlatformRight(object, tileX + tileSize)) return; 
        this.collidePlatformBottom(object, tileY + tileSize);
        break;
      case 15:
        if (this.collidePlatformTop(object, tileY)) return;
        if (this.collidePlatformLeft(object, tileX)) return;
        if (this.collidePlatformRight(object, tileX + tileSize)) return;
        this.collidePlatformBottom(object, tileY + tileSize);
        break;
    }
  };
};

Game.World.Collider.prototype = {
  constructor: Game.World.Collider,

  collidePlatformBottom: function (object, tile_bottom) {
    if (object.getTop() < tile_bottom && object.getOldTop() >= tile_bottom) {
      object.setTop(tile_bottom);
      object.velocityY = 0;
      return true;
    }
    return false;
  },

  collidePlatformLeft: function (object, tileLeft) {
    if (object.getRight() > tileLeft && object.getOldRight() <= tileLeft) {
      object.setRight(tileLeft - 0.01);
      object.velocityX = 0;
      return true;
    }
    return false;
  },

  collidePlatformRight: function (object, tileRight) {
    if (object.getLeft() < tileRight && object.getOldLeft() >= tileRight) {
      object.setLeft(tileRight);
      object.velocityX = 0;
      return true;
    }
    return false;
  },

  collidePlatformTop: function (object, tileTop) {
    if (object.getBottom() > tileTop && object.getOldBottom() <= tileTop) {
      object.setBottom(tileTop - 0.01);
      object.velocityY = 0;
      object.jumping = false;
      return true;
    }
    return false;
  },
};

Game.World.Object = function (x, y, width, height) {
  this.height = height;
  this.width = width;
  this.x = x;
  this.xOld = x;
  this.y = y;
  this.yOld = y;
};

Game.World.Object.prototype = {
  constructor: Game.World.Object,

  getBottom: function () {
    return this.y + this.height;
  },
  getLeft: function () {
    return this.x;
  },
  getRight: function () {
    return this.x + this.width;
  },
  getTop: function () {
    return this.y;
  },
  getOldBottom: function () {
    return this.yOld + this.height;
  },
  getOldLeft: function () {
    return this.xOld;
  },
  getOldRight: function () {
    return this.xOld + this.width;
  },
  getOldTop: function () {
    return this.yOld;
  },
  setBottom: function (y) {
    this.y = y - this.height;
  },
  setLeft: function (x) {
    this.x = x;
  },
  setRight: function (x) {
    this.x = x - this.width;
  },
  setTop: function (y) {
    this.y = y;
  },
  setOldBottom: function (y) {
    this.yOld = y - this.height;
  },
  setOldLeft: function (x) {
    this.xOld = x;
  },
  setOldRight: function (x) {
    this.xOld = x - this.width;
  },
  setOldTop: function (y) {
    this.yOld = y;
  },
};

Game.World.Object.Animator = function (frameSet, delay) {
  this.count = 0;
  this.delay = delay >= 1 ? delay : 1;
  this.frameSet = frameSet;
  this.frameIndex = 0;
  this.frameValue = frameSet[0];
  this.mode = 'pause';
};

Game.World.Object.Animator.prototype = {
  constructor: Game.World.Object.Animator,

  animate: function () {
    switch (this.mode) {
      case 'loop':
        this.loop();
        break;
      case 'pause':
        break;
    }
  },

  changeFrameSet(frameSet, mode, delay = 10, frameIndex = 0) {
    if (this.frameSet === frameSet) {
      return;
    }

    this.count = 0;
    this.delay = delay;
    this.frameSet = frameSet;
    this.frameIndex = frameIndex;
    this.frameValue = frameSet[frameIndex];
    this.mode = mode;
  },

  loop: function () {
    this.count++;

    while (this.count > this.delay) {
      this.count -= this.delay;

      this.frameIndex = this.frameIndex < this.frameSet.length - 1 ? this.frameIndex + 1 : 0;

      this.frameValue = this.frameSet[this.frameIndex];
    }
  },
};

Game.World.Object.Player = function (x, y) {
  Game.World.Object.call(this, 100, 194, 7, 14);
  Game.World.Object.Animator.call(
    this,
    Game.World.Object.Player.prototype.frameSets['idle-right'],
    10,
  );

  this.jumping = true;
  this.directionX = 1;
  this.velocityX = 0;
  this.velocityY = 0;
};

Game.World.Object.Player.prototype = {
  constructor: Game.World.Object.Player,

  frameSets: {
    'idle-left': [0],
    'jump-left': [1],
    'move-left': [2, 3, 4],
    'idle-right': [5],
    'jump-right': [6],
    'move-right': [7, 8, 9],
  },

  jump: function () {
    if (!this.jumping) {
      this.jumping = true;
      this.velocityY -= 12;
    }
  },

  moveLeft: function () {
    this.directionX = -1; 
    this.velocityX -= 0.55;
  },

  moveRight: function (frameSet) {
    this.directionX = 1;
    this.velocityX += 0.55;
  },

  updateAnimation: function () {
    if (this.velocityY < 0) {
      if (this.directionX < 0) this.changeFrameSet(this.frameSets['jump-left'], 'pause');
      else this.changeFrameSet(this.frameSets['jump-right'], 'pause');
    } else if (this.directionX < 0) {
      if (this.velocityX < -0.1) this.changeFrameSet(this.frameSets['move-left'], 'loop', 4);
      else this.changeFrameSet(this.frameSets['idle-left'], 'pause');
    } else if (this.directionX > 0) {
      if (this.velocityX > 0.1) this.changeFrameSet(this.frameSets['move-right'], 'loop', 4);
      else this.changeFrameSet(this.frameSets['idle-right'], 'pause');
    }

    this.animate();
  },

  updatePosition: function (gravity, friction) {

    this.xOld = this.x;
    this.yOld = this.y;
    this.velocityY += gravity;
    this.x += this.velocityX;
    this.y += this.velocityY;

    this.velocityX *= friction;
    this.velocityY *= friction + 0.1;
  },
};

Object.assign(Game.World.Object.Player.prototype, Game.World.Object.prototype);
Object.assign(Game.World.Object.Player.prototype, Game.World.Object.Animator.prototype);
Game.World.Object.Player.prototype.constructor = Game.World.Object.Player;

Game.World.TileSet = function (columns, tileSize) {
  this.columns = columns;
  this.tileSize = tileSize;

  const f = Game.World.TileSet.Frame;

  this.frames = [
    new f(160, 64, 16, 16, 0, -2), // idle-left

    new f(176, 64, 16, 16, 0, -2), // jump-left

    new f(144, 64, 16, 16, 0, -2),
    new f(128, 64, 16, 16, 0, -2),
    new f(112, 64, 16, 16, 0, -2), // walk-left

    new f(0, 64, 16, 16, 0, -2), // idle-right

    new f(80, 64, 16, 16, 0, -2), // jump-right

    new f(16, 64, 16, 16, 0, -2),
    new f(32, 64, 16, 16, 0, -2),
    new f(48, 64, 16, 16, 0, -2), // walk-right
  ];
};

Game.World.TileSet.prototype = { constructor: Game.World.TileSet };

Game.World.TileSet.Frame = function (x, y, width, height, offsetX, offsetY) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.offsetX = offsetX;
  this.offsetY = offsetY;
};

Game.World.TileSet.Frame.prototype = { constructor: Game.World.TileSet.Frame };
