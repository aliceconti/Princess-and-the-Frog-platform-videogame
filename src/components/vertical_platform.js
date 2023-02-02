export default class VerticalPlatform extends Phaser.GameObjects.Image {
    
    goingUp;
    initialY;

    constructor(scene, x, y, i, v, goingUp) {
        // Il costruttore della classe base Phaser.Scene prende come argomento la scena
		super(scene, x, y, "platform");
        scene.add.existing(this);

        this.initialY = y;
        this.goingUp = goingUp;
        this.i = i;
        this.v = v;

        scene.physics.add.existing(this);
        this.body.setAllowGravity(false);
        this.body.setImmovable(true);

        this.initAnimations();
    }

    initAnimations(z) {

        if(this.goingUp) {
            this.body.setVelocityY(-this.v);
        } else {
            this.body.setVelocityY(this.v);
        }

        if(this.y < this.initialY - this.i) {
            this.goingUp = false;
        } else if(this.y > this.initialY + this.i) {
                this.goingUp = true;
        }

    }
}