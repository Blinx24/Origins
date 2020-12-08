//////////////////////////////////////////////////////////////////////
//                     Clase para el menu Jugar                     //
//////////////////////////////////////////////////////////////////////
import {game} from '../init.js';
import {controller} from '../gameController.js';

var backButton;
var singlePlayerButton;
var localMultiplayerButton;
var onlineMultiplayerButton;
var startAnim = false;



class scenePlayMenu extends Phaser.Scene {
    constructor() {
        super({key: "scenePlayMenu",
            active: false
        });
    }
    create() {


        // Variables auxiliares
        var width = this.sys.canvas.width;
        var height = this.sys.canvas.height;        

        // Fondo
        this.add.image(400, 320, "play");

        // Botón del modo 1 jugador
        singlePlayerButton = this.add.sprite(139, 251, "sprite1PlayerGM", 0).setInteractive();
        this.anims.create({
            key: 'singlePlayerAnim',
            frames: this.anims.generateFrameNumbers('sprite1PlayerGM', { start: 0, end: 6 }),
            frameRate: 4, 
            repeat: -1
        });

        singlePlayerButton.addListener('pointerover', () => {
            startAnim = true;
            controller.setGameMode(1);
        }, this);
        singlePlayerButton.addListener('pointerout', () => {
            startAnim = false;
            controller.setGameMode(0);
        }, this);
        singlePlayerButton.addListener('pointerdown', loadScene, this);

        // Botón del modo 2 jugadores (multijugador local)
        localMultiplayerButton = this.add.sprite(405, 251, "sprite2PlayerGM", 0).setInteractive();
        this.anims.create({
            key: 'localMultiplayerAnim',
            frames: this.anims.generateFrameNumbers('sprite2PlayerGM', { start: 0, end: 4 }),
            frameRate: 4, 
            repeat: -1
        });

        localMultiplayerButton.addListener('pointerover', () => {
            startAnim = true;
            controller.setGameMode(2);
        }, this);
        localMultiplayerButton.addListener('pointerout', () => {
            startAnim = false;
            controller.setGameMode(0);
        }, this);
        localMultiplayerButton.addListener('pointerdown', loadScene, this);

        // Botón del modo multijugador
        onlineMultiplayerButton = this.add.sprite(662, 251, "spriteMultiplayerGM", 0).setInteractive();
        this.anims.create({
            key: 'multiplayerAnim',
            frames: this.anims.generateFrameNumbers('spriteMultiplayerGM', { start: 0, end: 4 }),
            frameRate: 4, 
            repeat: -1
        });

        onlineMultiplayerButton.addListener('pointerover', () => {
            startAnim = true;
            controller.setGameMode(3);
        }, this);
        onlineMultiplayerButton.addListener('pointerout', () => {
            startAnim = false;
            controller.setGameMode(0);
        }, this);
        onlineMultiplayerButton.addListener('pointerdown', loadScene, this);

        // Botón de retroceder
        backButton = this.add.sprite(width - 242/2, 580, "spriteBackButton", 0).setInteractive();
        this.anims.create({
            key: 'backButtonAnim',
            frames: this.anims.generateFrameNumbers('spriteBackButton', {start: 1, end: 4}),
            frameRate: 3,
            repeat: 0
        });

        backButton.addListener('pointerover', () => {
            backButton.anims.play('backButtonAnim',true);
        }, this);
        backButton.addListener('pointerout', () => {
            backButton.anims.stop();
            backButton.setFrame(0);
        }, this);
        backButton.addListener('pointerdown', loadScene, this);
        controller.getMusic().resume();

    }
    update(time, delta){
        if(startAnim === true && controller.getGameMode() === 1){
            singlePlayerButton.anims.play('singlePlayerAnim', true);
            localMultiplayerButton.anims.play('localMultiplayerAnim', false);
            onlineMultiplayerButton.anims.play('multiplayerAnim', false);
        } else if (startAnim === true && controller.getGameMode() === 2){
            singlePlayerButton.anims.play('singlePlayerAnim', false);
            localMultiplayerButton.anims.play('localMultiplayerAnim', true);
            onlineMultiplayerButton.anims.play('multiplayerAnim', false);
        } else if (startAnim === true && controller.getGameMode() === 3){
            singlePlayerButton.anims.play('singlePlayerAnim', false);
            localMultiplayerButton.anims.play('localMultiplayerAnim', false);
            onlineMultiplayerButton.anims.play('multiplayerAnim', true);
        } else {
       
            singlePlayerButton.anims.play('singlePlayerAnim', false);
            localMultiplayerButton.anims.play('localMultiplayerAnim', false);
            onlineMultiplayerButton.anims.play('multiplayerAnim', false);
        }
    }    

}

function loadScene(){
    if(controller.getGameMode() === 1) {
        controller.setGameMode(0);
        alert("En progreso...");

    } else if(controller.getGameMode() === 2){
        controller.setGameMode(0);
        game.scene.stop("scenePlayMenu");
        game.scene.start("sceneSelectionMenu");
    } else if(controller.getGameMode() === 3){
        controller.setGameMode(0);
        alert("En progreso...");
    } else {
        controller.getMusic().pause();
        this.scene.start("sceneMainMenu");

    }
}

export default scenePlayMenu;
