const Table = require('cli-table3');

/**
 * Renders a probability comparison table.
 * @param {string[]} diceNames - Names of dice sets.
 * @param {number[][]} diceSets - Array of dice.
 */
function renderTable(diceNames, diceSets) {
    const table = new Table({
        head: ['Dice Set', ...diceNames],
        colWidths: [15, ...Array(diceNames.length).fill(10)],
    });

    for (let i = 0; i < diceSets.length; i++) {
        let row = [diceNames[i]];
        for (let j = 0; j < diceSets.length; j++) {
            if (i === j) {
                row.push('-'); // No self-comparison
            } else {
                const { computeWinProbability } = require('./probabilityCalculator.js');
                row.push(computeWinProbability(diceSets[i], diceSets[j]) + '%');
            }
        }
        table.push(row);
    }

    console.log(table.toString());
}

module.exports = { renderTable };
