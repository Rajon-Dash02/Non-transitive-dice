function parseDice(diceStr) {
    return diceStr.split(',').map(Number);
}

function validateDice(dice) {
    return dice.length < 2 ? "Each dice must have at least 2 sides."
         : !dice.every(Number.isInteger) ? "Each dice must contain only integers."
         : dice.some(num => num < 1) ? "Each dice value must be 1 or greater."
         : null;
}

module.exports = { parseDice, validateDice };
