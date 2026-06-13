// Utils
import Utils from "../../utils/Utils.js";

/**
 * Bounce Score
 */
export default class Score {

    /**
     * Bounce Score constructor
     */
    constructor() {
        this.score     = 0;
        this.container = document.querySelector(".count");
    }



    /**
     * Returns the current Score
     * @returns {Number}
     */
    get() {
        return this.score;
    }

    /**
     * Restarts the Score
     * @returns {Void}
     */
    restart() {
        this.score = -1;
        this.inc();
    }

    /**
     * Increases the Score
     * @returns {Void}
     */
    inc() {
        this.score += 1;
        this.container.innerHTML = String(this.score);
    }

    /**
     * Shows a floating score popup at the given position
     * @param {String} text
     * @param {Number} x
     * @param {Number} y
     * @returns {Void}
     */
    showPopup(text, x, y) {
        const el = document.createElement("DIV");
        el.className = "scorePopup";
        el.textContent = text;
        el.style.left = `${Math.round(x)}px`;
        el.style.top = `${Math.round(y)}px`;
        document.querySelector(".board").appendChild(el);
        setTimeout(() => Utils.removeElement(el), 800);
    }
}
