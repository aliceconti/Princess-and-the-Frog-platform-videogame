export default class Rana extends Phaser.GameObjects.Sprite {

    floorHeight;
    initialX;

    constructor(scene, x, y) {
        // Il costruttore della classe base Phaser.Scene prende come argomento la scena
		super(scene, x, y, "rana");
        scene.add.existing(this);
        this.setOrigin(0.5, 1);
        this.initialX = x;
        this.floorHeight = y;
        this.healthy = false;
        this.setScale(0.4);   // Scala le dimensioni del giocatore
        scene.physics.add.existing(this);
        this.body.setAllowGravity(false);
        this.body.setImmovable(true);

        this.initAnimations();
    }

    initAnimations() {
        //creiamo l'animazione della corsa del personaggio tramite lo spritesheet
        this.anims.create({
            key: "ranaMove",
            frames: this.anims.generateFrameNumbers("rana", {
                start: 0, //iniziamo dal primo frame
                end: 6, //e i primi 6 frame (fino alla fine della corsa)
            }),
            frameRate: 5, //aggiornimao l'immagine ogni 15 frame per rendere l'animazione non troppo rapida
            repeat: -1 //ripetiamo all'infinito la stessa animazione
        });

        this.anims.create({
            key: "ranaHealthy",
            frames: this.anims.generateFrameNumbers("rana", {
                start: 2, //iniziamo dal primo frame
                end: 2, //e i primi 6 frame (fino alla fine della corsa)
            }),
            frameRate: 5, //aggiornimao l'immagine ogni 15 frame per rendere l'animazione non troppo rapida
            repeat: -1 //ripetiamo all'infinito la stessa animazione
        });

        this.anims.play("ranaMove");
    }

    manageAnimation() {
        const curr_anim = this.anims.currentAnim.key;   // Otteniamo il nome dell'animazione corrente

        if (this.healthy == true) {
            if (curr_anim != "ranaHealthy") {
                this.anims.play("ranaHealthy");
            }
        } else if (this.healthy == false) {
            if (curr_anim != "ranaMove") {
                this.anims.play("ranaMove");
            }
        }
    }

}