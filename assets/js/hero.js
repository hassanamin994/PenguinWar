
Hero.prototype = Object.create(Component.prototype);
Hero.prototype.constructor  = Hero;

function Hero(img,height,width) {
	Component.call(this,img,height,width);
	this.element = document.createElement('img');
	this.element.src = img;
	this.element.id = 'hero';
	document.body.appendChild(this.element);
	this.HERO_MOVEMENT = 5;
	this.controller = {
		left:false,
		right:false,
		up:false,
		down:false,
		space:false
	};
}

	Hero.prototype.moveLeft = function (isPressed) {
		this.controller.left = isPressed;
		console.log(isPressed)
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

	Hero.prototype.handelControllers = function (argument) {
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

	
		

