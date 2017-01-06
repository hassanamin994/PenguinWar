var ZOMBIES = {
    init: function (options) {
        ZOMBIES.hero = new Hero('hero');

        document.onkeydown = function(evt) {
            ZOMBIES.toggleKey(evt.keyCode, true);
        };

        document.onkeyup = function(evt) {
            ZOMBIES.toggleKey(evt.keyCode, false);
        };
    },
    toggleKey : function (keyCode, isPressed) {
        if (keyCode == 37) {
            //controller.left = isPressed;
        }
        if (keyCode == 39) {
            //controller.right = isPressed;
        }
        if (keyCode == 38) {
            //controller.up = isPressed;
        }
        if (keyCode == 40) {
            //controller.down = isPressed;
        }
        if (keyCode == 32) {
            //controller.space = isPressed;
            ZOMBIES.hero.element.classList.add("hero-is-shoot");
        }
    },
    helpers: {
        getRandom : function (maxSize) {
            return parseInt(Math.random() * maxSize);
        }
    }
};

ZOMBIES.init();