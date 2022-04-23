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


        //add colliders
        this.physics.add.collider(this.player, this.enemy01, function (player, enemy) {
            console.log('colliding with enemy');
        });
        this.physics.add.collider(this.player, this.floor);
        this.physics.add.collider(this.enemy01, this.floor);


        // define keys
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyJUMP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        
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
        // if(this.checkCollision(this.p1Player, this.enemy01)) {
        //     //this.enemyHit(this.enemy01);
        //     console.log('enemy Hit');   
        // }

        // if(Phaser.Input.Keyboard.JustDown(keyF)) {
        //     this.playerJump;
        // }
    }

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
        //the keyboard input.on() is more reliable than the input.isDown bool because it can miss quick inputs.  
        keyUP.on('down', function(){
            if (player.body.touching.down){
                console.log("JUMPING...");
                player.setVelocityY(-player.jumpSpeed);
            }
        });
        //control isGrounded variable
        if (player.body.touching.down){
            player.isGrounded = true;
        } else
            { player.isGrounded = false; }
        // if ((this.keyUP.isDown) && player.body.touching.down)
        // {
        //     console.log("JUMPING...");
        //     player.setVelocityY(-player.jumpSpeed);
        // }
    }
}