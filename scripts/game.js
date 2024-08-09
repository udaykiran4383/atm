const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
ctx.font = "20px Benguiat Bold";

const titleScreen = document.getElementById('title-screen');
const levelsScreen = document.getElementById('levels');
const playerScreen = document.getElementById('pickPlayer');
const gameOverScreen = document.getElementById('game-over-screen');
const bgTVScreen = document.getElementById('bk-tv');
const titleButton = document.getElementById('title-button');
const restartButton = document.getElementById('restart-button');
const normalButton = document.getElementById('btn-normal');
const upsideDownButton = document.getElementById('btn-upsideDown');
const hopperButton = document.getElementById('btn-hopper');
const dustinButton = document.getElementById('btn-dustin');
let upsideDown = false;

titleButton.onclick = () => {
    song.play();
    titleScreen.classList.toggle('hidden');
    levelsScreen.classList.toggle('hidden');
};

normalButton.onclick = () => {
    levelsScreen.classList.toggle('hidden');
    playerScreen.classList.toggle('hidden');
    upsideDown = false;
};

hopperButton.onclick = () => {
    if(!upsideDown) {
        playerScreen.classList.toggle('hidden');
    canvas.classList.toggle('hidden');
    canvas.classList.toggle('first-background');
    bgTVScreen.classList.toggle('hidden');
    start();
    } 
    if(upsideDown) {
        playerScreen.classList.toggle('hidden');
        canvas.classList.toggle('hidden');
        canvas.classList.toggle('second-background');
        bgTVScreen.classList.toggle('hidden');
        startUpsideDown();
    }
}
dustinButton.onclick = () => {
    if(!upsideDown) {
    playerScreen.classList.toggle('hidden');
    canvas.classList.toggle('hidden');
    canvas.classList.toggle('first-background');
    bgTVScreen.classList.toggle('hidden');
    startDustin();
    } 
    if(upsideDown) {
        playerScreen.classList.toggle('hidden');
        canvas.classList.toggle('hidden');
        canvas.classList.toggle('second-background');
        bgTVScreen.classList.toggle('hidden');
        startUpsideDownDustin();
    }
}
restartButton.onclick = () => {
    gameOverScreen.classList.toggle('hidden');
    titleScreen.classList.toggle('hidden');
};

const cWidth = canvas.width;
const cHeight = canvas.height;
 
let frames = 0;
let score = 0;
let levels = 1;
let player;
let gravity;
let obstacles = [];
let bats = [];
let slimes = [];
let dogs = [];
let demogorgons = [];
let gameSpeed;
let keys = {};
let interval = null;
let isRunning = false;
let spawnObst = false;
let spawnSlim = false;
let spawnDog = false;
let spawnDemon = false;
let spawn2Bat = false;


function start() {
    interval = setInterval(update, 1000 / 60);
    isRunning = true;
    gameSpeed = 15;
    gravity = 0.9;
    upsideDown = false;
    player = new Player(125, 10, 50, 100);
};

function startDustin() {
    interval = setInterval(update, 1000 / 60);
    isRunning = true;
    gameSpeed = 15;
    gravity = 0.9;
    upsideDown = false;
    player = new Dustin(125, 10, 60, 90);
}

function startUpsideDownDustin() {
    interval = setInterval(update, 1000 / 60);
    isRunning = true; 
    gameSpeed = 15;
    gravity = 0.9;
    upsideDown = true;
    player = new Dustin2(125, 5, 60, 90);
}

function startUpsideDown() {
    interval = setInterval(update, 1000 / 60);
    isRunning = true; 
    gameSpeed = 15;
    gravity = 0.9;
    upsideDown = true;
    player = new Player2(125, 5, 50, 100);
};

let initialSpawTimer = 220;
let spawnTimer = initialSpawTimer;

