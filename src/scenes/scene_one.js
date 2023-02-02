import Player from "../components/player.js"
import Waterbomb from "../components/waterbomb.js";
import OrizontalPlatform from "../components/orizontal_platform.js";
import VerticalPlatform from "../components/vertical_platform.js";
import OrizontalBarile from "../components/orizontal_barile.js";
import MovingTubi from "../components/moving_tubi.js";
import SquarePlatform from "../components/square_platform.js";
import Fungo from "../components/fungo.js";
import Giusy from "../components/giusy.js";
import Rana from "../components/rana.js";
import Valvola from "../components/valvola.js";
import Funghetti from "../components/funghetti.js";

export default class SceneOne extends Phaser.Scene {

    background;       // oggetto relativo all'elemento "sfondo"
    player;           // oggetto relativo all'elemento "giocatore"
    floorHeight;      // Altezza del terreno (asse y) rispetto al riquadro di gioco
    collide_water;
    collide_piante;
    collide_foglie;
    collide_mostro;
    lastWaterbomb;
    lastValvola;
    tubi_goingUp;

    constructor() {
        // Il costruttore della classe base Phaser.Scene prende come argomento il nome della scena
        super("scene_one");
    }

    init() {
        console.log("scene_one - Executing init()");
        // Definiamo l'altezza del terreno pari all'altezza del riquadro
        // di gioco, per posizionare il giocatore sul fondo della schermata.
        this.floorHeight = this.game.config.height - 120;
        this.worldWidth = 19000;
        this.collide_water = false;
        this.collide_piante = false;
        this.collide_mostro = false;
        this.collide_deadly_tubo = false;
        this.lastWaterbomb = 0;
        this.lastValvola = 0;
        this.collide_foglie = false;
        this.tubi_goingUp = true;
        this.valvole_overlap = false;
        this.overlap_valvola6 = false;
        this.direction = 0;
        this.elevator_move = false;
        this.initialX = -500;
        this.turn_valvola = false;
        this.elevator_goingUp = false;
        
        this.game.gameState.score = 0;
        this.game.gameState.playTime = 2000;
    }

    preload() {
        console.log("scene_one - Executing preload()");
        // Carichiamo gli asset grafici
        this.load.plugin('rexroundrectangleplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexroundrectangleplugin.min.js', true); 

        this.load.image("pause_button", "assets/UI/pausa.png");
        this.load.image("orologio", "assets/UI/orologio.png");

        this.load.image("foglia", "assets/images/environment_elements/foglia.png");
        this.load.image("pianta_tossica", "assets/images/environment_elements/pianta toxic.png");
        this.load.image("fungone", "assets/images/environment_elements/fungone.png");
        this.load.image("piantona1", "assets/images/environment_elements/piantona1.png");
        this.load.image("piantona2", "assets/images/environment_elements/piantona2.png");
        this.load.image("falling_platform", "assets/images/environment_elements/falling platform.png");
        this.load.image("verticale1", "assets/images/environment_elements/verticale1.png");
        this.load.image("verticale2", "assets/images/environment_elements/verticale2.png");

        //tubi
        this.load.image("tubo_curvo_sx", "assets/images/environment_elements/tubi/tubo_curvo_sx.png");
        this.load.image("tubo_curvo_dx", "assets/images/environment_elements/tubi/tubo_curvo_dx.png");
        this.load.image("tubo2_3", "assets/images/environment_elements/tubi/tubo2_3.png");
        this.load.image("tubo3", "assets/images/environment_elements/tubi/tubo3.png");
        this.load.image("tubo4", "assets/images/environment_elements/tubi/tubo4.png");
        this.load.image("tubo5", "assets/images/environment_elements/tubi/tubo5.png");
        this.load.image("tubo6", "assets/images/environment_elements/tubi/tubo6.png");
        this.load.image("tubo_curvo_up_dx", "assets/images/environment_elements/tubi/tubo_curvo_up_dx.png");
        this.load.image("tubo_curvo_up_sx", "assets/images/environment_elements/tubi/tubo_curvo_up_sx.png");
        this.load.image("tubo3_p", "assets/images/environment_elements/tubi/tubo3_p.png");
        this.load.image("tubo4_p", "assets/images/environment_elements/tubi/tubo4_p.png");
        this.load.image("tubo5_p", "assets/images/environment_elements/tubi/tubo5_p.png");
        this.load.image("tubo6_p", "assets/images/environment_elements/tubi/tubo6_p.png");
        this.load.image("tubo7_1", "assets/images/environment_elements/tubi/tubo7_1.png");
        this.load.image("tubo1", "assets/images/environment_elements/tubi/tubo1.png");
        this.load.image("tubo_orizz", "assets/images/environment_elements/tubi/tubo_orizz.png");
        this.load.image("squared", "assets/images/environment_elements/tubi/squared.png");
        this.load.image("tubone", "assets/images/environment_elements/tubone.png");
        this.load.image("deadly1", "assets/images/environment_elements/tubi/deadly_tubo2.png");
        this.load.image("deadly2", "assets/images/environment_elements/tubi/deadly_tubo3.png");
        this.load.image("deadly3", "assets/images/environment_elements/tubi/deadly_tubo4.png");

        //background
        this.load.image("background0", "assets/images/background/background cielo.png"); // carica l'immagine di sfondo estremo
        this.load.image("background1", "assets/images/background/background montagne.png"); // carica l'immagine di sfondo estremo
        this.load.image("background2", "assets/images/background/background palude.png");
        this.load.image("background3", "assets/images/background/background alberi monocolor.png");
        this.load.image("background3d", "assets/images/background/background 3d.png");
        this.load.image("background4", "assets/images/background/background last.png");
        this.load.image("background_funghi", "assets/images/background/background grass.png");
        this.load.image("background_grass_2d", "assets/images/background/background grass 2d.png");

        //cartelli
        this.load.image("cartello1", "assets/UI/cartello1.png"); // carica l'immagine di sfondo estremo
        this.load.image("cartello2", "assets/UI/cartello2.png"); // carica l'immagine di sfondo estremo
        this.load.image("cartello3.1", "assets/UI/cartello3.1.png"); // carica l'immagine di sfondo estremo
        this.load.image("cartello3.2", "assets/UI/cartello3.2.png"); // carica l'immagine di sfondo estremo

        //tutorial
        this.load.image("tutorial", "assets/UI/Istruzioni_tutorial.png");

        //iconcine
        this.load.image("funghetto", "assets/UI/HUD/fungo colore.png");
        this.load.image("funghetto nero", "assets/UI/HUD/fungo nero.png");
        this.load.image("giusetta", "assets/UI/HUD/giusy colore.png");
        this.load.image("giusetta nera", "assets/UI/HUD/giusy nera.png");
        this.load.image("ranetta", "assets/UI/HUD/rana colore.png");
        this.load.image("ranetta nera", "assets/UI/HUD/rana nera.png");
    }

    create() {
        // Qui le istruzioni su cosa creare e dove nel mondo di gioco
        console.log("scene_one - Executing create()");


        //Inserisco gli elementi:
        //che devono stare dietro al giocatore:
        //sfondo
        this.createBackground();
        //cartelli
        this.createCartelli();
        //piantone
        this.createPiantone();
        //tubi che si muovono su e giù
        this.createScalaTubi();
        //ultimo tubo
        this.createElevatorTubo();


        //Mostri 
        const Funghetti0 = new Funghetti(this, 450, this.floorHeight);
        const Fungo0 = new Fungo(this, 5060, this.floorHeight);
        const Giusy0 = new Giusy(this, 10230, this.floorHeight+10);
        const Rana0 = new Rana(this, 17830, this.floorHeight);

        //Player
        const thePlayer = new Player(this, this.initialX-220, this.floorHeight, this.worldWidth);

        //Aggiungi gli elementi alla fisica
        this.player = this.physics.add.existing(thePlayer);
        this.funghetti = this.physics.add.existing(Funghetti0);
        this.fungo = this.physics.add.existing(Fungo0);
        this.giusy = this.physics.add.existing(Giusy0);
        this.rana = this.physics.add.existing(Rana0);


        //piattaforme normali
        this.createStaticPlatforms();
        //sx-dx
        this.createOrizontalPlatforms();
        //up-dpwn
        this.createVerticalPlatforms();
        //piante tossiche
        this.createPianteTossiche();
        //fungoni rimbalzoni
        this.createFungoni();


        //barili
        this.createStaticBarili();
        //sx-dx barili
        this.createOrizontalBarili();
        //tubo che cade col peso
        this.createFallingPlatform();
        //one shot foglie
        this.createFoglie();  
        //2 piattaforme verticali
        this.createVerticali();      


        //bolle
        this.createBolle();
        //acque
        this.createAcque();
        //pavimenti
        this.createFloors();
        //tubi
        this.createTubi();
        

        //tubone da passarci dentro
        this.createTubone();
        //piattaforme rotanti
        this.createSquarePlatforms();
        //tubi da evitare
        this.createDeadlyTubi();
        //tubi verticali
        this.createWallTubi();
        

        //valvole
        this.insertValvola();
        
        //waterbomb da prendere
        this.insertWaterbomb();
        

        //collider
        this.colliderPiantone();
        this.colliderTubi();
        this.colliderScalaTubi();
        this.colliderMonsters();
        this.overlapValvole();

        //interfaccia
        this.createUI();

        this.acquaAnimation();

        this.bolleAnimation();


        //CAMERA
        // Imposta la camera per seguire i movimenti del giocatore lungo l'asse x
        this.cameras.main.startFollow(this.player);
        this.cameras.main.setFollowOffset(0, 260); // Abbassiamo la telecamera this.game.config.height / 2

        //tasti da tastiera
        this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.keyV = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.V);

