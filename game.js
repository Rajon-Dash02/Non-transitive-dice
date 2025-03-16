const readlineSync = require("readline-sync");
const { parseDice, validateDice } = require("./utils/diceParser.js");
const { determineFirstMove, playGame } = require("./utils/gameLogic.js");
const { renderTable } = require("./utils/tableRenderer.js");

function main() {

    const diceInputs = process.argv.slice(2);

    if (diceInputs.length === 0 || diceInputs.length < 3) {
        console.error(`Error: ${diceInputs.length === 0 ? "No dice configurations provided." : "At least 3 dice configurations are required."}`);
        console.error("Usage: node game.js <dice1> <dice2> [<dice3> ...]");
        console.error("Example: node game.js 2,2,4,4,9,9 6,8,1,1,8,6 7,5,3,7,5,3");
        process.exit(1);
    }
    
    let diceSets = [], diceSides = null;
    
    for (let d of diceInputs) {
        let dice = parseDice(d), errorMsg = validateDice(dice);
        
        if (errorMsg) {
            console.error(`Error: Invalid dice configuration: "${d}".\n${errorMsg}`);
            console.error("Example: node game.js 2,2,4,4,9,9 6,8,1,1,8,6 7,5,3,7,5,3");
            process.exit(1);
        }
    
        if (diceSides === null) diceSides = dice.length;
        else if (dice.length !== diceSides) {
            console.error("Error: All dice must have the same number of sides.");
            console.error("Example: node game.js 2,2,4,4,9,9 6,8,1,1,8,6 7,5,3,7,5,3");
            process.exit(1);
        }
    
        diceSets.push(dice);
    }
    console.log("Welcome to the Non-Transitive Dice Game!");

    renderTable(diceInputs, diceSets);

    console.log("\nLet's determine who makes the first move.");
    let { randomChoice, key, hmac } = determineFirstMove();
    console.log(`I selected a random value (HMAC=${hmac}). Try to guess:\n0 - 0\n1 - 1\nX - exit\n? - help`);

    let userGuess;
    while (!["0", "1"].includes(userGuess = readlineSync.question("Your selection: ").trim())) {
        if (userGuess.toLowerCase() === "x") process.exit(0);
        console.log("Invalid input. Enter 0, 1, X, or ? for help.");
    }

    console.log(`My selection: ${randomChoice} (KEY=${key}).`);

    let aiIndex = randomChoice, choices = diceInputs.map((_, i) => i).filter(i => i !== aiIndex);
    console.log(`I choose [${diceInputs[aiIndex]}]. Now pick your dice:`);
    choices.forEach((i, idx) => console.log(`${idx} - ${diceInputs[i]}`));
    console.log("X - exit\n? - help");

    let userDiceIndex;
    while (!(userDiceIndex = choices[readlineSync.question("Your selection: ").trim()])) {
        if (userDiceIndex.toLowerCase() === "x") process.exit(0);
        console.log("Invalid input. Enter a valid number, X to exit, or ? for help.");
    }

    console.log(`You chose [${diceInputs[userDiceIndex]}].`);
    playGame(diceSets[aiIndex], diceSets[userDiceIndex]);
}

main();
