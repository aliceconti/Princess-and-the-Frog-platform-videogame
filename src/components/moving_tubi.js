export default class MovingTubi extends Phaser.GameObjects.Image {
    
    goingUp;
    initialY;

    constructor(scene, x, y, nome, i, up, down) {
        // Il costruttore della classe base Phaser.Scene prende come argomento la scena
		super(scene, x, y, nome);
        scene.add.existing(this);

        this.initialY = y;
        this.goingUp = i;
        this.press = false;
        this.up = up;
        this.down = down;

        scene.physics.add.existing(this);
        this.body.setAllowGravity(false);
        this.body.setImmovable(true);
    }

    movingAnimation() {
        if(this.press){
            this.body.setVelocityY(0);
        } else {
            if(this.goingUp) {
                this.body.setVelocityY(-180);
            } else {
                this.body.setVelocityY(180);
            }

            if(this.y < this.initialY - this.up) {
                this.goingUp = false;
            } else if(this.y > this.initialY + this.down) {
                this.goingUp = true;
            }
        }

    }
}