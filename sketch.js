let images= [];
let cards=[];
let card1 = null;
let card2 = null;
let initiated = true;
let visible;
let segundos = 0;
let minutos = 0;
let xButtonR = 275;
let yButtonR = 40;
let xButtonS = 60;
let yButtonS = 40;
let aciertos = 0;

function preload() {
  let indicator = 1;
  for (let index = 0; index < 8; index++) {
    images[index] = loadImage("imgs/Frame" + indicator + ".png");
    indicator++;
   }
}

function setup() {
 createCanvas(438, 667);

let xTemp= 65;
let yTemp = 200;
let tipos = [0,1,2,3,4,5,6,7,0,1,2,3,4,5,6,7]; shuffle(tipos,true);

for (let index = 0; index < 16; index++) {
     cards[index] = new Card (xTemp, yTemp,images, tipos[index]);
     xTemp +=80;
     if(xTemp >= 350){
       xTemp = 65;
       yTemp += 80;}
     }
     visible = true;
     temporizador();
  }

  function draw() {
    background(11, 22, 39); 
    cards.forEach((card)=> {
    card.pintar();
  });  
    validarSeleccionCarta();
    temporizador();

    fill (255);
    text ("Aciertos: "+ String(aciertos), 220,600);
   
    //BOTONES 
    //Start
  if(visible === true){
    noStroke();
    fill(113, 116, 146);
    rect(xButtonS, yButtonS, 130,40);
    textSize(16);
    fill(255);
    text("START", 100, 65);}


    //Reset
  if(visible === false){
    noStroke();
    fill(113, 116, 146);
    rect(xButtonR, yButtonR, 130,40);
    textSize(16);
    fill(255);
    text("RESET", 310, 65);}
  }

  function validarSeleccionCarta(){
     if (card1 !== null && card2 !== null) {
       if (card1.getTipo()=== card2.getTipo()) {
         completadoSeleccionCarta();
         aciertos++;
       } else {
         resetSeleccionCarta();
       }
     }   
   }
 
   function completadoSeleccionCarta(){
      initiated = false;
       card1.setShow(true); 
       card2.setShow(true);
       card1.setCompleted(true);
       card2.setCompleted(true);
       card1 = null;
       card2 = null;
       initiated = true;
   }

   function resetSeleccionCarta(){
    initiated = false;
    card1.setShow(false); 
    card2.setShow(false);
    card1.setCompleted(false);
    card2.setCompleted(false);
    card1 = null;
    card2 = null;
    initiated = true;

   }
   
   function temporizador(){
   
    if(frameCount % 60 == 0 && minutos >= 0){
      segundos++;
    }
    if(segundos == 60){
       minutos++;
       segundos = 0;
     }
    if(minutos < 0) {
      fill(255);
      textSize(23);
      text(minutos + "0:00", 60,65);
    }else if (segundos <= 9){
      fill(255);
      textSize(23);
      text(minutos + ":" + segundos, 60, 65);
    } else if (segundos > 9){
      fill(255);
      textSize(23);
      text(minutos + ":" + segundos, 60, 65);
    }
  }


   function mousePressed(){
   if(initiated){
    cards.forEach((card) => {
        if(card.validate(mouseX, mouseY)) {
          if(card1 == null){
            card1 = card;
            card.setShow(true);
            return true;
      }else if(card2 === null && card !== card1){
         card2 = card;
         card.setShow(true);
         return true;
         }
       } 
   });
 }
    
   //Button Start
   if(mouseX > xButtonS && mouseX < xButtonS + 130 && 
    mouseY > yButtonS && mouseY < yButtonS + 40
    && visible === true){
      visible = false;
      startGame = true;

      segundos = 0;
      minutos = 0;
    }
    
   //Button Reset 
    if(mouseX > xButtonR && mouseX < xButtonR + 130 && 
      mouseY > yButtonR && mouseY < yButtonR + 40
      && visible === false){
        visible = true;
  
        segundos = 0;
        minutos = 0;

        aciertos = 0;

        let xTemp= 65;
        let yTemp = 200;
        let types = [0,1,2,3,4,5,6,7,0,1,2,3,4,5,6,7]; shuffle(types,true);
        
        for (let index = 0; index < 16; index++) {
             cards[index] = new Card (xTemp, yTemp,images, types[index]);
             xTemp +=80;
             if(xTemp >= 350){
               xTemp = 65;
               yTemp += 80;}
  }
}  
}