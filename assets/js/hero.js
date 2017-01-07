var Hero = function (img, height, width) {
    var heroX = window.innerWidth / 2 - 25;
    var heroY = window.innerHeight - 150;
    Component.call(this, img, heroX, heroY, height, width, 'hero');
    this.HERO_MOVEMENT = 25;
    this.controller = {
        left: false,
        right: false,
        up: false,
        down: false,
        space: false
    };
};

Hero.prototype = Object.create(Component.prototype);
Hero.prototype.constructor = Hero;

Hero.prototype.moveLeft = function (isPressed) {
    this.controller.left = isPressed;
}

Hero.prototype.moveRight = function (isPressed) {
    this.controller.right = isPressed;
}

Hero.prototype.moveUp = function (isPressed) {
    this.controller.up = isPressed;
}

Hero.prototype.moveDown = function (isPressed) {
    this.controller.down = isPressed;
}

Hero.prototype.handelControllers = function () {
    if (this.controller.up) {
        this.y -= this.HERO_MOVEMENT;
        this.setPosition.call(this, this.x, this.y);
    }
    if (this.controller.down) {
        this.y += this.HERO_MOVEMENT;
        this.setPosition.call(this, this.x, this.y);
    }
    if (this.controller.left) {
        this.x -= this.HERO_MOVEMENT;
        this.setPosition.call(this, this.x, this.y);
        this.addClass('hero-go-left');
    } else {
        this.removeClass('hero-go-left');
    }
    if (this.controller.right) {
        this.x += this.HERO_MOVEMENT;
        this.setPosition.call(this, this.x, this.y);
        this.addClass('hero-go-right');
    } else {
        this.removeClass('hero-go-right');
    }

};

Hero.prototype.gotOut = function (x,y) {
    this.x = x;
    this.y = y;
};
