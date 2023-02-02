export default class Text3 extends Phaser.Scene {

    constructor(){
        super("scene_text3");
    }

    init(){
        console.log("scene_text3_init");
    }

    preload(){
        console.log("scene_text3_pre");

        this.load.image("home_button", "assets/UI/home.png");
        this.load.image("testo3", "assets/UI/HUD/testi/text3.jpg");
        this.load.image("play_button", "assets/UI/ricomincia.png");
    }

    create(){
        console.log("scene_text3_gameover");

        this.testo = this.add.image(this.game.config.width/2, this.game.config.height/2, "testo3");
        this.testo.setOrigin(0.5, 0.5);

        this.cameras.main.fadeIn(200, 0, 0, 0);
        //this.timedEvent = this.time.addEvent({ delay: 8000, callback: this.chiamaScena, callbackScope: this, loop: false });

        this.home_button = this.add.image(this.game.config.width - 30, 30, "home_button");
        this.home_button.setOrigin(1, 0);
        this.home_button.setInteractive(); //imposta l'immagine in modo che possa essere cliccata
        this.home_button.setScale(0.3, 0.3);

        this.home_button.on("pointerover", ()=>{
            this.home_button.setAlpha(0.7);
        });

        this.home_button.on("pointerout", ()=>{
            this.home_button.setAlpha(1);
        });

        this.home_button.on("pointerdown", ()=>{ //quando viene clickato il bottone succedono cose
            this.scene.start("scene_welcome_menu");
        });


        this.skip_button = this.add.image(this.game.config.width - 30, this.game.config.height - 30, "freccia_button");
        this.skip_button.setOrigin(1, 1);        
        this.skip_button.setInteractive(); //imposta l'immagine in modo che possa essere cliccata

        this.skip_button.on("pointerover", ()=>{
            this.skip_button.setAlpha(0.7);
        });

        this.skip_button.on("pointerout", ()=>{
            this.skip_button.setAlpha(1);
        });

        this.skip_button.on("pointerdown", ()=>{ //quando viene clickato il bottone succedono cose
            this.chiamaScena();
        });


        this.prev_button = this.add.image(30, this.game.config.height - 30, "freccia_button");
        this.prev_button.flipX = true;
        this.prev_button.setOrigin(0, 1);
        this.prev_button.setInteractive(); //imposta l'immagine in modo che possa essere cliccata

        this.prev_button.on("pointerover", ()=>{
            this.prev_button.setAlpha(0.7);
        });

        this.prev_button.on("pointerout", ()=>{
            this.prev_button.setAlpha(1);
        });

        this.prev_button.on("pointerdown", ()=>{ //quando viene clickato il bottone succedono cose
            this.chiamaScenaPrev();
        });
    }

    update(){
        console.log("scene_text3_gameover");
    }
    
    chiamaScena(){
        this.cameras.main.fadeOut(200, 0, 0, 0);
        this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () => {
            this.scene.start("scene_story3");
        });
    }

    chiamaScenaPrev(){
        this.cameras.main.fadeOut(200, 0, 0, 0);
        this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () => {
            this.scene.start("scene_story2");
        });
    }
}