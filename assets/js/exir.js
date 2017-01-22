var Exir = function(config, x, y) {
    var img = "assets/images/exirs/" + config.IMAGE;
    this.config = config;
    Component.call(this, img, x, y, 30, 30, 'exir' + ZOMBIES.helpers.getRandom(1000000), 'exir');

    Object.defineProperty(this, 'y', {
            get: function () {
                return y;
            },
            set: function (yinput) {
                y = yinput
                if (y < this.h) {
                    this.isGotOut = true;
                }
                if (y + this.h > GAME_HEIGHT) {
                    this.isGotOut = true;
                }
                this.element.style.top = y + 'px';
            }
        });


};

Exir.prototype = Object.create(Component.prototype);
Exir.prototype.constructor = Exir;

