var Enemy = function(img, height, width) {
    var x = ZOMBIES.helpers.getRandom(GAME_WIDTH);
    var y = 40;

    Component.call(this, img, x, y, height, width, 'enemy' + ZOMBIES.helpers.getRandom(1000000), 'enemy');

    this.move = function () {
        this.y += 4;
        this.x += ZOMBIES.helpers.getRandom(7) - 3;
        this.setPosition(this.x, this.y);
    };

    Object.defineProperty(this, 'x', {
        get: function () {
            return x;
        },
        set: function (xinput) {
            x = xinput;
            if (x < this.w) {
                this.isGotOut = true;
            }
            if (x + this.w > GAME_WIDTH) {
                this.isGotOut = true;
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
            if (y < this.h) {
                this.isGotOut = true;
            }
            if (y > GAME_HEIGHT) {
                this.isGotOut = true;
            }
            this.element.style.top = y + 'px';
        }
    });
};

Enemy.prototype = Object.create(Component.prototype);
Enemy.prototype.constructor = Enemy;

Enemy.prototype.onDie = function () {
    this.addClass('explode');
    this.addClass('explode_ignite');
    this.element.style.width = null;
    this.element.style.height = null;
    this.element.children[0].style.display = 'none';
}
