class Instruction extends Phaser.Scene {
    constructor(){
        super("instructionScene");
    }

    preload() {
       // load audio
       this.load.audio('uiSelect', './assets/sfx/SFX_UIGeneric9.wav');

       // load images
       this.load.spritesheet('menuBG', './assets/images/menuScene.png', 
            {frameWidth: 1100, frameHeight: 800});
    }

    create() {
       // menu text configuration
        let menuConfig = {
            fontFamily: 'Georgia',
            fontSize: '30px',
            backgroundColor: '#a60606',
            color: '#000000',
            align: 'left',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }
         
        let titleConfig = {
            fontFamily: 'Georgia',
            fontSize: '42px',
            backgroundColor: '#a60606',
            color: '#000000',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }
        
        this.add.rectangle(0, 0, game.config.width, game.config.height, 0xa60606).setOrigin(0, 0);

        // show menu text
        this.add.text(game.config.width/2, game.config.height/2 - borderUISize - 
        borderPadding - 200, ' Instructions:', titleConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 - 200, 'Gain points the further you travel', 
        menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 - 150, 'Jump over enemies to progress', 
        menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 - 100, 'If you die, you run upside down in the Dead World', 
        menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 - 50, 'Revive yourself by making it to a Second Life Portal ', 
        menuConfig).setOrigin(0.5);     
        this.add.text(game.config.width/2, game.config.height/2, 'or use your Revive Ability gained from defeating enemies ', 
        menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 + 80, ' Controls: ', 
        titleConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 + 150, ' Use the (Left & Right ARROWS) to move ', 
        menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 + 200, ' Use the (Up & Down ARROWS) to Jump ', 
        menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 + 250, ' Press (SPACE) to use Revive Ability ', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 + 300, ' Press (R) to reset game ', menuConfig).setOrigin(0.5);
        // define keys
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyI = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.I);
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
    
        if (Phaser.Input.Keyboard.JustDown(keyI) || Phaser.Input.Keyboard.JustDown(keySPACE)) {       
            //this.sound.play('uiSelect');
            this.uiSelect.play();
            this.scene.start('menuScene');    
        }
    }
}