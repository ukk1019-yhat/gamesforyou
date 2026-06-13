import Board        from "./Board.js";
import Tetrimino    from "./Tetrimino.js";
import Score        from "./Score.js";
import Sounds       from "../../utils/Sounds.js";
import Utils        from "../../utils/Utils.js";


/**
 * Tetris Tetriminos
 */
export default class Tetriminos {

    /**
     * Tetris Tetriminos constructor
     * @param {Board}    board
     * @param {Sounds}   sounds
     * @param {Score}    score
     * @param {Number}   size
     * @param {Function} onGameOver
     * @param {Effects}  effects
     */
    constructor(board, sounds, score, size, onGameOver, effects) {
        this.effects   = effects;
        this.tetriminos = [
            { // I Tetrimino
                matrix : [
                    [[ 0, 0, 0, 0 ], [ 1, 1, 1, 1 ], [ 0, 0, 0, 0 ], [ 0, 0, 0, 0 ]],     // Rotation 1
                    [[ 0, 0, 1, 0 ], [ 0, 0, 1, 0 ], [ 0, 0, 1, 0 ], [ 0, 0, 1, 0 ]],     // Rotation 2
                    [[ 0, 0, 0, 0 ], [ 0, 0, 0, 0 ], [ 1, 1, 1, 1 ], [ 0, 0, 0, 0 ]],     // Rotation 3
                    [[ 0, 1, 0, 0 ], [ 0, 1, 0, 0 ], [ 0, 1, 0, 0 ], [ 0, 1, 0, 0 ]]      // Rotation 4
                ],
                rows : 3,        // Amount of rows at the starting position
                cols : 4         // Amount of columns at the starting position
            },
            { // J Tetrimino
                matrix : [
                    [[ 1, 0, 0 ], [ 1, 1, 1 ], [ 0, 0, 0 ]],
                    [[ 0, 1, 1 ], [ 0, 1, 0 ], [ 0, 1, 0 ]],
                    [[ 0, 0, 0 ], [ 1, 1, 1 ], [ 0, 0, 1 ]],
                    [[ 0, 1, 0 ], [ 0, 1, 0 ], [ 1, 1, 0 ]]
                ],
                rows : 2,
                cols : 3
            },
            { // L Tetrimino
                matrix : [
                    [[ 0, 0, 1 ], [ 1, 1, 1 ], [ 0, 0, 0 ]],
                    [[ 0, 1, 0 ], [ 0, 1, 0 ], [ 0, 1, 1 ]],
                    [[ 0, 0, 0 ], [ 1, 1, 1 ], [ 1, 0, 0 ]],
                    [[ 1, 1, 0 ], [ 0, 1, 0 ], [ 0, 1, 0 ]]
                ],
                rows : 2,
                cols : 3
            },
            { // O Tetrimino
                matrix : [
                    [[ 0, 1, 1, 0 ], [ 0, 1, 1, 0 ], [ 0, 0, 0, 0 ]],
                    [[ 0, 1, 1, 0 ], [ 0, 1, 1, 0 ], [ 0, 0, 0, 0 ]],
                    [[ 0, 1, 1, 0 ], [ 0, 1, 1, 0 ], [ 0, 0, 0, 0 ]],
                    [[ 0, 1, 1, 0 ], [ 0, 1, 1, 0 ], [ 0, 0, 0, 0 ]]
                ],
                rows : 2,
                cols : 4
            },
            { // S Tetrimino
                matrix : [
                    [[ 0, 1, 1 ], [ 1, 1, 0 ], [ 0, 0, 0 ]],
                    [[ 0, 1, 0 ], [ 0, 1, 1 ], [ 0, 0, 1 ]],
                    [[ 0, 0, 0 ], [ 0, 1, 1 ], [ 1, 1, 0 ]],
                    [[ 1, 0, 0 ], [ 1, 1, 0 ], [ 0, 1, 0 ]]
                ],
                rows : 2,
                cols : 3
            },
            { // T Tetrimino
                matrix : [
                    [[ 0, 1, 0 ], [ 1, 1, 1 ], [ 0, 0, 0 ]],
                    [[ 0, 1, 0 ], [ 0, 1, 1 ], [ 0, 1, 0 ]],
                    [[ 0, 0, 0 ], [ 1, 1, 1 ], [ 0, 1, 0 ]],
                    [[ 0, 1, 0 ], [ 1, 1, 0 ], [ 0, 1, 0 ]]
                ],
                rows : 2,
                cols : 3
            },
            { // Z Tetrimino
                matrix : [
                    [[ 1, 1, 0 ], [ 0, 1, 1 ], [ 0, 0, 0 ]],
                    [[ 0, 0, 1 ], [ 0, 1, 1 ], [ 0, 1, 0 ]],
                    [[ 0, 0, 0 ], [ 1, 1, 0 ], [ 0, 1, 1 ]],
                    [[ 0, 1, 0 ], [ 1, 1, 0 ], [ 1, 0, 0 ]]
                ],
                rows : 2,
                cols : 3
            }
        ];

        this.board      = board;
        this.sounds     = sounds;
        this.score      = score;
        this.size       = size;
        this.onGameOver = onGameOver;
        this.sequence   = [ 0, 1, 2, 3, 4, 5, 6 ];
        this.pointer    = this.sequence.length;

        this.tetriminer  = document.querySelectorAll(".tetriminos > div");
        this.holdPiece   = null;
        this.canHold     = true;
        this.lockDelay   = 0;
        this.combo       = 0;

        this.actual     = this.createTetrimino().fall();
        this.next       = this.createTetrimino();
        this.updateHoldDisplay();
    }



