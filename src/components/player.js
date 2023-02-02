export default class Player extends Phaser.GameObjects.Sprite {

    cursorKeys;
    keySpace;
    initialPosition;
    floorHeight;
    stepLength;       // lunghezza del passo
    isJumping;        // verifichiamo se l'animazione del giocatore è già in salto o no
    maxWidth;
    launch;

    constructor(scene, x, y, maxWidth) {
        // Il costruttore della classe base Phaser.Scene prende come argomento la scena
		super(scene, x, y, "playerrun");
        scene.add.existing(this);
        this.initialPosition = x;
        this.floorHeight = y;
        this.setOrigin(0, 1); // Punto pivot in basso a sinistra
        this.setScale(0.38);   // Scala le dimensioni del giocatore

        // Inizializziamo i valori di alcune proprietà
        this.isJumping = false; //di default il giocatore non sta saltando
        //this.stepLength  = 20;    //non serve
        this.maxWidth = maxWidth;

        // Recuperiamo i riferimenti (oggetti) ai tasti cursore
        this.cursorKeys = scene.input.keyboard.createCursorKeys();

        // Recuperiamo il riferimento al tasto SPAZIO
        this.keySpace = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        this.launch = false;
        this.valvola = false;
        this.initAnimations();
    }

    initAnimations() {
        //creiamo l'animazione della corsa del personaggio tramite lo spritesheet
        this.anims.create({
            key: "playerMove",
            frames: this.anims.generateFrameNumbers("playerrun", {
                start: 2, //iniziamo dal primo frame
                end: 10, //e i primi 6 frame (fino alla fine della corsa)
            }),
            frameRate: 20, //aggiornimao l'immagine ogni 15 frame per rendere l'animazione non troppo rapida
            repeat: -1 //ripetiamo all'infinito la stessa animazione
        });

        //creiamo l'animazione del personaggio che sta fermo
        this.anims.create({
            key: "playerStop",
            frames: this.anims.generateFrameNumbers("playerrun", {
                start: 0, //prendiamo un frame in cui il personaggio è fermo in una posizione ragionevole
                end: 0, //e riusiamo lo stesso frame, questo vuol dire che non verrà cambiata l'immagine
            }),
            frameRate: 15, //aggiornimao l'immagine ogni 15 frame per rendere l'animazione non troppo rapida
            repeat: -1 //ripetiamo all'infinito la stessa animazione
        });

        //creiamo l'animazione del salto del personaggio tramite lo spritesheet
        this.anims.create({
            key: "playerJump",
            frames: this.anims.generateFrameNumbers("playerrun", {
                start: 11, //iniziamo dal primo frame
                end: 12, //e i primi 10 frame (fino alla fine della corsa)
            }),
            frameRate: 6, //aggiornimao l'immagine ogni 15 frame per rendere l'animazione non troppo rapida
            repeat: -1
        });

        this.anims.create({
            key: "playerLaunching",
            frames: this.anims.generateFrameNumbers("playerrun", {
                start: 1, //iniziamo dal primo frame
                end: 1, //e i primi 10 frame (fino alla fine della corsa)
            }),
            frameRate: 6, //aggiornimao l'immagine ogni 15 frame per rendere l'animazione non troppo rapida
            repeat: -1
        });

        this.anims.create({
            key: "playerValvola",
            frames: this.anims.generateFrameNumbers("playerrun", {
                start: 13, //iniziamo dal primo frame
                end: 15, //e i primi 10 frame (fino alla fine della corsa)
            }),
            frameRate: 6, //aggiornimao l'immagine ogni 15 frame per rendere l'animazione non troppo rapida
            repeat: -1
        });

        this.anims.play("playerStop"); //facciamo partire l'animazione del personaggio, questa volta fermo
    }

    manageAnimations() {
        // Gestiamo separatamente le animazioni

        const curr_anim = this.anims.currentAnim.key;   // Otteniamo il nome dell'animazione corrente

        if (this.body.velocity.x != 0) {
            this.flipX = this.body.velocity.x < 0;
        }

        if (this.launch == true) {
            if (curr_anim != "playerLaunching") {
                this.anims.play("playerLaunching");
            }
        }else if (this.valvola == true) {
            if (curr_anim != "playerValvola") {
                this.anims.play("playerValvola");
                //console.log(this.valvola);
            }
        } else if (this.body.velocity.y != 0 && !this.body.touching.down) {
            // Se mi sto muovendo verticalmente, l'animazione
            // è sempre playerJump
            if (curr_anim != "playerJump") {
                this.anims.play("playerJump");
            }
            
        } else if (this.body.velocity.x != 0) {
            // Se invece non mi muovo verticalmente, ma mi muovo
            // orizzontalmente, eseguirò l'animazione di Move
            if (curr_anim != "playerMove") {
                this.anims.play("playerMove");
            }
            // e configurerò il flip corretto.
        } else {
            // Per finire, se il giocatore è fermo sia sulla x che sulla y
            // possiamo fermarlo
            this.anims.play("playerStop");
        }
    }

    manageMovements() {
        // E' stato premuto il tasto freccia sinistra e il giocatore è a destra del limite sinistro del quadro?
        if (this.cursorKeys.right.isDown && this.x >= -500 && this.x < 0 && this.body.touching.down) {
            this.body.setVelocityX(250);// Velocità per spostamento verso sinistra -> non serve steplenght

        } else if (this.cursorKeys.left.isDown && this.x > -500 && this.x < 0 && this.body.touching.down) {
            this.body.setVelocityX(-250);// Velocità per spostamento verso sinistra -> non serve steplenght

        } else if (this.cursorKeys.right.isDown && this.x > -500 && this.x < 0 && !this.body.touching.down){
            this.body.setVelocityX(197); // Velocità per spostamento verso destra

        }  else if (this.cursorKeys.left.isDown && this.x > -500 && this.x < 0 && !this.body.touching.down){
            this.body.setVelocityX(-197); // Velocità per spostamento verso destra

        } else if (this.cursorKeys.left.isDown && this.x >= 0 && this.body.touching.down) {
            this.body.setVelocityX(-290);// Velocità per spostamento verso sinistra -> non serve steplenght

        } else if (this.cursorKeys.right.isDown && this.x <= this.maxWidth - this.displayWidth && this.body.touching.down){
            this.body.setVelocityX(290); // Velocità per spostamento verso destra

        } else if (this.cursorKeys.right.isDown && this.x <= this.maxWidth - this.displayWidth && !this.body.touching.down){
            this.body.setVelocityX(237); // Velocità per spostamento verso destra

        }  else if (this.cursorKeys.left.isDown && this.x > -500 && !this.body.touching.down){
            this.body.setVelocityX(-237); // Velocità per spostamento verso destra

        } else {
            // In questa condizione non è stato premuto alcun tasto e possiamo fermare il giocatore
            // rispetto alla X
            this.body.setVelocityX(0); 
        }

        if (this.keySpace.isDown && this.body.touching.down) {
            if (!this.isJumping) {
                this.isJumping = true;
                this.body.setVelocityY(-350);  // Salto (caso con l'introduzione della fisica)
            }
        }

        // Se il giocatore non sta premendo la barra spaziatrice e il personaggio è con
        // i piedi per terra, non c'è salto oppure è stato già gestito...
        if (this.keySpace.isUp && this.y >= this.floorHeight) {
            this.isJumping = false;
        }

        if (this.valvola) {
            this.body.setVelocityX(0);
            this.body.setVelocityY(0);
        }

        // Gestiamo le animazioni separatamente
        this.manageAnimations();
    }

    autoPlay() {
        this.body.setVelocityX(250);
        this.manageAnimations();
    }

    die() {
        this.scene.start("scene_gameover");
    }

}