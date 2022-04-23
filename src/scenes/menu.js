class Menu extends Phaser.Scene {
    constructor(){
        super("menuScene");
    }

    preload() {
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

        // show menu text
        this.add.text(game.config.width/2, game.config.height/2 - borderUISize - 
        borderPadding, ' Endless Runner Playtest Build', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2, ' Use (UP ARROW) to Jump ', 
        menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize + 
        borderPadding, ' Press (SPACE) to Start ', menuConfig).setOrigin(0.5);

        // define keys
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }
 
    update() {
        if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
          // game start
          game.settings = {
            enemySpeed: 3,     
          }
          this.scene.start('playScene');    
        }
    }
}


    