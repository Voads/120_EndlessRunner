//spaceship prefab
class Spaceship extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        //this.points = pointVal;
        this.moveSpeed = game.settings.enemySpeed;
        //this.randomSpeed = Phaser.Math.Between(this.moveSpeed - .5, this.moveSpeed + 1);
    }

    // create(){
    //  
    // }

    update(){
        //move left
        this.x -= this.moveSpeed;
        //this.x -= this.randomSpeed;

        //destroy game object when they reach the left edge
        if(this.x <= 0 - this.width){
            //this.x = game.config.width; //wrap
            this.destroy(true);
        }
    }

}