import Piece        from "./Piece.js";

// Utils
import Utils        from "../../utils/Utils.js";



/**
 * Puzzle Metrics
 */
export default class Metrics {

    /** @type {HTMLElement} */
    #menuElem;
    /** @type {HTMLElement} */
    #scoreElem;
    /** @type {HTMLElement} */
    #placedElem;
    /** @type {HTMLElement} */
    #percentElem;
    /** @type {HTMLElement} */
    #timerElem;
    /** @type {HTMLElement} */
    #totalElem;
    /** @type {?SVGCircleElement} */
    #ringFill;
    /** @type {?SVGTextElement} */
    #ringText;


    /**
     * Puzzle Metrics constructor
     * @param {HTMLImageElement} image
     * @param {Number}           pieceCount
     */
    constructor(image, pieceCount) {
        const ratio = image.width / image.height;
        const y     = Math.sqrt(pieceCount / ratio);

        this.pieceCount   = pieceCount;
        this.cols         = Math.round(ratio * y);
        this.rows         = Math.round(y);
        this.padding      = 20;
        this.size         = 100;
        this.scale        = this.calcScale(pieceCount);
        this.imgSize      = Math.min(image.width / this.cols, image.height / this.rows);

        this.scaleSize    = this.size * this.scale;
        this.scalePadding = this.padding * this.scale;
        this.realSize     = this.size + this.padding * 2;
        this.fullSize     = this.scaleSize + this.scalePadding * 2;
        this.halfSize     = this.scalePadding + this.scaleSize / 2;
        this.delta        = this.scalePadding;

        this.boardWidth   = this.scaleSize * this.cols;
        this.boardHeight  = this.scaleSize * this.rows;
        this.boardPadding = this.scaleSize * 8;

        this.totalPieces   = this.cols * this.rows;
        this.placedPieces  = 0;
        this.elapsedTime   = 0;
        this.autoSnapDist  = 15;

        this.#menuElem    = document.querySelector(".menu");
        this.#scoreElem   = document.querySelector(".score");
        this.#placedElem  = document.querySelector(".placed");
        this.#percentElem = document.querySelector(".percent");
        this.#timerElem   = document.querySelector(".timer");
        this.#totalElem   = document.querySelector(".total");

        this.#menuElem.style.display  = "flex";
        this.#scoreElem.style.display = "flex";
        this.#timerElem.innerHTML     = "<span class=\"timer-value\">00<span>:</span>00</span>";
        this.#totalElem.innerHTML     = String(this.totalPieces);

        // Build progress ring
        const wrapper        = document.createElement("div");
        wrapper.className    = "progress-ring-wrapper";
        wrapper.innerHTML    = `
            <svg class="progress-ring" width="40" height="40" viewBox="0 0 40 40">
                <circle class="ring-bg" cx="20" cy="20" r="17" fill="none" stroke-width="3"/>
                <circle class="ring-fill" cx="20" cy="20" r="17" fill="none" stroke-width="3" stroke-dasharray="106.8" stroke-dashoffset="106.8"/>
                <text class="ring-text" x="20" y="20">0%</text>
            </svg>
        `;
        this.#ringFill = wrapper.querySelector(".ring-fill");
        this.#ringText = wrapper.querySelector(".ring-text");
        this.#scoreElem.appendChild(wrapper);

        this.drawScore();
    }

    /**
     * Calculates the Piece Scale based on the Piece count
     * @param {Number} pieceCount
     * @returns {Number}
     */
    calcScale(pieceCount) {
        switch (pieceCount) {
        case 50:
            return 1;
        case 100:
            return 0.75;
        case 250:
            return 0.5;
        case 500:
            return 0.5;
        }
    }

    /**
     * Destroys the Metrics
     * @returns {Void}
     */
    destroy() {
        this.#menuElem.style.display  = "none";
        this.#scoreElem.style.display = "none";
    }



    /**
     * Returns true if the Puzzle is Complete
     * @returns {Boolean}
     */
    get isComplete() {
        return this.placedPieces === this.totalPieces;
    }

    /**
     * Sets the Placed Pieces in the Board
     * @param {Number} placedPieces
     * @returns {Void}
     */
    setPlacedPieces(placedPieces) {
        this.placedPieces = placedPieces;
        this.drawScore();
    }

    /**
     * Increases the Placed Pieces in the Board
     * @returns {Void}
     */
    incPlacedPiece() {
        this.placedPieces += 1;
        this.drawScore();
    }

    /**
     * Draws the Score values
     * @returns {Void}
     */
    drawScore() {
        this.#placedElem.innerHTML  = String(this.placedPieces);
        const pct = Math.floor(this.placedPieces * 100 / this.totalPieces);
        if (this.#ringFill) {
            const circumference = 106.8;
            const offset = circumference - (pct / 100) * circumference;
            this.#ringFill.style.strokeDashoffset = offset;
            this.#ringText.textContent = pct + "%";
        }
        if (pct > 90) {
            this.#timerElem.classList.add("pulse");
        } else {
            this.#timerElem.classList.remove("pulse");
        }
    }



    /**
     * Sets the elapsed time and updates the time
     * @param {Number} time
     * @returns {Void}
     */
    setTime(time) {
        this.elapsedTime = time;
        this.drawTime();
    }

    /**
     * Adds a second and updates the time
     * @returns {Void}
     */
    incTime() {
        this.elapsedTime += 1;
        this.drawTime();
    }

    /**
     * Draws the time
     * @returns {Void}
     */
    drawTime() {
        const parts = Utils.parseTime(this.elapsedTime);
        this.#timerElem.innerHTML = `<span class="timer-value">${parts.join("<span>:</span>")}</span>`;
    }



    /**
     * Calculates the Piece position
     * @param {Piece}  piece
     * @param {Number} top
     * @param {Number} left
     * @param {Number} row
     * @param {Number} col
     * @returns {{top: Number, left: Number}}
     */
    calcPiecePos(piece, top, left, row, col) {
        return {
            top  : top  + this.scaleSize * (piece.row - row),
            left : left + this.scaleSize * (piece.col - col),
        };
    }

    /**
     * Returns the Width or Height using the count in PX
     * @param {Number} count
     * @returns {String}
     */
    getSizePX(count) {
        return Utils.toPX(this.scalePadding * 2 + this.scaleSize * count);
    }
}
