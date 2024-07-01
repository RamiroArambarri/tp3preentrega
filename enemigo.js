//Clase con las propiedades básicas de los enemigos, que me sirve para generar facilmente distintos tipos de enemigos. Todos los enemigos tendrán una propiedad prop, que contendrá un objeto PropEnemigos
class PropEnemigos {
    constructor(x, y, vx, vy, vida, imagen) {
        this.mov = new Mov(x, y, vx, vy); //Objeto Mov para controlar el movimiento de los enemigos
        this.vida = vida;
        this.diam = 25; //diametro de los enemigos
        this.index; //variable que en cada fotograma guarda el número de indice de cada enemigo en el array de enemigos, a fin de poder eliminarse del array mediante un método del propio enemigo
        this.imagen = imagen;
    }
    
    evaluarDaño(){
        //Para verificar si una bala golpeó al enemigo, se recorre el array de balas evaluando la colisión
        for(let i = 0; i < balasBuenas.length; i ++){
            if(dist(balasBuenas[i].mov.pos.x, balasBuenas[i].mov.pos.y, this.mov.pos.x, this.mov.pos.y) < this.diam/2 + balasBuenas[i].diam/2){
                //En caso de colisión con la bala, al enem igo se le resta vida y la bala se elimina del escenario
                this.vida --;
                balasBuenas.splice(i,1);
            }
        }
    }
    
    actualizar(){
        //Se actualiza el movimiento y se evalúa si una bala lo golpeó
        this.mov.actualizar();
        this.evaluarDaño();
        this.evaluarVida();
        this.evaluarLimite();
    }

    mostrar() {
        //Método para mostrar al enemigo
        image(this.imagen,this.mov.pos.x-this.diam/2,this.mov.pos.y-this.diam/2);
    }

    evaluarVida(){
        //En caso de que al enemigo no le quede vida, se elimina del array.
        if(this.vida <= 0){
            enemigos.splice(this.index, 1);
            enemigoEliminado = true;
        }
    }

    evaluarLimite() {
        //Método que evalúa si la bala salió del límite de la pantalla, y si es así, la elimina del array de balas
        if(this.mov.pos.y < - this.diam ||
            this.mov.pos.y > height + this.diam){
            enemigos.splice(this.index, 1);
            enemigoEliminado = true;
        }
    }
}

//Cláse para el primer tipo de enemigo
class Enemigo1 {
    constructor(x, y, vx, vy) {
        this.prop = new PropEnemigos(x, y, vx, vy, 1, imagenEnemigo1); //Un objeto PropEnemigos para las propiedades básicas
        this.fase = random(2*PI); //Como quiero que estos enemigos tengan un movimiento sinusoidal, les asigno una fase inicial aleatoria
        this.posCentral = random(anchoUI + 100, width - 100); //El movimiento sinusoidal está centrado en un eje, que asigno al azar
    }
    actualizar(){
        //Actualización del enemigo
        //La posición en x la controlo directamente fotograma a fotograma
        this.prop.mov.pos.x = this.posCentral + 100*cos(tiempo*0.003 + this.fase);
        //Asigno una velocidad vertical constante
        this.prop.mov.vel.y = 100;
        //Ejecuto las actualiaciones básicas que programé en el objeto PropEnemigos (movimiento y evaluación de daño)
        this.prop.actualizar();
    }
    //Los siguiente métodos me los copio del objeto PropEnemigos, para poder acceder a ellos directamente desde el objeto Enemigos1, sin tener que entrar al .prop.
    mostrar(){
        this.prop.mostrar();
    }
    evaluarVida(){
        this.prop.evaluarVida();
    }
    evaluarDisparo() {
        this.prop.valuarDaño();
    }
} 