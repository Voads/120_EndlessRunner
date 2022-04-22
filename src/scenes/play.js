class Play extends Phaser.Scene {
    constructor(){
        super("playScene");
    }
    preload(){
    // load image sprites
    this.load.image('background', './assets/GB-background.png');
    this.load.image('floor', './assets/GB-floor.png');
    this.load.image('player', './assets/GB-player.png');
    this.load.image('enemy01', './assets/GB-enemy.png');
    }

    create() {
        //game.physics.startSystem(Phaser.Physics.ARCADE);
        // place background tile sprite
        this.background = this.add.tileSprite(0, 0, 900, 600, 'background').setOrigin(0, 0);
        // place floor sprite
        this.physics.add.sprite(450, 300, 'floor');
        // white borders
        this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);        
        
        // add player (p1)
        this.player = this.physics.add.sprite(game.config.width/2 - 250, game.config.height - borderUISize - borderPadding - 353, 'player').setOrigin(0.5, 0);
        this.player.setBounce(0.2);
        this.player.setCollideWorldBounds(true);

        // add enemy 01
        this.enemy01 = new Spaceship(this, game.config.width/2 + 250, game.config.height - borderUISize - borderPadding - 353, 'enemy01').setOrigin(0.5, 0);
        
        // define keys
        this.keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.keyJUMP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);

        
        // initialize score
        this.p1Score = 0;
        // initialize time
        this.clockTime = 0;
        
        // display style score
        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '24px',
            backgroundColor: '#ffffff',
            color: '#000000',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }
        
        // score text
        this.scoreUI = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*2, 
            this.p1Score, menuConfig);

        // GAME OVER flag
        this.gameOver = false; 
    }
 
    update(){
        // initialize timer
        this.clockTime += 1;
        if(this.clockTime >= 60){
            this.p1Score += 1;
            this.clockTime = 0;
        }
 
        // update score
        this.scoreUI.text = this.p1Score;
 
        // update game objects
        if (!this.gameOver) {
            this.player.update();             // update player sprite
            this.playerJump(this.player);
            this.enemy01.update();               // update enemy 01 sprite
        }   
 
        // check collisions
        if(this.checkCollision(this.p1Player, this.enemy01)) {
            this.enemyHit(this.enemy01);   
        }

        // if(Phaser.Input.Keyboard.JustDown(keyF)) {
        //     this.playerJump;
        // }
    }

    checkCollision(player, enemy) {
        // simple AABB checking
        if (this.player.x < this.enemy01.x + this.enemy01.width - 10 && 
            this.player.x + this.player.width - 10 > this.enemy01.x && 
            this.player.y < this.enemy01.y + this.enemy01.height &&
            this.player.height + this.player.y > this.enemy01.y) 
        {
            return true;
        } 
        else {
            return false;
        }
    }

    enemyHit(enemy) {
        // End game
        this.gameOver = true;
        this.scene.start('menuScene');    
    }

    playerJump(player) {
        if (this.keyJUMP.isDown) //player.body.touching.ground)
        {
            console.log("JUMPING...");
            player.setVelocityY(-330);
        }
    }
}