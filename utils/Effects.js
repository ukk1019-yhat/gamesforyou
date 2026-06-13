export default class Effects {
    constructor(container) {
        this.container = container;
        this.particles = [];
        this.canvas = null;
        this.ctx = null;
        this.running = false;
        this.id = 0;
    }

    initCanvas() {
        if (this.canvas) return;
        this.canvas = document.createElement("canvas");
        this.canvas.style.cssText = "position:absolute;inset:0;pointer-events:none;z-index:999";
        this.canvas.width = this.container.offsetWidth || 800;
        this.canvas.height = this.container.offsetHeight || 600;
        this.container.appendChild(this.canvas);
        this.ctx = this.canvas.getContext("2d");
    }

    resize() {
        if (!this.canvas) return;
        this.canvas.width = this.container.offsetWidth || 800;
        this.canvas.height = this.container.offsetHeight || 600;
    }

    emit(x, y, count, color, opts = {}) {
        this.initCanvas();
        const {
            speed = 3,
            life = 40,
            size = 4,
            spread = Math.PI * 2,
            gravity = 0.05,
            fade = true,
            shrink = true
        } = opts;
        for (let i = 0; i < count; i++) {
            const angle = Math.random() * spread;
            const spd = Math.random() * speed + 0.5;
            this.particles.push({
                id: this.id++,
                x, y,
                vx: Math.cos(angle) * spd,
                vy: Math.sin(angle) * spd,
                life: life + Math.random() * 20,
                maxLife: life + Math.random() * 20,
                size: size * (0.3 + Math.random() * 0.7),
                color,
                gravity,
                fade,
                shrink
            });
        }
        if (!this.running) this.start();
    }

    emitExplosion(x, y, color) {
        this.emit(x, y, 20, color, { speed: 5, life: 30, size: 5, spread: Math.PI * 2 });
        this.emit(x, y, 10, "#fff", { speed: 3, life: 15, size: 2, spread: Math.PI * 2 });
    }

    emitSparkle(x, y, color) {
        this.emit(x, y, 8, color, { speed: 2, life: 20, size: 2, spread: Math.PI * 2, gravity: 0 });
        this.emit(x, y, 4, "#fff", { speed: 1.5, life: 12, size: 1.5, spread: Math.PI * 2, gravity: 0 });
    }

    emitTrail(x, y, color) {
        this.emit(x, y, 1, color, { speed: 0.5, life: 15, size: 3, spread: 0.3, gravity: 0, fade: true, shrink: true });
    }

    emitCelebration(rect) {
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const colors = ["#ff6b6b", "#ffd43b", "#51cf66", "#4dabf7", "#da77f2", "#ff922b"];
        for (let i = 0; i < 60; i++) {
            const color = colors[Math.floor(Math.random() * colors.length)];
            this.emit(cx, cy, 1, color, {
                speed: 8 + Math.random() * 6,
                life: 60 + Math.random() * 40,
                size: 4 + Math.random() * 4,
                gravity: 0.1
            });
        }
    }

    start() {
        this.running = true;
        this._loop();
    }

    _loop() {
        if (!this.running) return;
        const ctx = this.ctx;
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        for (let i = this.particles.length - 1; i >= 0; i--) {
            const p = this.particles[i];
            p.x += p.vx;
            p.y += p.vy;
            p.vy += p.gravity;
            p.life--;
            if (p.life <= 0) { this.particles.splice(i, 1); continue; }
            const progress = 1 - p.life / p.maxLife;
            ctx.globalAlpha = p.fade ? 1 - progress : 1;
            const s = p.shrink ? p.size * (1 - progress * 0.6) : p.size;
            ctx.fillStyle = p.color;
            ctx.beginPath();
            ctx.arc(p.x, p.y, Math.max(s, 0.5), 0, Math.PI * 2);
            ctx.fill();
        }
        ctx.globalAlpha = 1;
        if (this.particles.length > 0) {
            requestAnimationFrame(() => this._loop());
        } else {
            this.running = false;
        }
    }

    stop() {
        this.running = false;
        this.particles = [];
        if (this.ctx) this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    screenShake(element, intensity = 6, duration = 200) {
        const orig = element.style.transform;
        const start = performance.now();

        function shake(now) {
            const elapsed = now - start;
            if (elapsed >= duration) {
                element.style.transform = orig;
                return;
            }
            const decay = 1 - elapsed / duration;
            const x = (Math.random() - 0.5) * intensity * decay * 2;
            const y = (Math.random() - 0.5) * intensity * decay * 2;
            element.style.transform = `translate(${x}px, ${y}px)`;
            requestAnimationFrame(shake);
        }
        requestAnimationFrame(shake);
    }

    flash(element, color = "rgba(255,255,255,0.3)", duration = 150) {
        const origBg = element.style.background;
        const origTransition = element.style.transition;
        element.style.transition = `background ${duration}ms ease`;
        element.style.background = color;
        setTimeout(() => {
            element.style.background = origBg;
            setTimeout(() => { element.style.transition = origTransition; }, duration);
        }, duration);
    }
}
