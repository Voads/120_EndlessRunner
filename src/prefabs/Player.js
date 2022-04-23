class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture) {
      super(scene, x, y, texture);
  
      
      this.moveSpeed = 4;
      this.moveSpdJumping = 2;
      this.jumpSpeed = 500;
      this.isGrounded = false;    // track whether or not player is in the air
      this.isDead = false;       // track top/bottom level location
      //this.sfxJump = scene.sound.add(''); // add sfx
      
      // requied to extend arcade physics class
      scene.add.existing(this); // add object to existing scene, displayList, updateList
      scene.physics.add.existing(this);

      this.setCollideWorldBounds(true);
      this.setVelocity(0, 0);
      this.setGravity(0, 800); // (x,y)
      this.setBounce(0);
    //   this.setDragX(.5);
  }

    update() {
        //handle jumping
        if(this.isGrounded){
            // console.log(this.isGrounded);
            if(keyUP.isDown) {
                console.log("Player.js JUMPING...");
                this.setVelocityY(-this.jumpSpeed);
                //this.sfxJump.play();
            }
            
        }
        else{
            // console.log(this.isGrounded);
        }

        if(!this.isDead) {
            //flip player vertically
        } else {
            // //keep player moving upright
            // if(!this.isJumping && this.y > borderUISize) {
            //     this.y -= this.moveSpeed;
            // }
            // if(!this.isJumping && this.y <= borderUISize) {
            //     this.y += this.moveSpeed;
            // }
       }
           
    // //left/right movement
    // if (keyLEFT.isDown && this.x >= borderUISize + this.width/2){
    //     if (this.isGrounded){
    //         this.x -= this.moveSpeed;
    //         //this.setVelocityX(-this.moveSpeed * 100); 
    //     } else { //slow speed while in the air
    //         this.x -= this.moveSpdJumping;
    //     }
    // }   
    // else if (keyRIGHT.isDown && this.x <= game.config.width - borderUISize - this.width/2) {
    //     if (this.isGrounded){
    //         this.x += this.moveSpeed;
    //         // this.setVelocityX(this.moveSpeed * 100);
    //     } else {
    //         this.x += this.moveSpdJumping;
    //     }
    // } 

    }   

}