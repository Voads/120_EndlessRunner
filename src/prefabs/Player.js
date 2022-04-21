class Player extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
      super(scene, x, y, texture, frame);
  
      scene.add.existing(this); // add object to existing scene, displayList, updateList
      this.moveSpeed = 2;       // pixels per frame
      this.sfxRocket = scene.sound.add('sfx_rocket');   // add rocket sfx
    }