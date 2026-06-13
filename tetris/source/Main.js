import Board        from "./Board.js";
import Display      from "./Display.js";
import HighScores   from "./HighScores.js";
import Keyboard     from "./Keyboard.js";
import Level        from "./Level.js";
import Score        from "./Score.js";
import Tetriminos   from "./Tetriminos.js";

// Utils
import Sounds       from "../../utils/Sounds.js";
import Utils        from "../../utils/Utils.js";
import Effects      from "../../utils/Effects.js";

// Variables
let display    = null;
let level      = null;
let sounds     = null;
let scores     = null;
let keyboard   = null;
let board      = null;
let score      = null;
let tetriminos = null;
let animation  = null;
let startTime  = null;
let effects    = null;

// Constants
const tetriminoSize   = 2;
const maxInitialLevel = 10;



/**
 * Show the Main Screen
 * @returns {Void}
 */
function showMainScreen() {
    display.set("mainScreen").show();
}

/**
 * Pause the Game
 * @returns {Void}
 */
function startPause() {
    display.set("paused").show();
    sounds.play("pause");
    cancelAnimation();
}

/**
 * Unpause the Game
 * @returns {Void}
 */
function endPause() {
    display.set("playing").hide();
    sounds.play("pause");
    requestAnimation();
}

/**
 * Toggles the pause
 * @returns {Void}
 */
function showPause() {
    if (display.isPaused) {
        endPause();
    } else {
        startPause();
    }
}

/**
 * Finish the Game
 * @returns {Void}
 */
function finishGame() {
    destroyGame();
    showMainScreen();
}

/**
 * Game Over
 * @returns {Void}
 */
function showGameOver() {
    const rect = document.querySelector("#container").getBoundingClientRect();
    effects.emitExplosion(rect.width / 2, rect.height / 2, "#ff0000");
    effects.screenShake(document.querySelector("#container"), 10, 400);
    display.set("gameOver").show();
    sounds.play("end");
    scores.setInput();
    destroyGame();
}

/**
 * Destroys the game elements
 * @returns {Void}
 */
function destroyGame() {
    board.clearElements();
    tetriminos.clearElements();
    effects.stop();
    const holdElem = document.querySelector("#hold");
    if (holdElem) {
        holdElem.className = "";
        holdElem.innerHTML = "<div class=\"empty\">-</div>";
    }
}

/**
 * Show the High Scores
 * @returns {Void}
 */
function showHighScores() {
    display.set("highScores").show();
    scores.show();
}

/**
 * Saves the High Score
 * @returns {Void}
 */
function saveHighScore() {
    if (scores.save(score.level, score.score)) {
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
 * Called when a wink ends
 */
function onWindEnd() {
    tetriminos.setHardDrop();
    requestAnimation();
}

/**
 * Starts a new game
 */
function newGame() {
    display.set("playing").hide();
    keyboard.reset();
    effects.stop();
    effects.resize();

    board      = new Board(tetriminoSize, onWindEnd, effects);
    score      = new Score(level.get(), maxInitialLevel, effects);
    tetriminos = new Tetriminos(board, sounds, score, tetriminoSize, showGameOver, effects);

    requestAnimation();
}



/**
 * Request an animation frame
 * @returns {Void}
 */
function requestAnimation() {
    startTime = new Date().getTime();
    animation = window.requestAnimationFrame(() => {
        const time = new Date().getTime() - startTime;

        score.decTime(time);
        if (score.time < 0) {
            tetriminos.softDrop();
            score.resetTime();
        }
        tetriminos.updateLock(time);
        keyboard.holdingKey();

        if (display.isPlaying && !board.isWinking()) {
            requestAnimation();
        }
    });
}

/**
 * Cancel an animation frame
 * @returns {Void}
 */
function cancelAnimation() {
    window.cancelAnimationFrame(animation);
}

/**
 * Creates the shortcuts functions
 * @returns {Object}
 */
function getShortcuts() {
    return {
        mainScreen : {
            O : () => newGame(),
            A : () => level.dec(),
            I : () => showHighScores(),
            D : () => level.inc(),
            H : () => showHelp(),
            M : () => sounds.toggle()
        },
        paused : {
            P : () => endPause(),
            B : () => finishGame()
        },
        gameOver : {
            O : () => saveHighScore(),
            B : () => showMainScreen()
        },
        highScores : {
            B : () => showMainScreen(),
            R : () => scores.restore()
        },
        help : {
            B : () => showMainScreen()
        },
        playing : {
            C : () => tetriminos.hardDrop(),
            W : () => tetriminos.rotateRight(),
            A : () => tetriminos.moveLeft(),
            S : () => tetriminos.softDrop(),
            D : () => tetriminos.moveRight(),
            X : () => tetriminos.rotateRight(),
            Z : () => tetriminos.rotateLeft(),
            H : () => tetriminos.hold(),
            P : () => startPause(),
            M : () => sounds.toggle()
        },
        number : (number) => {
            if (display.isMainScreen) {
                level.choose(number);
            }
        }
    };
}

/**
 * Stores the used DOM elements and initializes the Event Handlers
 * @returns {Void}
 */
function initDomListeners() {
    document.body.addEventListener("click", (e) => {
        const element = Utils.getTarget(e);
        const actions = {
            decrease   : () => level.dec(),
            increase   : () => level.inc(),
            start      : () => newGame(),
            mainScreen : () => showMainScreen(),
            endPause   : () => endPause(),
            pause      : () => showPause(),
            finishGame : () => finishGame(),
            highScores : () => showHighScores(),
            help       : () => showHelp(),
            save       : () => saveHighScore(),
            restore    : () => scores.restore(),
            sound      : () => sounds.toggle()
        };

        if (actions[element.dataset.action]) {
            actions[element.dataset.action]();
        }
    });
}



/**
 * The main Function
 * @returns {Void}
 */
function main() {
    initDomListeners();

    display  = new Display();
    level    = new Level(maxInitialLevel);
    sounds   = new Sounds("tetris.sound");
    scores   = new HighScores();
    keyboard = new Keyboard(display, scores, getShortcuts());
    effects  = new Effects(document.querySelector("#container"));
}

// Load the game
window.addEventListener("load", main, false);
