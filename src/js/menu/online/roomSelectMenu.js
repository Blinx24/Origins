//////////////////////////////////////////////////////////////////////
//                  Importaciones de otros JS                       //
//////////////////////////////////////////////////////////////////////
import { game } from '../../init.js';
import { controller } from '../../gameController.js';
import { user } from '../../server/user.js';
import { server } from '../../server/server.js';

//////////////////////////////////////////////////////////////////////
//                  Variables globales                              //
//////////////////////////////////////////////////////////////////////
//******************* Dimensiones lienzo ************************//
var width = 0;      // Ancho (px)
var height = 0;     // Alto (px)
//****************** Botones *********************//
// Lobbys //
var forestRoomButton = undefined;   // Tierra
var waterRoomButton = undefined;    // Agua
var fireRoomButton = undefined;     // Fuego
var airRoomButton = undefined;      // Aire
// Atrás //
var backButton = undefined;         
//******************* Servidor ************************//
// Imágenes //
var userIc = undefined;
// Texto //
var textServerConnected = "";
var textNumOfUsersConnected = "";
var textServerLog = undefined;
//******************* Control ************************//
// Selección de lobby //
var lobby = 0;  

//////////////////////////////////////////////////////////////////////
//              Clase de escena de menú de loobies                  //
//////////////////////////////////////////////////////////////////////
class sceneRoomSelectMenu extends Phaser.Scene {
    constructor() {
        super({
            key: "sceneRoomSelectMenu",
            active: false
        });
    }
    create() {
        //******************* Asignación escena ************************//       
        controller.setCurrentScene(this);

        //******************* Variables auxiliares ************************//
        width = this.sys.canvas.width;
        height = this.sys.canvas.height; 

        //******************* Fondos ************************//
        this.add.image(400, 320, "lobbyBG");

        //******************* Interfaz Servidor ************************//
        createServerUI();

        //****************** Botones *********************//
        // Lobbys //
        // Lobby de tierra
        forestRoomButton = this.add.sprite(width / 2, 222, "spriteForestLobby", 0).setInteractive();
        this.anims.create({
            key: 'forestRoomButtonAnim',
            frames: this.anims.generateFrameNumbers('spriteForestLobby', { start: 0, end: 0 }),
            frameRate: 6,
            repeat: 0
        });

        forestRoomButton.addListener('pointerover', () => {
            lobby = 1;
            forestRoomButton.anims.play('forestRoomButtonAnim', true);
        }, this);
        forestRoomButton.addListener('pointerout', () => {
            lobby = 0;
            forestRoomButton.anims.stop();
            forestRoomButton.setFrame(0);
        }, this);
        forestRoomButton.addListener('pointerdown', loadScene, this);

        // Lobby de agua
        waterRoomButton = this.add.sprite(width / 2, 312, "spriteWaterLobby", 0).setInteractive();
        this.anims.create({
            key: 'waterRoomButtonAnim',
            frames: this.anims.generateFrameNumbers('spriteWaterLobby', { start: 0, end: 0 }),
            frameRate: 6,
            repeat: 0
        });

        waterRoomButton.addListener('pointerover', () => {
            lobby = 2;
            waterRoomButton.anims.play('waterRoomButtonAnim', true);
        }, this);
        waterRoomButton.addListener('pointerout', () => {
            lobby = 0;
            waterRoomButton.anims.stop();
            waterRoomButton.setFrame(0);
        }, this);
        waterRoomButton.addListener('pointerdown', loadScene, this);

        // Lobby de fuego
        fireRoomButton = this.add.sprite(width / 2, 402, "spriteFireLobby", 0).setInteractive();
        this.anims.create({
            key: 'fireRoomButtonAnim',
            frames: this.anims.generateFrameNumbers('spriteFireLobby', { start: 0, end: 0 }),
            frameRate: 6,
            repeat: 0
        });

        fireRoomButton.addListener('pointerover', () => {
            lobby = 3;
            fireRoomButton.anims.play('fireRoomButtonAnim', true);
        }, this);
        fireRoomButton.addListener('pointerout', () => {
            lobby = 0;
            fireRoomButton.anims.stop();
            fireRoomButton.setFrame(0);
        }, this);
        fireRoomButton.addListener('pointerdown', loadScene, this);

        // Lobby de aire
        airRoomButton = this.add.sprite(width / 2, 492, "spriteAirLobby", 0).setInteractive();
        this.anims.create({
            key: 'airRoomButtonAnim',
            frames: this.anims.generateFrameNumbers('spriteAirLobby', { start: 0, end: 0 }),
            frameRate: 6,
            repeat: 0
        });

        airRoomButton.addListener('pointerover', () => {
            lobby = 4;
            airRoomButton.anims.play('airRoomButtonAnim', true);
        }, this);
        airRoomButton.addListener('pointerout', () => {
            lobby = 0;
            airRoomButton.anims.stop();
            airRoomButton.setFrame(0);
        }, this);
        airRoomButton.addListener('pointerdown', loadScene, this);

        // Retroceso //
        backButton = this.add.sprite(242 / 2, 580, "spriteBackButton2", 0).setInteractive();
        this.anims.create({
            key: 'backButtonAnim',
            frames: this.anims.generateFrameNumbers('spriteBackButton', {start: 1, end: 4}),
            frameRate: 6,
            repeat: 0
        });

        backButton.addListener('pointerover', () => {
            lobby = 5;
            backButton.anims.play('backButtonAnim',true);
        }, this);
        backButton.addListener('pointerout', () => {
            lobby = 0;
            backButton.anims.stop();
            backButton.setFrame(0);
        }, this);
        backButton.addListener('pointerdown', loadScene, this);  
    }
    update() {
        //****************** Servidor *********************//
        // Si está conectado el servidor
        if (server.isServerConnected() === true) {
            // Texto de estado
            textServerConnected.setStyle({
                color: '#00ff00',
            });
            textServerConnected.setText("Server Online");
            // Icono
            userIc.setTint(0x00ff00);
            // Usuarios conectados
            textNumOfUsersConnected.setStyle({
                color: '#00ff00',
            });
            textNumOfUsersConnected.setText(server.getConnectedUsers());
        } else {
            // Texto de estado
            textServerConnected.setStyle({
                color: '#ff0000',
            });
            textServerConnected.setText("Server Offline");
            // Icono
            userIc.setTint(0xff0000);
            // Usuarios conectados
            textNumOfUsersConnected.setStyle({
                color: '#ff0000',
            });
            textNumOfUsersConnected.setText("0");
        }
    }
}

