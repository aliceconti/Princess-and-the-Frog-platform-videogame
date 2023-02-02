import SceneWelcomeMenu from "./scenes/welcome.js";
import SceneOne from "./scenes/scene_one.js";
import SceneYouWin from "./scenes/scene_youwin.js";
import SceneGameOver from "./scenes/scene_gameover.js";
import Crediti from "./scenes/scene_credits.js";
import Pausa from "./scenes/scene_pause.js";
import Storia1 from "./scenes/scene_story1.js";
import Storia2 from "./scenes/scene_story2.js";
import Storia3 from "./scenes/scene_story3.js";
import Text1 from "./scenes/scene_text1.js";
import Text2 from "./scenes/scene_text2.js";
import Text3 from "./scenes/scene_text3.js";
import Text4 from "./scenes/scene_text4.js";


// Definiamo la configurazione di lancio del gioco
const config = {
    type: Phaser.AUTO,
    width: 1280,
    height: 720,
    backgroundColor: 0x000000, // sfondo nero
    scene: [ SceneWelcomeMenu, Storia1, Text1, Storia2, Text2, Storia3, Text3, Text4, SceneOne, SceneYouWin, SceneGameOver, Crediti, Pausa ],
    pixelArt: false,
    parent: "game_area", // Specifica il div contenitore
    physics: {     //vuol dire che mi interessa la fisica
        default: 'arcade',
        arcade: {
            gravity: {
                y: 410,   //quanto è forte la gravità
            },
            debug: false  //mi fa vedere i quadrati di contorno dei vari oggetti
        }
    }
};

//creiamo il gioco a partire dalla configurazione iniziale
const game = new Phaser.Game(config);

game.gameState = {
    playTime: 2000,
    score: 0,
}

//game.scene.start("scene_welcome_menu");