        this.timedEvent = this.time.addEvent({ delay: 200, callback: this.updateTimer, callbackScope: this, loop: true });
    }

    createBackground() {
        this.background0 = this.add.tileSprite(0, this.game.config.height, 1280, 1200, "background0");
        this.background0.setScrollFactor(0, 0);
        this.background0.setOrigin(0, 1);

        // Posizioniamo gli elementi nella scena
        this.background1 = this.add.tileSprite(-80, this.game.config.height, 1370, 1000, "background1"); //creiamo il primo livello (quello più in sfondo) del nostro parallax scrolling
        this.background1.setScrollFactor(0,0);
        this.background1.setOrigin(0, 1);

        this.background2 = this.add.tileSprite(0, this.game.config.height, 1530, 1000, "background2");
        this.background2.setScrollFactor(0,0);
        this.background2.setOrigin(0, 1);

        this.background3 = this.add.tileSprite(0, this.game.config.height, 1280, 1000, "background3");
        this.background3.setScrollFactor(0,0);
        this.background3.setOrigin(0, 1);

        this.background4 = this.add.tileSprite(0, this.game.config.height, 1280, 1500, "background4");
        this.background4.setScrollFactor(0,0);
        this.background4.setOrigin(0, 1);

        this.background3d = this.add.tileSprite(0, this.game.config.height+35, 2000, 1500, "background3d");
        this.background3d.setScrollFactor(0,0);
        this.background3d.setOrigin(0, 1);
    }

    createCartelli() {
        this.cartello1 = this.add.image(1800, this.floorHeight - 510, "cartello1").setScale(0.63);
        this.cartello1.setOrigin(0.5, 1);

        this.cartello2 = this.add.image(5700, this.floorHeight, "cartello2").setScale(0.63);
        this.cartello2.setOrigin(0.5, 1);

        this.cartello3_1 = this.add.image(12130, this.floorHeight-250, "cartello3.1").setScale(0.63);
        this.cartello3_1.setOrigin(0.5, 1);

        this.cartello3_2 = this.add.image(12300, this.floorHeight-250, "cartello3.2").setScale(0.63);
        this.cartello3_2.setOrigin(0.5, 1);

        this.cartello_tutorial = this.add.image(-100, this.floorHeight - 260, "tutorial");
        this.cartello3_2.setOrigin(0.5, 1);
    }

    createFloors() {
        this.floor = this.add.rectangle(-1280, this.game.config.height,
            1347+630, this.game.config.height - this.floorHeight,
            0x1C3E20, 1);
        this.floor.setOrigin(0, 1);

        this.floor1 = this.add.rectangle(1817-50, this.game.config.height,
            1377+50, this.game.config.height - this.floorHeight,
            0x1C3E20, 1);
        this.floor1.setOrigin(0, 1);

        this.floor2 = this.add.rectangle(4405, this.game.config.height,
            1485 -100, this.game.config.height - this.floorHeight,
            0x1C3E20, 1);
        this.floor2.setOrigin(0, 1);

        this.floor3 = this.add.rectangle(10240, this.game.config.height,
            2410, this.game.config.height - this.floorHeight,
            0x1C3E20, 1);
        this.floor3.setOrigin(0, 1);

        this.floor4 = this.add.rectangle(13438, this.game.config.height,
            1439, this.game.config.height - this.floorHeight,
            0x1C3E20, 1);
        this.floor4.setOrigin(0, 1);
        
        this.floor5 = this.add.rectangle(16377, this.game.config.height,
            5000, this.game.config.height - this.floorHeight,
            0x1C3E20, 1);
        this.floor5.setOrigin(0, 1);


        this.background_funghi = this.add.tileSprite(-1280, this.game.config.height, 1347+630, 1000, "background_funghi");
        this.background_funghi.setOrigin(0, 1);

        this.background_funghi1 = this.add.tileSprite(1817-50, this.game.config.height, 1327+50, 1000, "background_funghi");
        this.background_funghi1.setOrigin(0, 1);

        this.background_funghi2 = this.add.tileSprite(4405, this.game.config.height, 1485 -100, 1000, "background_funghi");
        this.background_funghi2.setOrigin(0, 1);

        this.background_funghi3 = this.add.tileSprite(10240, this.game.config.height, 2410, 1000, "background_funghi");
        this.background_funghi3.setOrigin(0, 1);

        this.background_funghi4 = this.add.tileSprite(13438, this.game.config.height, 1439, 1000, "background_funghi");
        this.background_funghi4.setOrigin(0, 1);

        this.background_funghi5 = this.add.tileSprite(16377, this.game.config.height, 5000, 1000, "background_funghi");
        this.background_funghi5.setOrigin(0, 1);

        
        this.background_grass = this.add.tileSprite(-1280, this.game.config.height, 1347+630, 1000, "background_grass_2d");
        this.background_grass.setOrigin(0, 1);

        this.background_grass1 = this.add.tileSprite(1817-50, this.game.config.height, 1327+50, 1000, "background_grass_2d");
        this.background_grass1.setOrigin(0, 1);

        this.background_grass2 = this.add.tileSprite(4405, this.game.config.height, 1485 -100, 1000, "background_grass_2d");
        this.background_grass2.setOrigin(0, 1);

        this.background_grass3 = this.add.tileSprite(10240, this.game.config.height, 2410, 1000, "background_grass_2d");
        this.background_grass3.setOrigin(0, 1);

        this.background_grass4 = this.add.tileSprite(13438, this.game.config.height, 1439, 1000, "background_grass_2d");
        this.background_grass4.setOrigin(0, 1);

        this.background_grass5 = this.add.tileSprite(16377, this.game.config.height, 5000, 1000, "background_grass_2d");
        this.background_grass5.setOrigin(0, 1);


        this.background_funghi_2 = this.add.tileSprite(-1280+100, this.game.config.height, 1347+630-100, 1000, "background_funghi");
        this.background_funghi_2.setOrigin(0, 1);

        this.background_funghi1_2 = this.add.tileSprite(1817+100-50, this.game.config.height, 1327-100+50, 1000, "background_funghi");
        this.background_funghi1_2.setOrigin(0, 1);

        this.background_funghi2_2 = this.add.tileSprite(4405+100, this.game.config.height, 1485 -100-100, 1000, "background_funghi");
        this.background_funghi2_2.setOrigin(0, 1);

        this.background_funghi3_2 = this.add.tileSprite(10240+100, this.game.config.height, 2410-100, 1000, "background_funghi");
        this.background_funghi3_2.setOrigin(0, 1);

        this.background_funghi4_2 = this.add.tileSprite(13438+100, this.game.config.height, 1439-100, 1000, "background_funghi");
        this.background_funghi4_2.setOrigin(0, 1);

        this.background_funghi5_2 = this.add.tileSprite(16377+100, this.game.config.height, 5000-100, 1000, "background_funghi");
        this.background_funghi5_2.setOrigin(0, 1);
        

        this.physics.add.existing(this.floor, true);
        this.physics.add.existing(this.floor1, true);
        this.physics.add.existing(this.floor2, true);
        this.physics.add.existing(this.floor3, true);
        this.physics.add.existing(this.floor4, true);
        this.physics.add.existing(this.floor5, true);

        this.physics.add.collider(this.player, this.floor);
        this.physics.add.collider(this.player, this.floor1);
        this.physics.add.collider(this.player, this.floor2);
        this.physics.add.collider(this.player, this.floor3);
        this.physics.add.collider(this.player, this.floor4);
        this.physics.add.collider(this.player, this.floor5);
    }

    createAcque() {
        this.acqua = this.add.sprite(697, this.floorHeight +11,/* 1120, 195 ,*/ "acqua").setAlpha(0.9);
        //this.add.tileSprite(697, this.floorHeight +11, 1120, 195 , "acqua");
        this.acqua.setOrigin(0, 0);
        this.acqua1 = this.add.sprite(6390 -600, this.floorHeight +11,/* 4100, 195 ,*/ "acqua").setAlpha(0.9);
        this.acqua1.setOrigin(0, 0);
        this.acqua2 = this.add.sprite(6390 -600 +1120, this.floorHeight +11,/* 757, 195 ,*/ "acqua").setAlpha(0.9);
        this.acqua2.setOrigin(0, 0);
        this.acqua3 = this.add.sprite(6390 -600 +(1120*2), this.floorHeight +11,/* 757, 195 ,*/ "acqua").setAlpha(0.9);
        this.acqua3.setOrigin(0, 0);
        this.acqua4 = this.add.sprite(6390 -600 +(1120*3), this.floorHeight +11,/* 757, 195 ,*/ "acqua").setAlpha(0.9);
        this.acqua4.setOrigin(0, 0);
        this.acqua5 = this.add.sprite(12681, this.floorHeight +11,/* 757, 195 ,*/ "acqua").setAlpha(0.9);
        this.acqua5.setOrigin(0, 0);
        this.acqua6 = this.add.sprite(14877, this.floorHeight +11,/* 1500, 195 ,*/ "acqua").setAlpha(0.9);
        this.acqua6.setOrigin(0, 0);
        this.acqua7 = this.add.sprite(14877 + 1120, this.floorHeight +11,/* 1500, 195 ,*/ "acqua").setAlpha(0.9);
        this.acqua7.setOrigin(0, 0);

        this.physics.add.existing(this.acqua, true);
        this.physics.add.existing(this.acqua1, true);
        this.physics.add.existing(this.acqua2, true);
        this.physics.add.existing(this.acqua3, true);
        this.physics.add.existing(this.acqua4, true);
        this.physics.add.existing(this.acqua5, true);
        this.physics.add.existing(this.acqua6, true);
        this.physics.add.existing(this.acqua7, true);
        
        this.physics.add.collider(this.player, this.acqua, ()=> {
            this.collide_water = true;
            this.player.isJumping = true;
        });
        this.physics.add.collider(this.player, this.acqua1, ()=> {
            this.collide_water = true;
            this.player.isJumping = true;
        });
        this.physics.add.collider(this.player, this.acqua2, ()=> {
            this.collide_water = true;
            this.player.isJumping = true;
        });
        this.physics.add.collider(this.player, this.acqua3, ()=> {
            this.collide_water = true;
            this.player.isJumping = true;
        });
        this.physics.add.collider(this.player, this.acqua4, ()=> {
            this.collide_water = true;
            this.player.isJumping = true;
        });
        this.physics.add.collider(this.player, this.acqua5, ()=> {
            this.collide_water = true;
            this.player.isJumping = true;
        });
        this.physics.add.collider(this.player, this.acqua6, ()=> {
            this.collide_water = true;
            this.player.isJumping = true;
        });
        this.physics.add.collider(this.player, this.acqua7, ()=> {
            this.collide_water = true;
            this.player.isJumping = true;
        });
    }

    createBolle() {
        this.bolle1 = this.add.sprite(697, this.floorHeight+20, "bolle").setOrigin(0, 1);
        this.bolle2 = this.add.sprite(6390 -600, this.floorHeight+20, "bolle").setOrigin(0, 1);
        this.bolle3 = this.add.sprite(6390 -600 + 1120, this.floorHeight+20, "bolle").setOrigin(0, 1);
        this.bolle4 = this.add.sprite(6390 -600 + (1120*2), this.floorHeight+20, "bolle").setOrigin(0, 1);
        this.bolle5 = this.add.sprite(6390 -600 + (1120*3), this.floorHeight+20, "bolle").setOrigin(0, 1);
        this.bolle6 = this.add.sprite(12681, this.floorHeight+20, "bolle").setOrigin(0, 1);
        this.bolle7 = this.add.sprite(14877, this.floorHeight+20, "bolle").setOrigin(0, 1);
        this.bolle8 = this.add.sprite(14877 + 1120, this.floorHeight+20, "bolle").setOrigin(0, 1);
        this.bolle8.setCrop(0, 0, 400, 66);
    }

    createStaticPlatforms() {
        this.platforms = this.physics.add.staticGroup();
    
        this.platforms.create(200, this.floorHeight-80, 'platform');
        this.platforms.create(1184, 274 +75, 'platform');
        this.platforms.create(2497, -98 +75, 'platform');
        this.platforms.create(3900, 450 +75, 'platform');

        this.platforms.create(11483, this.floorHeight - 100, "platform");
        this.platforms.create(11797, this.floorHeight - 200, "platform");
        this.platforms.create(16200, 50, "platform");

        // ...sottrai le piattaforme all'effetto della gravità!
        this.platforms.children.iterate( function (platform) {
                platform.setImmovable(true);
                platform.body.allowGravity = false;
        });

        // Rendi le piattaforme "solide". Se il giocatore è su una piattaforma
        // allora il suo stato è "non sta saltando" (questo per riprodurre l'animazione
        // del giocatore fermo).
        this.physics.add.collider(this.platforms, this.player, ()=> {
                this.player.isJumping = false;
        });
    }

    createOrizontalPlatforms() {
        this.orizontal_platform1 = new OrizontalPlatform(this, 4060, 60+75);

        this.physics.add.collider(this.player, this.orizontal_platform1, ()=> {
            this.player.isJumping = false;
        });
    }

    createVerticalPlatforms() {
        this.vertical_platform1 = new VerticalPlatform(this, 904, 354+75, 80, 80, false);
        this.vertical_platform2 = new VerticalPlatform(this, 1462, 365+75, 300, 110, false);
        this.vertical_platform3 = new VerticalPlatform(this, 2158, 27+75, 120, 95, true);

        this.physics.add.collider(this.player, this.vertical_platform1, ()=> {
            this.player.isJumping = false;
        });
        this.physics.add.collider(this.player, this.vertical_platform2, ()=> {
            this.player.isJumping = false;
        });
        this.physics.add.collider(this.player, this.vertical_platform3, ()=> {
            this.player.isJumping = false;
        });
    }
    
    createPiantone() {
        this.piantona1_sfondo = this.add.image(1817+104, this.floorHeight, "piantona1").setOrigin(1, 1);
        this.piantona1 = this.add.rectangle(1817, this.floorHeight,
            104, 510,
            0x637F50, 0);
        this.piantona1.setOrigin(0, 1);
        this.ramo1 = this.add.rectangle(1817, this.floorHeight - 510,
            155, 35,
            0x637F50, 0);
        this.ramo1.setOrigin(1, 0);

        this.piantona2_sfondo = this.add.image(3040-304, this.floorHeight, "piantona2").setOrigin(0, 1);
        this.piantona2 = this.add.rectangle(3040, this.floorHeight,
            104, 283,
            0x637F50, 0);
        this.piantona2.setOrigin(0, 1);
        this.ramo2 = this.add.rectangle(3040, this.floorHeight - 283,
            120, 35,
            0x637F50, 0);
        this.ramo2.setOrigin(1, 0);
        this.piantona2_1 = this.add.rectangle(3040, this.floorHeight - 430,
            104, 266,
            0x637F50, 0);
        this.piantona2_1.setOrigin(0, 1);
        this.ramo2_1 = this.add.rectangle(3040, this.floorHeight - 696,
            300, 35,
            0x637F50, 0);
        this.ramo2_1.setOrigin(1, 0);
        this.ramo2_2 = this.add.rectangle(3040, this.floorHeight - 587,
            745, 35,
            0x637F50, 0);
        this.ramo2_2.setOrigin(0, 0);

        this.physics.add.existing(this.piantona1, true);
        this.physics.add.existing(this.ramo1, true);
        this.physics.add.existing(this.piantona2, true);
        this.physics.add.existing(this.ramo2, true);
        this.physics.add.existing(this.piantona2_1, true);
        this.physics.add.existing(this.ramo2_1, true);
        this.physics.add.existing(this.ramo2_2, true);
    }

    colliderPiantone() {
        this.physics.add.collider(this.player, this.piantona1, ()=> {
            this.player.isJumping = false;
        });
        this.physics.add.collider(this.player, this.ramo1, ()=> {
            this.player.isJumping = false;
        });
        this.physics.add.collider(this.player, this.piantona2, ()=> {
            this.player.isJumping = false;
        });
        this.physics.add.collider(this.player, this.ramo2, ()=> {
            this.player.isJumping = false;
        });
        this.physics.add.collider(this.player, this.piantona2_1, ()=> {
            this.player.isJumping = false;
        });
        this.physics.add.collider(this.player, this.ramo2_1, ()=> {
            this.player.isJumping = false;
        });
        this.physics.add.collider(this.player, this.ramo2_2, ()=> {
            this.player.isJumping = false;
        });
    }

    createFungoni() {
        this.fungone = this.add.image(2390, this.floorHeight, "fungone");
        this.fungone.setOrigin(0.5, 1);
        this.fungone1 = this.add.image(3300, this.game.config.height, "fungone");
        this.fungone1.setOrigin(0.5, 1);

        this.physics.add.existing(this.fungone, true);
        this.physics.add.existing(this.fungone1, true);

        this.physics.add.collider(this.player, this.fungone, ()=> {
            if (this.player.body.touching.down) {
                this.player.body.setVelocityY(- 500);
            }
        });
        this.physics.add.collider(this.player, this.fungone1, ()=> {
            if (this.player.body.touching.down) {
                this.player.body.setVelocityY(- 500);
            }
        });
    }

    createPianteTossiche() {
        this.piante_tossiche = this.physics.add.staticGroup();
        this.piante_tossiche.create(2030, this.floorHeight - 43, "pianta_tossica");
        this.piante_tossiche.create(2150, this.floorHeight - 43, "pianta_tossica");
        this.piante_tossiche.create(2270, this.floorHeight - 43, "pianta_tossica");
        this.piante_tossiche.create(2510, this.floorHeight - 43, "pianta_tossica");
        this.piante_tossiche.create(2630, this.floorHeight - 43, "pianta_tossica");
        this.piante_tossiche.create(2750, this.floorHeight - 43, "pianta_tossica");
        this.piante_tossiche.create(2870, this.floorHeight - 43, "pianta_tossica");

        this.piante_tossiche.children.iterate( function (pianta_tossica) {
            pianta_tossica.setImmovable(true);
            pianta_tossica.body.allowGravity = false;
        });

        this.physics.add.collider(this.piante_tossiche, this.player, ()=> {
            this.collide_piante = true;
        });
    }

    createStaticBarili() {
        this.barili = this.physics.add.group();

        this.barili.create(7470 -600, this.floorHeight+11, 'barile');
        this.barili.create(8430 -600, this.floorHeight+11, 'barile');
        this.barili.create(9475 -600, this.floorHeight+11, 'barile');

        this.barili.children.iterate( function (barile) {
                barile.setImmovable(true);
                barile.body.allowGravity = false;
        });

        this.physics.add.collider(this.barili, this.player, ()=> {
                this.player.isJumping = false;
        });
    }

    createOrizontalBarili() {
        this.orizontal_barile1 = new OrizontalBarile(this, 6910 -600, this.floorHeight+11, 250, 120);
        this.orizontal_barile2 = new OrizontalBarile(this, 9915 -600, this.floorHeight+11, 100, 80);

        this.physics.add.collider(this.player, this.orizontal_barile1, ()=> {
            this.player.isJumping = false;
        });
        this.physics.add.collider(this.player, this.orizontal_barile2, ()=> {
            this.player.isJumping = false;
        });
    }

    cadutaFoglie(f) {
        f.body.setVelocityY(300);
    }

    createFoglie() {
        this.foglie = this.physics.add.group();

        this.foglie.create(7790 -600, this.floorHeight+11, 'foglia');
        this.foglie.create(8090 -600, this.floorHeight+11, 'foglia');
        this.foglie.create(9435 -600, 325+79, 'foglia');
        this.foglie.create(9720 -640, 215+79, 'foglia');
        this.foglie.create(10000 -640, 130+79, 'foglia');


        // ...sottrai le piattaforme all'effetto della gravità!
        this.foglie.children.iterate( function (foglia) {
                foglia.setImmovable(true);
                foglia.body.allowGravity = false;
        });

        // Rendi le piattaforme "solide". Se il giocatore è su una piattaforma
        // allora il suo stato è "non sta saltando" (questo per riprodurre l'animazione
        // del giocatore fermo).
        this.physics.add.collider(this.player, this.foglie, (p, f)=> {
                this.player.isJumping = false;
                if(this.player.body.touching.down) {
                    this.timedEvent = this.time.addEvent({ delay: 500, callback: this.cadutaFoglie, args: [f], callbackScope: this, loop: false });
                }
        });
    }

    createFallingPlatform() {
        this.falling_platform = this.add.image(8973 -600, this.floorHeight-27, 'falling_platform');

        this.physics.add.existing(this.falling_platform, false);

        this.falling_platform.body.setImmovable(true);
        this.falling_platform.body.allowGravity = false;
    }

    downAnimation() {
        this.collide_fallingPlatform = this.physics.add.collider(this.player, this.falling_platform, ()=> {
            this.player.isJumping = false;
            this.falling_platform.body.setVelocityY(20);
            //console.log("player:" + this.player.x + " limite: " + (8373 - this.falling_platform.width/2));
        });
    }

    upAnimation() {
        if((this.player.isJumping || this.player.body.x > 8373+(this.falling_platform.width/2)+this.player.width/2 || this.player.body.x < 8373-(this.falling_platform.width/2)-this.player.width/2) && this.falling_platform.y > this.floorHeight-30) {
            this.falling_platform.body.setVelocityY(-15);
        } else if (this.falling_platform.y < this.floorHeight-30) {
            this.falling_platform.body.setVelocityY(0);
            this.falling_platform.y = this.floorHeight-30;
        }
    }

    createVerticali() {
        this.verticale1 = this.add.image(10210 -600, this.game.config.height, "verticale1");
        this.verticale1.setOrigin(0, 1);
        this.verticale2 = this.add.image(10400 -600, this.game.config.height, "verticale2");
        this.verticale2.setOrigin(0, 1);

        this.physics.add.existing(this.verticale1, true);
        this.physics.add.existing(this.verticale2, true);

        this.physics.add.collider(this.player, this.verticale1, ()=> {
            this.player.isJumping = false;
        });
        this.physics.add.collider(this.player, this.verticale2, ()=> {
            this.player.isJumping = false;
        });
    }

    createSquarePlatforms() {
        this.squarePlatform1 = new SquarePlatform(this, 12800+90, 290);
        this.squarePlatform2 = new SquarePlatform(this, 13180+40, 320);
        this.squarePlatform3 = new SquarePlatform(this, 13360, 450);
        this.squarePlatform4 = new SquarePlatform(this, 13500+40, 290);

        this.physics.add.collider(this.player, this.squarePlatform1, ()=> {
            this.player.isJumping = false;
        });
        
        this.physics.add.collider(this.player, this.squarePlatform3, ()=> {
            this.player.isJumping = false;
        });

        this.physics.add.collider(this.player, this.squarePlatform2, ()=> {
            this.player.isJumping = false;
        });
        this.physics.add.collider(this.player, this.squarePlatform4, ()=> {
            this.player.isJumping = false;
        });
    }

    createTubi() {
        this.tubo1 = this.add.image(12016, this.game.config.height+75, "tubo1");
        this.tubo1.setOrigin(0, 1);

        this.tubo2_0 = this.add.tileSprite(13637.5, this.game.config.height, 37, 120, "tubo2_3");
        this.tubo2_0.setOrigin(0, 1);
        this.tubo2_1 = this.add.tileSprite(13637.5, this.game.config.height-250, 37, 520-325, "tubo2_3");
        this.tubo2_1.setOrigin(0, 1);
        this.tubo2_curvo_sx = this.add.image(13637.5, 137.5+75, "tubo_curvo_sx");
        this.tubo2_curvo_sx.setOrigin(0, 0);
        this.tubo2_2 = this.add.tileSprite(13700, 137.5+75, 351, 37, "tubo_orizz");
        this.tubo2_2.setOrigin(0, 0);
        this.tubo2_curvo_dx = this.add.image(14051, 175+75, "tubo_curvo_up_dx");
        this.tubo2_curvo_dx.setOrigin(0, 1);
        this.tubo2_3 = this.add.tileSprite(14113.5, 112.5+75, 0, 0, "tubo2_3");
        this.tubo2_3.setOrigin(1, 1);
        this.tubo2_curvo_sx1 = this.add.image(14076.5, 53+75, "tubo_curvo_sx");
        this.tubo2_curvo_sx1.setOrigin(0, 1);

        this.tubo3_0 = this.add.image(14415, -35+75, "tubo_curvo_up_dx");
        this.tubo3_0.setOrigin(0, 0);
        this.tubo3 = this.add.image(14440.5, -32+75, "tubo3");
        this.tubo3.setOrigin(0, 1);
        this.tubo3_1 = this.add.tileSprite(14440.5+62.5, -113+75, 0, 0, "tubo_orizz");
        this.tubo3_1.setOrigin(0, 0.5);

        this.tubo4_0 = this.add.image(14967, -157+75, "tubo_curvo_up_dx");
        this.tubo4_0.setOrigin(0, 0);
        this.tubo4 = this.add.image(14992.5, -157+75, "tubo4");
        this.tubo4.setOrigin(0, 1);
        this.tubo4_1 = this.add.tileSprite(14992.5+62.5, -221+75, 0, 0, "tubo_orizz");
        this.tubo4_1.setOrigin(0, 0.5);


        this.tubo5_0 = this.add.image(15482, -264.5+75, "tubo_curvo_up_dx");
        this.tubo5_0.setOrigin(0, 0);
        this.tubo5 = this.add.image(15507.5, -264.5+75, "tubo5");
        this.tubo5.setOrigin(0, 1);
        this.tubo5_1 = this.add.tileSprite(15507.5+62.5, -345.5+75, 0, 0, "tubo_orizz");
        this.tubo5_1.setOrigin(0, 0.5);


        this.tubo6_0 = this.add.image(15932, -264.5-51.5, "tubo_curvo_up_dx");
        this.tubo6_0.setOrigin(0, 0);
        this.tubo6 = this.add.image(15957.5, -264.5-51.5, "tubo6");
        this.tubo6.setOrigin(0, 1);
        this.tubo6_1 = this.add.tileSprite(16020, -264-175, 290, 37, "tubo_orizz");
        this.tubo6_1.setOrigin(0, 0);
        this.tubo6_2 = this.add.image(16250+60, -264.5-200.5, "tubo_curvo_up_dx");
        this.tubo6_2.setOrigin(0, 0);
        this.tubo6_3 = this.add.tileSprite(16275.5+60, -264.5-200.5, 37, 520, "tubo2_3");
        this.tubo6_3.setOrigin(0, 1);

        this.tubo6_valvola = this.add.tileSprite(16935.5-250-37, -182+75+50, 290, 37, "tubo_orizz").setOrigin(1, 1);

        this.physics.add.existing(this.tubo1, true);
        this.physics.add.existing(this.tubo2_1, true);
        this.physics.add.existing(this.tubo2_2, true);
        this.physics.add.existing(this.tubo2_3, true);
        this.physics.add.existing(this.tubo2_curvo_dx, true);
        this.physics.add.existing(this.tubo2_curvo_sx, true);
        this.physics.add.existing(this.tubo2_curvo_sx1, true);
        this.physics.add.existing(this.tubo3, true);
        this.physics.add.existing(this.tubo3_1, true);
        this.physics.add.existing(this.tubo4, true);
        this.physics.add.existing(this.tubo4_1, true);
        this.physics.add.existing(this.tubo5, true);
        this.physics.add.existing(this.tubo5_1, true);
        this.physics.add.existing(this.tubo6, true);
        this.physics.add.existing(this.tubo6_1, true);
        this.physics.add.existing(this.tubo6_3, true);
        this.physics.add.existing(this.tubo6_valvola, true);
    }

    createTubone() {
        this.tubone = this.add.image(13520, this.floorHeight + 10, "tubone").setOrigin(0, 1);

        this.tubone_collide_top = this.add.rectangle(13520, this.game.config.height-260, 400, 1, 0x000000, 0).setOrigin(0, 1);

        this.physics.add.existing(this.tubone_collide_top, true);

        this.physics.add.collider(this.player, this.tubone_collide_top, ()=> {
            this.player.isJumping = false;
        });
    }

    colliderTubi() {
        this.physics.add.collider(this.player, this.tubo1, ()=> {
            this.player.isJumping = false;
        });
        this.physics.add.collider(this.player, this.tubo2_1, ()=> {
            this.player.isJumping = false;
        });
        this.physics.add.collider(this.player, this.tubo2_2, ()=> {
            this.player.isJumping = false;
        });
        this.physics.add.collider(this.player, this.tubo2_3, ()=> {
            this.player.isJumping = false;
        });
        this.physics.add.collider(this.player, this.tubo2_curvo_sx, ()=> {
            this.player.isJumping = false;
        });
        this.physics.add.collider(this.player, this.tubo2_curvo_sx1, ()=> {
            this.player.isJumping = false;
        });
        this.physics.add.collider(this.player, this.tubo3, ()=> {
            this.player.isJumping = false;
        });
        this.physics.add.collider(this.player, this.tubo3_1, ()=> {
            this.player.isJumping = false;
        });
        this.physics.add.collider(this.player, this.tubo4, ()=> {
            this.player.isJumping = false;
        });
        this.physics.add.collider(this.player, this.tubo4_1, ()=> {
            this.player.isJumping = false;
        });
        this.physics.add.collider(this.player, this.tubo5, ()=> {
            this.player.isJumping = false;
        });
        this.physics.add.collider(this.player, this.tubo5_1, ()=> {
            this.player.isJumping = false;
        });
        this.physics.add.collider(this.player, this.tubo6, ()=> {
            this.player.isJumping = false;
        });
        this.physics.add.collider(this.player, this.tubo6_1, ()=> {
            this.player.isJumping = false;
        });
        this.physics.add.collider(this.player, this.tubo6_3, ()=> {
            this.player.isJumping = false;
        });
        this.physics.add.collider(this.player, this.tubo6_valvola, ()=> {
            this.player.isJumping = false;
        });
        this.physics.add.collider(this.elevator_tubo, this.player, ()=> {
            this.player.isJumping = false;
        });
    }

    createScalaTubi() {
        //aggiungo i tubi definiti nel file 'movig_tubi'
        this.tubo3_orizz = new MovingTubi(this, 14277.4751, 9+75, "tubo3_p", true, 200, 500);
        

        this.tubo4_orizz = new MovingTubi(this, 14785, -113+75, "tubo4_p", false, 200, 200);
        

        this.tubo5_orizz = new MovingTubi(this, 15318.5, -221+75, "tubo5_p", true, 200, 200);
        

        this.tubo6_orizz = new MovingTubi(this, 15801, -345.5+75, "tubo6_p", false, 200, 300);
    }

    createElevatorTubo() {
        this.elevator_tubo = this.add.tileSprite(16935.5, -262+75, 500, 37, "tubo_orizz");
        this.physics.add.existing(this.elevator_tubo, false);
        this.elevator_tubo.body.setImmovable(true);
        this.elevator_tubo.body.allowGravity = false;
    }

    elevator_animation(){

        if(this.elevator_goingUp) {
            this.elevator_tubo.body.setVelocityY(-50);
        } else {
            this.elevator_tubo.body.setVelocityY(50);
        }

        if(this.elevator_tubo.y < -262+75) {
            this.elevator_goingUp = false;
        } else if(this.elevator_tubo.y > this.floorHeight+100) {
            this.elevator_goingUp = true;
        }
    }

    createDeadlyTubi(){
        this.deadly_tubo2 = this.add.image(16850+335, -150+140, "deadly1");
        this.deadly_tubo2.setOrigin(1,0);
        this.physics.add.existing(this.deadly_tubo2, true);
        this.deadly_tubo2.body.allowGravity = false;
        this.physics.add.collider(this.player, this.deadly_tubo2, ()=> {
            this.collide_deadly_tubo = true;
        });

        this.deadly_tubo3 = this.add.image(16440+245, 75+120, "deadly2");
        this.deadly_tubo3.setOrigin(0,0);
        this.physics.add.existing(this.deadly_tubo3, true);
        this.deadly_tubo3.body.allowGravity = false;
        this.physics.add.collider(this.player, this.deadly_tubo3, ()=> {
            this.collide_deadly_tubo = true;
        });

        this.deadly_tubo4 = this.add.image(16440+240, 360+50,  "deadly3");
        this.deadly_tubo4.setOrigin(0,0);
        this.physics.add.existing(this.deadly_tubo4, true);
        this.deadly_tubo4.body.allowGravity = false;
        this.physics.add.collider(this.player, this.deadly_tubo4, ()=> {
            this.collide_deadly_tubo = true;
        });

        this.deadly_tubo5 = this.add.image(16850+345, 360+50, "deadly3");
        this.deadly_tubo5.setOrigin(1,0);
        this.physics.add.existing(this.deadly_tubo5, true);
        this.deadly_tubo4.body.allowGravity = false;
        this.physics.add.collider(this.player, this.deadly_tubo5, ()=> {
            this.collide_deadly_tubo = true;
        });
    }

    createWallTubi(){
        this.tubo_wall_sx = this.add.tileSprite(16935.5-250, this.floorHeight, 37, 807, "tubo2_3");
        this.tubo_wall_sx.setOrigin(1, 1);
        this.physics.add.existing(this.tubo_wall_sx, true);

        this.physics.add.collider(this.tubo_wall_sx, this.player, ()=> {
            this.player.isJumping = false;
        });

        this.tubo_wall_dx = this.add.tileSprite(16935.5+250, this.floorHeight-150, 37, 807-150, "tubo2_3");
        this.tubo_wall_dx.setOrigin(0, 1);
        this.physics.add.existing(this.tubo_wall_dx, true);

        this.physics.add.collider(this.tubo_wall_dx, this.player, ()=> {
            this.player.isJumping = false;
        });
    }

    colliderScalaTubi(){
        if(this.tubo3_orizz.press == true){  //solo se la velocità del tubo è 0 posso camminarci sopra -> se si stanno muovendo ci passo attraverso
            this.physics.add.collider(this.tubo3_orizz, this.player, ()=> {
                this.player.isJumping = false;
            });
        }

        if(this.tubo4_orizz.press == true){
            this.physics.add.collider(this.tubo4_orizz, this.player, ()=> {
                this.player.isJumping = false;
            });
        }

        if(this.tubo5_orizz.press == true){
            this.physics.add.collider(this.tubo5_orizz, this.player, ()=> {
                this.player.isJumping = false;
            });
        }

        if(this.tubo6_orizz.press == true){
            this.physics.add.collider(this.tubo6_orizz, this.player, ()=> {
                this.player.isJumping = false;
            });
        }

    }

    addColliderTubi(p, t){
        this.t_collider = this.physics.add.collider(p, t, ()=> {
            p.isJumping = false;
        });
    }

    insertWaterbomb() {
        this.waterbombs = this.physics.add.staticGroup();
        this.waterbombs.create(200, this.floorHeight - 140,  "waterbomb").setScale(0.4).refreshBody();
        this.waterbombs.create(2975, this.floorHeight - 335,  "waterbomb").setScale(0.4).refreshBody();
        this.waterbombs.create(10000 -640, 70+75,  "waterbomb").setScale(0.4).refreshBody();
        this.waterbombs.create(16970, 120,  "waterbomb").setScale(0.4).refreshBody();

        // Le waterbombs devono fermarsi sul pavimento/fondo
        this.physics.add.collider(this.waterbombs, this.platforms);
        // Se il giocatore si sovrappone al funghetto... aggiorniamo il punteggio...
        this.physics.add.overlap(this.player, this.waterbombs, this.updateScore, null, this);
    }

    insertValvola() {
        this.valvola1 = new Valvola(this, 12490, 255+75, "valvola").setScale(1.2);
        this.valvola2 = new Valvola(this, 14000, 130+75, "valvola").setScale(1.2);
        this.valvola2_1 = new Valvola(this, 14000, this.floorHeight, "valvola").setScale(1.2);
        this.valvola3 = new Valvola(this, 14440.5+102.5, -113+45, "valvola").setScale(1.2);
        this.valvola4 = new Valvola(this, 14992.5+102.5, -221+45, "valvola").setScale(1.2);
        this.valvola5 = new Valvola(this, 15507.5+102.5, -345.5+45, "valvola").setScale(1.2);
        this.valvola6 = new Valvola(this, 16550, -202+75+50-37/2, "valvola").setScale(1.2);
    }

    overlapValvole() {
        // Se il giocatore si sovrappone alla valvola
        this.physics.add.overlap(this.player, this.valvola1, ()=> {
            const minTimeBetweenValvola = 800;    // Tempo minimo (in ms) tra uno shuriken e l'altro
            const timeFromPreviousValvola = this.time.now-this.lastValvola;

            if (this.keyV.isDown && !this.squarePlatform1.press && timeFromPreviousValvola > minTimeBetweenValvola) {   //e se preme 'V'
                this.lastValvola = this.time.now;
                

                this.valvola1.movementOn = true;
                this.player.valvola = true;
                this.valvola1.on("animationcomplete", function() {
                    this.valvola1.movementOn = false;
                    this.player.valvola = false;
                    this.squarePlatform1.press = true;
                    this.squarePlatform2.press = true;
                    this.squarePlatform3.press = true;
                    this.squarePlatform4.press = true;
                }, this);

                
                //this.player.on("animationcomplete", function() {this.player.valvola = false;}, this);

            } else if (this.keyV.isDown && this.squarePlatform1.press && timeFromPreviousValvola > minTimeBetweenValvola) {   //e se preme 'V'
                this.lastValvola = this.time.now;
                

                this.valvola1.movementOff = true;
                this.player.valvola = true;
                this.valvola1.on("animationcomplete", function() {
                    this.valvola1.movementOff = false;
                    this.player.valvola = false;
                    this.squarePlatform1.press = false;
                    this.squarePlatform2.press = false;
                    this.squarePlatform3.press = false;
                    this.squarePlatform4.press = false;
                }, this);

                
                //this.player.on("animationcomplete", function() {this.player.valvola = false;}, this);
            }
        });

        // Se il giocatore si sovrappone alla valvola
        this.physics.add.overlap(this.player, this.valvola2, ()=> {
            const minTimeBetweenValvola = 800;    // Tempo minimo (in ms) tra uno shuriken e l'altro

            const timeFromPreviousValvola = this.time.now-this.lastValvola;

            //e se preme 'V'
                if (this.keyV.isDown && this.tubo3_orizz.press && timeFromPreviousValvola > minTimeBetweenValvola) {
                    this.lastValvola = this.time.now;
                    
                    
                    this.t_collider.destroy();

                    this.valvola2.movementOff = true;
                    this.player.valvola = true;
                    this.valvola2.on("animationcomplete", function() {
                        this.valvola2.movementOff = false;
                        this.player.valvola = false;
                        this.tubo3_orizz.press = false;
                    }, this);

                    //this.player.on("animationcomplete", function() {this.player.valvola = false;}, this);

                } else if (this.keyV.isDown && !this.tubo3_orizz.press && timeFromPreviousValvola > minTimeBetweenValvola) {
                    this.lastValvola = this.time.now;
                    
                    this.addColliderTubi(this.player, this.tubo3_orizz);

                    this.valvola2.movementOn = true;
                    this.player.valvola = true;
                    this.valvola2.on("animationcomplete", function() {
                        this.valvola2.movementOn = false;
                        this.player.valvola = false;
                        this.tubo3_orizz.press = true;  //aggiorniamo il parametro 'press' nel file moving_tubi.js -> attiva l'if che azzera la velocità del tubo e lo ferma a mezz'aria
                    }, this);

                    //this.player.valvola = true;
                    //this.player.on("animationcomplete", function() {this.player.valvola = false;}, this);
                }
        });

        this.physics.add.overlap(this.player, this.valvola2_1, ()=> {
            const minTimeBetweenValvola = 800;    // Tempo minimo (in ms) tra uno shuriken e l'altro

            const timeFromPreviousValvola = this.time.now-this.lastValvola;

            //e se preme 'V'
                if (this.keyV.isDown && this.tubo3_orizz.press && timeFromPreviousValvola > minTimeBetweenValvola) {
                    this.lastValvola = this.time.now;
                    

                    this.t_collider.destroy();

                    this.valvola2_1.movementOff = true;
                    this.player.valvola = true;
                    this.valvola2_1.on("animationcomplete", function() {
                        this.valvola2_1.movementOff = false;
                        this.player.valvola = false;
                        this.tubo3_orizz.press = false;
                    }, this);


                } else if (this.keyV.isDown && !this.tubo3_orizz.press && timeFromPreviousValvola > minTimeBetweenValvola) {
                    this.lastValvola = this.time.now;
                    
                    this.addColliderTubi(this.player, this.tubo3_orizz);

                    this.valvola2_1.movementOn = true;
                    this.player.valvola = true;
                    this.valvola2_1.on("animationcomplete", function() {
                        this.valvola2_1.movementOn = false;
                        this.player.valvola = false;
                        this.tubo3_orizz.press = true;  //aggiorniamo il parametro 'press' nel file moving_tubi.js -> attiva l'if che azzera la velocità del tubo e lo ferma a mezz'aria
                    }, this);

                }
        });

        this.physics.add.overlap(this.player, this.valvola3, ()=> {
            const minTimeBetweenValvola = 800;    // Tempo minimo (in ms) tra uno shuriken e l'altro

            const timeFromPreviousValvola = this.time.now-this.lastValvola;

            //e se preme 'V'
                if (this.keyV.isDown && this.tubo4_orizz.press && timeFromPreviousValvola > minTimeBetweenValvola) {
                    this.lastValvola = this.time.now;
                    
                    
                    this.t_collider.destroy();

                    this.valvola3.movementOff = true;
                    this.player.valvola = true;
                    this.valvola3.on("animationcomplete", function() {
                        this.valvola3.movementOff = false;
                        this.player.valvola = false;
                        this.tubo4_orizz.press = false;
                    }, this);

                    //this.player.on("animationcomplete", function() {this.player.valvola = false;}, this);

                } else if (this.keyV.isDown && !this.tubo4_orizz.press && timeFromPreviousValvola > minTimeBetweenValvola) {
                    this.lastValvola = this.time.now;
                    
                    this.addColliderTubi(this.player, this.tubo4_orizz);

                    this.valvola3.movementOn = true;
                    this.player.valvola = true;
                    this.valvola3.on("animationcomplete", function() {
                        this.valvola3.movementOn = false;
                        this.player.valvola = false;
                        this.tubo4_orizz.press = true;  //aggiorniamo il parametro 'press' nel file moving_tubi.js -> attiva l'if che azzera la velocità del tubo e lo ferma a mezz'aria
                    }, this);

                    //this.player.on("animationcomplete", function() {this.player.valvola = false;}, this);
                }
        });

        this.physics.add.overlap(this.player, this.valvola4, ()=> {
            const minTimeBetweenValvola = 800;    // Tempo minimo (in ms) tra uno shuriken e l'altro

            const timeFromPreviousValvola = this.time.now-this.lastValvola;

            //e se preme 'V'
                if (this.keyV.isDown && this.tubo5_orizz.press && timeFromPreviousValvola > minTimeBetweenValvola) {
                    this.lastValvola = this.time.now;
                    
                    
                    this.t_collider.destroy();

                    this.valvola4.movementOff = true;
                    this.player.valvola = true;
                    this.valvola4.on("animationcomplete", function() {
                        this.valvola4.movementOff = false;
                        this.player.valvola = false;
                        this.tubo5_orizz.press = false;
                    }, this);

                    //this.player.on("animationcomplete", function() {this.player.valvola = false;}, this);
                    
                } else if (this.keyV.isDown && !this.tubo5_orizz.press && timeFromPreviousValvola > minTimeBetweenValvola) {
                    this.lastValvola = this.time.now;
                    
                    this.addColliderTubi(this.player, this.tubo5_orizz);
                    
                    this.valvola4.movementOn = true;
                    this.player.valvola = true;
                    this.valvola4.on("animationcomplete", function() {
                        this.valvola4.movementOn = false;
                        this.player.valvola = false;
                        this.tubo5_orizz.press = true;  //aggiorniamo il parametro 'press' nel file moving_tubi.js -> attiva l'if che azzera la velocità del tubo e lo ferma a mezz'aria
                    }, this);

                    //this.player.on("animationcomplete", function() {this.player.valvola = false;}, this);
                }
        });

        this.physics.add.overlap(this.player, this.valvola5, ()=> {
            const minTimeBetweenValvola = 800;    // Tempo minimo (in ms) tra uno shuriken e l'altro

            const timeFromPreviousValvola = this.time.now-this.lastValvola;

            //e se preme 'V'
                if (this.keyV.isDown && this.tubo6_orizz.press && timeFromPreviousValvola > minTimeBetweenValvola) {
                    this.lastValvola = this.time.now;
                    
                    
                    this.t_collider.destroy();
                    
                    this.valvola5.movementOff = true;
                    this.player.valvola = true;
                    this.valvola5.on("animationcomplete", function() {
                        this.valvola5.movementOff = false;
                        this.player.valvola = false;
                        this.tubo6_orizz.press = false;
                    }, this);

                    //this.player.on("animationcomplete", function() {this.player.valvola = false;}, this);
                    
                } else if (this.keyV.isDown && !this.tubo6_orizz.press && timeFromPreviousValvola > minTimeBetweenValvola) {
                    this.lastValvola = this.time.now;

                    this.addColliderTubi(this.player, this.tubo6_orizz);

                    this.valvola5.movementOn = true;
                    this.player.valvola = true;
                    this.valvola5.on("animationcomplete", function() {
                        this.valvola5.movementOn = false;
                        this.player.valvola = false;
                        this.tubo6_orizz.press = true;  //aggiorniamo il parametro 'press' nel file moving_tubi.js -> attiva l'if che azzera la velocità del tubo e lo ferma a mezz'aria
                    }, this);

                    //this.player.on("animationcomplete", function() {this.player.valvola = false;}, this);
                }
        });

        this.physics.add.overlap(this.player, this.valvola6, ()=> {
            if (this.keyV.isDown) {   //e se preme 'V'
                this.valvola6.movementOn = true;
                this.player.valvola = true;

                this.valvola6.on("animationcomplete", function() {
                    this.valvola6.movementOn = false;
                    this.player.valvola = false;
                    this.elevator_move = true;
                }, this);
                //this.player.on("animationcomplete", function() {this.player.valvola = false;}, this);
            }
        });
    }

    colliderMonsters() {
        this.colliderFunghetti = this.physics.add.collider(this.player, this.funghetti, ()=> {
            this.collide_mostro = true;
        });
        
        this.colliderFungo = this.physics.add.collider(this.player, this.fungo, ()=> {
            this.collide_mostro = true;
        });

        this.colliderGiusy = this.physics.add.collider(this.player, this.giusy, ()=> {
            this.collide_mostro = true;
        });

        this.colliderRana = this.physics.add.collider(this.player, this.rana, ()=> {
             this.collide_mostro = true;
        });
    }

    createUI() {
        this.scoreBox = this.add.image(30, 20, "waterbomb");
        this.scoreBox.setScale(0.3);
        this.scoreBox.setOrigin(0, 0);
        this.scoreBox.setScrollFactor(0, 0);
        this.scoreBox.alpha = 0.3;

        this.pause_button = this.add.image(this.game.config.width -80, 20, "pause_button").setScale(0.2);
        this.pause_button.setOrigin(0, 0);
        this.pause_button.setScrollFactor(0, 0);
        this.pause_button.setInteractive(); //imposta l'immagine in modo che possa essere cliccata

        this.pause_button.on("pointerover", ()=>{
            this.pause_button.setAlpha(0.7);
        });

        this.pause_button.on("pointerout", ()=>{
            this.pause_button.setAlpha(1);
        });

        this.pause_button.on("pointerdown", ()=>{ //quando viene clickato il bottone succedono cose
            this.scene.pause();
            this.scene.launch("scene_pause", {sceneName: "scene_one"});
        });

        this.countdownBarPlacement = this.add.rexRoundRectangle(this.game.config.width/2, 30, 504, 24, 4, 0xF8F1CF, 1);
        this.countdownBarPlacement.setOrigin(0.5, 0);
        this.countdownBarPlacement.setScrollFactor(0, 0);   

        this.countdownBar = this.add.rexRoundRectangle(this.game.config.width/2 -250, 32, 500, 20, 4, 0x000000, 1);
        this.countdownBar.setOrigin(0, 0);
        this.countdownBar.setScrollFactor(0, 0);

        this.orologio = this.add.image(this.game.config.width/2 - 270, 42, "orologio").setScale(0.3);
        this.orologio.setScrollFactor(0, 0);

        this.progressBarPlacement = this.add.rexRoundRectangle(this.game.config.width/2, 80, 504, 24, 4, 0xF8F1CF, 1);
        this.progressBarPlacement.setOrigin(0.5, 0);
        this.progressBarPlacement.setScrollFactor(0, 0);   

        this.progressBar = this.add.rexRoundRectangle(this.game.config.width/2 -250, 82, 0, 20, 0, 0x2FDF04, 1);
        this.progressBar.setOrigin(0, 0);
        this.progressBar.setScrollFactor(0, 0);

        this.funghetto_nero = this.add.image(this.game.config.width/2 -252 + 500/3, 92, "funghetto nero").setScale(0.8).setScrollFactor(0,0);
        this.funghetto = this.add.image(this.game.config.width/2 -252 + 500/3, 92, "funghetto").setScale(0.8).setAlpha(0).setScrollFactor(0,0);

        this.giusetta_nera = this.add.image(this.game.config.width/2 -252 + (500/3)*2, 92, "giusetta nera").setScale(0.8).setScrollFactor(0,0);
        this.giusetta = this.add.image(this.game.config.width/2 -252 + (500/3)*2, 92, "giusetta").setScale(0.8).setAlpha(0).setScrollFactor(0,0);

        this.ranetta_nera = this.add.image(this.game.config.width/2 -252 + 500, 92, "ranetta nera").setScale(0.8).setScrollFactor(0,0);
        this.ranetta = this.add.image(this.game.config.width/2 -252 + 500, 92, "ranetta").setScale(0.8).setAlpha(0).setScrollFactor(0,0);
    }

    orologioAnimation() {
        this.anims.create({
            key: "orologioTicks",
            frames: this.anims.generateFrameNumbers("orologio", {
                start: 0, //iniziamo dal primo frame
                end: 23, //e i primi 6 frame (fino alla fine della corsa)
            }),
            frameRate: 6, //aggiornimao l'immagine ogni 15 frame per rendere l'animazione non troppo rapida
            repeat: -1 //ripetiamo all'infinito la stessa animazione
        });

        this.orologio.anims.play("orologioTicks");
    }

    acquaAnimation() {
        this.anims.create({
            key: "acquaMovement",
            frames: this.anims.generateFrameNumbers("acqua", {
                start: 0, //iniziamo dal primo frame
                end: 2, //e i primi 6 frame (fino alla fine della corsa)
            }),
            frameRate: 6, //aggiornimao l'immagine ogni 15 frame per rendere l'animazione non troppo rapida
            repeat: -1 //ripetiamo all'infinito la stessa animazione
        });

        this.acqua.anims.play("acquaMovement");
        this.acqua1.anims.play("acquaMovement");
        this.acqua2.anims.play("acquaMovement");
        this.acqua3.anims.play("acquaMovement");
        this.acqua4.anims.play("acquaMovement");
        this.acqua5.anims.play("acquaMovement");
        this.acqua6.anims.play("acquaMovement");
        this.acqua7.anims.play("acquaMovement");
    }

    bolleAnimation() {
        this.anims.create({
            key: "bolleRising",
            frames: this.anims.generateFrameNumbers("bolle", {
                start: 0, //iniziamo dal primo frame
                end: 2, //e i primi 6 frame (fino alla fine della corsa)
            }),
            frameRate: 6, //aggiornimao l'immagine ogni 15 frame per rendere l'animazione non troppo rapida
            repeat: -1 //ripetiamo all'infinito la stessa animazione
        });

        this.bolle1.anims.play("bolleRising");
        this.bolle2.anims.play("bolleRising");
        this.bolle3.anims.play("bolleRising");
        this.bolle4.anims.play("bolleRising");
        this.bolle5.anims.play("bolleRising");
        this.bolle6.anims.play("bolleRising");
        this.bolle7.anims.play("bolleRising");
        this.bolle8.anims.play("bolleRising");
    }

    update() {
        console.log("scene_one - Executing update()");
        // Azioni che vengono eseguite a ogni frame del gioco

        if(this.player.body.x < this.initialX) {
            this.player.autoPlay();
        } else if(this.player.x == this.initialX && this.cursorKeys.left.isDown) {
            this.player.body.setVelocityX(0);

        } else  if(this.player.x > this.initialX) {
            this.player.manageMovements();
        }

        this.animateBackground();
        this.manageWaterbombLaunch();
        
        this.orizontal_platform1.initAnimations();
        this.vertical_platform1.initAnimations();
        this.vertical_platform2.initAnimations();
        this.vertical_platform3.initAnimations();

        this.orizontal_barile1.initAnimations();
        this.orizontal_barile2.initAnimations();

        this.squarePlatform1.squareAnimation();
        this.squarePlatform2.squareAnimation();
        this.squarePlatform3.squareAnimation();
        this.squarePlatform4.squareAnimation();
        
        this.tubo3_orizz.movingAnimation();
        this.tubo4_orizz.movingAnimation();
        this.tubo5_orizz.movingAnimation();
        this.tubo6_orizz.movingAnimation();

        this.valvola1.manageAnimations();
        this.valvola2.manageAnimations();
        this.valvola2_1.manageAnimations();
        this.valvola3.manageAnimations();
        this.valvola4.manageAnimations();
        this.valvola5.manageAnimations();
        this.valvola6.manageAnimations();

        this.downAnimation();
        this.upAnimation();

        if(this.elevator_move){
            this.elevator_animation();
        }

        //quando muore il personaggio?
        if ((this.collide_water) || this.collide_piante || this.player.y > this.game.config.height || this.collide_mostro || this.collide_deadly_tubo){
            this.playerDie();
        }

        this.funghetti.manageAnimation();
        this.fungo.manageAnimation();
        this.giusy.manageAnimation();
        this.rana.manageAnimation();
    }

    manageWaterbombLaunch() {
        const minTimeBetweenWaterbombs = 500;    // Tempo minimo (in ms) tra uno shuriken e l'altro

        const timeFromPreviousWaterbomb = this.time.now-this.lastWaterbomb;

        // Se A e' premuto ed e' passato abbastanza tempo tra la waterbomb precedente
        // e adesso...
        if(this.keyA.isDown && timeFromPreviousWaterbomb > minTimeBetweenWaterbombs) {
            // Se sono qui devo creare e lanciare uno shuriken
            this.lastWaterbomb = this.time.now;      // Setto il tempo per il prossimo giro
            const player_dir = this.player.flipX;   // Prendo la direzione del player (che sara' la direzione della waterbomb)
            if(player_dir){
                this.direction = -1;
            }else {
                this.direction = 1;
            }

            if (this.game.gameState.score > 0) {
                // Creo una waterbomb
                const waterbomb = new Waterbomb(this, this.player.x + (this.direction*46), this.player.y-60, 10, player_dir);
                // Aggiungo la collisione
                this.physics.add.overlap(this.funghetti, waterbomb, this.destroyMonster, null, this);
                this.physics.add.overlap(this.fungo, waterbomb, this.destroyMonster, null, this);
                this.physics.add.overlap(this.giusy, waterbomb, this.destroyMonster, null, this);
                this.physics.add.overlap(this.rana, waterbomb, this.destroyMonster, null, this);
                // Lo lancio
            
                waterbomb.fire();
                this.player.launch = true;
                this.timedEvent = this.time.addEvent({ delay: 300, callback: this.chiamaPlayerLaunchAnimation, callbackScope: this, loop: false });
                this.game.gameState.score -= 1;
                this.scoreBox.alpha = 0.2;
            }
        } 
    }

    updateScore(player, waterbomb) {
        this.game.gameState.score += 1;
        this.scoreBox.alpha = 1;
        waterbomb.destroy();
    }

    updateTimer(){
        if(this.game.gameState.playTime > 0 && this.funghetti.healthy) {
                
            this.countdownBar.width -= 1*(this.countdownBar.width/this.game.gameState.playTime);
            this.countdownBar.radius -= 0.004*(this.countdownBar.width/this.game.gameState.playTime)*2;
            //console.log(this.countdownBar.radius);
           
            this.game.gameState.playTime -= 1;
        }

        if(this.game.gameState.playTime <= 0) {
            this.playerDie();
        }
    }

    animateBackground() {

        // Aggiorno la posizione del background in base alla posizione della camera
        // con velocità diverse per ogni background
        
        this.background1.tilePositionX = this.cameras.main.scrollX * 0.1;
        this.background2.tilePositionX = this.cameras.main.scrollX * 0.3; 
        this.background3.tilePositionX = this.cameras.main.scrollX * 0.4;
        this.background4.tilePositionX = this.cameras.main.scrollX * 0.6;
        this.background3d.tilePositionX = this.cameras.main.scrollX * 0.63;
        
        this.background0.tilePositionY = this.cameras.main.scrollY * 0.1;
        this.background1.tilePositionY = this.cameras.main.scrollY * 0.17;
        this.background2.tilePositionY = this.cameras.main.scrollY * 0.2;
        this.background3.tilePositionY = this.cameras.main.scrollY * 0.22;
        this.background4.tilePositionY = this.cameras.main.scrollY * 0.25;
        this.background3d.tilePositionY = this.cameras.main.scrollY * 0.32;


        const startLineCamera = 600;
        const shiftCameraMax = 250;

        //this.cameras.main.followOffset.y = this.player.body.y-this.game.config.height/2 + this.player.body.height;

        if(this.player.y > this.floorHeight){
            this.cameras.main.followOffset.y = this.player.body.y-this.game.config.height/2 + this.player.body.height + 20;
            //console.log(this.player.body.y-this.game.config.height/2 + this.player.body.height);
        } else if(this.player.body.y + this.player.height / 2 < startLineCamera) {
            this.cameras.main.followOffset.y = Math.max(260 - shiftCameraMax, 260 - (startLineCamera- (this.player.body.y + this.player.height / 2)));
        }

        if(this.player.x < 0) {
            this.cameras.main.followOffset.x = /*this.game.config.width/2 + */ this.player.x;
        }
    }

    destroyMonster(monster, waterbomb) {
        //monster.destroy();

        if(monster == this.funghetti) {
            this.colliderFunghetti.destroy();
            this.funghetti.setScale(0.3);
        }
        if(monster == this.fungo) {
            this.colliderFungo.destroy();
            this.fungo.setScale(0.2);
            this.funghetto_nero.setAlpha(0);
            this.funghetto.setAlpha(1);

            this.progressBar.width += (500/3);
            this.progressBar.radius += 1.5;
        }
        if(monster == this.giusy) {
            this.colliderGiusy.destroy();
            this.giusy.setScale(0.4, 0.4);
            this.giusy.y = this.floorHeight+25;
            this.giusy.x = this.giusy.x - 100;
            this.giusetta_nera.setAlpha(0);
            this.giusetta.setAlpha(1);

            this.progressBar.width += (500/3);
            this.progressBar.radius += 1.5;
        }
        monster.healthy = true;
        waterbomb.destroy();
        if(monster == this.rana) {
            this.timedEvent = this.time.addEvent({ delay: 500, callback: this.chiamaHaiVinto, callbackScope: this, loop: false });
            this.colliderRana.destroy();
            this.ranetta_nera.setAlpha(0);
            this.ranetta.setAlpha(1);

            this.progressBar.width += (500/3);
            this.progressBar.radius += 1.5;
        }
        
    }

    chiamaHaiVinto(){
        this.scene.start("scene_youwin");
    }

    chiamaPlayerLaunchAnimation(){
        this.player.launch = false;
    }

    playerDie() {
        this.scene.start("scene_gameover");
    }

}