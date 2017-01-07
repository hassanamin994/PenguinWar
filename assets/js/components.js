var GAME_WIDTH = window.innerWidth-90;
var GAME_HEIGHT = window.innerHeight-50;

var Component = function(img,x,y,h,w,id,elementClass){
    this.img = img ;
    this.h = h ;
    this.w = w ;
    this.id = id ;
    this.x =x ;
    this.y = y;
    this.elementClass = elementClass ;
    this.createComponent() ;
    Object.defineProperty(this,'x',{
      get : function(){
        return x ;
      },
      set : function(xinput){
          x = xinput ;
        if(x < this.w ){
          x = this.w;
        }
        if(x + w > GAME_WIDTH ){

          x = GAME_WIDTH - w ;
        }

      }
    });
    Object.defineProperty(this,'y',{
      get : function() {
        return y ;
      },
      set : function(yinput){
        y = yinput
        if( y < this.h ){
          y = this.h ;
        }
        if(y + h > GAME_HEIGHT ){
          y = GAME_HEIGHT - h ;
        }
      }
    });
}
Component.prototype.move = function(){}
Component.prototype.createComponent = function(){
  this.element = document.createElement('img');
  this.element.src = this.img;
  this.element.id = this.id
  this.element.style.left = this.x +"px";
  this.element.style.top = this.y +"px";
  this.element.style.width = this.w+"px";
  this.element.style.height = this.h +"px";
  this.element.class = this.elementClass ;
  document.body.appendChild(this.element);
}
Component.prototype.setPosition = function(x,y){
  if(x){
    var e = document.getElementById(this.id);

    this.x= x  ;
    e.style.left = x + 'px';
  }
  if(y){
    var e = document.getElementById(this.id);
    this.y = y  ;
    e.style.top = y + 'px';
  }
}
Component.prototype.addClass = function(cls){
  this.element.classList.add(cls);
  this.elementClass =this.element.classList.value ;
}
Component.prototype.removeClass = function(cls){
  this.element.classList.remove(cls);
  this.elementClass =this.element.classList.value ;
}
Component.prototype.toggleClass = function(cls){
  if(this.element.classList.contains(cls)){
    this.element.removeClass(cls) ;
  }else{
    this.element.addClass(cls) ;
  }

}
Component.prototype.remove = function(cls){
  this.element.parentNode.removeChild(this.element) ;
  delete this ;
}


// addClass, removeClass, toggleClass , remove


// var component = new Component('/images/penguin.png',100,50);
// component.x = 10 ;
// component.y = 10 ;
// console.log(component.x) ;
//
// console.log(component.y) ;
// console.log(component.img) ;
// component.setPosition(200) ;
// console.log(component.x) ;
//
// console.log(component.y) ;
