// Jeff Row, Vincent Kaufman, Keli Lindsey
// Undying Wish
// Completed 05/02/2022
// Creative Tilt: We implemented a flipping of the plane when a player becomes injured/sent to the underworld and revived

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
    scene: [ Menu, Play, Instruction ]
}

let game = new Phaser.Game(config);

// set UI sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;

// reserve keyboard variables
let keySPACE, keyJUMP, keyUP, keyDOWN, keyLEFT, keyRIGHT, keyI, keyR, mouseL ;