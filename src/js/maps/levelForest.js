//import gameController from './gameController.js';

var cursors
var playerAir
var playerGround

class sceneForestLevel extends Phaser.Scene {
    constructor() {
        super({key: "sceneForestLevel",
            active: false
        });
    }
    create() {
        // Fondo
        this.physics.add.image(400, 320, "forestMap");

        // Personaje hay que hacer un if con el personaje que toque
        // Gato de aire
        
        


       playerAir = this.physics.add.sprite(90,80,'AirCatIdle');

        //Air cat

        this.anims.create({
            key: 'leftAir',
            frames: this.anims.generateFrameNumbers('AirCatLeft', { start: 0, end: 4 }),
            frameRate: 5,
            repeat: -1
        });

        this.anims.create({
            key: 'rightAir',
            frames: this.anims.generateFrameNumbers('AirCatRight', { start: 0, end: 4 }),
            frameRate: 5,
            repeat: -1
        });

        this.anims.create({
            key: 'upAir',
            frames: this.anims.generateFrameNumbers('AirCatUp', { start: 0, end: 4 }),
            frameRate: 5,
            repeat: -1
        });
        
        this.anims.create({
            key: 'downAir',
            frames: this.anims.generateFrameNumbers('AirCatDown', { start: 0, end: 4 }),
            frameRate: 5,
            repeat: -1
        });

        this.anims.create({
            key: 'idleAir',
            frames: this.anims.generateFrameNumbers('AirCatIdle', { start: 0, end: 6 }),
            frameRate: 4, 
            repeat: -1   
        });


        playerAir.anims.play('rightAir');

        

       playerGround = this.physics.add.sprite(50,80,'GroundCatIdle');

       //Ground cat

       this.anims.create({
           key: 'leftGround',
           frames: this.anims.generateFrameNumbers('GroundCatLeft', { start: 0, end: 4 }),
           frameRate: 5,
           repeat: -1
       });

       this.anims.create({
           key: 'rightGround',
           frames: this.anims.generateFrameNumbers('GroundCatRight', { start: 0, end: 4 }),
           frameRate: 5,
           repeat: -1
       });

       this.anims.create({
           key: 'upGround',
           frames: this.anims.generateFrameNumbers('GroundCatUp', { start: 0, end: 4 }),
           frameRate: 5,
           repeat: -1
       });
       
       this.anims.create({
           key: 'downGround',
           frames: this.anims.generateFrameNumbers('GroundCatDown', { start: 0, end: 4 }),
           frameRate: 5,
           repeat: -1
       });

       this.anims.create({
           key: 'idleGround',
           frames: this.anims.generateFrameNumbers('GroundCatIdle', { start: 0, end: 6 }),
           frameRate: 4, 
           repeat: -1   
       });


       playerGround.anims.play('rightGround');


        cursors = this.input.keyboard.createCursorKeys();

    }
    update(time, delta){




        //Aire

        if (cursors.a.isDown)
        {
            playerAir.setVelocityX(-160);

            playerAir.anims.play('leftAir', true);
        }
        else if (cursors.d.isDown)
        {
            playerAir.setVelocityX(160);

            playerAir.anims.play('rightAir', true);
        }
        else if(cursors.s.isDown){
            playerAir.setVelocityY(160);

            playerAir.anims.play('downAir', true);
        }
        else if(cursors.w.isDown){
            playerAir.setVelocityY(-160);

            playerAir.anims.play('upAir', true);
        }
        else
        {
            playerAir.setVelocityX(0);
            playerAir.setVelocityY(0);

            playerAir.anims.play('idleAir',true);
        }
    



    // Gato de tierra


    if (cursors.left.isDown)
    {
        playerGround.setVelocityX(-160);

        playerGround.anims.play('leftGround', true);
    }
    else if (cursors.right.isDown)
    {
        playerGround.setVelocityX(160);

        playerGround.anims.play('rightGround', true);
    }
    else if(cursors.down.isDown){
        playerGround.setVelocityY(160);

        playerGround.anims.play('downGround', true);
    }
    else if(cursors.up.isDown){
        playerGround.setVelocityY(-160);

        playerGround.anims.play('upGround', true);
    }
    else
    {
        playerGround.setVelocityX(0);
        playerGround.setVelocityY(0);

        playerGround.anims.play('idleGround',true);
    }



    }
}

export default sceneForestLevel;