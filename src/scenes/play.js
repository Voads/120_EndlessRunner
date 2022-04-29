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
        this.load.spritesheet('player', './assets/GB-player.png', 
            { frameWidth: 73, frameHeight: 102 });
        // this.load.image('player', './assets/GB-player.png');
        // this.load.image('deadPlayer', './assets/GB-player_dead.png');
        this.load.image('enemy01', './assets/GB-enemy.png');
        this.load.image('revivePort', './assets/GB-revivePort.png');
        this.load.image('ability1', './assets/GB-ability1.png');

    }

    
    create() {       
        // place background tile sprite
        this.background = this.add.tileSprite(0, 0, 900, 600, 'background').setOrigin(0, 0);
        this.background_far = this.add.tileSprite(0, game.config.height/2 + 2, 900, 600, 'background_far').setOrigin(0, .5);
        this.background_mid = this.add.tileSprite(0, game.config.height/2 + 2, 900, 600, 'background_mid').setOrigin(0, .5);
        this.background_front = this.add.tileSprite(0, game.config.height/2 + 2, 900, 600, 'background_front').setOrigin(0, .5);
    
        // place floor sprite make sure it doesn't move
        this.floor = this.physics.add.sprite(450, game.config.height/2, 'floor').setOrigin(.5, .5); //spawn exactly center
        this.floor.setImmovable(true);
        this.floor.body.allowGravity = false; 

        // create 'groups' for each spawning object
        this.enemies = this.add.group({
            classType: Enemy,
            enableBody: true,
            physicsBodyType: Phaser.Physics.Arcade,
            maxSize: 20,
            runChildUpdate: true
        });
        this.revivePort = this.add.group({
            classType: RevivePortal,
            enableBody: true,
            physicsBodyType: Phaser.Physics.Arcade,
            maxSize: 5,
            runChildUpdate: true
        });

        // spawn enemies off screen
        this.enemy01 = new Enemy(this, game.config.width + 100, game.config.height/2 -100, 'enemy01').setOrigin(0.5, 0);

        // add player (p1)
        // this.player = this.physics.add.sprite(game.config.width/2 - 250, game.config.height - borderUISize - borderPadding - 353, 'player').setOrigin(0.5, 0);
        this.player = new Player(this, game.config.width/2 - 250, game.config.height/2 - 250, 'player').setOrigin (0.5,0);
        // create animations for player
        this.anims.create({
            key: 'alive-run',
            frames: this.anims.generateFrameNumbers('player', {frames: [0]}),
            framerate: 1,
            repeat: -1
        });
        this.anims.create({
            key: 'dead-run',
            frames: this.anims.generateFrameNumbers('player', {frames: [1]}),
            framerate: 1,
            repeat: -1
        });

        // revive portal
        // this.revivePort = new RevivePortal(this, game.config.width + 1150, game.config.height/2-23 , 'revivePort').setOrigin(0.5,0.5);
        // this.revivePort.setImmovable(true);
        // this.revivePort.body.allowGravity = false; 

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
        this.physics.add.overlap(this.player, this.revivePort, this.playerRevive, null, this);
        this.physics.add.collider(this.enemy01, this.floor);


        // define keys
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyJUMP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        

        // this.pointer = this.input.activePointer;

        // initialize score
        this.p1Score = 0;
        this.clockScore = 0;
        // initialize time
        this.clockTime = 0;
        // initialize counter
        this.counter = 0;
        this.random = 0;
        
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
        this.clockScore += 1;
        this.clockTime += 1;
        this.counter += 1;

        // 1 second timer 60 fps
        if(this.clockScore >= 60){
            this.p1Score += 1;
            this.clockScore = 0;
        }

        // spawn timer 
        if(this.clockTime >= 60){
            console.log(this.clockTime);
        
            if (this.p1Score > 10){
                this.clockTime = 30;
            } else{
                this.clockTime = 0;
            }

            // random number between 0 and 2
            this.random = Phaser.Math.Between(0, 4);
            this.spawnEnemy(this.random);
            this.spawnPortal(this.random);
            // if(this.random == 1){
            //  this.enemy01 = new Enemy(this, game.config.width + 50, game.config.height/2 -100, 'enemy01').setOrigin(0.5, 0);
            //  console.log("enemy add");
            // }
            // if(this.random == 2){
            //     this.revivePort1 = new RevivePortal(this, game.config.width + 1150, game.config.height/2-23 , 'revivePort').setOrigin(0.5,0.5);
            //     this.revivePort1.setImmovable(true);
            //     this.revivePort1.body.allowGravity = false; 
            //     console.log("respawn add");
            //    }
            this.counter = 0;
        }
 
        // update score
        this.scoreUI.text = this.p1Score;
 
        // update game objects
        if (!this.gameOver) {
            //Parallax
            //this.background.tilePositionX -= 5;
            this.background_far.tilePositionX += 2;
            this.background_mid.tilePositionX += 3;
            this.background_front.tilePositionX += 4;

            this.player.update();             // update player sprite
            this.playerJump(this.player);
            this.enemy01.update();               // update enemy 01 sprite
            //this.revivePort.update();

            // for loop too call each update function of a given group 
            // this.enemies.runChildUpdate = true;
        }   
    
        if (this.player.reviveAbility &&Phaser.Input.Keyboard.JustDown(keySPACE)) {
            this.ability1.disableBody(true, true);
            this.playerRevive();
            this.player.reviveAbility = false;

        }
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

    enemyHit(player, enemy) {
        // check for player hopping on enemy
        if(!this.player.isDead){
            if(enemy.body.touching.up && !player.isGrounded){
                enemy.disableBody(true, true);
                this.player.setVelocityY(-300);
                this.collectAbility();
            }  
            else{
                // player dies
                this.player.handleDeath('deadPlayer');
                this.player.play('dead-run');
            }
        }
        else{
            if(enemy.body.touching.down){
                enemy.disableBody(true, true);
                this.collectAbility();
                
            }  
            else {
            // End game
            this.gameOver = true;
            this.scene.start('menuScene');    
            }
        } 
    }

    collectAbility(){
        if(!this.player.reviveAbility){
            this.player.reviveAbility = true;
            this.ability1 = this.physics.add.sprite(750, 100, 'ability1').setOrigin(0, .5);
            this.ability1.setImmovable(true);
            this.ability1.body.allowGravity = false;
        }
    }

    playerRevive(){
        if(this.player.isDead){
            this.player.handleRevive();
            this.player.play('alive-run');
        }
    }

    playerJump(player) {

        // if ((this.input.activePointer.isDown) && player.body.touching.down)
        // {
        //     console.log("JUMPING...");
        //     player.setVelocityY(-player.jumpSpeed);
        // }

 
        //tells player.js whether or not the classes object isGrounded
        if (player.body.touching.down || player.body.touching.up){
            player.isGrounded = true;
        } else {
            player.isGrounded = false; 
        }
    }

    spawnEnemy(randValue){
        // random number between 0 and 2
        // spawn enemy
        if(randValue == 0 || randValue == 1){
            //var newEnemy = new Enemy(this, game.config.width, game.config.height/2 -100, 'enemy01').setOrigin(0.5, 0);
            // get and create last enemy in group array
            var newEnemy = this.enemies.create(game.config.width + 50, game.config.height/2 -100, 'enemy01').setOrigin(0.5, 0);
            this.physics.add.collider(newEnemy, this.floor);
            this.physics.add.collider(this.player, newEnemy, this.enemyHit, null, this); // calls the enemyHit function on collision with player
            
            
            console.log("enemy add");
        }
        if(randValue == 2 || randValue == 3){
            // spawn upside-down enemies
            var newEnemyFlipY = this.enemies.create(game.config.width + 50, game.config.height/2 +20, 'enemy01').setOrigin(0.5, 0);
            newEnemyFlipY.handleUpsideDown(true);
            this.physics.add.collider(newEnemyFlipY, this.floor);
            this.physics.add.collider(this.player, newEnemyFlipY, this.enemyHit, null, this); // calls the enemyHit function on collision with player
        }
    }
    
    spawnPortal(randValue){
        // spawn revive portal
        if(randValue == 4){
            var newRevPort = this.revivePort.create(game.config.width + 100, game.config.height/2-23, 'revivePort').setOrigin(0.5,0.5);
            this.physics.add.overlap(this.player, newRevPort, this.playerRevive, null, this);
            newRevPort.setImmovable(true);
            newRevPort.body.allowGravity = false; 

            this.clockTime = 0;
            console.log("respawn add");

           }
    }
}