
Hero.prototype = Object.create(Component.prototype);
Hero.prototype.constructor  = Hero;

function Hero(img,height,width) {
	Component.call(this,img,height,width);
	this.element = document.createElement('img');
	this.element.src = img;
	this.id = 'hero'
	this.element.id = this.id ;
	this.element.style.left = window.innerWidth/2 -25+"px";
	this.element.style.top = window.innerHeight-80 +"px";
	this.element.style.width = width+"px";
	this.element.style.height = height+"px";
	this.x = window.innerWidth/2 -25;
	this.y = window.innerHeight-80 ;
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

	
		

