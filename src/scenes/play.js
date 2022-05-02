class Play extends Phaser.Scene {
    constructor(){
        super("playScene");
    }
    preload(){
        // load image sprites
        this.load.image('background', './assets/images/GB-background.png');
        this.load.image('background_far', './assets/images/GB-background_far.png');
        this.load.image('background_mid', './assets/images/GB-background_mid.png');
        this.load.image('background_front', './assets/images/GB-background_front.png');
        this.load.image('floor', './assets/images/GB-floor.png');
        this.load.spritesheet('player', './assets/images/player.png', 
            { frameWidth: 620, frameHeight: 500 });
        this.load.image('enemy', './assets/images/GB-enemy.png');
        this.load.image('enemyFast', './assets/images/GB-enemyFast.png');
        this.load.image('revivePort', './assets/images/GB-revivePort.png');
        this.load.image('ability1', './assets/images/GB-ability1.png');
        this.load.image('bloodParticle', './assets/images/bloodParticle.png');

    }

    
    create() {       
        // place background tile sprite
        this.background = this.add.tileSprite(0, 0, 1100, 800, 'background').setOrigin(0, 0);
        this.background_far = this.add.tileSprite(0, game.config.height/2 + 2, 1100, 800, 'background_far').setOrigin(0, .5);
        this.background_mid = this.add.tileSprite(0, game.config.height/2 + 2, 1100, 800, 'background_mid').setOrigin(0, .5);
        this.background_front = this.add.tileSprite(0, game.config.height/2 + 3, 1100, 800, 'background_front').setOrigin(0, .5);
    
        // place floor sprite make sure it doesn't move
        this.floor = this.physics.add.sprite(550, game.config.height/2, 'floor').setOrigin(.5, .5); //spawn exactly center
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
        this.enemiesFast = this.add.group({
            classType: EnemyFast,
            enableBody: true,
            physicsBodyType: Phaser.Physics.Arcade,
            maxSize: 5,
            runChildUpdate: true
        })
        this.revivePort = this.add.group({
            classType: RevivePortal,
            enableBody: true,
            physicsBodyType: Phaser.Physics.Arcade,
            maxSize: 5,
            runChildUpdate: true
        });
        this.justSpawnedPortal = false; // var to make sure portals don't spawn too often

        // spawn enemies off screen
        this.enemy01 = new Enemy(this, game.config.width + 100, game.config.height/2 -100, 'enemy').setOrigin(0.5, 0);

        // add player (p1)
        // this.player = this.physics.add.sprite(game.config.width/2 - 250, game.config.height - borderUISize - borderPadding - 353, 'player').setOrigin(0.5, 0);
        this.player = new Player(this, game.config.width/2 - 250, game.config.height/2 - 250, 'player').setOrigin (.5,0);
        // create animations for player
        this.anims.create({
            key: 'alive-run',
            frames: this.anims.generateFrameNumbers('player', {frames: [0,1,2,3,4,5,6,7,8,9,10,11]}),
            //framerate: 12,
            duration: 600,
            repeat: -1
        });
        this.anims.create({
            key: 'dead-run',
            frames: this.anims.generateFrameNumbers('player', {frames: [12,13,14,15,16,17,18,19,20,21,22,23]}),
            framerate: 600,
            repeat: -1
        });
        this.player.play('alive-run');
        this.player.setScale(.3);
        this.player.setBodySize(350,500);

        // revive portal
        // this.revivePort = new RevivePortal(this, game.config.width + 1150, game.config.height/2-23 , 'revivePort').setOrigin(0.5,0.5);
        // this.revivePort.setImmovable(true);
        // this.revivePort.body.allowGravity = false; 

        // white borders
       // this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
        //this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
        //this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);
        //this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);        
        
        // GAME OVER flag
        this.gameOver = false; 
        
        //add collider relationships
        this.physics.add.collider(this.player, this.enemy01, this.enemyHit, null, this); // calls the enemyHit function on collision with player

        this.physics.add.collider(this.player, this.floor, this.checkGrounded, null, this);
        this.physics.add.overlap(this.player, this.revivePort, this.playerRevive, null, this);
        this.physics.add.collider(this.enemy01, this.floor);


        // define keys
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyJUMP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R); 

        // this.pointer = this.input.activePointer;

        // initialize score
        this.p1Score = 0;
        this.clockScore = 0;
        // initialize time
        this.clockTime = 0;
        // initialize counter
        this.counter = 0;
        this.random = 0;
        this.randomAbility = 0;

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

        // declare timer
        this.delayRunningSfx;

        // initialize sounds/music
        this.aliveMusic = this.sound.add('runningMusic', {
            volume: 3,
            rate: 1,
            loop: true,
        });
        this.aliveMusic.play();
        this.deadMusic = this.sound.add('runningDeadMusic',{
            volume: 1.5,
            rate: 1,
            loop: true
        });
        this.enemySplat = this.sound.add('bloodSplat2',{
            volume: .8,
            rate: 1,
            loop: false,
        });

        //create particle emitter(s)
        this.particle = this.add.particles('bloodParticle');
        //his.particle = this.add.particles('particleOrange');
        this.bloodEmitter = this.particle.createEmitter({
            x: 0,
            y: 0,
            speed: { min: -400, max: 400 },
            angle: { min: 0, max: 360 },
            scale: { start: .7, end: 0, ease: 'Power3' },
            blandMode: 'ADD',
            active: false,
            lifespan: { min: 900, max: 900 },
            quantity: 4,
        });
    }
 
    update(){                
        //keep track of time
        this.clockScore += 1; //keep track of player score/distance
        this.clockTime += 1; //control spawns
        this.counter += 1;

        // 1 second timer 60 fps
        if(this.clockScore >= 60){
            this.p1Score += 1;
            this.clockScore = 0;
        }

        // spawn timer 
        if(this.clockTime >= 60){
            console.log(this.clockTime);
        
            if (this.p1Score > 13){
                this.clockTime = 25;
                if (this.p1Score <= 51){
                    game.settings.enemySpeed = 7 + this.p1Score/10  
                }
            } else{
                this.clockTime = 0;
            }

            // random number between 0 and 2
            this.random = Phaser.Math.Between(0, 4);
            this.spawnEnemyTop(this.random);
            this.spawnEnemyBot(this.random);
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
            this.background_far.tilePositionX += game.settings.enemySpeed - 6;
            this.background_mid.tilePositionX += game.settings.enemySpeed - 5;
            this.background_front.tilePositionX += game.settings.enemySpeed - 3;
            this.bloodEmitter.setPositionX -= game.settings.enemySpeed;

            this.player.update();             // update player sprite
            // this.checkGrounded(this.player, this.floor);
            this.enemy01.update();               // update enemy 01 sprite
            //this.revivePort.update();

            // for loop too call each update function of a given group 
            // this.enemies.runChildUpdate = true;
        }   
    
        if (this.player.reviveAbility && this.player.isDead && Phaser.Input.Keyboard.JustDown(keySPACE)) {
            this.ability1.disableBody(true, true);
            this.playerRevive();
            this.player.reviveAbility = false;
        }
        if (Phaser.Input.Keyboard.JustDown(keyR)) {       
            this.player.handleDeathSFX(true);
            this.player.handleRunSFX(false);
            this.aliveMusic.stop();
            this.gameOver = true;
            this.scene.start('menuScene'); 
        }
    }

    //collision is now checked in the create function
    // checkCollision(player, enemy) {
    //     // simple AABB checking
    //     if (this.player.x < this.enemy01.x + this.enemy01.width && 
    //         this.player.x + this.player.width > this.enemy01.x && 
    //         this.player.y < this.enemy01.y + this.enemy01.height &&
    //         this.player.height + this.player.y > this.enemy01.y) 
    //     {
    //         return true;
    //     } 
    //     else {
    //         return false;
    //     }
    // }

    enemyHit(player, enemy) {
        if(!this.player.isDead){
            // check for player hopping on enemy
            if(enemy.body.touching.up && !player.isGrounded){
                this.enemySplat.play();
                enemy.destroy();
                //this.bloodEmitter.setPosition(enemy.x, enemy.y);
                this.bloodEmitter.active = true;
                this.bloodEmitter.explode(100,enemy.x, enemy.y);
                this.bloodEmitter.setGravityX(-1050);
                // this.bloodEmitter.setVelocityX(-game.settings.enemySpeed);
                this.player.setVelocityY(-450);
                // collect ability
                this.randomAbility = Phaser.Math.Between(0, 3);
                if(this.randomAbility == 1){
                    this.collectAbility();
                }
            }  
            // player dies
            else{
                this.player.handleDeath('deadPlayer');
                this.player.play('dead-run');
                this.aliveMusic.pause();
                this.deadMusic.play();
                this.deadMusic.setSeek(this.aliveMusic.seek);
            }
        }
        else{
            if(enemy.body.touching.down){
                this.enemySplat.play();
                enemy.destroy();
                this.bloodEmitter.active = true;
                this.bloodEmitter.explode(100,enemy.x, enemy.y);
                this.bloodEmitter.setGravityX(-1050);
                this.player.setVelocityY(450);
                if(this.randomAbility == 1){
                    this.collectAbility();
                }
                
            }  
            else {
            // End game
            this.player.handleDeathSFX(true);
            this.player.handleRunSFX(false);
            this.aliveMusic.stop();
            this.deadMusic.stop();
            this.gameOver = true;
            this.scene.start('menuScene');
            // this.scene.start('gameOverScene');
            }
        } 
    }

    collectAbility(){
        if(!this.player.reviveAbility){
            this.player.reviveAbility = true;
            this.ability1 = this.physics.add.sprite(850, 100, 'ability1').setOrigin(0, .5);
            this.ability1.setImmovable(true);
            this.ability1.body.allowGravity = false;
            this.player.handleAbility();
        }
    }

    playerRevive(){
        if(this.player.isDead){
            this.player.handleRevive();
            this.player.play('alive-run');
            this.deadMusic.pause();
            this.aliveMusic.play();
            this.aliveMusic.setSeek(this.deadMusic.seek);
        }
    }

    checkGrounded(player, ground) {

        if (!player.isGrounded){
            this.sound.play('land');

            
            // delay timer so running sfx doesn't start at same time as the landing sfx 
            var delayTime = 50;
            // reset timer if it is still going
            if (this.delayRunningSfx){
                this.delayRunningSfx.reset({
                    delay: delayTime,                // ms
                    callback: () =>
                    {
                        // this.runningSfx.play();  
                        this.player.handleRunSFX(true);  
                    },
                    callbackScope: this,
                    loop: false,
                    repeat: 0,
                    startAt: 0,
                    timeScale: 1,
                    paused: false
                });
                this.time.addEvent(this.delayRunningSfx);
            }
            
            //start delay timer
            else {
                this.delayRunningSfx = this.time.addEvent({delay: delayTime, callback: () =>{
                    // this.runningSfx.play();
                    this.player.handleRunSFX(true);

                }, callbackScope: this, repeat: 0});
            }
        }
        this.player.isGrounded = true;
    }

    spawnEnemyTop(randValue){
        // random number between 0 and 2
        // spawn enemy
        if(!this.player.isDead){
            if(randValue <= 2){
                // get and create last enemy in group array
                var newEnemy = this.enemies.create(game.config.width + 50, game.config.height/2 -100, 'enemy').setOrigin(0.5, 0);
                this.physics.add.collider(newEnemy, this.floor);
                this.physics.add.collider(this.player, newEnemy, this.enemyHit, null, this); // calls the enemyHit function on collision with player
                
                console.log("enemy add");
            }
            // spawn faster enemy
            else if(randValue == 3){
                // get and create last enemy in group array
                var newEnemyFast = this.enemiesFast.create(game.config.width + 50, game.config.height/2 -100, 'enemyFast').setOrigin(0.5, 0);
                this.physics.add.collider(newEnemyFast, this.floor);
                this.physics.add.collider(this.player, newEnemyFast, this.enemyHit, null, this); // calls the enemyHit function on collision with player
                
                console.log("enemy add fast");
            }
        }
    }

    spawnEnemyBot(randValue){
        // spawn enemy on botttom side
        if (this.player.isDead){
            if(randValue >= 1 && randValue != 4 && this.player.isDead){
                // spawn upside-down enemies
                var newEnemyFlipY = this.enemies.create(game.config.width + 50, game.config.height/2 +20, 'enemy').setOrigin(0.5, 0);
                newEnemyFlipY.handleUpsideDown(true);
                this.physics.add.collider(newEnemyFlipY, this.floor);
                this.physics.add.collider(this.player, newEnemyFlipY, this.enemyHit, null, this); // calls the enemyHit function on collision with player
                console.log("enemy add Bottom");

                // spawn fast enemy
                if (randValue >= 3){
                    var newEnemyFlipYFast = this.enemiesFast.create(game.config.width + 50, game.config.height/2 +20, 'enemyFast').setOrigin(0.5, 0);
                    newEnemyFlipYFast.handleUpsideDown(true);
                    this.physics.add.collider(newEnemyFlipYFast, this.floor);
                    this.physics.add.collider(this.player, newEnemyFlipYFast, this.enemyHit, null, this); // calls the enemyHit function on collision with player
                    console.log("enemy add Bottom");
                }
            } 
        }
    }

    spawnPortal(randValue){
        // spawn revive portal
        if(randValue == 4 && !this.justSpawnedPortal){
            var newRevPort = this.revivePort.create(game.config.width + 100, game.config.height/2-23, 'revivePort').setOrigin(0.5,0.5);
            this.physics.add.overlap(this.player, newRevPort, this.playerRevive, null, this);
            newRevPort.setImmovable(true);
            newRevPort.body.allowGravity = false; 

            this.clockTime = 0;
            this.justSpawnedPortal = true;
            
            //set the delay so portals don't spawn too often
            this.delayClock = this.time.addEvent({delay: 15 * 600, callback: () =>{
                
                console.log('setting justSpawned to false');
                this.justSpawnedPortal = false;
            }, callbackScope: this, repeat: 0});
        }
    }
}