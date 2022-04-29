class Menu extends Phaser.Scene {
    constructor(){
        super("menuScene");
    }

    preload() {
       // load audio
       this.load.audio('run1', './assets/sfx/step1.wav');
       this.load.audio('run2', './assets/sfx/step2.wav');
       this.load.audio('run1and2', './assets/sfx/steps1and2.wav');
       this.load.audio('jump', './assets/sfx/jumping.wav');
       this.load.audio('land', './assets/sfx/landing.wav');
       this.load.audio('resPop', './assets/sfx/healpop-shyguy014.wav');
       this.load.audio('res', './assets/sfx/res1-silverillusionist.wav');
       this.load.audio('bloodSplat', './assets/sfx/bloodsplat2-magnuswaker.wav');
       this.load.audio('uiSelect', './assets/sfx/SFX_UIGeneric9.wav');
       this.load.audio('runningMusic', './assets/music/Fairy-Dust.mp3');
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


        // define UI sounds
        this.uiSelect = this.sound.add('uiSelect', {
            mute: false,
            volume: .3,
            rate: 1,
            loop: false,
            delay: 0
        });
    }
 
    update() {
        if (Phaser.Input.Keyboard.JustDown(keySPACE) || Phaser.Input.Keyboard.JustDown(keyUP) || Phaser.Input.Keyboard.JustDown(keyDOWN)) {
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


    