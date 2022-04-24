class Play extends Phaser.Scene {
    constructor(){
        super("playScene");
    }
    preload(){
        // load image sprites
        this.load.image('background', './assets/GB-background.png');
        this.load.image('background_far', './assets/GB-background_far.png');
        this.load.image('background_mid', './assets/GB-background_mid.png');
        this.load.image('background_front', './assets/GB-background_front.png');
        this.load.image('floor', './assets/GB-floor.png');
        this.load.image('player', './assets/GB-player.png');
        this.load.image('enemy01', './assets/GB-enemy.png');
    }

    
    create() {

        this.physics.world.setFPS(65);
        //game.physics.startSystem(Phaser.Physics.ARCADE);
        // place background tile sprite
        this.background = this.add.tileSprite(0, 0, 900, 600, 'background').setOrigin(0, 0);
        this.background_far = this.add.tileSprite(0, 0, 900, 600, 'background_far').setOrigin(0, 0);
        this.background_mid = this.add.tileSprite(0, 0, 900, 600, 'background_mid').setOrigin(0, 0);
        this.background_front = this.add.tileSprite(0, 0, 900, 600, 'background_front').setOrigin(0, 0);
        
        // place floor sprite make sure it doesn't move
        this.floor = this.physics.add.sprite(450, 300, 'floor');
        this.floor.setImmovable(true);
        this.floor.body.allowGravity = false; 

        // add enemy 01
        // spawn enemies off screen
        this.enemy01 = new Enemy(this, game.config.width + 100, game.config.height/2 -100, 'enemy01').setOrigin(0.5, 0);
        
        // add player (p1)
        //this.player = this.physics.add.sprite(game.config.width/2 - 250, game.config.height - borderUISize - borderPadding - 353, 'player').setOrigin(0.5, 0);
        this.player = new Player(this, game.config.width/2 - 250, game.config.height/2 - 250, 'player').setOrigin (0.5,0);


        // white borders
        this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);        
        
        // GAME OVER flag
        this.gameOver = false; 
        
        //add collider relationships
        this.physics.add.collider(this.player, this.enemy01, this.enemyHit, null, this); // calls the enemyHit function on collision with player

        this.physics.add.collider(this.player, this.floor);
        this.physics.add.collider(this.enemy01, this.floor);


        // define keys
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyJUMP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        

        this.pointer = this.input.activePointer;

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

    }
 
    update(){         
        //keep track of time
        this.clockTime += 1;
        if(this.clockTime >= 60){
            this.p1Score += 1;
            this.clockTime = 0;
        }
 
        // update score
        this.scoreUI.text = this.p1Score;
 
        // update game objects
        if (!this.gameOver) {
            //Parallax
            //this.background.tilePositionX -= 5;
            this.background_far.tilePositionX += 1;
            this.background_mid.tilePositionX += 2;
            this.background_front.tilePositionX += 3;

            this.player.update();             // update player sprite
            this.playerJump(this.player);
            this.enemy01.update();               // update enemy 01 sprite
        }   

        // if(Phaser.Input.Keyboard.JustDown(keyF)) {
        //     this.playerJump;
        // }
    }

    //collision is now checked in the create function
    checkCollision(player, enemy) {
        // simple AABB checking
        if (this.player.x < this.enemy01.x + this.enemy01.width && 
            this.player.x + this.player.width > this.enemy01.x && 
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

        // if ((this.input.activePointer.isDown) && player.body.touching.down)
        // {
        //     console.log("JUMPING...");
        //     player.setVelocityY(-player.jumpSpeed);
        // }

 
        //tells player.js whether or not the classes object isGrounded
        if (player.body.touching.down){
            player.isGrounded = true;
        } else {
            player.isGrounded = false; 
        }
    }
}