var GAME_WIDTH = window.innerWidth - 90;
var GAME_HEIGHT = window.innerHeight - 50;

var Component = function (img, x, y, h, w, id, elementClass) {
    this.isGotOut = false;
    this.img = img;
    this.h = h;
    this.w = w;
    this.id = id;
    this.x = x;
    this.y = y;
    this.elementClass = elementClass;
    this.createComponent();

    Object.defineProperty(this, 'x', {
        get: function () {
            return x;
        },
        set: function (xinput) {
            x = xinput;
            if (x < this.w/4) {
                this.isGotOut = true;
                this.gotOut(this.w/4,this.y);
            }
            if (x + this.w/4 > GAME_WIDTH) {
                this.isGotOut = true;
                this.gotOut(GAME_WIDTH - this.w/4,this.y);
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
            if (y < this.h/2) {
                this.isGotOut = true;
                this.gotOut(this.x,this.h/2);
            }
            if (y + this.h/2 > GAME_HEIGHT) {
                this.isGotOut = true;
                this.gotOut(this.x,GAME_HEIGHT - this.h/2);
            }
            this.element.style.top = y + 'px';
        }
    });
};
Component.prototype.move = function () {
};
Component.prototype.createComponent = function () {
    this.element = document.createElement('img');
    this.element.src = this.img;
    this.element.id = this.id
    this.element.style.left = this.x + "px";
    this.element.style.top = this.y + "px";
    this.element.style.width = this.w + "px";
    this.element.style.height = this.h + "px";
    this.element.classList.add(this.elementClass);
    document.body.appendChild(this.element);
};
Component.prototype.setPosition = function (x, y) {
    if (x) {
        this.x = x;
    }
    if (y) {
        this.y = y;
    }
};
Component.prototype.addClass = function (cls) {
    this.element.classList.add(cls);
    this.elementClass = this.element.classList.value;
};
Component.prototype.removeClass = function (cls) {
    this.element.classList.remove(cls);
    this.elementClass = this.element.classList.value;
};
Component.prototype.toggleClass = function (cls) {
    if (this.element.classList.contains(cls)) {
        this.element.removeClass(cls);
    } else {
        this.element.addClass(cls);
    }

};
Component.prototype.remove = function () {
    this.element.parentNode.removeChild(this.element);
    delete this;
};

Component.prototype.gotOut = function (x,y) {};
