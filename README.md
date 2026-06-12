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

<h1>🕹️ GamesForYou</h1>

### A retro arcade reborn in your browser — instantly play classic DOS-era games, no downloads, no setup, just nostalgia.

[![Made with Love](https://img.shields.io/badge/Made%20with-%E2%9D%A4-red?style=for-the-badge)](https://github.com/ukk1019-yhat/gamesforyou)
[![Powered by DOSBox](https://img.shields.io/badge/Powered%20by-DOSBox-1e90ff?style=for-the-badge)](https://www.dosbox.com/)
[![Game Library](https://img.shields.io/badge/Library-1800%2B%20Titles-orange?style=for-the-badge)](.)
[![License MIT](https://img.shields.io/badge/License-MIT-success?style=for-the-badge)](LICENSE)
[![Open for PRs](https://img.shields.io/badge/PRs-Welcome-brightgreen?style=for-the-badge)](https://github.com/ukk1019-yhat/gamesforyou/pulls)

</div>

---

## 🎬 What Is GamesForYou?

GamesForYou is a **retro gaming time machine** — a curated, browser-playable archive of classic DOS games from the 90s and early 2000s. Whether you grew up dialing up the internet or you're discovering this era for the first time, GamesForYou brings these games back to life with zero friction.

> 💡 **No installs. No emulators to configure. No floppy disks. Just click and play.**

---

## ✨ Why GamesForYou Stands Out

<table>
<tr>
<td width="50%" valign="top">

### 🎯 Smart Discovery
Instead of scrolling through an endless list, browse by **mood** — relaxing, nostalgic, fast-paced, or "so bad it's good." Discover hidden gems you never knew existed.

### 🌅 Game of the Day
Every day, one title is spotlighted on the homepage with **fun trivia, history, and a "why it mattered"** writeup — turning browsing into a daily ritual.

### 🔖 Save & Resume
Bookmark favorites and pick up right where you left off, powered by lightweight cloud-backed save states.

</td>
<td width="50%" valign="top">

### 🌐 Built for Everyone
Touch-friendly controls mean these games are playable on **phones, tablets, and desktops** alike — no keyboard required.

### 🧭 Visual Library
Cover art, screenshots, and short blurbs for every title make browsing feel like flipping through a retro game catalog, not a spreadsheet.

### 🏆 Achievements
Earn badges for exploring genres, eras, and hidden classics — gamifying the act of rediscovery itself.

</td>
</tr>
</table>

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- Python 3

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/ukk1019-yhat/gamesforyou.git
cd gamesforyou
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Fetch the Game Data

```bash
python download_data.py
```

> ⚠️ Running into download errors? Check the open Issues for known workarounds and fixes.

### 4️⃣ Run It

```bash
npm run dev
```

Visit **`http://localhost:3000`** and step into the arcade 🎮

---

## 🗂️ Browse the Collection

```
╔═══════════════════════════════════════════════════╗
║   🔍 Search     🏷️ Genre     📅 Era     🎲 Random   ║
╠═══════════════════════════════════════════════════╣
║   🐉  Wuxia & Adventure                            ║
║   ⚔️   Action & Platformers                        ║
║   🧩  Puzzle & Strategy                            ║
║   🎲  RPG & Simulation                             ║
║   🃏  Card & Board Games                           ║
╚═══════════════════════════════════════════════════╝
```

Head to `/games` once running locally to explore the full catalog with filters and search.

---

## 🧱 Tech Stack

| Layer | Technology |
|:------|:-----------|
| Frontend | React + Next.js |
| Styling | Tailwind CSS |
| Emulation | Browser-based DOSBox |
| Data | Python scripts for game metadata |
| Storage | Save states & favorites |

---

## 🤝 Contributing

GamesForYou grows with the community. You can help by:

- 🎮 Adding missing games or metadata
- 🖼️ Contributing cover art or screenshots
- 📝 Writing trivia/history blurbs for the "Game of the Day"
- 🐛 Fixing bugs or improving performance
- 🎨 Improving the UI/UX

```bash
# Fork, then:
git checkout -b feature/your-feature-name
git commit -m "Add: short description"
git push origin feature/your-feature-name
```

Then open a Pull Request. See `CONTRIBUTING.md` for full details.

---

## ⚖️ Copyright & Takedown Notice

GamesForYou exists purely for **preservation, nostalgia, and educational purposes**. All games remain the property of their respective copyright holders.

If you are a rights holder and have concerns about any content in this repository, please open an issue or reach out, and the relevant files will be removed promptly.

---

## 🙏 Acknowledgments

This project stands on the shoulders of the retro-computing community:

- [DOSBox](https://www.dosbox.com/) — the engine that keeps DOS alive
- [em-dosbox](https://github.com/dreamlayers/em-dosbox) — Emscripten port of DOSBox
- [Emularity](https://github.com/db48x/emularity) — emulator embedding toolkit
- Everyone who's ever kept an old game alive by sharing it

---

<div align="center">

### ⭐ Enjoying the trip down memory lane? Star the repo and share it with someone who'll remember these games too!

</div>
