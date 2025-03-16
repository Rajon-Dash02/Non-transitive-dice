/**
 * Computes the probability of one dice beating another.
 * @param {number[]} diceA - First dice set.
 * @param {number[]} diceB - Second dice set.
 * @returns {number} - Win probability percentage.
 */
function computeWinProbability(diceA, diceB) {
    let winCount = 0, totalCount = 0;

    for (let rollA of diceA) {
        for (let rollB of diceB) {
            if (rollA > rollB) winCount++;
            totalCount++;
        }
    }

    return ((winCount / totalCount) * 100).toFixed(2); // Convert to percentage
}

module.exports = { computeWinProbability };
