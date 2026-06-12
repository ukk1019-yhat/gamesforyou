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
🕹️ Games Foryou

A neon-styled retro arcade — 7 classic games, reimagined for the browser. No installs, no plugins, just play.

Show Image
Show Image
Show Image
Show Image

</div>

🎮 What is Games Foryou?

Games Foryou is a single-page arcade hub built with pure HTML, CSS, and vanilla JavaScript. Each game lives in its own folder with its own engine — pick a card, jump straight in, and relive the classics with a sleek dark, neon-glow UI and an animated game-selection grid.


💡 No frameworks. No build step. Just open index.html and play.




🃏 The Lineup

GameFolderDescription🟥 Bounce/bounceClassic Breakout-style brick basher🟢 Snake/snakeThe timeless grid-crawling classic🟦 Tetris/tetrisStack, clear, and chase the high score🚀 Defender/defenderSide-scrolling arcade shooter👻 Pac-Man/pacmanDodge ghosts, gobble pellets🧩 Puzzle/puzzleSliding tile puzzle challenge♠️ Spider Solitaire/spiderFull deck of card-based strategy

Each game ships with its own source/, design/, audio/, and fonts/ assets — fully self-contained and easy to study, tweak, or extend.


🚀 Getting Started

No build tools, no dependencies — just static files.

bashgit clone https://github.com/ukk1019-yhat/gamesforyou.git
cd gamesforyou

Then either:


Open directly — double-click index.html to launch the arcade in your browser, or
Serve locally (recommended, avoids audio/cache issues):


bashpython3 -m http.server 8000

Visit http://localhost:8000 and pick a game 🎮


🗂️ Project Structure

gamesforyou/
├── index.html          # Arcade hub — game selection grid
├── style.css           # Hub styling (neon/dark theme)
├── utils/               # Shared helpers (AStar, Storage, Sounds, Queue...)
├── bounce/
├── snake/
├── tetris/
├── defender/
├── pacman/
├── puzzle/
└── spider/
    └── each contains: index.html, source/, design/, audio/, fonts/


🧱 Tech Stack

LayerTechnologyStructureHTML5StylingCustom CSS (dark, neon-glow theme, Orbitron/Rajdhani/Inter fonts)LogicVanilla JavaScript (per-game source modules)AudioHTML5 Audio (per-game sound effects)Shared utilsCustom A* pathfinding, storage, queue, and input helpers


🤝 Contributing

Contributions are welcome! Ways to help:


🎮 Add a new game to the arcade grid
🐛 Fix bugs in existing game logic
🎨 Improve the hub UI/animations
🔊 Improve audio or asset quality
📱 Improve mobile/touch controls


bashgit checkout -b feature/your-feature-name
git commit -m "Add: short description"
git push origin feature/your-feature-name

Then open a Pull Request.


⚖️ License & Credits

This project is for educational and entertainment purposes, reimplementing classic arcade game mechanics with original code and assets.


<div align="center">
⭐ Like the arcade vibe? Star the repo and share it!

</div>
