import Board        from "./Board.js";
import Food         from "./Food.js";
import Instance     from "./Instance.js";
import Matrix       from "./Matrix.js";
import Snake        from "./Snake.js";

// Utils
import Utils        from "../../utils/Utils.js";



/**
 * Snake Game
 */
export default class Game {

    /**
     * Snake Game constructor
     * @param {Board}    board
     * @param {Instance} instance
     * @param {Object=}  data
     */
    constructor(board, instance, data, level) {
        this.instance = instance;
        this.foodCount = 1;
        if (data) {
            this.matrix = new Matrix(board, instance, data.matrix, data.head, data.tail);
            this.snake  = new Snake(board, this.matrix, data.links, data.dirTop, data.dirLeft);
            this.food   = new Food(board, null, data.foodTop, data.foodLeft);
        } else {
            this.matrix = new Matrix(board, instance);
            this.snake  = new Snake(board, this.matrix);
            this.food   = new Food(board, this.matrix.addFood());
            if (level >= 3) {
                this.addObstacles(level);
            }
        }
    }

    /**
     * Destroys the Game
     * @returns {Void}
     */
    destroy() {
        this.matrix = null;
        this.snake  = null;
        this.food   = null;
        this.instance.destroyGame();
    }



    /**
     * Adds a Food
     * @returns {Void}
     */
    addFood() {
        this.foodCount++;
        const isGolden = this.foodCount % 5 === 0;
        this.food.add(this.matrix.addFood(), isGolden);
    }

    addObstacles(level) {
        const count = level === 3 ? 8 : 14;
        const snakeContainer = document.querySelector(".snake");
        for (let i = 0; i < count; i++) {
            let top, left, found = true, attempts = 0;
            do {
                top   = Utils.rand(1, this.board.matrixRows    - 2);
                left  = Utils.rand(1, this.board.matrixColumns - 2);
                found = this.matrix.matrix[top][left] !== this.board.emptyValue
                     || (top >= 2 && top <= 6 && left >= 9 && left <= 13);
                attempts++;
            } while (found && attempts < 100);
            if (!found) {
                this.matrix.matrix[top][left] = this.board.obstacleValue;
                const el = document.createElement("DIV");
                el.className = "obstacle";
                el.style.top  = this.board.getPosition(top);
                el.style.left = this.board.getPosition(left);
                snakeContainer.appendChild(el);
            }
        }
    }

    /**
     * Turns the Snake
     * @param {Number} dirTop
     * @param {Number} dirLeft
     * @returns {Void}
     */
    turnSnake(dirTop, dirLeft) {
        if (this.snake.turn(dirTop, dirLeft)) {
            this.instance.saveDirection(this.snake.direction);
        }
    }

    /**
     * Turns the Snake
     * @param {MouseEvent} event
     * @returns {Void}
     */
    mouseTurn(event) {
        if (this.snake.mouseTurn(event)) {
            this.instance.saveDirection(this.snake.direction);
        }
    }
}
