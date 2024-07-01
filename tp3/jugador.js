class Jugador {
    constructor(x, y) {
        this.mov = new Mov(x, y, 0, 0);
        this.diam = 20;
        this.intDisparo = 10;
        this.contIntDisparo = 0;
        this.movIz = false;
        this.movDer = false;
        this.movArriba = false;
        this.movAbajo = false;
        this.vida = 3
        this.daño = false;
        this.escudo = false;
        this.tiempoGolpe = 0;
    }

    disparar(){
      if(this.contIntDisparo%this.intDisparo == 0){
        balasBuenas.push(new Bala(this.mov.pos.x, this.mov.pos.y, 0, -600))
      }
      this.contIntDisparo ++;
    }

    mostrar() {
      if(!this.daño) image(this.imagen, this.mov.pos.x - this.radio/2, this.mov.pos.y - this.radio/2, this.radio, this.radio)
      if(this.daño) {
        fill(255)
        circle(this.mov.pos.x, this.mov.pos.y, this.diam)
      }
    }

    evaluarDaño() {
      for(let i = 0; i < enemigos.length; i ++){
        if(dist(enemigos[i].prop.mov.pos.x, enemigos[i].prop.mov.pos.y, this.mov.pos.x, this.mov.pos.y) < this.diam/2 + enemigos[i].prop.diam/2){
          console.log('colision')
          this.vida --;
          this.escudo = true;
          this.daño = true
          this.tiempoGolpe = tiempo;
          if(this.vida <= 0){
            animacionGameOver = true;
          }
        }
      }
    }

    actualizar() {
      this.daño = false
      this.mov.ace.x = 0
      this.mov.ace.y = 0

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
          if(!this.movIz && !this.movDer){
            if (this.mov.vel.x < - aceJugador/frameRate()) {
              this.mov.ace.x = aceJugador
            } else if (this.mov.vel.x > aceJugador/frameRate()){
              this.mov.ace.x = -aceJugador
            } else {
              this.mov.vel.x = 0
            }
          }
          if(!this.movAbajo && !this.movArriba){
            if (this.mov.vel.y < - aceJugador/frameRate()) {
              this.mov.ace.y = aceJugador
            } else if (this.mov.vel.y > aceJugador/frameRate()){
              this.mov.ace.y = -aceJugador
            } else {
              this.mov.vel.y = 0
            }
          }

          if(!this.escudo){
            this.evaluarDaño()
          } else {
            if(tiempo - this.tiempoGolpe > 3){
              this.escudo = false
            }
          }

          this.mov.actualizar();
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
    }
}