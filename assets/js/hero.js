
Hero.prototype = Object.create(Component.prototype);
Hero.prototype.constructor  = Hero;

function Hero(img,height,width) {
	Component.call(this,img,height,width);
	this.HERO_MOVEMENT = 5;
	this.controller = {
		left:false,
		right:false,
		up:false,
		down:false
	};

	var moveLeft = function (isPressed) {
		controller.left = isPressed;
	}

	var moveRight = function (isPressed) {
		controller.right = isPressed;
	}

	var moveUp = function (isPressed) {
		controller.up = isPressed;
	}

	var moveDown = function (isPressed) {
		controller.down = isPressed;
	}

	var handelControllers = function (argument) {
		if (this.controller.up) {
		    this.y -= HERO_MOVEMENT;
		  }
		  if (controller.down) {
		    this.y += HERO_MOVEMENT;
		  }
		  if (controller.left) {
		    this.x -= HERO_MOVEMENT;
		  }
		  if (controller.right) {
		    this.x += HERO_MOVEMENT;
		  }
		}

}


var newh = new Hero('img',20,30);
newh.

console.log(newh);
/*
var Hero = function () {

	
	/*
	


	
		
}
*/