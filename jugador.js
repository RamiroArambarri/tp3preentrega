class Jugador {
    constructor(x, y) {
        this.mov = new Mov(x, y, 0, 0); //Objeto Mov para controlar el movimiento del jugador
        this.diam = 20; //Diámetro del jugador
        this.intDisparo = 200; //Intervalo entre disparos, medido en millis
        this.tiempoSigDisparo = 0; //Tiempo que falta para el siguiente disparo
        this.vida = 3 //Vida (cantidad de golpes que puede recibir)
        this.momentoGolpe; //momento en el que el jugador recibió el último golpe. 
        this.escudo = false; //Cuando el jugador recibe un golpe, se activa un escudo que dura 3 segundos
        //Propiedades para la interacción del usuario
        this.movIz = false;
        this.movDer = false;
        this.movArriba = false;
        this.movAbajo = false;

    }

    disparar(){
      if(tiempo>=this.tiempoSigDisparo){
        //Cada vez que el tiempo llega al tiempo del siguiente disparo, se añade una vala en la posición del jugador con una velozidad vertical de 600 hacia arriba
        balasBuenas.push(new Bala1(this.mov.pos.x, this.mov.pos.y, 0, -600))
        //Se recalcula el momento de la siguiente vala
        this.tiempoSigDisparo = tiempo + this.intDisparo
      }
     
    }

    mostrar() {
      //Se muestra la imágen del jugador en su posición correspondiente
      image(this.imagen, this.mov.pos.x - this.radio/2, this.mov.pos.y - this.radio/2, this.radio, this.radio)
      //Si el jugador tiene el escudo, se dibuja
      if(this.escudo) {
        stroke(255)
        strokeWeight(5)
        noFill()
        circle(this.mov.pos.x, this.mov.pos.y, 2*this.diam)
      }
    }

    evaluarDaño() {
      //Para cada enemigo, se evalúa si el jugador está colisionando con ese enemigo
      for(let i = 0; i < enemigos.length; i ++){
        if(dist(enemigos[i].prop.mov.pos.x, enemigos[i].prop.mov.pos.y, this.mov.pos.x, this.mov.pos.y) < this.diam/2 + enemigos[i].prop.diam/2){
          //Si ocurre la colisión, se le resta vida al jugador, se le pone el escudo, se guarda el dato del momento en el que se golpeó y se verifica si al jugador le queda vida
          this.vida --;
          this.escudo = true;
          this.momentoGolpe = tiempo;
          if(this.vida < 0){
            animacionGameOver = true;
          }
        }
      }
    }

    actualizar() {
      //La aceleración es 0 a menos que se esté tocando alguna recla
      this.mov.ace.x = 0
      this.mov.ace.y = 0

      //Si el jugador está tocando alguna tecla de dirección y la nave no llegó a su velocidad máxima, entonces se le adjudica una aceleración en la dirección correspondiente, igual a aceJugador
          if(jugador.movIz && this.mov.vel.x > - vMaxJugador){
            this.mov.ace.x = -aceJugador
          }
          if(jugador.movDer && this.mov.vel.x < vMaxJugador){
            this.mov.ace.x = aceJugador
          }
          if(jugador.movArriba && this.mov.vel.y > - vMaxJugador){
            this.mov.ace.y = -aceJugador
          }
          if(jugador.movAbajo && this.mov.vel.y < vMaxJugador){
            this.mov.ace.y = aceJugador
          }
          //Si no se están tocando teclas horizontales, el jugador va frenando horizontalmente.
          //Verifico que la velocidad es muy chica, al disminuirla en aceJugador, podría cambiar de dirección en vez de frenarse. Por eso verifico primero que la velocidad sea suficiente como para frenarse con la aceleración predeterminada
          if(!this.movIz && !this.movDer){
            if (this.mov.vel.x < - aceJugador/frameRate()) {
              this.mov.ace.x = aceJugador
            } else if (this.mov.vel.x > aceJugador/frameRate()){
              this.mov.ace.x = -aceJugador
            } else {
              //Si la velocidad es tan chica que al frenarse con la aceleración predeterminada cambiaría de dirección, entonces seteo directamente la velocidad en 0 
              this.mov.vel.x = 0
            }
          }
          //Idem con las velocidades verticales
          if(!this.movAbajo && !this.movArriba){
            if (this.mov.vel.y < - aceJugador/frameRate()) {
              this.mov.ace.y = aceJugador
            } else if (this.mov.vel.y > aceJugador/frameRate()){
              this.mov.ace.y = -aceJugador
            } else {
              this.mov.vel.y = 0
            }
          }
          //En base a las aceleraciones determinadas, actualizo el movimiento del jugador
          this.mov.actualizar();

          //Configuro las colisiones para que el jugador no pueda salirse de la pantalla
          if(this.mov.pos.x < anchoUI + this.diam/2) {
            this.mov.pos.x = anchoUI + this.diam/2
          } else if (this.mov.pos.x > width - this.diam/2) {
            this.mov.pos.x = width - this.diam/2
          }
          if(this.mov.pos.y < 0) {
            this.mov.pos.y = 0
          } else if (this.mov.pos.y > height - this.diam/2) {
            this.mov.pos.y = height - this.diam/2
          }

          //Si el jugador no tiene escudo, evalúo si está chocando con algún enemigo o bala enemiga
          if(!this.escudo){
            this.evaluarDaño()
          } else {
            //En cado de que el jugador tenga el escudo, verifico si ya transcurrió el tiempo para sacarlo.
            if(tiempo - this.momentoGolpe > 3000){
              this.escudo = false
            }
          }
    }
}