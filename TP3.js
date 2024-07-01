let jugador;
let radioJugador = 30;
let vMaxJugador = 600; //Velocidad del jugador en pixels por segundo
let balasBuenas = [];
let balasEnemigas = [];
let enemigos = [];
let enemigoEliminado = false; //variable que se activa cuando un enemigo es eliminado del array de enemigos
let balaBuenaEliminada = false; //variable que se activa cuando un bala es eliminada del array de balas
let tiempoInicio; //Millis en el inicio del juego
let tiempo = 0; //Millis transcurridos desde el inicio del juego
let tiempoSiguiente = 0; //Momento en el que ocurrirá el que ocurrirá el siguiente evento
let aceJugador = 10000; //Aceleración del jugador al tocar las teclas
let anchoUI = 200; //Ancho de la UI que está a la izquierda de la pantalla
let pantalla; //0: pantalla de inicio. 1: nivel. 2: Has muerto. 3: Has ganado.
let animacionGameOver = false; //Variable que se activa cuando el jugador muere, para mostrar la animación de la explosión (falta hacer)
let imagenNave;
let imagenInicio;
let imagenFondo1;
let imagenFondo2;
let imagenFondo3;

//Cargo los sprites
function preload() {
  imagenNave = loadImage('imagenes/navecita.png');
  imagenInicio = loadImage('imagenes/pantalla_de_inicio.jpg');
  imagenEnemigo1 = loadImage('imagenes/enemigo1.png');
  imagenFondo1 = loadImage('imagenes/fondo1.png');
  imagenFondo2 = loadImage('imagenes/fondo2.png');
  imagenFondo3 = loadImage('imagenes/fondo3.png');
}

function setup() {
  miCanvas = createCanvas(600, 600);
  contenedorCanvas = document.createElement('div')
  contenedorCanvas.append(miCanvas)
  contenedorCanvas.classList.add('contenedor_canvas')
  pantalla = 0;
  //Creo un objeto jugador y lo inicializo con las variables
  jugador = new Jugador(width / 2, height / 2);
  jugador.radio = radioJugador;
  jugador.imagen = imagenNave;
}

function draw() {
  if (pantalla == 0) {
    //Si pantalla vale 0, se dibuja la pantalla de inicio
    pantallaInicio();
  }

  if (pantalla == 1) {
    //Si pantalla vale 1, se desarrolla el nivel
    //funcionesBasicas() controla la mecánica general del juego, actualizar y mostrar los objetos, eliminar las balas que se van del escenario, etc.
    funcionesBasicas();
    //desarrollo() va leyendo el valor de la variable tiempo y añadiendo objetos en el escenario
    desarrollo();
    //dibujarUI dibuja la interfaz de usuario
    dibujarUI();
  }
}

function pantallaInicio() {
  image(imagenInicio, 0, 0);
}

function funcionesBasicas() {
  //dibujo el fondo
  fondo();
  //Actualizo la posición, estado de movimiento y daño del jugador, la presencia del escudo, la vida, y verifico que no esté muerto.
  jugador.actualizar();
  //El jugador dispara
  jugador.disparar();
  //Muestro la imágen del jugador
  jugador.mostrar();

  for (let i = 0; i < balasBuenas.length; i++) {
    //Le paso a cada bala su indice en le arreglo para poder eliminarlas desde un método propio cuando choquen o salgan del escenario
    balasBuenas[i].index = i;
    //Actualizo las posiciones de las balas, y las elimino en caso de que se vayan del escenario
    balasBuenas[i].actualizar();
    //Verifico si durante la actualización se eliminó la bala del array. En ese caso, en ese caso, el método splice() hace que todas las balas posteriores retrocedana ubicación en el array
    if (balaBuenaEliminada) {
      //retrocedo una posición en el bucle para volver a pasar por la posición i, que ahora es ocupada por otra bala
      i--
      //Vuelvo a setear balaBuenaEliminada en false
      balaBuenaEliminada = false;
      //Salto al siguiente valor de i ya que no quiero mostrar una bala que ya no está en el arreglo
      continue;
    }
    //Muestro las balas
    balasBuenas[i].mostrar();
  }

  for (let i = 0; i < enemigos.length; i++) {
    //Le paso a cada enemigo su indice en le arreglo para poder eliminarlos desde un método propio cuando mueran o salgan del escenario
    enemigos[i].prop.index = i;
    //Actualizo posiciones y daños de los enemigos, los elimino en caso de que hayan muerto
    enemigos[i].actualizar();
    //Idem que con las balas en el momento en el que se eliminan del array
    if (enemigoEliminado) {
      enemigoEliminado = false;
      i--
      continue;
    }
    //Muestro las imágenes de los enemigos
    enemigos[i].mostrar();
  }
}

