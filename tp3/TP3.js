let jugador;
let radioJugador = 30;
let vMaxJugador = 600; //Velocidad del jugador en pixels por segundo
let imagenNave;
let balasBuenas = [];
let balasEnemigas = [];
let enemigos = [] 
let tiempoInicio
let tiempo = 0
let tiempoSiguiente = 0
let varGameOver = false;
let rectangulosFondo = []
let aceJugador = 10000
let anchoUI = 200;
let pantalla //0: pantalla de inicio. 1: nivel. 2: Has muerto. 3: Has ganado.
let imagenInicio
let imagenFondo1
let imagenFondo2
let imagenFondo3




function preload() {
  imagenNave = loadImage('imagenes/navecita.png')
  imagenInicio = loadImage('imagenes/pantalla_de_inicio.jpg')
  imagenEnemigo1 = loadImage('imagenes/enemigo1.png')
  imagenFondo1 = loadImage('imagenes/fondo1.png')
  imagenFondo2 = loadImage('imagenes/fondo2.png')
  imagenFondo3 = loadImage('imagenes/fondo3.png')
}

function setup() {
    createCanvas(600, 600);
    pantalla = 0
    jugador = new Jugador(width/2, height/2)
    jugador.radio = radioJugador;
    jugador.imagen = imagenNave
}

function draw() {
  if(pantalla == 0){
    pantallaInicio()
  }

    if(pantalla == 1){
      funcionesBasicas()
      desarrollo()
      dibujarUI()
    }

    if(varGameOver){
      gameOver()
    }
}

function pantallaInicio(){
  image(imagenInicio, 0,0 )
}

function funcionesBasicas() {
  fondo();
  jugador.actualizar();
  jugador.mostrar();
  jugador.disparar(balasBuenas);

  for(let i = 0; i < balasBuenas.length; i ++){
    balasBuenas[i].index = i;
    balasBuenas[i].actualizar()
    balasBuenas[i].mostrar()
    balasBuenas[i].evaluarLimite()
  }

  for(let i = 0; i < enemigos.length; i ++){
    enemigos[i].prop.index = i
    enemigos[i].actualizar()
    enemigos[i].mostrar()
    enemigos[i].evaluarVida()
  }
}

function desarrollo(){
  tiempo = millis() - tiempoInicio

  if(tiempo > 0 && tiempo < 20000 && tiempo >= tiempoSiguiente){
    enemigos.push(new Enemigo1(random(150, width - 150), -10, 0, 0))
    tiempoSiguiente = tiempo + 300
  }
}

function keyPressed(){
  if(pantalla == 0){
    tiempoInicio = millis()
    tiempo = 0
    pantalla = 1
  }  
  
  if(pantalla == 1){
    if(keyCode == UP_ARROW){
      jugador.movArriba = true;
    }
    if(keyCode == DOWN_ARROW){
      jugador.movAbajo = true;
    }
    if(keyCode == LEFT_ARROW){
      jugador.movIz = true;
    }
    if(keyCode == RIGHT_ARROW){
      jugador.movDer = true;
    }
  
    if(key == 'z'){
      jugador.disparar();
    }

    if(varGameOver){
      reiniciar()
    }
  }
  }
  
function keyReleased(){
  if(pantalla == 1){
    if(keyCode == UP_ARROW){
      jugador.movArriba = false;
    }
    if(keyCode == DOWN_ARROW){
      jugador.movAbajo = false;
    }
    if(keyCode == LEFT_ARROW){
      jugador.movIz = false;
    }
    if(keyCode == RIGHT_ARROW){
      jugador.movDer = false;
    }
  }
}
  

function gameOver() {
    pantalla = 0
    background('red')
    textSize(70);
    fill('white');
    text('Has perdido :(', width/8, height/2);
}

function reiniciar(){
    balasBuenas.splice(0, balasBuenas.length)
  
    for(let i = 0; i < enemigos.length; i ++){
      enemigos.splice(0, enemigos.length)
    }

    jugador.vida = 3
    jugador.mov.pos.x = width/2
    jugador.mov.pos.y = height/2

    tiempo = 0
    varGameOver = false
    pantalla = 1
}

function fondo() {
  background(0)
  tint(50,50,100)
  image(imagenFondo3,anchoUI,-imagenFondo3.height+height+2*frameCount%(imagenFondo3.height-height))
  tint(50,50,100)
  image(imagenFondo2,anchoUI,-imagenFondo2.height+height+5*frameCount%(imagenFondo2.height-height))
  tint(100,100,150)
  image(imagenFondo1,anchoUI,-imagenFondo1.height+height+10*frameCount%(imagenFondo1.height-height))
  noTint()
}


function dibujarUI() {
  fill(150)
  rect(0, 0, anchoUI, height)
}
