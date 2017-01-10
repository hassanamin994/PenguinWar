var Exir = function(name,img, x, y) {
    Component.call(this, img, x, y, 30, 30, 'exir' + ZOMBIES.helpers.getRandom(1000000), 'exir');
};

Exir.prototype = Object.create(Component.prototype);
Exir.prototype.constructor = Exir;