    /**
     * Creates a new Tetrimino
     * @returns {Tetrimino}
     */
    createTetrimino() {
        const type = this.getNextType();
        return new Tetrimino(this.board, type, this.tetriminos[type], this.size);
    }

    /**
     * Increase the current pointer and if required it creates a new permutation of the 7 Tetriminos
     * and then it returns the next type
     * @returns {Number}
     */
    getNextType() {
        if (this.pointer < this.sequence.length - 1) {
            this.pointer += 1;
        } else {
            for (let i = 0; i < this.sequence.length; i += 1) {
                const pos = Utils.rand(0, this.sequence.length - 1);
                const aux = this.sequence[pos];

                this.sequence[pos] = this.sequence[i];
                this.sequence[i]   = aux;
            }
            this.pointer = 0;
        }
        return this.sequence[this.pointer];
    }



    /**
     * Soft drops the actual tetrimino
     */
    softDrop() {
        if (this.lockDelay > 0) {
            // During lock delay, try to move down if possible
            if (!this.actual.softDrop()) {
                this.lockDelay = 0;
                this.actual.pieceElem.classList.remove("lock-flash");
            }
            return;
        }
        if (this.actual.softDrop()) {
            this.lockDelay = 500;
            this.actual.pieceElem.classList.add("lock-flash");
        }
    }

    /**
     * Hard drops the actual tetrimino
     */
    hardDrop() {
        this.lockDelay = 0;
        this.actual.pieceElem.classList.remove("lock-flash");
        this.actual.hardDrop();
        this.crashed();
        this.sounds.play("drop");
    }

    /**
     * Called when the actual tetrimino crashes
     */
    crashed() {
        if (this.actual.top === 0 || this.actual.top === 1) {
            this.onGameOver();
            return;
        }

        // Hard drop particles at landing position
        const pieceRect = this.actual.pieceElem.getBoundingClientRect();
        this.effects.emit(
            pieceRect.left + pieceRect.width / 2,
            pieceRect.top,
            12, "#fff",
            { speed: 4, life: 20, size: 3, spread: Math.PI, gravity: 0.08 }
        );

        // Landing glow
        this.actual.pieceElem.classList.add("landing-glow");

        this.score.piece(this.actual.drop);
        const lines = this.actual.addElements();

        // Score popup for cleared lines
        if (lines > 0) {
            this.combo += 1;
            this.score.line(lines, this.combo);
            this.sounds.play("line");
            // Show score popup
            const pts = this.score.level * this.score.multipliers[lines - 1] * (1 + (this.combo - 1) * 0.5);
            this.showScorePopup(Math.round(pts));
        } else {
            this.combo = 0;
            this.score.setCombo(0);
        }
        this.canHold = true;
        this.sounds.play("crash");
        this.dropNext();
    }

