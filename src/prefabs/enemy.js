class Enemy extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame);

        
        scene.add.existing(this);
        // requied to extend arcade physics class
        scene.physics.add.existing(this);
        
        //this.moveSpeed = game.settings.enemySpeed;
        this.moveSpeed = Phaser.Math.Between(game.settings.enemySpeed - 1, game.settings.enemySpeed + 1);
        this.pointsWorth = 3;
        
        //this.upsideDown = false;
        this.gravity = 300; 
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
            this.setGravity(0, -this.gravity - 300);
            this.flipY = true;
        } else{
            this.setGravity(this.gravity);
        }
    }

}