function update() {
    frames++;
    ctx.clearRect(0, 0, cWidth, cHeight);

    score = frames / 10;
    /* ctx.font = "20px Benguiat Bold"; */

    /* Highscore */
// Initializing high scores and levels from localStorage or setting them to 0 if they don't exist
let highScore1 = parseFloat(localStorage.getItem("highScore1")) || 0;
let highScore2 = parseFloat(localStorage.getItem("highScore2")) || 0;
let highScore3 = parseFloat(localStorage.getItem("highScore3")) || 0;

let highLevel1 = parseFloat(localStorage.getItem("highLevel1")) || 0;
let highLevel2 = parseFloat(localStorage.getItem("highLevel2")) || 0;
let highLevel3 = parseFloat(localStorage.getItem("highLevel3")) || 0;

let highScoreElement1 = document.getElementById("highScore1");
let highScoreElement2 = document.getElementById("highScore2");
let highScoreElement3 = document.getElementById("highScore3");

function updateHighScores(score, levels) {
    if (score > highScore1 || (score === highScore1 && levels > highLevel1)) {
        // Shift lower scores down
        highScore3 = highScore2;
        highLevel3 = highLevel2;
        highScore2 = highScore1;
        highLevel2 = highLevel1;

        // Update top score
        highScore1 = score;
        highLevel1 = levels;
    } else if (score > highScore2 || (score === highScore2 && levels > highLevel2)) {
        // Shift lower scores down
        highScore3 = highScore2;
        highLevel3 = highLevel2;

        // Update second score
        highScore2 = score;
        highLevel2 = levels;
    } else if (score > highScore3 || (score === highScore3 && levels > highLevel3)) {
        // Update third score
        highScore3 = score;
        highLevel3 = levels;
    }

    // Update localStorage with new high scores and levels
    localStorage.setItem("highScore1", highScore1);
    localStorage.setItem("highLevel1", highLevel1);
    localStorage.setItem("highScore2", highScore2);
    localStorage.setItem("highLevel2", highLevel2);
    localStorage.setItem("highScore3", highScore3);
    localStorage.setItem("highLevel3", highLevel3);

    // Update the displayed high scores
    highScoreElement1.innerHTML = Math.round(highScore1) + " on level " + highLevel1;
    highScoreElement2.innerHTML = Math.round(highScore2) + " on level " + highLevel2;
    highScoreElement3.innerHTML = Math.round(highScore3) + " on level " + highLevel3;
}

// Call updateHighScores at the appropriate place in your game loop, after calculating the score and level
updateHighScores(score, levels);



    if(!upsideDown) {
    if(score < 10) {
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, 120, 38);
    } else if(score > 10 && score < 100) {
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, 135, 38);
    } else if(score > 100 && score < 1000) {
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, 150, 38);
    } else if(score > 1000) {
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, 165, 38);
    }
    if(levels === 666) {
        ctx.fillStyle = "black";
        ctx.fillRect(330, 240, 110, 55);
        ctx.fillStyle = "red";
        ctx.fillText(`HELL ${levels}`, 340, 275);
    } else {
        ctx.fillStyle = "black";
        ctx.fillRect(625, 0, 110, 35);
        ctx.fillStyle = "red";
        ctx.fillText(`Level: ${levels}`, 630, 30);

    }
    ctx.fillStyle = "red";
    ctx.fillText(`Score: ${Math.round(score)}`, 10, 30);
}

    if(upsideDown){
        if(score < 10) {
            ctx.fillStyle = "black";
            ctx.fillRect(0, 520, 115, 38);
        } else if(score > 10 && score < 100) {
            ctx.fillStyle = "black";
            ctx.fillRect(0, 520, 130, 38);
        } else if(score > 100 && score < 1000) {
            ctx.fillStyle = "black";
            ctx.fillRect(0, 520, 145, 38);
        } else if(score > 1000) {
            ctx.fillStyle = "black";
            ctx.fillRect(0, 520, 160, 38);
        }
        if(levels === 666) {
            ctx.fillStyle = "black";
            ctx.fillRect(330, 240, 110, 55);
            ctx.fillStyle = "red";
            ctx.fillText(`-${levels} ˥˥ƎH`, 340, 275);
        } else {
            ctx.fillStyle = "black";
            ctx.fillRect(625, 520, 110, 35);
            ctx.fillStyle = "red";
            ctx.fillText(`-${levels} :lǝʌǝ˥`, 630, 540);
    
        }
        ctx.fillStyle = "red";
        ctx.fillText(`-${Math.round(score)} :ǝɹoɔS`, 12, 540);
    }


    spawnTimer--;
    if(spawnTimer <= 0) {
        if(spawnObst) {
            spawnObstacle();
        }
        if(spawnSlim) {
            spawnSlimes();
        }
        if(spawnDog) {
            spawnDogs();
        }
        if(spawnDemon) {
            spawnDemogorgon();
        }
        if(spawn2Bat) {
            spawnNextBat();
        }
        spawnBats();
        spawnTimer = initialSpawTimer - gameSpeed * 5500;
        
        if (spawnTimer < 150) {
            spawnDemon = true;
            spawnTimer = 150;
    
            if (frames > 250) {
                spawnTimer = 125;
                levels = Math.max(levels, 2); // Ensures levels don't decrease
                spawn2Bat = true;
            }
            if (frames > 500) {
                spawnTimer = 100;
                levels = Math.max(levels, 3);
                spawnDemon = false;
                spawnDog = true;
            }
            if (frames > 1000) {
                spawnTimer = 90;
                levels = Math.max(levels, 4);
                spawn2Bat = false;
            }
            if (frames > 1500) {
                spawnTimer = 80;
                levels = Math.max(levels, 5);
                spawnSlim = true;
            }
            if (frames > 2000) {
                spawnTimer = 70;
                levels = Math.max(levels, 6);
            }
            if (frames > 2500) {
                spawnTimer = 60;
                levels = Math.max(levels, 7);
                spawn2Bat = true;
            }
            if (frames > 3000) {
                spawnTimer = 55;
                levels = Math.max(levels, 8);
                spawnDog = false;
                spawnObst = true;
            }
            if (frames > 5000) {
                spawnTimer = 50;
                levels = Math.max(levels, 9);
                spawn2Bat = false;
                spawnDemon = true;
            }
            if (frames > 6666) {
                spawnTimer = 45;
                levels = Math.max(levels, 10);
                spawn2Bat = true;
            }
            if (frames > 9999) {
                spawnTimer = 40;
                levels = Math.max(levels, 11);
            }
        }
    }

    for (let i = 0; i < obstacles.length; i++) {
        let demon = obstacles[i];
        if (demon.x + demon.width < 0) {
            obstacles.splice(i, 1);
        };

        if (player.colision(demon)) {
          obstacles = [];
          slimes = [];
          dogs = [];
          demogorgons = [];
          spawnDemon = false;
          spawnSlim = false;
          spawnObst = false;
          spawnDog = false;
          spawn2Bat = false;
          clearInterval(interval);
          isRunning = false;
          spawnTimer = initialSpawTimer;
          frames = 0;
          levels = 1;
          gameSpeed = 15;
          canvas.classList.toggle('hidden')
          canvas.classList.remove('first-background')
          canvas.classList.remove('second-background')
          gameOverScreen.classList.toggle('hidden')
          bgTVScreen.classList.toggle('hidden')
        };

        demon.update();
    };

    for (let i = 0; i < slimes.length; i++) {
        let slime = slimes[i];
        if (slime.x + slime.width < 0) {
            slimes.splice(i, 1);
        };

        if (player.colision(slime)) {
          obstacles = [];
          slimes = [];
          dogs = [];
          demogorgons = [];
          spawnDemon = false;
          spawnSlim = false;
          spawnObst = false;
          spawnDog = false;
          spawn2Bat = false;
          clearInterval(interval);
          isRunning = false;
          spawnTimer = initialSpawTimer;
          frames = 0;
          levels = 1;
          gameSpeed = 15;
          canvas.classList.toggle('hidden')
          canvas.classList.remove('first-background')
          canvas.classList.remove('second-background')
          gameOverScreen.classList.toggle('hidden')
          bgTVScreen.classList.toggle('hidden')
        };

        slime.update();
    };

    for (let i = 0; i < dogs.length; i++) {
        let dog = dogs[i];
        if (dog.x + dog.width < 0) {
            dogs.splice(i, 1);
        };

        if (player.colision(dog)) {
          obstacles = [];
          slimes = [];
          dogs = [];
          demogorgons = [];
          spawnDemon = false;
          spawnSlim = false;
          spawnObst = false;
          spawnDog = false;
          spawn2Bat = false;
          clearInterval(interval);
          isRunning = false;
          spawnTimer = initialSpawTimer;
          frames = 0;
          levels = 1;
          gameSpeed = 15;
          canvas.classList.toggle('hidden')
          canvas.classList.remove('first-background')
          canvas.classList.remove('second-background')
          gameOverScreen.classList.toggle('hidden')
          bgTVScreen.classList.toggle('hidden')
        };

        dogs.update();
    };

    for (let i = 0; i < demogorgons.length; i++) {
        let demogorgon = demogorgons[i];
        if (demogorgon.x + demogorgon.width < 0) {
            demogorgons.splice(i, 1);
        };

        if (player.colision(demogorgon)) {
          obstacles = [];
          slimes = [];
          demogorgons = [];
          spawnDemon = false;
          spawnSlim = false;
          spawnObst = false;
          spawnDog = false;
          spawn2Bat = false;
          clearInterval(interval);
          isRunning = false;
          spawnTimer = initialSpawTimer;
          frames = 0;
          levels = 1;
          gameSpeed = 15;
          canvas.classList.toggle('hidden')
          canvas.classList.remove('first-background')
          canvas.classList.remove('second-background')
          gameOverScreen.classList.toggle('hidden')
          bgTVScreen.classList.toggle('hidden')
        };

        demogorgons.update();
    };

    for (let i = 0; i < bats.length; i++) {
        let bat = bats[i];
        if (bat.x + bat.width < 0) {
            bats.splice(i, 1);
        };

        if (player.colision(bat)) {
          bats = [];
          obstacles = [];
          slimes = [];
          dogs = [];
          demogorgons = [];
          spawnDemon = false;
          spawnSlim = false;
          spawnObst = false;
          spawnDog = false;
          spawn2Bat = false;
          clearInterval(interval);
          isRunning = false;
          spawnTimer = initialSpawTimer;
          frames = 0;
          levels = 1;
          gameSpeed = 15;
          canvas.classList.toggle('hidden')
          canvas.classList.remove('first-background')
          canvas.classList.remove('second-background')
          gameOverScreen.classList.toggle('hidden')
          bgTVScreen.classList.toggle('hidden')
        };
        
        bat.update();
    };

    canvas.addEventListener('touchstart', function(event) {
        player.jump();
      });

    player.animate();
    player.playerDraw(frames);
    gameSpeed += 0.010;
};


let song = new Audio('./docs/assets/sounds/som_1.mp3');
song.loop = true;