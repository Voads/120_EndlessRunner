class GameOver extends Phaser.Scene {
    constructor(){
        super("GameOverScene");
    }

    preload() {
        // load images
       this.load.spritesheet('gameOverBG', './assets/images/gameOver.png', 
       {frameWidth: 1100, frameHeight: 800});
    }

    create() {
        // menu text configuration
         let menuConfig = {
             fontFamily: 'Courier',
             fontSize: '24px',
             backgroundColor: '#000000',
             color: '#FFFFFF',
             align: 'right',
             padding: {
                 top: 5,
                 bottom: 5,
             },
             fixedWidth: 0
         }
 
         //show menu image
 
            this.anims.create({
                key: 'gameOverBG',
                frames: this.anims.generateFrameNumbers('gameOverBG', {frames: [0,1,2,3,4,5,6,7,8,9,10,11]}),
                frameRate: 12,
                repeat:0
            });
 
            this.startMenu = this.add.sprite(550, 400, 'gameOverBG');
            this.startMenu.play('gameOverBG');

            // define keys
            keyY = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Y);
            keyN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.N);
        }

        update() {
    
            if (Phaser.Input.Keyboard.JustDown(keyY)) {
              // game start
              game.settings = {
                enemySpeed: 8,     
              }
              //this.sound.play('uiSelect');
              this.uiSelect.play();
              this.scene.start('playScene');    
            }
        }
}