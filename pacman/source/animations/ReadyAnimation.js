import Animation    from "./Animation.js";
import Board        from "../board/Board.js";



/**
 * Pacman Ready Animation
 * @extends {Animation}
 */
export default class ReadyAnimation extends Animation {

    /**
     * Pacman Ready Animation constructor
     * @param {Board}    board
     * @param {Function} callback
     */
    constructor(board, callback) {
        super(board, callback);

        this.blocksGame = true;
        this.endTime    = 3000;
    }

    animate() {
        const pulse = 0.5 + Math.sin(this.time * 0.008) * 0.5;
        const posX  = 14 * this.board.tileSize;
        const posY  = this.board.centerTextTop * this.board.tileSize;

        this.canvas.clearSavedRects();
        this.canvas.ctx.save();
        this.canvas.ctx.shadowColor = "rgb(255, 255, 51)";
        this.canvas.ctx.shadowBlur  = 15 * pulse;
        this.canvas.ctx.font       = `1.2em "Whimsy TT"`;
        this.canvas.ctx.textAlign  = "center";
        this.canvas.ctx.textBaseline = "middle";
        this.canvas.ctx.fillStyle  = "rgb(255, 255, 51)";
        this.canvas.ctx.fillText("Ready!", posX, posY);
        this.canvas.ctx.restore();

        this.canvas.saveRect({
            x      : posX - 80,
            y      : posY - 15,
            width  : 160,
            height : 30,
        });
    }
}
