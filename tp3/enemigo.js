class PropEnemigos {
    constructor(x, y, vx, vy, vida, imagen) {
        this.mov = new Mov(x, y, vx, vy)
        this.vida = vida;
        this.diam = 25;
        this.index;
        this.daño = false;
        this.imagen = imagen
    }
    
    evaluarDaño(){
        for(let i = 0; i < balasBuenas.length; i ++){
            if(dist(balasBuenas[i].mov.pos.x, balasBuenas[i].mov.pos.y, this.mov.pos.x, this.mov.pos.y) < this.diam/2 + balasBuenas[i].diam/2){
                this.vida --
                this.daño = true
                balasBuenas.splice(i,1)
            }
        }
    }
    
    actualizar(){
        this.daño = false;
        this.mov.actualizar(tiempo)
        this.evaluarDaño()
    }

    mostrar() {
        image(this.imagen,this.mov.pos.x-this.diam/2,this.mov.pos.y-this.diam/2)
        if(this.daño == true){
            fill('white')
            circle(this.mov.pos.x, this.mov.pos.y, this.diam)
        }

    }

    evaluarVida(){
        if(this.vida <= 0){
            enemigos.splice(this.index, 1)
        }
    }
}

class Enemigo1 {
    constructor(x, y, vx, vy) {
        this.prop = new PropEnemigos(x, y, vx, vy, 1, imagenEnemigo1)
        this.fase = random(2*PI)
        this.posCentral = random(anchoUI + 100, width - 100)
    }
    actualizar(){
        this.prop.mov.pos.x = this.posCentral + 100*cos(tiempo*0.003 + this.fase)
        this.prop.mov.vel.y = 50
        this.prop.actualizar()
    }
    mostrar(){
        this.prop.mostrar()
    }
    evaluarVida(){
        this.prop.evaluarVida()
    }
    evaluarDisparo() {
        this.prop.valuarDaño()
    }
} 