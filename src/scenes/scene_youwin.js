export default class SceneYouWin extends Phaser.Scene {
    
    constructor(){
        super("scene_youwin");
    }

    init(){
        console.log("scene_youwin_init");
    }

    preload(){
        console.log("scene_youwin_pre");
        this.load.image("background_win", "assets/UI/HUD/Hai vinto.jpg");
        this.load.image("home_button", "assets/UI/home.png");
    }

    create(){
        console.log("scene_youwin_create");
        this.background = this.add.image(0, 0, "background_win");
        this.background.setOrigin(0, 0);

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
        console.log("scene_youwin_update");
    }
}