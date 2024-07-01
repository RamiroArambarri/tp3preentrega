class Bala {
    constructor(x, y, vx, vy) {
        this.mov = new Mov(x, y, vx, vy)
        this.diam = 10
        this.index;
    }

    actualizar() {
        this.mov.actualizar()
    }

    mostrar() {
        fill(255,255,255)
        ellipse(this.mov.pos.x, this.mov.pos.y, this.diam/2,this.diam)
    }

    evaluarLimite() {
        if(this.mov.pos.x < 0 - this.radio ||
            this.mov.pos.x > width - this.radio ||
            this.mov.pos.y < 0 - this.radio ||
            this.mov.pos.y > height - this.radio){
            balasBuenas.splice(this.index, 1)
        }
    }
}