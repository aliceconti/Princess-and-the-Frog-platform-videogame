export default class OrizontalBarile extends Phaser.GameObjects.Image {
    
    goingLeft;
    initialX;

    constructor(scene, x, y, i, v) {
        // Il costruttore della classe base Phaser.Scene prende come argomento la scena
		super(scene, x, y, "barile");
        scene.add.existing(this);

        this.initialX = x;
        this.floorHeight = y;
        this.goingLeft = true;
        this.i = i;
        this.v = v;

        scene.physics.add.existing(this);
        this.body.setAllowGravity(false);
        this.body.setImmovable(true);

        this.initAnimations();
    }

    initAnimations() {
        if(this.goingLeft) {
            this.body.setVelocityX(-this.v);
        } else {
            this.body.setVelocityX(this.v);
        }

        if(this.x < this.initialX - this.i) {
            this.goingLeft = false;
        } else if(this.x > this.initialX + this.i) {
                    this.goingLeft = true;
        }
    }
}