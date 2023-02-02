export default class SquarePlatform extends Phaser.GameObjects.Image {
    
    initialAngle;

    constructor(scene, x, y) {
        // Il costruttore della classe base Phaser.Scene prende come argomento la scena
		super(scene, x, y, "squared");
        scene.add.existing(this);

        this.initialY = y;
        this.initialX = x;

        this.floorHeight = y;
        this.press = false;

        scene.physics.add.existing(this);
        this.body.setAllowGravity(false);
        this.body.setImmovable(true);
    }

    squareAnimation(){
        if(this.x > this.initialX-100 && this.y >= this.initialY){
            this.body.setVelocityX(-400)
        }
        if(this.x <= this.initialX-100 && this.y >= this.initialY){
            this.body.setVelocityX(0)
        }
        if(this.x < this.initialX && this.y <= this.initialY-100){
            this.body.setVelocityX(420)
        }
        if(this.x >= this.initialX && this.y <= this.initialY-100){
            this.body.setVelocityX(0)
        }
        if(this.y > this.initialY-100 && this.x <= this.initialX-100){
            this.body.setVelocityY(-400)
        }
        if(this.y <= this.initialY-100 && this.x <= this.initialX-100){
            this.body.setVelocityY(0)
        }
        if(this.y < this.initialY && this.x >= this.initialX){
            this.body.setVelocityY(400)
        }
        if(this.y >= this.initialY && this.x >= this.initialX){
            this.body.setVelocityY(0)
        }

        if(this.press){
            this.body.setVelocity(0);
        }
    }
}