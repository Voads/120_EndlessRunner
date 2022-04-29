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
        borderPadding - 50, ' Endless Runner Playtest Build', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2, ' Use (UP ARROW) to Jump when alive ', 
        menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 + 50, ' Use (Down ARROW) to Jump when dead ', 
        menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize + 
        borderPadding + 50, ' Press (SPACE) to use Abilities ', menuConfig).setOrigin(0.5);

        // define keys
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
      }
 
    update() {
        if (Phaser.Input.Keyboard.JustDown(keySPACE) || Phaser.Input.Keyboard.JustDown(keyUP) || Phaser.Input.Keyboard.JustDown(keyDOWN)) {
          // game start
          game.settings = {
            enemySpeed: 8,     
          }
          this.scene.start('playScene');    
        }
    }
}


    