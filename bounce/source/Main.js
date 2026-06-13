import Ball         from "./Ball.js";
import Board        from "./Board.js";
import Bricks       from "./Bricks.js";
import Display      from "./Display.js";
import HighScores   from "./HighScores.js";
import Keyboard     from "./Keyboard.js";
import Mode         from "./Mode.js";
import Score        from "./Score.js";
import Ship         from "./Ship.js";
import Tail         from "./Tail.js";

// Utils
import Sounds       from "../../utils/Sounds.js";
import Utils        from "../../utils/Utils.js";
import Effects      from "../../utils/Effects.js";

// Variables
let mode       = null;
let display    = null;
let score      = null;
let keyboard   = null;
let board      = null;
let ship       = null;
let ball       = null;
let tail       = null;
let bricks     = null;
let sounds     = null;
let scores     = null;

let hasStarted = false;
let startTime  = 0;

// Effects & Power-ups
let effects    = null;
let powerUps   = [];
let extraBalls = [];
let slowTimer  = null;
let multiTimer = null;



/**
 * Show the Main Screen
 * @returns {Void}
 */
function showMainScreen() {
    display.set("mainScreen").show();
}

/**
 * Start the Game
 * @returns {Void}
 */
function startGame() {
    hasStarted = true;
    ball.start();
}

/**
 * Finish the Game
 * @returns {Void}
 */
function finishGame() {
    board.end();
    clearExtraBalls();
    powerUps.forEach((pu) => Utils.removeElement(pu.element));
    powerUps = [];
    if (slowTimer)  { clearTimeout(slowTimer);  slowTimer  = null; }
    if (multiTimer) { clearTimeout(multiTimer); multiTimer = null; }
    if (mode.isBricksMode) {
        bricks.destroy();
    }
    showMainScreen();
}

/**
 * Hide the required game parts
 * @returns {Void}
 */
function hideGame() {
    display.show();
    board.end();
}

/**
 * Pauses the game
 * @returns {Void}
 */
function startPause() {
    display.set("paused");
    hideGame();
}

/**
 * Unpauses the game
 * @returns {Void}
 */
function endPause() {
    display.set("playing").hide();
    board.start((e) => ship.mouseMove(e));

    if (hasStarted) {
        requestAnimation();
    }
}

/**
 * Game Over
 * @returns {Void}
 */
function gameOver() {
    display.set("gameOver");
    hideGame();
    scores.setInput();
    board.end();

    if (mode.isBricksMode) {
        bricks.destroy();
    }

    if (effects) {
        const rect = document.querySelector("#container").getBoundingClientRect();
        effects.emitCelebration(rect);
    }
}

/**
 * Show the High Scores
 * @returns {Void}
 */
function showHighScores() {
    display.set("highScores").show();
}

/**
 * Saves a High Score
 * @returns {Void}
 */
function saveHighScore() {
    if (scores.save(mode.get(), score.get())) {
        showHighScores();
    }
}

/**
 * Show the Help
 * @returns {Void}
 */
function showHelp() {
    display.set("help").show();
}



/**
 * Callback used when the ship moves
 * @returns {Void}
 */
function onShipMove() {
    if (!hasStarted) {
        ball.setStartLeft(ship);
        tail.start(ball);
    }
}

/**
 * Starts a new game
 * @param {String} gameMode
 * @returns {Void}
 */
function newGame(gameMode) {
    hasStarted = false;

    // Clean up from previous game
    clearExtraBalls();
    powerUps.forEach((pu) => Utils.removeElement(pu.element));
    powerUps = [];
    if (slowTimer)  { clearTimeout(slowTimer);  slowTimer  = null; }
    if (multiTimer) { clearTimeout(multiTimer); multiTimer = null; }

    display.set("playing").hide();
    mode.set(gameMode);
    score.restart();

    ship = new Ship(board, mode.shipWidth, onShipMove);
    ball = new Ball(board.width, board.height);
    ball.effects = effects;
    tail = new Tail();

    board.start((e) => ship.mouseMove(e));
    ball.setStartTop(ship);
    ball.setStartLeft(ship);
    tail.start(ball);

    if (mode.isBricksMode) {
        bricks = new Bricks(effects, spawnPowerUp);
    }
    requestAnimation();
}



/**
 * Request an animation frame
 * @returns {Void}
 */
function requestAnimation() {
    startTime = new Date().getTime();
    window.requestAnimationFrame(() => {
        const time  = new Date().getTime() - startTime;
        let   speed = time / 16;

        if (speed < 0) {
            speed = 0;
        }
        if (speed > 5) {
            return requestAnimation();
        }

        if (hasStarted) {
            tail.move(ball);
            moveBall(speed);
        }
        keyboard.onKeyHold();

        if (display.isPlaying) {
            requestAnimation();
        }
        return 0;
    });
}

/**
 * Moves the ball
 * @param {Number} speed
 * @returns {Void}
 */
