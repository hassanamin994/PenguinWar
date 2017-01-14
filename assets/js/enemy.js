var Enemy = function(img, height, width, monster, xAxis, yAxis=100, direction = null) {
    var BLINDSIDE = 60 ;

    var x = BLINDSIDE + ZOMBIES.helpers.getRandom(GAME_WIDTH - BLINDSIDE);
    var y = 60;
    this.direction = direction;
    this.monster = false;
    if (xAxis) {
        x= xAxis;
        y=yAxis;
    }
    if (monster) {
        this.monster = true;
    }
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
    this.removeClass('infinite');
    this.addClass('explode');
    this.addClass('explode_ignite');
    this.element.style.width = null;
    this.element.style.height = null;
    this.element.children[0].style.display = 'none';
}
