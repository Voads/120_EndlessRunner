class Player extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
      super(scene, x, y, texture, frame);
  
      scene.add.existing(this); // add object to existing scene, displayList, updateList

      this.moveSpeed = 5;
      this.isJumping = false;    // track jump status
      this.isDead = false;       // track top/bottom level location
    //  this.sfxJump = scene.sound.add(''); // add sfx
      //this.setVelocityY(0);
      this.setGravity(300);
  }

  update() {
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