function moveBall(speed) {
    let crash   = false;
    let crashed = null;

    ball.move(speed);

    if (mode.isBricksMode) {
        crashed = bricks.crash(ball);
    }

    if (crashed) {
        sounds.play("brick");
        score.inc();
        score.showPopup("+1", crashed.x, crashed.y);
        ball.randomChange();
    } else if (ball.bottomCrash()) {
        sounds.play("end");
        gameOver();
    } else {
        if (ball.direction.top < 0) {
            crash = ball.topCrash();
        } else if (ball.shipCrash(ship)) {
            sounds.play("bounce");
            ship.ballCrash();
            effects.screenShake(document.querySelector(".board"), 4, 150);
            if (mode.isSpeedMode) {
                ball.changeAngle(ship);
                ball.accelerate();
            }
            if (mode.isSpeedMode || mode.isRandomMode) {
                score.inc();
            }
            if (mode.isBricksMode && bricks.restart()) {
                ship.reduceWidth();
            }
            crash = true;
        }
        if (ball.direction.left < 0) {
            crash = ball.leftCrash();
        } else {
            crash = ball.rightCrash();
        }
        if (crash && (mode.isRandomMode || mode.isBricksMode)) {
            ball.randomChange();
        }
    }

    moveExtraBalls(speed);
    checkPowerUps();
}

/**
 * Spawn a power-up at the given position
 * @param {String} type
 * @param {Number} x
 * @param {Number} y
 * @returns {Void}
 */
function spawnPowerUp(type, x, y) {
    const colors = { W : "#4dabf7", S : "#51cf66", M : "#ff6b6b" };
    const el     = document.createElement("DIV");

    el.className        = "powerup";
    el.dataset.type     = type;
    el.style.background = colors[type];
    el.style.left       = `${Math.round(x - 11)}px`;
    el.style.top        = `${Math.round(y - 11)}px`;
    document.querySelector(".board").appendChild(el);

    powerUps.push({
        element : el,
        type    : type,
        x       : x - 11,
        y       : y - 11,
        speed   : 2,
        size    : 22,
    });
}

/**
 * Check power-up collisions with the ship
 * @returns {Void}
 */
function checkPowerUps() {
    for (let i = powerUps.length - 1; i >= 0; i--) {
        const pu = powerUps[i];

        pu.y += pu.speed;
        pu.element.style.top = `${Math.round(pu.y)}px`;

        if (pu.y > board.height) {
            Utils.removeElement(pu.element);
            powerUps.splice(i, 1);
            continue;
        }

        const sPos  = ship.pos;
        const sW    = ship.width;
        const pMidX = pu.x + pu.size / 2;
        const pBot  = pu.y + pu.size;

        if (pBot >= sPos.top && pMidX >= sPos.left && pMidX <= sPos.left + sW) {
            activatePowerUp(pu.type);
            Utils.removeElement(pu.element);
            powerUps.splice(i, 1);
        }
    }
}

/**
 * Activate a collected power-up
 * @param {String} type
 * @returns {Void}
 */
function activatePowerUp(type) {
    sounds.play("bounce");

    if (type === "W") {
        ship.setWideMode(10);
    } else if (type === "S") {
        activateSlowMode(8);
    } else if (type === "M") {
        activateMultiBall();
    }
}

/**
 * Slow down the ball for a duration
 * @param {Number} duration
 * @returns {Void}
 */
function activateSlowMode(duration) {
    if (slowTimer) {
        clearTimeout(slowTimer);
        [ball, ...extraBalls].forEach((b) => {
            if (b && b._origSpeed !== undefined) {
                b.speed = b._origSpeed;
                delete b._origSpeed;
            }
        });
    }
    [ball, ...extraBalls].forEach((b) => {
        if (b) {
            b._origSpeed = b.speed;
            b.speed      = Math.max(b.speed * 0.5, 3);
        }
    });
    slowTimer = setTimeout(() => {
        [ball, ...extraBalls].forEach((b) => {
            if (b && b._origSpeed !== undefined) {
                b.speed = b._origSpeed;
                delete b._origSpeed;
            }
        });
        slowTimer = null;
    }, duration * 1000);
}

/**
 * Spawn extra balls for multi-ball mode
 * @returns {Void}
 */
