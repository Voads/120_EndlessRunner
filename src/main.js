// Jeff Row, Vincent Kaufman, Keli Lindsey
// Undying Wish
// Date Completed
// Creative tilt justification

let config = {
    type: Phaser.CANVAS,
    width: 1100,
    height: 800,
    physics: {
        default: 'arcade',
        arcade:{
            //gravity: { y: 300 },
            debug: false
        }
    },
    fps: {
        target: 60,
        forceSetTimeOut: true 
},
    scene: [ Menu, Play ]
}

let game = new Phaser.Game(config);

// set UI sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;

// reserve keyboard variables
let keySPACE, keyJUMP, keyUP, keyDOWN, keyLEFT, keyRIGHT, mouseL ;