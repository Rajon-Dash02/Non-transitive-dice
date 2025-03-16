# 🎲 Non-Transitive Dice Game

A command-line game based on **non-transitive dice**, where probability and strategy play a key role. The game ensures fairness using **HMAC-SHA3** for initial move selection.


## 📦 Project Structure
```
non-transitive-dice-game/
│── package.json
│── game.js  (Main entry point)
│── utils/
│   ├── hmacGenerator.js  (HMAC-based fair selection)
│   ├── diceParser.js  (Handles dice input)
│   ├── probabilityCalculator.js  (Computes probabilities)
│   ├── tableRenderer.js  (Displays ASCII table)
│   ├── gameLogic.js  (Core game logic)
│── README.md
```

## 🔧 Installation
Make sure you have **Node.js** installed. Then, clone the repository and install dependencies:
```sh
git clone https://github.com/Rajon-Dash02/Non-transitive-dice.git
cd non-transitive-dice-game
npm install
```

## ▶️ Usage
Run the game by providing at least **three dice sets** as arguments:
```sh
node game.js "1,2,3,4,5,6" "2,2,4,4,6,6" "1,3,3,5,5,7"
```

### 📊 Example Output
```
Welcome to the Non-Transitive Dice Game!

+-----------+-----------+-----------+-----------+
| Dice Set  |  Dice 1   |  Dice 2   |  Dice 3   |
+-----------+-----------+-----------+-----------+
| Dice 1    |     -     |   60%     |   45%     |
| Dice 2    |   40%     |     -     |   55%     |
| Dice 3    |   55%     |   45%     |     -     |
+-----------+-----------+-----------+-----------+

Let's determine who makes the first move.
I selected a random value in the range 0..1 (HMAC=abc123...).
Try to guess my selection.
0 - 0
1 - 1
X - exit
? - help
```

## 🛠 Development
### Running the game locally
```sh
node game.js "your,dice,values" "more,dice,values" "even,more,dice"
```
### Running tests
If you have unit tests, run them using:
```sh
npm test
```



---
🔗 **GitHub Repo**: https://github.com/Rajon-Dash02/Non-transitive-dice.git