function activateMultiBall() {
    if (multiTimer) {
        clearTimeout(multiTimer);
        clearExtraBalls();
    }

    const dirs = [
        { dt : ball.dirTop, dl : ball.dirLeft, angleOff : 30 },
        { dt : -1,           dl : 1,            angleOff : -30 },
    ];

    dirs.forEach((d) => {
        const el = document.createElement("DIV");
        el.className = "ball";
        document.querySelector(".board").appendChild(el);

        extraBalls.push({
            element      : el,
            top          : ball.top,
            left         : ball.left,
            dirTop       : d.dt,
            dirLeft      : d.dl,
            speed        : ball.speed,
            angle        : Utils.clamp(ball.angle + d.angleOff, 25, 75),
            size         : ball.size,
            boardWidth   : ball.boardWidth,
            boardHeight  : ball.boardHeight,
            hue          : (ball.hue + 120) % 360,
            _origSpeed   : ball.speed,
            effects      : effects,
            get pos()    { return { top : this.top, left : this.left }; },
            setDirTop(v) { this.dirTop = v; },
            setDirLeft(v){ this.dirLeft = v; },
        });
    });

    multiTimer = setTimeout(() => {
        clearExtraBalls();
        multiTimer = null;
    }, 8000);
}

/**
 * Remove all extra balls
 * @returns {Void}
 */
function clearExtraBalls() {
    extraBalls.forEach((eb) => Utils.removeElement(eb.element));
    extraBalls = [];
    if (multiTimer) {
        clearTimeout(multiTimer);
        multiTimer = null;
    }
}

/**
 * Move and update extra balls
 * @param {Number} speed
 * @returns {Void}
 */
function moveExtraBalls(speed) {
    for (let i = extraBalls.length - 1; i >= 0; i--) {
        const eb  = extraBalls[i];
        const my  = eb.angle / 90;

        eb.top  += eb.speed * eb.dirTop * my * speed;
        eb.left += eb.speed * eb.dirLeft * (1 - my) * speed;

        if (eb.top <= 0) {
            eb.top = 0;
            eb.dirTop = 1;
        }
        if (eb.left <= 0) {
            eb.left = 0;
            eb.dirLeft = 1;
        }
        if (eb.left + eb.size >= eb.boardWidth) {
            eb.left = eb.boardWidth - eb.size;
            eb.dirLeft = -1;
        }
        if (eb.top + eb.size >= eb.boardHeight) {
            Utils.removeElement(eb.element);
            extraBalls.splice(i, 1);
            continue;
        }

        eb.hue = (eb.hue + 3) % 360;
        eb.element.style.top       = `${Math.round(eb.top)}px`;
        eb.element.style.left      = `${Math.round(eb.left)}px`;
        eb.element.style.boxShadow = `inset 0 0 0 1.5em hsl(${eb.hue}, 100%, 50%), 0 0 10px hsl(${eb.hue}, 100%, 60%)`;

        if (effects) {
            effects.emitTrail(eb.left + eb.size / 2, eb.top + eb.size / 2, `hsl(${eb.hue}, 100%, 60%)`);
        }
    }
}

/**
 * Stores the used DOM elements and initializes the Event Handlers
 * @returns {Void}
 */
function initDomListeners() {
    document.body.addEventListener("click", (e) => {
        const element = Utils.getTarget(e);
        const actions = {
            play       : () => newGame(element.dataset.mode),
            mainScreen : () => showMainScreen(),
            highScores : () => showHighScores(),
            help       : () => showHelp(),
            endPause   : () => endPause(),
            finishGame : () => finishGame(),
            save       : () => saveHighScore(),
            showScores : () => scores.show(element.dataset.mode),
            sound      : () => sounds.toggle(),
        };

        if (actions[element.dataset.action]) {
            actions[element.dataset.action]();
        }
    });
}

/**
 * Returns the shortcuts functions
 * @returns {Object}
 */
function getShortcuts() {
    return {
        mainScreen : {
            O : () => newGame(mode.get()),
            E : () => newGame("speed"),
            R : () => newGame("random"),
            C : () => newGame("bricks"),
            I : () => showHighScores(),
            H : () => showHelp(),
            M : () => sounds.toggle(),
        },
        paused : {
            P : () => endPause(),
            B : () => finishGame(),
        },
        gameOver : {
            O : () => saveHighScore(),
            B : () => showMainScreen(),
        },
        highScores : {
            E : () => scores.show("speed"),
            R : () => scores.show("random"),
            C : () => scores.show("bricks"),
            B : () => showMainScreen(),
        },
        help : {
            B : () => showMainScreen(),
        },
        playing : {
            A : () => ship.keyMove(-1),
            D : () => ship.keyMove(1),
            O : () => startGame(),
            P : () => startPause(),
            M : () => sounds.toggle(),
        },
    };
}

/**
 * Called when the board is clicked
 * @returns {Void}
 */
function onBoardClick() {
    if (!hasStarted) {
        startGame();
    } else {
        startPause();
    }
}



/**
 * The main Function
 * @returns {Void}
 */
function main() {
    initDomListeners();

    display  = new Display();
    mode     = new Mode();
    score    = new Score();
    sounds   = new Sounds("bounce.sound");
    board    = new Board(onBoardClick);
    scores   = new HighScores();
    keyboard = new Keyboard(display, scores, getShortcuts());
    effects  = new Effects(document.querySelector("#container"));
}

// Load the game
window.addEventListener("load", main, false);
