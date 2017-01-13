var Laser = function(img,height,width,x,y,direction){
	var laserId = "laser"+new Date().getTime();
	var classCss = 'laser';

	this.direction = direction;

	Component.call(this, img,x,y,height, width,laserId,classCss);

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
            if (y + this.h > GAME_HEIGHT) {
                this.isGotOut = true;
            }
            this.element.style.top = y + 'px';
        }
    });
};

Laser.prototype = Object.create(Component.prototype);
Laser.prototype.constractor = Laser;





