class Pos {
    constructor(x, y){
        this.x = x;
        this.y = y;
    }
}

class Vel {
    constructor(x, y){
        this.x = x;
        this.y = y;
    }
}

class Ace {
    constructor(x, y){
        this.x = x;
        this.y = y;
    }
}

class Mov {
    constructor(x, y, vx, vy) {
        this.pos = new Pos(x, y)
        this.vel = new Vel(vx, vy)
        this.ace = new Ace(0, 0)
    }

    actualizar() {
        if(frameCount > 3) {
            this.vel.x += this.ace.x/frameRate();
            this.vel.y += this.ace.y/frameRate();
            this.pos.x += this.vel.x/frameRate();
            this.pos.y += this.vel.y/frameRate();
        }
    }
}