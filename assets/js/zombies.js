var ZOMBIES = {
    init: function (options) {
        document.onkeydown = function(evt) {
            ZOMBIES.toggleKey(evt.keyCode, true);
        };

        document.onkeyup = function(evt) {
            ZOMBIES.toggleKey(evt.keyCode, false);
        };
    },
    toggleKey : function (keyCode, isPressed) {
        if (keyCode == LEFT_KEY) {
            //controller.left = isPressed;
        }
        if (keyCode == RIGHT_KEY) {
            //controller.right = isPressed;
        }
        if (keyCode == UP_KEY) {
            //controller.up = isPressed;
        }
        if (keyCode == DOWN_KEY) {
            //controller.down = isPressed;
        }
        if (keyCode == SPACE_KEY) {
            //controller.space = isPressed;
        }
    },
    helpers: {
        getRandom : function (maxSize) {
            return parseInt(Math.random() * maxSize);
        }
    }
};
