export default class SceneGameOver extends Phaser.Scene{

    sceneName;

    constructor(){
        super("scene_gameover");
    }

    init(data){
        console.log("scene_gameover_init");
        this.sceneName = data.sceneName;
    }

    preload(){
        console.log("scene_gameover_pre");
        this.load.image("background_gameover", "assets/UI/HUD/Hai perso.jpg");
        this.load.image("si", "assets/UI/HUD/si.png");
        this.load.image("no", "assets/UI/HUD/no.png");
    }

    create(){
        console.log("scene_gameover_create");

        this.background = this.add.image(0, 0, "background_gameover");
        this.background.setOrigin(0,0);


        this.continuabutton = this.add.image(950, this.game.config.height/2+ 150, "si").setScale(0.24);
        this.continuabutton.setOrigin(0.5, 0.5);
        this.continuabutton.setInteractive(); //imposta l'immagine in modo che possa essere cliccata

        this.continuabutton.on("pointerover", ()=>{
            this.continuabutton.setAlpha(0.7);
        });

        this.continuabutton.on("pointerout", ()=>{
            this.continuabutton.setAlpha(1);
        });

        this.continuabutton.on("pointerdown", ()=>{ //quando viene clickato il bottone succedono cose
            this.scene.stop(this.sceneName);
            this.scene.stop();
            this.scene.start("scene_one");
        });


        this.rinunciabutton = this.add.image(1080, this.game.config.height/2 + 150, "no").setScale(0.24);
        this.rinunciabutton.setOrigin(0.5, 0.5);
        this.rinunciabutton.setInteractive(); //imposta l'immagine in modo che possa essere cliccata

        this.rinunciabutton.on("pointerdown", ()=>{ //quando viene clickato il bottone succedono cose
            this.scene.start("scene_welcome_menu");
        });

        this.rinunciabutton.on("pointerover", ()=>{
            this.rinunciabutton.setAlpha(0.7);
        });

        this.rinunciabutton.on("pointerout", ()=>{
            this.rinunciabutton.setAlpha(1);
        });
    }

    update(){
        console.log("scene_gameover_update");
    }


}