function desarrollo() {
  //Calculo el tiempo actual
  tiempo = millis() - tiempoInicio;

  //Durante los primeros 20 segundos de juego quiero que aparezcan enemigos básicos cada 300 milisegundos
  if (tiempo > 0 && tiempo < 20000 && tiempo >= tiempoSiguiente) {
    enemigos.push(new Enemigo1(random(150, width - 150), -10, 0, 0));
    tiempoSiguiente = tiempo + 300;
  }
}

function keyPressed() {
  //Lógica de estados: si estoy en la pantalla de inicio, quiero que tocando cualquier tecla inicie el nivel.
  if (pantalla == 0) {
    iniciar();
  }

  if (pantalla == 1) {
    //Si estoy en la pantalla 1, al tocar las teclas quiero que el personaje se mueva. Guardo la información en las propiedades de mi objeto Jugador
    if (keyCode == UP_ARROW) {
      jugador.movArriba = true;
    }
    if (keyCode == DOWN_ARROW) {
      jugador.movAbajo = true;
    }
    if (keyCode == LEFT_ARROW) {
      jugador.movIz = true;
    }
    if (keyCode == RIGHT_ARROW) {
      jugador.movDer = true;
    }
  }
}

function keyReleased() {
  if (pantalla == 1) {
    //Si estoy en el nivel y suelto una tecla de dirección, quiero que el jugador deje de moverse en esa dirección.
    if (keyCode == UP_ARROW) {
      jugador.movArriba = false;
    }
    if (keyCode == DOWN_ARROW) {
      jugador.movAbajo = false;
    }
    if (keyCode == LEFT_ARROW) {
      jugador.movIz = false;
    }
    if (keyCode == RIGHT_ARROW) {
      jugador.movDer = false;
    }
  }
}

function iniciar() {
  //Función para iniciar (o reiniciar) el nivel.
  //Limpio los array de balas y de enemigos
  balasBuenas.splice(0, balasBuenas.length);
  enemigos.splice(0, enemigos.length);
  //Seteo la vida y posición inicial del jugador
  jugador.vida = 3;
  jugador.mov.pos.x = width / 2;
  jugador.mov.pos.y = height / 2;
  //inicializo el tiempo en 0 y guardo el tiempo de inicio
  tiempo = 0;
  tiempoInicio = millis();
  pantalla = 1;
}

function fondo() {
  //Dibujo el fondo, que consiste en tres capas que se mueven a distinta velcidad para dar un efecto tipo parallax
  background(0);
  tint(25, 25, 50);
  image(imagenFondo3, anchoUI, -imagenFondo3.height + height + 2 * frameCount % (imagenFondo3.height - height));
  tint(40, 40, 75);
  image(imagenFondo2, anchoUI, -imagenFondo2.height + height + 5 * frameCount % (imagenFondo2.height - height));
  tint(50, 50, 100);
  image(imagenFondo1, anchoUI, -imagenFondo1.height + height + 10 * frameCount % (imagenFondo1.height - height));
  noTint();
}


function dibujarUI() {
  //Dibujo la UI a la derecha de la pantalla
  noStroke();
  fill(150);
  rect(0, 0, anchoUI, height);
}
