class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture) {
      super(scene, x, y, texture);
  
        this.gravity = 900;
        this.moveSpeed = 4;
        this.moveSpdJumping = 2;
        this.jumpSpeed = 500;
        this.isGrounded = false;    // track whether or not player is in the air
        this.isDead = false;       // track top/bottom level location
        this.sfxJump = scene.sound.add('jump'); // add sfx
      
        // requied to extend arcade physics class
        scene.add.existing(this); // add object to existing scene, displayList, updateList
        scene.physics.add.existing(this);

        this.setCollideWorldBounds(true);
        this.setVelocity(0, 0);
        this.setGravity(0, this.gravity); // (x,y)
        this.setBounce(0);
        //   this.setDragX(.5);

        this.runningSfx = scene.sound.add('run1and2', {
            mute: false,
            volume: .3,
            rate: 1,
            loop: true,
            delay: 0
        });

        this.delayRunningSfx;
    }

    update() {

        //handle jumping
        if(this.isGrounded){
            // if(!this.runningSfx.isPlaying){
            //     this.handleLandingToRunSFX();
            // }
            if(Phaser.Input.Keyboard.JustDown(keyUP) && this.body.touching.down) {
                // console.log("Player.js JUMPING...");
                this.setVelocityY(-this.jumpSpeed);
                this.sfxJump.play();
                this.isGrounded = false;
                this.runningSfx.stop();
            } else{
                if(Phaser.Input.Keyboard.JustDown(keyDOWN) && this.body.touching.up) {
                    // console.log("Player.js JUMPING dead...");
                    this.setVelocityY(+this.jumpSpeed);
                    this.sfxJump.play();
                    this.isGrounded = false;
                    this.runningSfx.stop();
                }
            }
        } else { this.runningSfx.stop(); }

        //left/right movement
        if (keyLEFT.isDown && this.x >= borderUISize + this.width/2){
            if (this.isGrounded){
                this.x -= this.moveSpeed;
                //this.setVelocityX(-this.moveSpeed * 100); 
            } else { //slow speed while in the air
                this.x -= this.moveSpdJumping;
            }
        }   
        else if (keyRIGHT.isDown && this.x <= game.config.width - borderUISize - this.width/2) {
            if (this.isGrounded){
                this.x += this.moveSpeed;
                // this.setVelocityX(this.moveSpeed * 100);
            } else {
                this.x += this.moveSpdJumping;
            }
        } 

    }
    
    handleDeath(){
        this.isDead = true;
        // reset player position to below the ground
        this.y = game.config.height/2 + 30;
        // reverse grav direction
        this.setGravity(0,(-this.gravity - 500)); //gravity seems to be a lot weaker when reversed

        //flip player object
        //this.flipY = true;

    }
    
    handleRevive(){
        this.isDead = false;
        // reset player position to above the ground
        this.y = game.config.height/2 - 120;
        // reverse grav direction
        this.setGravity(0,this.gravity);

        //flip player object
        //this.flipY = false;

    }

    handleLandingToRunSFX(){
    //     var delayTime = 50;
        this.runningSfx.play();
    }
}