class Bala1 {
    constructor(x, y, vx, vy) {
        this.mov = new Mov(x, y, vx, vy); //Objeto Mov para controlar el movimiento de las balas
        this.diam = 15; //diámetro de las balas
        this.index; //variable que en cada fotograma guarda el número de indice de cada enemigo en el array de enemigos, a fin de poder eliminarse del array mediante un método del propio enemigo
    }

    actualizar() {
        this.mov.actualizar(); //Actualización del movimiento de las balas
        this.evaluarLimite()
    }

    mostrar() {
        //Método para mostrar las balas
        noStroke();
        fill(255,255,255);
        ellipse(this.mov.pos.x, this.mov.pos.y, this.diam/2,this.diam);
    }

    evaluarLimite() {
        //Método que evalúa si la bala salió del límite de la pantalla, y si es así, la elimina del array de balas
        if(this.mov.pos.y < - this.diam ||
            this.mov.pos.y > height - this.diam){
            balasBuenas.splice(this.index, 1);
            balaBuenaEliminada = true;
        }
    }
}