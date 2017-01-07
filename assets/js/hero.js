
Hero.prototype = Object.create(Component.prototype);
Hero.prototype.constructor  = Hero;

function Hero(img,height,width) {
	var heroX = window.innerWidth/2 -25;
	var heroY =  window.innerHeight-80;
	Component.call(this, img, heroX, heroY, height, width,'hero');
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
		console.log('left');
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

	Hero.prototype.handelControllers = function () {
		if (this.controller.up) {
			console.log(this.y);
		    this.y -= this.HERO_MOVEMENT ;
		    this.setPosition.call(this,this.x , this.y ) ;

			console.log(this.y);
		  }
		  if (this.controller.down) {
		    this.y += this.HERO_MOVEMENT;
		    this.setPosition.call(this,this.x , this.y ) ;
		  }
		  if (this.controller.left) {
		    this.x -= this.HERO_MOVEMENT;
		    this.setPosition.call(this,this.x , this.y ) ;
		  }
		  if (this.controller.right) {
		    this.x += this.HERO_MOVEMENT;
		    this.setPosition.call(this,this.x , this.y ) ;
		  }
		}