    /**
     * Shows a floating score popup
     * @param {Number} pts
     */
    showScorePopup(pts) {
        const popup = document.querySelector(".score-popup");
        const fieldRect = this.board.fieldElem.getBoundingClientRect();
        popup.textContent = `+${pts}`;
        popup.style.left = `${fieldRect.left + fieldRect.width / 2}px`;
        popup.style.top = `${fieldRect.top + fieldRect.height * 0.4}px`;
        popup.classList.remove("show");
        void popup.offsetWidth;
        popup.classList.add("show");
        setTimeout(() => { popup.classList.remove("show"); }, 1000);
    }

    /**
     * Drops the next tetrimino and creates a new one
     */
    dropNext() {
        this.actual = this.next.fall();
        this.next   = this.createTetrimino();
    }

    /**
     * Hold the current piece (press C)
     */
    hold() {
        if (!this.canHold || this.lockDelay > 0) return;
        this.canHold = false;
        this.actual.pieceElem.style.transition = "none";
        const currentType = this.actual.type;

        // Clear only piece/ghost, NOT next (avoid corrupting the next display)
        this.actual.pieceElem.innerHTML = "";
        this.actual.ghostElem.innerHTML = "";

        if (this.holdPiece !== null) {
            const holdType = this.holdPiece;
            this.holdPiece = currentType;
            // Save #next before creating a Tetrimino that would overwrite it
            const nextElem = document.querySelector("#next");
            const savedHTML = nextElem.innerHTML;
            const savedClass = nextElem.className;
            const savedStyle = nextElem.getAttribute("style") || "";
            this.actual = new Tetrimino(this.board, holdType, this.tetriminos[holdType], this.size).fall();
            // Restore #next to show the actual next piece
            nextElem.className = savedClass;
            nextElem.innerHTML = savedHTML;
            if (savedStyle) nextElem.setAttribute("style", savedStyle);
            const divs = nextElem.querySelectorAll("div");
            for (let i = 0; i < divs.length; i += 1) {
                divs[i].style.top  = Utils.toEM(Number(divs[i].dataset.top) * this.size);
                divs[i].style.left = Utils.toEM(Number(divs[i].dataset.left) * this.size);
            }
        } else {
            this.holdPiece = currentType;
            this.dropNext();
        }
        this.updateHoldDisplay();
    }

    /**
     * Updates the hold display
     */
    updateHoldDisplay() {
        const holdElem = document.querySelector("#hold");
        if (this.holdPiece !== null) {
            holdElem.className = `piece${this.holdPiece} rot0`;
            holdElem.innerHTML = this.tetriminer[this.holdPiece].innerHTML;
            const elements = holdElem.querySelectorAll("div");
            for (let i = 0; i < elements.length; i += 1) {
                elements[i].style.top  = Utils.toEM(Number(elements[i].dataset.top) * this.size);
                elements[i].style.left = Utils.toEM(Number(elements[i].dataset.left) * this.size);
            }
        } else {
            holdElem.className = "";
            holdElem.innerHTML = "<div class=\"empty\">-</div>";
        }
    }


    /**
     * Updates the lock delay timer each frame
     * @param {Number} time - delta time in ms
     */
    updateLock(time) {
        if (this.lockDelay > 0) {
            this.lockDelay -= time;
            if (this.lockDelay <= 0) {
                this.lockDelay = 0;
                if (this.actual) {
                    this.actual.pieceElem.classList.remove("lock-flash");
                }
                this.crashed();
            }
        }
    }

    /**
     * Resets lock delay on movement/rotation
     */
    resetLockDelay() {
        if (this.lockDelay > 0) {
            this.lockDelay = 500;
        }
    }

    /**
     * Rotates the actual tetrimino to the right
     */
    rotateRight() {
        if (this.actual.rotateRight()) {
            this.sounds.play("rotate");
            this.resetLockDelay();
        }
    }

    /**
     * Rotates the actual tetrimino to the left
     */
    rotateLeft() {
        if (this.actual.rotateLeft()) {
            this.sounds.play("rotate");
            this.resetLockDelay();
        }
    }

    /**
     * Moves the actual tetrimino to the right
     */
    moveRight() {
        this.actual.moveRight();
        this.resetLockDelay();
    }

    /**
     * Moves the actual tetrimino to the left
     */
    moveLeft() {
        this.actual.moveLeft();
        this.resetLockDelay();
    }



    /**
     * Sets the hard drop position of the actual tetrimino
     */
    setHardDrop() {
        this.actual.setHardDrop();
    }

    /**
     * Clears the elements
     */
    clearElements() {
        this.actual.clearElements();
    }
}
