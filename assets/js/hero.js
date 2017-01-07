Hero.prototype = Object.create(Component.prototype);
Hero.prototype.constructor = Hero;

function Hero(img, height, width) {
    var heroX = window.innerWidth / 2 - 25;
    var heroY = window.innerHeight - 80;
    Component.call(this, img, heroX, heroY, height, width, 'hero');
    this.HERO_MOVEMENT = 5;
    this.controller = {
        left: false,
        right: false,
        up: false,
        down: false,
        space: false
    };
}

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
Hero.prototype.fire = function (isPressed) {
    this.controller.space = isPressed;
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

    if (this.controller.space) {
        var laser = new Laser('assets/images/heros/male-hero.png',20,5,this.x,this.y);
    }
}
