export default class Valvola extends Phaser.GameObjects.Sprite {

    floorHeight;
    initialX;

    constructor(scene, x, y) {
        // Il costruttore della classe base Phaser.Scene prende come argomento la scena
		super(scene, x, y, "valvola");
        scene.add.existing(this);
        this.setOrigin(0.5, 0.5);
        this.initialX = x;
        this.floorHeight = y;
        this.movementOn = false;
        this.movementOff = false;
        scene.physics.add.existing(this);
        this.body.setAllowGravity(false);
        this.body.setImmovable(true);

        this.initAnimations();
    }

    initAnimations() {
        //creiamo l'animazione della corsa del personaggio tramite lo spritesheet
        this.anims.create({
            key: "valvolaOn",
            frames: this.anims.generateFrameNumbers("valvola", {
                start: 1, //iniziamo dal primo frame
                end: 17, //e i primi 6 frame (fino alla fine della corsa)
            }),
            frameRate: 50, //aggiornimao l'immagine ogni 15 frame per rendere l'animazione non troppo rapida
            repeat: 0
        });

        this.anims.create({
            key: "valvolaOff",
            frames: this.anims.generateFrameNumbers("valvola", {
                start: 18, //iniziamo dal primo frame
                end: 34, //e i primi 6 frame (fino alla fine della corsa)
            }),
            frameRate: 50, //aggiornimao l'immagine ogni 15 frame per rendere l'animazione non troppo rapida
            repeat: 0
        });
        
        this.anims.create({
            key: "valvolaStop",
            frames: this.anims.generateFrameNumbers("valvola", {
                start: 0, //iniziamo dal primo frame
                end: 0, //e i primi 6 frame (fino alla fine della corsa)
            }),
            frameRate: 15, //aggiornimao l'immagine ogni 15 frame per rendere l'animazione non troppo rapida
            repeat: -1
        });

        this.anims.play("valvolaStop");
    }

    manageAnimations() {
        const curr_anim = this.anims.currentAnim.key;   // Otteniamo il nome dell'animazione corrente

        if (this.movementOff == true) {
            if (curr_anim != "valvolaOff") {
                this.anims.play("valvolaOff");
            }
        } else if (this.movementOn == true) {
            if (curr_anim != "valvolaOn") {
                this.anims.play("valvolaOn");
                //console.log(this.movementOn);
            }
        } else {
            if (curr_anim != "valvolaStop") {
                this.anims.play("valvolaStop");
            }
        }
    }

}