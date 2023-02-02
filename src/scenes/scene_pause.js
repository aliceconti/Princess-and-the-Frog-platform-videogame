export default class Pausa extends Phaser.Scene {

    sceneName;

    constructor(){
        super("scene_pause");
    }

    init(data){
        console.log("scene_pause_init");
        this.sceneName = data.sceneName;
    }

    preload(){
        console.log("scene_pause_pre");
    
        this.load.image("background_pause", "assets/UI/cartello_pausa.png");
        this.load.image("play_button", "assets/UI/ricomincia.png");
        this.load.image("home_button", "assets/UI/home.png");
        this.load.image("restart_button", "assets/UI/restart.png");
    }

    create(){
        console.log("scene_pause_create");
        this.background = this.add.image(this.game.config.width/2, -this.game.config.height/2, "background_pause");
        this.physics.add.existing(this.background, false);
        this.background.body.setAllowGravity(false);

        this.timedEvent = this.time.addEvent({ delay: 500, callback: function() {
            this.play_button = this.add.image(this.game.config.width/2 - 200, this.game.config.height/2+50, "play_button").setScale(0.6, 0.6).setInteractive(); //imposta l'immagine in modo che possa essere cliccata

            this.play_button.on("pointerover", ()=>{
                this.play_button.setAlpha(0.7);
            });
    
            this.play_button.on("pointerout", ()=>{
                this.play_button.setAlpha(1);
            });
    
            this.play_button.on("pointerdown", ()=>{ //quando viene clickato il bottone succedono cose
                this.scene.resume(this.sceneName);
                this.scene.stop();
            });

        }, callbackScope: this, loop: false });

        this.timedEvent = this.time.addEvent({ delay: 500, callback: function() {
            this.home_button = this.add.image(this.game.config.width/2 + 200, this.game.config.height/2+50, "home_button").setScale(0.6, 0.6).setInteractive(); //imposta l'immagine in modo che possa essere cliccata

            this.home_button.on("pointerover", ()=>{
                this.home_button.setAlpha(0.7);
            });
    
            this.home_button.on("pointerout", ()=>{
                this.home_button.setAlpha(1);
            });
    
            this.home_button.on("pointerdown", ()=>{ //quando viene clickato il bottone succedono cose
                this.scene.stop(this.sceneName);
                this.scene.stop();
                this.scene.start("scene_welcome_menu");
            });

        }, callbackScope: this, loop: false });

        this.timedEvent = this.time.addEvent({ delay: 500, callback: function() {
            this.restart_button = this.add.image(this.game.config.width/2, this.game.config.height/2+50, "restart_button").setScale(0.6, 0.6).setInteractive(); //imposta l'immagine in modo che possa essere cliccata
            
            this.restart_button.on("pointerover", ()=>{
                this.restart_button.setAlpha(0.7);
            });
    
            this.restart_button.on("pointerout", ()=>{
                this.restart_button.setAlpha(1);
            });
    
            this.restart_button.on("pointerdown", ()=>{ //quando viene clickato il bottone succedono cose
                this.scene.start("scene_one");
            });
    
        }, callbackScope: this, loop: false });

    }

    update(){
        console.log("scene_pause_update");

        if(this.background.y < this.game.config.height/2 - 50) {
            this.background.body.setVelocityY(1500);
        } else {
            this.background.body.setVelocityY(0);
        }
    }

}