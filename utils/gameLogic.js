const readlineSync = require('readline-sync');
const { generateHMAC, generateKey } = require('./hmacGenerator.js');

/**
 * Determines who makes the first move using HMAC.
 * @returns {object} - Random choice, key, and HMAC.
 */
function determineFirstMove() {
    const key = generateKey();
    const randomChoice = Math.floor(Math.random() * 2);
    const hmac = generateHMAC(key, String(randomChoice));
    return { randomChoice, key, hmac };
}

/**
 * Plays the game round-by-round.
 * @param {number[]} aiDice - AI-selected dice.
 * @param {number[]} userDice - User-selected dice.
 */
function playGame(aiDice, userDice) {
    if (!Array.isArray(userDice) || userDice.length === 0) {
        throw new Error("Invalid dice selection. Please choose a valid set.");
    }

    console.log("\nIt's time for my throw.");
    let aiRoll = getThrow(aiDice);
    console.log(`My throw is ${aiRoll}.`);

    console.log("\nIt's time for your throw.");
    let userRoll = getThrow(userDice);

    if (userRoll > aiRoll) {
        console.log(`You win (${userRoll} > ${aiRoll})! 🎉`);
    } else if (userRoll < aiRoll) {
        console.log(`I win (${aiRoll} > ${userRoll})! 😎`);
    } else {
        console.log(`It's a tie (${userRoll} = ${aiRoll})! 🤝`);
    }
}

/**
 * Handles dice throw using modular arithmetic.
 * @param {number[]} dice - The dice set.
 * @returns {number} - The final throw value.
 */
function getThrow(dice) {
    if (!Array.isArray(dice) || dice.length === 0) {
        throw new Error("Invalid dice array.");
    }

    let { randomValue, key, hmac } = generateModularHMAC(6);

    console.log(`I selected a random value in the range 0..5 (HMAC=${hmac}).`);
    console.log("Add your number modulo 6.");
    console.log("0 - 0\n1 - 1\n2 - 2\n3 - 3\n4 - 4\n5 - 5\nX - exit\n? - help");

    let userModValue = getUserInput(["0", "1", "2", "3", "4", "5"], "Your selection: ");

    console.log(`My number is ${randomValue} (KEY=${key}).`);
    let resultIndex = (parseInt(userModValue) + randomValue) % dice.length;
    let userThrow = dice[resultIndex];

    console.log(`The result is ${randomValue} + ${userModValue} = ${resultIndex} (mod ${dice.length}).`);
    console.log(`Your throw is ${userThrow}.`);

    return userThrow;
}

/**
 * Generates an HMAC-based random modular value.
 * @param {number} range - The range for random selection.
 * @returns {object} - Random value, key, and HMAC.
 */
function generateModularHMAC(range) {
    if (!Number.isInteger(range) || range <= 0) {
        throw new Error("Range must be a positive integer.");
    }
    const key = generateKey();
    const randomValue = Math.floor(Math.random() * range);
    const hmac = generateHMAC(key, String(randomValue));

    return { randomValue, key, hmac };
}

/**
 * Ensures valid user input.
 * @param {string[]} validOptions - Allowed options.
 * @param {string} prompt - Input prompt.
 * @returns {string} - User's valid choice.
 */
function getUserInput(validOptions, prompt) {
    let input;
    do {
        input = readlineSync.question(prompt).trim();
    } while (!validOptions.includes(input));
    return input;
}

module.exports = { determineFirstMove, playGame };
