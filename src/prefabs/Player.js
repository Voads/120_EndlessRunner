class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture) {
      super(scene, x, y, texture);
  
      scene.add.existing(this); // add object to existing scene, displayList, updateList

      //this.moveSpeed = 5;
      this.isJumping = false;    // track jump status
      this.isDead = false;       // track top/bottom level location
      //this.sfxJump = scene.sound.add(''); // add sfx

      // requied to extend arcade physics class
      scene.add.existing(this);
      scene.physics.add.existing(this);

      this.setCollideWorldBounds(true);
      this.setVelocity(0, 0);
      this.setGravity(0, 330); // (x,y)
      this.setBounce(0);
  }

  update() {
      //this.setVelocity(0,0);
  //  if(Phaser.Input.Keyboard.JustDown(keySPACE)) {
  //    this.isJumping = true;
      //this.sfxJump.play();
  //  }
  //  if(!this.isDead) {
      // flip player vertically
  //  } else {
      // keep player moving upright
  //      if(!this.isJumping && this.y > borderUISize) {
  //        this.y -= this.moveSpeed;
        //  if(!this.isJumping && this.y <= borderUISize) {
        //    this.y += this.moveSpeed;
        //  }
  //      }
        

  //  }
  }


}