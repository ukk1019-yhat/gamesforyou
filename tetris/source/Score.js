import Utils        from "../../utils/Utils.js";


/**
 * Tetris Score
 */
export default class Score {

    /**
     * Tetris Score constructor
     * @param {Number} level
     * @param {Number} maxInitialLevel
     * @param {Effects} effects
     */
    constructor(level, maxInitialLevel, effects) {
        this.multipliers     = [ 40, 100, 300, 1200 ];
        this.timeInterval    = 50;
        this.linesPerLevel   = 10;
        this.maxInitialLevel = maxInitialLevel;
        this.effects   = effects;

        this.levelElem = document.querySelector(".level .content");
        this.scoreElem = document.querySelector(".score .content");
        this.linesElem = document.querySelector(".lines .content");

        this.level    = level;
        this.score    = 0;
        this.lines    = 0;
        this.amount   = 0;
        this.combo    = 0;
        this.lastLevel = level;
        this.timer    = this.calculateTimer();
        this.time     = this.timer;

        this.showLevel();
        this.showScore();
        this.showLines();
    }



    /**
     * Decreases the time by the given amount
     * @param {Number} time
     * @returns {Void}
     */
    decTime(time) {
        this.time -= time;
    }

    /**
     * Resets the time to the timer amount
     * @returns {Void}
     */
    resetTime() {
        this.time = this.timer;
    }



    /**
     * Adds the score for a new Piece that dropped
     * @param {Number} drop - Amount of cells the Tetrimino dropped before crashing the bottom
     * @returns {Void}
     */
    piece(drop) {
        this.score += 21 + (3 * this.level) - drop;
        this.showScore();
    }

    /**
     * Adds the score for a new Line
     * @param {Number} amount - Amount of lines completed in one move
     * @param {Number} combo
     * @returns {Void}
     */
    line(amount, combo) {
        if (combo !== undefined) this.combo = combo;
        this.addScore(amount);
        this.addLine(amount);
        this.addLevel(amount);
    }

    /**
     * Sets the combo
     * @param {Number} combo
     */
    setCombo(combo) {
        this.combo = combo;
    }

    /**
     * Shows combo popup
     */
    showComboPopup() {
        if (this.combo < 2) return;
        const popup = document.querySelector(".combo-popup");
        popup.textContent = `Combo x${this.combo}!`;
        popup.classList.remove("show");
        void popup.offsetWidth;
        popup.classList.add("show");
        setTimeout(() => { popup.classList.remove("show"); }, 900);
    }

    /**
     * Increases the score
     * @param {Number} amount - Amount of lines completed in one move
     * @returns {Void}
     */
    addScore(amount) {
        const comboMult = 1 + (this.combo - 1) * 0.5;
        this.score += Math.round(this.level * this.multipliers[amount - 1] * comboMult);
        this.showScore();
        this.showComboPopup();
    }

    /**
     * Increases the lines
     * @param {Number} amount - Amount of lines completed in one move
     * @returns {Void}
     */
    addLine(amount) {
        this.lines += amount;
        this.showLines();
    }

    /**
     * Increases the level
     * @param {Number} amount - Amount of lines completed in one move
     * @returns {Void}
     */
    addLevel(amount) {
        this.amount += amount;
        if (this.amount >= this.linesPerLevel) {
            this.amount -= this.linesPerLevel;
            this.timer   = this.calculateTimer();
            this.level  += 1;
            this.showLevel();
            // Level up effects
            if (this.effects) {
                const container = document.querySelector("#container");
                this.effects.flash(container, "rgba(255,255,255,0.3)", 200);
                this.effects.screenShake(container, 5, 200);
                const rect = container.getBoundingClientRect();
                this.effects.emitCelebration(rect);
            }
        }
    }



    /**
     * Displays the level in the Game
     * @returns {Void}
     */
    showLevel() {
        this.levelElem.innerHTML = String(this.level);
    }

    /**
     * Displays the score in the Game
     * @returns {Void}
     */
    showScore() {
        this.scoreElem.innerHTML = Utils.formatNumber(this.score, ",");
    }

    /**
     * Displays the lines in the Game
     * @returns {Void}
     */
    showLines() {
        this.linesElem.innerHTML = String(this.lines);
    }



    /**
     * Calculates the time used between each soft drop
     * @returns {Number}
     */
    calculateTimer() {
        if (this.level < this.maxInitialLevel) {
            return (this.maxInitialLevel - this.level + 1) * this.timeInterval;
        }
        return this.timeInterval;
    }
}
