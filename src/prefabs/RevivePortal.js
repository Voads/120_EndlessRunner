class RevivePortal extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture) {
      super(scene, x, y, texture);

      scene.add.existing(this);//add object to existing scene
      scene.physics.add.existing(this);

      this.moveSpeed = game.settings.enemySpeed;
  }

  update(){
    //move left
    this.x -= this.moveSpeed;

    //destroy game object when they reach the left edge
    if(this.x <= 0 - this.width){
        this.destroy(true);
    }
  }
}