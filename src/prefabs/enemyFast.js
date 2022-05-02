//spaceship prefab
class EnemyFast extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame);

        
        scene.add.existing(this);
        // requied to extend arcade physics class
        scene.physics.add.existing(this);
        
        this.moveSpeed = game.settings.enemySpeed + 4;
        //this.upsideDown = false;
        this.gravity = 600; 
        this.setCollideWorldBounds(false);
        this.setVelocity(0, 0);
        this.setGravity(0, 330); // (x,y)
        this.setBounce(0);

    }


    update(){
        //move left
        this.x -= this.moveSpeed;

        //destroy game object when they reach the left edge
        if(this.x <= 0 - this.width){
            this.destroy(true);
        }

    }

    handleUpsideDown(upsideDown){
        if(upsideDown){
            this.setGravity(0, -this.gravity);
            this.flipY = true;
        } else{
            this.setGravity(this.gravity);
        }
    }

}