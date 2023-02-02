export default class Foglie extends Phaser.GameObjects.Image {

    initialY;

    constructor(scene, x, y) {
        // Il costruttore della classe base Phaser.Scene prende come argomento la scena
		super(scene, x, y, "foglia");
        scene.add.existing(this);

        this.initialY = y;
        this.collide = false;

        scene.physics.add.existing(this);
        this.body.setAllowGravity(false);
        this.body.setImmovable(true);

    }

    update() {
        if(this.collide){
            this.body.setVelocityY(30);
        }
    }
}