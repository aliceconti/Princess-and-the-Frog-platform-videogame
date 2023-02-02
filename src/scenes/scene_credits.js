export default class Crediti extends Phaser.Scene {
    
    constructor(){
        super("scene_credits");
    }

    init(){
        console.log("scene_credits_init");
    }

    preload(){
        console.log("scene_credits_pre");
        this.load.image("background_crediti", "assets/UI/HUD/crediti.jpg");
    }

    create(){
        console.log("scene_credits_create");

        this.background = this.add.image(0, 0, "background_crediti");
        this.background.setOrigin(0,0);

        this.home_button = this.add.image(this.game.config.width - 80, 30, "home_button");
        this.home_button.setOrigin(0, 0);
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
    }

    update(){
        console.log("scene_credits_update");
    }


}