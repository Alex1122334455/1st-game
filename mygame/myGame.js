/*global Phaser*/

var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

var platforms;
var player;
var cursors;
var stars;
var score = 0;
var scoreText;
var hitPlatform;

function preload() {
    
    game.load.image('sky', 'assets/sky.png');
    game.load.image('ground', 'assets/platform.png');
    game.load.image('star', 'assets/star.png');
    game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
    game.load.image('space', 'assets/large.png');
}
game.physics.startSystem(Phaser.Physics.ARCADE);
function create() {
    game.add.sprite(0,0, 'space');
    platforms = game.add.group();
    platforms.enableBody = true;
    var ground = platforms.create(0, game.world.height - 90, 'ground');
    ground.scale.setTo(0.5,1);
    ground.body.immovable = true;
    var ground = platforms.create(400, game.world.height - 90, 'ground');
    ground.scale.setTo(0.5,1);
    ground.body.immovable = true;
    var ledge = platforms.create(280, 370, 'ground');
    ledge.body.immovable = false;
    var ledge = platforms.create (100, 400, 'ground');
    ledge.body.immovable = false;
    var ledge = platforms.create (280, 400, 'ground');
    ledge.body.immovable = false;
    var ledge = platforms.create(130, 250, 'ground');
    ledge.body.immovable = false;
    var ledge = platforms.create(300, 150, 'ground');
    ledge.body.immovable = false;
    var ledge = platforms.create(500, 50, 'ground');
    ledge.body.immovable = true
    player = game.add.sprite(32, game.world.height - 150, 'dude');
    game.physics.arcade.enable(player);
    player.body.bounce.y = 0.5;
    player.body.gravity.y = 150;
    player.body.collideWorldBounds = false;
    player.animations.add('left', [0, 1, 2, 3, ], 10, true);
    player.animations.add('right', [5, 6, 7, 8, ], 10, true);
    cursors = game.input.keyboard.createCursorKeys();
    stars = game.add.group();
    stars.enableBody = true;
    for (var i = 0; i < 100; i++) 
    {
        var star = stars.create(i * 8, 0, 'star');
        star.body.gravity.y = 10;
        star.body.bounce.y = 0.6 + Math.random() * 0.2;
    }
    scoreText = game.add.text(650, 550, 'Score: 0', {fontSize: '32px', fill: '#eeceff' });
}

function update() {
    var hitPlatform = game.physics.arcade.collide(player, platforms);
    
player.body.velocity.x = 0;
    if (cursors.left.isDown)
  
{
    player.body.velocity.x = -150;
    player.animations.play('left');
}
else if(cursors.right.isDown) 
{
player.body.velocity.x = 150;
player.animations.play('right');
}
else
{
player.animations.stop();
player.frame = 4;
}
if (cursors.up.isDown && player.body.touching.down && hitPlatform)
{
player.body.velocity.y = -350;
}
game.physics.arcade.collide(stars, platforms);
game.physics.arcade.overlap(player, stars, collectStar, null, this);
}
function collectStar (player, star) {
 star.kill();
 score += 1;
 scoreText.text = "score: " + score; + "Score: ";
}