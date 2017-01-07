var GAME_WIDTH = 480 ;

var Component = function(img,h,w){
    this.img = img ;
    this.h = h ;
    this.w = w ;
    this.elementId = "" ;
    Object.defineProperty(this,'x',{
      get : function(){
        return x ;
      },
      set : function(xinput){
          x = xinput ;
        if(x < 20 ){
          x = 20
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
        if( y < 20 ){
          y = 20 ;
        }
        if(y + h > GAME_WIDTH ){
          y = GAME_WIDTH - h ;
        }
      }
    });
}
Component.prototype.move = function(){}
Component.prototype.setPosition = function(x,y){
  if(x){
    var e = document.getElementById(this.elementId);
    this.x= x  ;
    e.style.left = x + 'px';
  }
  if(y){
    var e = document.getElementById(this.elementId);
    this.y = y  ;
    e.style.top = y + 'px';
  }
}


var component = new Component('/images/penguin.png',100,50);
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
