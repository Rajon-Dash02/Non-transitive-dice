const readlineSync = require("readline-sync");
const { parseDice, validateDice } = require("./utils/diceParser.js");
const { determineFirstMove, playGame } = require("./utils/gameLogic.js");
const { renderTable } = require("./utils/tableRenderer.js");

function getValidUserChoice(prompt, validOptions) {
  let choice;
  do {
    choice = readlineSync.question(prompt).trim();
    if (choice.toLowerCase() === "x") process.exit(0);
  } while (!validOptions.includes(choice));
  return choice;
}

function getAvailableDiceChoices(diceInputs, selectedIndex) {
  return diceInputs.map((_, i) => i).filter((i) => i !== selectedIndex);
}

function main() {
  const diceInputs = process.argv.slice(2);

  if (diceInputs.length < 3) {
    console.error("Error: At least 3 dice configurations are required.");
    console.error("Usage: node game.js <dice1> <dice2> [<dice3> ...]");
    console.error("Example: node game.js 2,2,4,4,9,9 6,8,1,1,8,6 7,5,3,7,5,3");
    process.exit(1);
  }

  let diceSets = diceInputs.map((d) => {
    let dice = parseDice(d);
    let errorMsg = validateDice(dice);
    if (errorMsg) {
      console.error(`Error: Invalid dice configuration: \"${d}\".\n${errorMsg}`);
      process.exit(1);
    }
    return dice;
  });

  let numSidesSet = new Set(diceSets.map((dice) => dice.length));
  if (numSidesSet.size > 1) {
    console.error("Error: All dice must have the same number of sides.");
    process.exit(1);
  }

  console.log("Welcome to the Non-Transitive Dice Game!");
  renderTable(diceInputs, diceSets);

  console.log("\nLet's determine who makes the first move.");
  let { randomChoice, key, hmac } = determineFirstMove();
  console.log(`I selected a random value (HMAC=${hmac}). Try to guess:\n0 - 0\n1 - 1\nX - exit\n? - help`);

  let userGuess = getValidUserChoice("Your selection: ", ["0", "1"]);
  console.log(`My selection: ${randomChoice} (KEY=${key}).`);

  let firstPlayer = userGuess == randomChoice ? "user" : "computer";
  let aiIndex, userDiceIndex;

  if (firstPlayer === "user") {
    console.log("You guessed correctly! You get to pick first.\nChoose your dice:");
    diceInputs.forEach((dice, i) => console.log(`${i} - ${dice}`));
    userDiceIndex = parseInt(
      getValidUserChoice("Your selection: ", diceInputs.map((_, i) => String(i)))
    );
    aiIndex = getAvailableDiceChoices(diceInputs, userDiceIndex)[0];
  } else {
    console.log("I guessed correctly! I will pick first.");
    aiIndex = Math.floor(Math.random() * diceInputs.length); // AI chooses randomly
    console.log(`I choose [${diceInputs[aiIndex]}]. Now pick your dice:`);
    let choices = getAvailableDiceChoices(diceInputs, aiIndex);
    choices.forEach((i) => console.log(`${i} - ${diceInputs[i]}`));
    userDiceIndex = parseInt(getValidUserChoice("Your selection: ", choices.map(String)));
  }

  //console.log(`You chose [${diceInputs[userDiceIndex]}].`);
  playGame(diceSets[aiIndex], diceSets[userDiceIndex]);
}

main();
