import Animation    from "./Animation.js";
import Board        from "../board/Board.js";

// Utils
import Utils        from "../../../utils/Utils.js";



/**
 * Pacman Fruit Score Animation
 * @extends {Animation}
 */
export default class FruitScoreAnimation extends Animation {

    /**
     * Pacman Score Animation constructor
     * @param {Board}  board
     * @param {String} text
     * @param {{x: Number, y: Number}} pos
     */
    constructor(board, text, pos) {
        super(board);

        this.text       = text;
        this.pos        = pos;
        this.blocksGame = true;
        this.endTime    = 2400;
    }



    /**
     * Does the Fruit Score animation
     * @returns {Void}
     */
    animate() {
        let color = "rgb(255, 184, 255)";
        if (this.time > 200 && this.time < 2400) {
            const alpha = this.time < 1000 ? 1 : 1 - Math.round((this.time - 1000) * 1.25) / 2000;
            color = Utils.rgba(255, 184, 255, alpha);
        }

        const shimmer = Math.sin(this.time * 0.01) * 0.3 + 0.7;
        const floatY  = -Math.min(this.time * 0.001, 0.3);

        this.canvas.clear();
        this.canvas.drawText({
            size  : 1 + (1 - shimmer) * 0.2,
            color : color,
            text  : this.text,
            pos   : {
                x : this.pos.x + 0.5,
                y : this.pos.y + 0.5 + floatY,
            },
            align : null,
            alpha : null,
        });

        if (this.time > 200) {
            this.blocksGame = false;
        }
    }
}
