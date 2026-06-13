import Card         from "./Card.js";
import Chain        from "./Chain.js";
import Column       from "./Column.js";
import Data         from "./Data.js";

// Utils
import Utils        from "../../utils/Utils.js";



/**
 * Spider Animation
 */
export default class Animation {

    /**
     * Spider Animation constructor
     * @param {Effects=} effects
     */
    constructor(effects) {
        this.effects = effects || null;
    }

    /**
     * Animates the Move
     * @param {(Card|Chain)} picked
     * @param {Column}       column
     * @returns {Promise}
     */
    move(picked, column) {
        return new Promise((resolve) => {
            const elem = picked.element;
            const onAnimationEnd = () => {
                elem.removeEventListener("transitionend", onAnimationEnd);
                elem.style.transition = "";
                resolve();
            };

            const bounds = column.bounds;
            picked.float();
            elem.getBoundingClientRect();

            elem.addEventListener("transitionend", onAnimationEnd);
            elem.style.transform  = Utils.translate(bounds.left, bounds.top + column.offset);
            elem.style.transition = `all 0.2s cubic-bezier(.4, 0, .2, 1)`;
        });
    }

    /**
     * Animates the Deal with an arc
     * @param {Card}     card
     * @param {Object}   fromBounds
     * @param {Object}   toBounds
     * @param {Number}   gap
     * @param {Boolean=} isFast
     * @returns {Promise}
     */
    deal(card, fromBounds, toBounds, gap, isFast) {
        return new Promise((resolve) => {
            card.float(fromBounds);
            card.element.getBoundingClientRect();

            if (isFast) {
                const onEnd = () => {
                    card.element.removeEventListener("transitionend", onEnd);
                    card.element.style.transition = "";
                    resolve();
                };
                card.element.addEventListener("transitionend", onEnd);
                card.element.style.transform  = Utils.translate(toBounds.left, toBounds.top + gap);
                card.element.style.transition = `all 0.03s linear`;
                return;
            }

            // Arc: midpoint above the straight line
            const midX   = (fromBounds.left + toBounds.left) / 2;
            const midY   = Math.min(fromBounds.top, toBounds.top) - 80;
            const target = { left: toBounds.left, top: toBounds.top + gap };

            const onMid = () => {
                card.element.removeEventListener("transitionend", onMid);

                if (this.effects) {
                    this.effects.emitTrail(midX, midY,
                        card.suit === "Spades" || card.suit === "Clubs" ? "#888" : "#e22729");
                }

                const onEnd = () => {
                    card.element.removeEventListener("transitionend", onEnd);
                    card.element.style.transition = "";
                    resolve();
                };
                card.element.addEventListener("transitionend", onEnd);
                card.element.style.transform  = Utils.translate(target.left - fromBounds.left, target.top - fromBounds.top);
                card.element.style.transition = `all 0.12s cubic-bezier(.4, 0, .2, 1)`;
            };

            card.element.addEventListener("transitionend", onMid);
            card.element.style.transform  = Utils.translate(midX - fromBounds.left, midY - fromBounds.top) + " rotate(-3deg)";
            card.element.style.transition = `all 0.1s cubic-bezier(.4, 0, .2, 1)`;
        });
    }

    /**
     * Animates the Foundation with sparkle
     * @param {Card[]}  cards
     * @param {Object}  fromBounds
     * @param {Object}  toBounds
     * @param {Column=} column
     * @returns {Promise}
     */
    foundation(cards, fromBounds, toBounds, column) {
        return new Promise((resolve) => {
            let amount = 0;
            const onAnimationEnd = (card) => {
                card.element.removeEventListener("transitionend", () => onAnimationEnd(card));
                card.element.style.removeProperty("z-index");
                card.element.style.transition = "";
                amount -= 1;

                if (amount === 0) {
                    for (const card of cards) {
                        card.element.style.transform = "";
                        card.remove();
                    }
                    if (this.effects) {
                        this.effects.emitSparkle(toBounds.left + toBounds.width / 2,
                            toBounds.top + toBounds.height / 2, "#ffd43b");
                    }
                    resolve();
                }
            }

            const total = Data.suitCards + 2;
            for (const card of cards) {
                const offset = column ? (amount * column.gap) + (column.offset / 2) : 0;
                card.float(fromBounds);
                card.showFront();
                card.element.getBoundingClientRect();
                card.element.addEventListener("transitionend", () => onAnimationEnd(card));
                card.element.style.zIndex     = String(total - card.number);
                card.element.style.transform  = Utils.translate(toBounds.left, toBounds.top + offset);
                card.element.style.transition = `all 0.2s linear ${amount / total}s`;
                amount += 1;
            }
        });
    }

    /**
     * Animates the Win with celebration particles
     * @param {Card[]} cards
     * @param {Object} fromBounds
     * @returns {Promise}
     */
    win(cards, fromBounds) {
        return new Promise((resolve) => {
            if (this.effects) {
                this.effects.emitCelebration(fromBounds);
            }

            let amount = 0;
            const onAnimationEnd = (card) => {
                card.element.style.removeProperty("z-index");
                card.element.style.transition = "";
                amount -= 1;

                if (amount === 0) {
                    for (const card of cards) {
                        card.element.style.transform = "";
                        card.remove();
                    }
                    resolve();
                }
            }

            const total = Data.suitCards + 2;
            for (const card of cards) {
                const toLeft = Utils.rand(100, window.innerWidth - 100);
                const toTop  = Utils.rand(fromBounds.top  + 100, window.innerHeight - 100);
                const deg    = Utils.rand(180, 720);

                card.float(fromBounds);
                card.showFront();
                card.element.getBoundingClientRect();
                card.element.addEventListener("transitionend", () => onAnimationEnd(card));
                card.element.style.zIndex     = String(total - card.number);
                card.element.style.transform  = Utils.translate(toLeft, toTop) + " " + Utils.rotate(deg);
                card.element.style.transition = `all 0.5s cubic-bezier(.4, 0, .2, 1)`;
                amount += 1;
            }
        });
    }
}
