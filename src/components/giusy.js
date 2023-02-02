export default class Giusy extends Phaser.GameObjects.Sprite {

    floorHeight;
    initialX;

    constructor(scene, x, y) {
        // Il costruttore della classe base Phaser.Scene prende come argomento la scena
		super(scene, x, y, "giusy");
        scene.add.existing(this);
        this.setOrigin(1, 1);
        this.initialX = x;
        this.floorHeight = y;
        this.setScale(0.8);
        scene.physics.add.existing(this);
        this.body.setAllowGravity(false);
        this.body.setImmovable(true);

        this.initAnimations();
    }

    initAnimations() {
        //creiamo l'animazione della corsa del personaggio tramite lo spritesheet
        this.anims.create({
            key: "giusyMove",
            frames: this.anims.generateFrameNumbers("giusy", {
                start: 0, //iniziamo dal primo frame
                end: 3, //e i primi 6 frame (fino alla fine della corsa)
            }),
            frameRate: 6, //aggiornimao l'immagine ogni 15 frame per rendere l'animazione non troppo rapida
            repeat: -1 //ripetiamo all'infinito la stessa animazione
        });
        this.anims.play("giusyMove");
    
        this.anims.create({
            key: "giusyHealthy",
            frames: this.anims.generateFrameNumbers("giusy", {
                start: 4, //iniziamo dal primo frame
                end: 4, //e i primi 6 frame (fino alla fine della corsa)
            }),
            frameRate: 6, //aggiornimao l'immagine ogni 15 frame per rendere l'animazione non troppo rapida
            repeat: -1 //ripetiamo all'infinito la stessa animazione
        });

        this.anims.play("giusyMove");
    }

    manageAnimation() {
        const curr_anim = this.anims.currentAnim.key;   // Otteniamo il nome dell'animazione corrente

        if (this.healthy == true) {
            if (curr_anim != "giusyHealthy") {
                this.anims.play("giusyHealthy");
            }
        } else if (this.healthy == false) {
            if (curr_anim != "giusyMove") {
                this.anims.play("giusyMove");
            }
        }
    }

}