//////////////////////////////////////////////////////////////////////
//                        Funciones extras                          //
//////////////////////////////////////////////////////////////////////
/**
 * Método para generar la interfaz del servidor
 */
function createServerUI() {
    //******************* Conexión al servidor ************************//
    controller.getCurrentScene().add.rectangle(730, 93, 160, 67, 0x000000, 0.6);
    // Texto //
    textServerConnected = controller.getCurrentScene().add.text(660, 70, "Loading...", {
        fontFamily: 'origins',
        fontSize: 14,
        color: '#00ff00',
    });

    //******************* Conexión al servidor ************************//
    // Texto //
    textNumOfUsersConnected = controller.getCurrentScene().add.text(685, 89, server.getConnectedUsers(), {
        fontFamily: 'origins',
        fontSize: 24,
        color: '#00ff00',
    });
    // Icono //
    userIc = controller.getCurrentScene().add.image(670, 105, "userIcon").setScale(1.2);
}

//******************* Carga de escena ************************//
/**
 * Carga de sala
 */
function loadRoom(){
    // Si el usuario tiene asignada una sala
    if(user.getOnlineRoom() !== ""){
        // Parado de la escena actual
        console.log("Carga de la siguiente escena de bosque.");
        controller.getCurrentScene().scene.stop();
        // Obtención de la siguiente escena
        var nextScene = game.scene.getScene("sceneOnlineSelectionMenu");
        // Comienzo de la escena
        nextScene.scene.start();
    }
}

/**
 * Carga de la siguiente escena
 */
function loadScene(){
    // En función del botón pulsado de la escena
    switch (lobby) {
        // Caso: 1 - Sala de tierra
        case 1:
            // Establecimiento de conexión con la sala de tierra
            console.log("Conectando...");
            server.connectToGroundRoom();
            // Carga de la sala una vez se ha establecido la conexión (con delay para poder ejecutarlo correctamente).
            controller.getCurrentScene().time.delayedCall(
                200,
                loadRoom,
                [],
                this
            );
            break;
        // Caso: 2 - Sala de 
        case 2:
            
            break;
        // Caso: 3 - Sala de 
        case 3:
            
            break;
        // Caso: 4 - Sala de 
        case 4:
            
            break;
        // Caso: 5 - Vuelta a la escena anterior
        case 5:
            controller.getCurrentScene().scene.stop();
            var nextScene = game.scene.getScene("scenePlayMenu");
            nextScene.scene.start();

            break;
    }
}

//////////////////////////////////////////////////////////////////////
//                          Exportaciones                           //
//////////////////////////////////////////////////////////////////////
export default sceneRoomSelectMenu;