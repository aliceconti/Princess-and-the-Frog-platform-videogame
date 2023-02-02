export default class Fungo extends Phaser.GameObjects.Sprite {

    floorHeight;
    initialX;

    constructor(scene, x, y) {
        // Il costruttore della classe base Phaser.Scene prende come argomento la scena
		super(scene, x, y, "fungo");
        scene.add.existing(this);
        this.setOrigin(0.5, 1);
        this.initialX = x;
        this.floorHeight = y;
        this.healthy = false;
        //this.setScale(3);   // Scala le dimensioni del giocatore
        scene.physics.add.existing(this);
        this.body.setAllowGravity(false);
        this.body.setImmovable(true);

        this.initAnimations();
    }

    initAnimations() {
        //creiamo l'animazione della corsa del personaggio tramite lo spritesheet
        this.anims.create({
            key: "fungoMove",
            frames: this.anims.generateFrameNumbers("fungo", {
                start: 0, //iniziamo dal primo frame
                end: 4, //e i primi 6 frame (fino alla fine della corsa)
            }),
            frameRate: 6, //aggiornimao l'immagine ogni 15 frame per rendere l'animazione non troppo rapida
            repeat: -1 //ripetiamo all'infinito la stessa animazione
        });

        this.anims.create({
            key: "fungoHealthy",
            frames: this.anims.generateFrameNumbers("fungo", {
                start: 5, //iniziamo dal primo frame
                end: 5, //e i primi 6 frame (fino alla fine della corsa)
            }),
            frameRate: 6, //aggiornimao l'immagine ogni 15 frame per rendere l'animazione non troppo rapida
            repeat: -1 //ripetiamo all'infinito la stessa animazione
        });

        this.anims.play("fungoMove");
    }

    manageAnimation() {
        const curr_anim = this.anims.currentAnim.key;   // Otteniamo il nome dell'animazione corrente

        if (this.healthy == true) {
            if (curr_anim != "fungoHealthy") {
                this.anims.play("fungoHealthy");
            }
        } else if (this.healthy == false) {
            if (curr_anim != "fungoMove") {
                this.anims.play("fungoMove");
            }
        }
    }

}