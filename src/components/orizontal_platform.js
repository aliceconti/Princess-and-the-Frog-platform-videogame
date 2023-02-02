export default class OrizontalPlatform extends Phaser.GameObjects.Image {
    
    goingLeft;
    initialX;

    constructor(scene, x, y) {
        // Il costruttore della classe base Phaser.Scene prende come argomento la scena
		super(scene, x, y, "platform");
        scene.add.existing(this);

        this.initialX = x;
        this.floorHeight = y;
        this.goingLeft = true;

        scene.physics.add.existing(this);
        this.body.setAllowGravity(false);
        this.body.setImmovable(true);

        this.initAnimations();
    }

    initAnimations() {
        if(this.goingLeft) {
            this.body.setVelocityX(-50);
        } else {
            this.body.setVelocityX(50);
        }

        if(this.x < this.initialX - 80) {
            this.goingLeft = false;
        } else if(this.x > this.initialX + 80) {
                    this.goingLeft = true;
        }
    }
}