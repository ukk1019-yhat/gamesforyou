import Card         from "./Card.js";
import Chain        from "./Chain.js";
import Column       from "./Column.js";
import Data         from "./Data.js";



/**
 * Spider Tableau
 */
export default class Tableau {

    /**
     * Spider Tableau constructor
     */
    constructor() {
        /** @type {Column[]} */
        this.columns = [];

        /** @type {HTMLElement} */
        this.element = document.querySelector(".tableau");

        this.build();
    }

    /**
     * Builds the Tableau
     * @returns {Void}
     */
    build() {
        this.element.innerHTML = "";
        for (let i = 0; i < Data.columns; i++) {
            const column = new Column(i);
            this.columns.push(column);
            this.element.appendChild(column.container);
        }
    }

    /**
     * Resets the Tableau
     * @returns {Void}
     */
    reset() {
        for (let i = 0; i < Data.columns; i++) {
            this.columns[i].reset();
        }
    }

    /**
     * Restores the Tableau
     * @param {Card[][]} cards
     * @returns {Void}
     */
    restore(cards) {
        for (let i = 0; i < Data.columns; i++) {
            this.columns[i].addCards(cards[i]);
        }
    }



    /**
     * Returns true if we can deal more cards
     * @returns {Boolean}
     */
    canDeal() {
        for (let i = 0; i < Data.columns; i++) {
            if (this.columns[i].isEmpty) {
                return false;
            }
        }
        return true;
    }

    /**
     * Picks a Card or a Chain from the Column, if possible
     * @param {Number}     column
     * @param {String}     id
     * @param {MouseEvent} event
     * @returns {?(Card|Chain)}
     */
    pickCards(column, id, event) {
        return this.columns[column].pickCards(id, event);
    }

    /**
     * Highlights all valid drop target columns for the picked Card/Chain
     * @param {(Card|Chain)} picked
     * @returns {Void}
     */
    showTargets(picked) {
        if (!picked.isDragging) return;
        for (const col of this.columns) {
            if (col.index !== picked.column && col.canMove(picked.firstCard)) {
                col.highlight();
            }
        }
    }

    /**
     * Hides all column targets
     * @returns {Void}
     */
    hideTargets() {
        for (const col of this.columns) {
            col.unhighlight();
        }
    }

    /**
     * Shows a ghost preview at the nearest valid drop column
     * @param {(Card|Chain)} picked
     * @returns {Void}
     */
    showPreview(picked) {
        if (!picked.isDragging) return;

        const colIndex = this.getDropColumn(picked);
        if (colIndex === picked.column) {
            this.hidePreview();
            return;
        }

        const col = this.columns[colIndex];
        if (this._previewCol === colIndex) return;
        this.hidePreview();

        const preview = document.createElement("div");
        preview.className = "drag-preview";
        col.container.appendChild(preview);
        preview.style.top  = Utils.toPX(col.offset);

        this._preview    = preview;
        this._previewCol = colIndex;
    }

    /**
     * Hides the drag preview
     * @returns {Void}
     */
    hidePreview() {
        if (this._preview) {
            this._preview.remove();
            this._preview    = null;
            this._previewCol = -1;
        }
    }

    /**
     * Returns the Column to drop the given Card or Chain
     * @param {(Card|Chain)} picked
     * @returns {Number}
     */
    getDropColumn(picked) {
        for (let i = 0; i < Data.columns; i++) {
            if (i !== picked.column && this.columns[i].canDrop(picked.firstCard)) {
                return i;
            }
        }
        return picked.column;
    }

    /**
     * Returns the Column to move the given Card or Chain
     * @param {(Card|Chain)} picked
     * @returns {Number}
     */
    getMoveColumn(picked) {
        let bestScore  = 0;
        let bestColumn = -1;
        for (let i = 0; i < Data.columns; i++) {
            if (i !== picked.column && this.columns[i].canMove(picked.firstCard)) {
                const score = this.columns[i].getScore(picked.firstCard);
                if (score > bestScore) {
                    bestScore  = score;
                    bestColumn = i;
                }
            }
        }
        if (bestColumn > -1) {
            return bestColumn;
        }
        return picked.column;
    }
}
