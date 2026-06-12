<div align="center">

```
   ▄████  ▄▄▄       ███▄ ▄███▓▓█████   ██████      █████▒▒█████  ██▀███      ▓██   ██▓ ▒█████   █    ██ 
  ██▒ ▀█▒▒████▄    ▓██▒▀█▀ ██▒▓█   ▀ ▒██    ▒    ▓██   ▒▒██▒  ██▒▓██ ▒ ██▒     ▒██  ██▒▒██▒  ██▒ ██  ▓██▒
 ▒██░▄▄▄░▒██  ▀█▄  ▓██    ▓██░▒███   ░ ▓██▄      ▒████ ░▒██░  ██▒▓██ ░▄█ ▒      ▒██ ██░▒██░  ██▒▓██  ▒██░
 ░▓█  ██▓░██▄▄▄▄██ ▒██    ▒██ ▒▓█  ▄   ▒   ██▒   ░▓█▒  ░▒██   ██░▒██▀▀█▄        ░ ▐██▓░▒██   ██░▓▓█  ░██░
 ░▒▓███▀▒ ▓█   ▓██▒▒██▒   ░██▒░▒████▒▒██████▒▒   ░▒█░   ░ ████▓▒░░██▓ ▒██▒      ░ ██▒▓░░ ████▓▒░▒▒█████▓ 
  ░▒   ▒  ▒▒   ▓▒█░░ ▒░   ░  ░░░ ▒░ ░▒ ▒▓▒ ▒ ░    ▒ ░   ░ ▒░▒░▒░ ░ ▒▓ ░▒▓░       ██▒▒▒ ░ ▒░▒░▒░ ░▒▓▒ ▒ ▒ 
   ░   ░   ▒   ▒▒ ░░  ░      ░ ░ ░  ░░ ░▒  ░ ░    ░       ░ ▒ ▒░   ░▒ ░ ▒░     ▓██ ░▒░   ░ ▒ ▒░ ░░▒░ ░ ░ 
 ░ ░   ░   ░   ▒   ░      ░      ░   ░  ░  ░      ░ ░   ░ ░ ░ ▒    ░░   ░      ▒ ▒ ░░  ░ ░ ░ ▒   ░░░ ░ ░ 
       ░       ░  ░       ░      ░  ░      ░                  ░ ░     ░       ░ ░         ░ ░     ░     
                                                                                ░ ░                      
```

# 🕹️ Games Foryou

**A neon-styled retro arcade for your browser — 7 classic games, zero installs, zero plugins.**

![HTML5](https://img.shields.io/badge/Built%20with-HTML5%20%26%20JS-ffd43b?style=for-the-badge)
![Games](https://img.shields.io/badge/Games-7%20Classics-ff6b6b?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-4dabf7?style=for-the-badge)
![PRs Welcome](https://img.shields.io/badge/PRs-Welcome-51cf66?style=for-the-badge)

</div>

---

## 🎮 Overview

**Games Foryou** is a single-page arcade hub built with plain HTML, CSS, and vanilla JavaScript — no frameworks, no bundlers, no build step. Open `index.html` and a neon, dark-themed grid of game cards greets you. Pick one, and you're playing instantly.

Each game is self-contained, with its own engine, assets, and styling — making the codebase easy to read, fork, or extend with a new title.

---

## 🃏 Game Lineup

| Game | Folder | Description |
|---|---|---|
| 🟥 Bounce | `/bounce` | Breakout-style brick basher |
| 🟢 Snake | `/snake` | The classic grid-crawling game |
| 🟦 Tetris | `/tetris` | Stack blocks, clear lines, chase the high score |
| 🚀 Defender | `/defender` | Side-scrolling arcade shooter |
| 👻 Pac-Man | `/pacman` | Dodge ghosts, eat pellets |
| 🧩 Puzzle | `/puzzle` | Sliding tile puzzle |
| ♠️ Spider Solitaire | `/spider` | Full-deck card strategy |

Every game folder contains its own `index.html`, `source/`, `design/`, `audio/`, and `fonts/`.

---

## 🚀 Getting Started

```bash
git clone https://github.com/ukk1019-yhat/gamesforyou.git
cd gamesforyou
```

**Option 1 — Open directly**
Double-click `index.html` to launch the arcade in your browser.

**Option 2 — Serve locally** (recommended, avoids audio/caching issues)

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

---

## 🗂️ Project Structure

```
gamesforyou/
├── index.html        # Arcade hub — game selection grid
├── style.css         # Hub styling (dark, neon theme)
├── utils/             # Shared helpers (AStar, Storage, Sounds, Queue, etc.)
├── bounce/
├── snake/
├── tetris/
├── defender/
├── pacman/
├── puzzle/
└── spider/
```

Each game folder follows the same pattern: `index.html`, `source/`, `design/`, `audio/`, `fonts/`.

---

## 🧱 Tech Stack

- **Structure:** HTML5
- **Styling:** Custom CSS — dark, neon-glow theme with Orbitron, Rajdhani, and Inter fonts
- **Logic:** Vanilla JavaScript, modular per game
- **Audio:** HTML5 Audio elements
- **Shared utilities:** Custom A* pathfinding, local storage, queue, and input handling

---

## 🤝 Contributing

Contributions are welcome:

- 🎮 Add a new game to the arcade
- 🐛 Fix bugs in existing game logic
- 🎨 Improve the hub's UI and animations
- 🔊 Improve or add audio/assets
- 📱 Improve mobile and touch controls

```bash
git checkout -b feature/your-feature-name
git commit -m "Add: short description"
git push origin feature/your-feature-name
```

Then open a Pull Request.

---

## ⚖️ License

This project is for educational and entertainment purposes — classic arcade mechanics reimplemented with original code and assets.

---

<div align="center">

⭐ **If you enjoy the arcade, star the repo and share it!**

</div>
