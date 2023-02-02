export default class Waterbomb extends Phaser.GameObjects.Sprite {

        floorHeight;
        goingRight;
        initialX;
        stepLength;
        movementSemiLength;
    
        constructor(scene, x, y, stepLength, goingRight) {
            // Il costruttore della classe base Phaser.Scene prende come argomento la scena
            super(scene, x, y, "waterbomb");
            scene.add.existing(this);
            this.initialX = x;
            this.goingRight = goingRight;
            this.stepLength = stepLength;
            this.floorHeight = y;
            this.setScale(0.6, 0.6);   // Scala le dimensioni
            scene.physics.add.existing(this);
            this.body.setAllowGravity(false);

            this.fireAnimations();
        }
    
        fireAnimations() {
            //creiamo l'animazione della waterbomb tramite lo spritesheet

            this.anims.create({
                key: "waterbombStop",
                frames: this.anims.generateFrameNumbers("waterbomb", {
                    start: 0, //prendiamo un frame in cui il personaggio è fermo in una posizione ragionevole
                    end: 0, //e riusiamo lo stesso frame, questo vuol dire che non verrà cambiata l'immagine
                }),
                frameRate: 15, //aggiornimao l'immagine ogni 15 frame per rendere l'animazione non troppo rapida
                repeat: -1 //ripetiamo all'infinito la stessa animazione
            });

            this.anims.create({
                key: "waterbombFire",
                frames: this.anims.generateFrameNumbers("waterbomb", {
                    start: 1, //iniziamo dal primo frame
                    end: 5,
                }),
                frameRate: 15, //aggiornimao l'immagine ogni 15 frame per rendere l'animazione non troppo rapida
                repeat: -1 //ripetiamo all'infinito la stessa animazione
            });
            this.anims.play("waterbombStop");
        }

        manageAnimation() {
            const curr_anim = this.anims.currentAnim.key;   // Otteniamo il nome dell'animazione corrente

            if (this.body.velocity.x != 0) {
                this.flipX = this.body.velocity.x < 0;
            }

            if (this.body.velocity.x != 0) {
                if (curr_anim != "waterbombFire") {
                    this.anims.play("waterbombFire");
                }
            } else if (this.body.velocity.x == 0) {
                this.anims.play("waterbombStop");
            }
        }

        fire() {
            if (this.goingRight) {
                //this.anims.play("waterbombFire");
                this.body.setVelocityX(-600);
            } else {
                //this.anims.play("waterbombFire");
                this.body.setVelocityX(600);
            }
            this.manageAnimation();
        }
    
}