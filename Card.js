// un comentariu
class Card{
    constructor( x, y, image, tipo){
    
    
    this.x = x;
    this.y = y;
    this.tipo = tipo;
    this.image = image[tipo];
    this.show = false;
    this.completed = false;
    this.score = 50;
    }
    
    pintar(){
    if (!this.completed){
     if(!this.show){
        // rectMode(CENTER);
         noStroke();
         fill (255);
         rect(this.x, this.y, 70, 70);
        }else{
         image(this.image, this.x, this.y);
        }
    } else {
        // imageMode(CENTER);
         image(this.image,this.x, this.y);
     }
    }
    
    validate(dx, dy){
    let result = false;
    if(dx > this.x && dx < this.x + 70 && 
       dy > this.y && dy < this.y + 70 && 
       !this.show &&
       !this.completed){
         result = true;
    }
     return result;
    }
     
    setCompleted(completed){
        this.completed = completed; 
    }
    
    setShow(show){
        this.show = show;
    }
    getTipo(){
        return this.tipo;
    }
    getCompleted(){
        return this.completed;
    }
    getShow(){
         return this.show;
    }
    
    }