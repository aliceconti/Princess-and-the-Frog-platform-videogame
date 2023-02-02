export default class SceneWelcomeMenu extends Phaser.Scene {

    background;        // oggetto relativo all'elemento "sfondo"

    constructor(){
        // Il costruttore della classe base Phaser.Scene prende come argomento il nome della scena
		super("scene_welcome_menu");
    }

    init(){
        console.log("scene_welcome - Executing init()");
    }

    preload() {
        console.log("scene_welcome - Executing preload()");
        // Carichiamo gli asset grafici
        this.load.plugin('rexroundrectangleplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexroundrectangleplugin.min.js', true); 
        
        this.load.image("background_base", "assets/UI/HUD/copertina.jpg"); // carica l'immagine di sfondo
        this.load.image("platform", "assets/images/environment_elements/platform.png");
        this.load.image("barile", "assets/images/environment_elements/barile.png");
        this.load.image("gioco", "assets/UI/HUD/testo gioco.png");
        this.load.image("crediti", "assets/UI/HUD/testo crediti.png");
        this.load.image("storia", "assets/UI/HUD/testo storia.png");


        this.load.image("home_button", "assets/UI/home.png");
        this.load.image("freccia_button", "assets/UI/freccia.png");


        // Carichiamo l'immagine del giocatore in formato spritesheet (ci servirà nelle prossime scene)
        const player_spritesheet_config = {
            frameWidth:  160,
            frameHeight: 268,
        };
        this.load.spritesheet("playerrun", "assets/images/characters/Amelia.png", player_spritesheet_config);

        const fungo_spritesheet_config = {
            frameWidth:  300,
            frameHeight: 293,
        };
        this.load.spritesheet("fungo", "assets/images/characters/Fungo.png", fungo_spritesheet_config);

        const giusy_spritesheet_config = {
            frameWidth:  300,
            frameHeight: 720,
        };
        this.load.spritesheet("giusy", "assets/images/characters/Giusy.png", giusy_spritesheet_config);

        const rana_spritesheet_config = {
            frameWidth:  160,
            frameHeight: 270,
        };
        this.load.spritesheet("rana", "assets/images/characters/Rana.png", rana_spritesheet_config);

        const funghetti_spritesheet_config = {
            frameWidth:  159,
            frameHeight: 240,
        };
        this.load.spritesheet("funghetti", "assets/images/environment_elements/funghitutorial.png", funghetti_spritesheet_config);

        const acqua_spritesheet_config = {
            frameWidth:  1120,
            frameHeight: 200,
        };
        this.load.spritesheet("acqua", "assets/images/environment_elements/acquaanimated.png", acqua_spritesheet_config);

        const bolle_spritesheet_config = {
            frameWidth:  1120,
            frameHeight: 66,
        };
        this.load.spritesheet("bolle", "assets/images/environment_elements/bolle.png", bolle_spritesheet_config);

        const valvola_spritesheet_config = {
            frameWidth:  50,
            frameHeight: 50,
        };
        this.load.spritesheet("valvola", "assets/images/environment_elements/tubi/valvola.png", valvola_spritesheet_config);

        const weapon_spritesheet_config = {
            frameWidth:  125,
            frameHeight: 125,
        };
        this.load.spritesheet("waterbomb", "assets/images/weapons/waterbomb.png", weapon_spritesheet_config);
    }

    create() {
        console.log("scene_welcome - Executing create()");

        // Posizioniamo gli elementi nella scena
        this.background = this.add.image(0, 0, "background_base");
        this.background.setOrigin(0,0);
        //this.background.setScale(0.365, 0.3);


        //creo una immagine per il bottone. NB NON SEGUITE I TUTORIAL PER PHASER2, è stata completamente cambiata e non funzionano più
        this.gamebutton = this.add.image(this.game.config.width/2, this.game.config.height/2 + 17, "gioco");
        this.gamebutton.setOrigin(0.5, 0.5);
        this.gamebutton.setInteractive(); //imposta l'immagine in modo che possa essere cliccata

        this.gamebutton.on("pointerover", ()=>{
            this.gamebutton.setAlpha(0.7);
        });

        this.gamebutton.on("pointerout", ()=>{
            this.gamebutton.setAlpha(1);
        });

        this.gamebutton.on("pointerdown", ()=>{ //quando viene clickato il bottone succedono cose
            this.scene.start("scene_one");
        });
       


        this.storybutton = this.add.image(this.game.config.width/2, this.game.config.height/2 + 130, "storia");
        this.storybutton.setOrigin(0.5, 0.5);
        this.storybutton.setInteractive(); //imposta l'immagine in modo che possa essere cliccata

        this.storybutton.on("pointerover", ()=>{
            this.storybutton.setAlpha(0.7);
        });

        this.storybutton.on("pointerout", ()=>{
            this.storybutton.setAlpha(1);
        });

        this.storybutton.on("pointerdown", ()=>{ //quando viene clickato il bottone succedono cose
            this.scene.start("scene_text1");
        });


        this.creditsbutton = this.add.image(this.game.config.width/2, this.game.config.height/2 + 255, "crediti");
        this.creditsbutton.setOrigin(0.5, 0.5);
        this.creditsbutton.setInteractive(); //imposta l'immagine in modo che possa essere cliccata

        this.creditsbutton.on("pointerover", ()=>{
            this.creditsbutton.setAlpha(0.7);
        });

        this.creditsbutton.on("pointerout", ()=>{
            this.creditsbutton.setAlpha(1);
        });

        this.creditsbutton.on("pointerdown", ()=>{ //quando viene clickato il bottone succedono cose
            this.scene.start("scene_credits");
        });
    }

    update(){
        console.log("scene_welcome - Executing update()");
    }
};
