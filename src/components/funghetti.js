export default class Funghetti extends Phaser.GameObjects.Sprite {

    floorHeight;
    initialX;

    constructor(scene, x, y) {
        // Il costruttore della classe base Phaser.Scene prende come argomento la scena
		super(scene, x, y, "funghetti");
        scene.add.existing(this);
        this.setOrigin(0.5, 1);
        this.initialX = x;
        this.floorHeight = y;
        scene.physics.add.existing(this);
        this.body.setAllowGravity(false);
        this.body.setImmovable(true);
        this.healthy = false;

        this.initAnimations();
    }

    initAnimations() {
        //creiamo l'animazione della corsa del personaggio tramite lo spritesheet
        this.anims.create({
            key: "funghettiEvil",
            frames: this.anims.generateFrameNumbers("funghetti", {
                start: 0, //iniziamo dal primo frame
                end: 0, //e i primi 6 frame (fino alla fine della corsa)
            }),
            frameRate: 6, //aggiornimao l'immagine ogni 15 frame per rendere l'animazione non troppo rapida
            repeat: -1 //ripetiamo all'infinito la stessa animazione
        });
    
        this.anims.create({
            key: "funghettiHealthy",
            frames: this.anims.generateFrameNumbers("funghetti", {
                start: 1, //iniziamo dal primo frame
                end: 1, //e i primi 6 frame (fino alla fine della corsa)
            }),
            frameRate: 6, //aggiornimao l'immagine ogni 15 frame per rendere l'animazione non troppo rapida
            repeat: -1 //ripetiamo all'infinito la stessa animazione
        });

        this.anims.play("funghettiEvil");
    }

    manageAnimation() {
        const curr_anim = this.anims.currentAnim.key;   // Otteniamo il nome dell'animazione corrente

        if (this.healthy == true) {
            if (curr_anim != "funghettiHealthy") {
                this.anims.play("funghettiHealthy");
                //console.log(this.healthy);
            }
        } else if (this.healthy == false) {
            if (curr_anim != "funghettiEvil") {
                this.anims.play("funghettiEvil");
            }
        }
    }

}