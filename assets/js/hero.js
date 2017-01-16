var Hero = function (img, height, width) {
    var x = window.innerWidth / 2 - 25;
    var y = window.innerHeight - 150;
    this.live = 3;
    this.dieable = true;
    Component.call(this, img, x, y, height, width, 'hero');
    this.HERO_MOVEMENT = 25;
    this.controller = {
        left: false,
        right: false,
        up: false,
        down: false,
        space: false
    };

    Object.defineProperty(this, 'x', {
        get: function () {
            return x;
        },
        set: function (xinput) {
            x = xinput;
            if (x < this.w/4) {
                x = this.w/4;
            }
            if (x + this.w/4 > GAME_WIDTH) {
                x = GAME_WIDTH - this.w/4;
            }
            this.element.style.left = x + 'px';
        }
    });
    Object.defineProperty(this, 'y', {
        get: function () {
            return y;
        },
        set: function (yinput) {
            y = yinput
            if (y < this.h/2) {
                y = this.h/2;
            }
            if (y + this.h/2 > GAME_HEIGHT) {
                y = GAME_HEIGHT - this.h/2;
            }
            this.element.style.top = y + 'px';
        }
    });
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

Hero.prototype.onDieStyle = function () {
    this.addClass('explode');
    this.addClass('explode_ignite');
    this.element.style.width = null;
    this.element.style.height = null;
    this.element.children[0].style.display = 'none';
}
Hero.prototype.removeDieStyle = function () {
    this.removeClass('explode');
    this.removeClass('explode_ignite');
    this.element.style.width = 80;
    this.element.style.height = 80;
    this.element.children[0].style.display = 'block';
}

