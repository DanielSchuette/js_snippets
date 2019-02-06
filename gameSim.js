// return a random integer in the range [m, n] (inclusive)
function rand(m, n) {
    return m + Math.floor((n - m + 1)*Math.random());
}

// randomy returns a string representation of one of the
// six Crown and Anchor faces
function randFace() {
    return ["crown", "anchor", "heart",
            "spade", "club", "diamond"][rand(0, 5)];
}

let numberSims = 1000000;
let wins = 0;
let losses = 0;

for (let i = 0; i < numberSims; i++) {
    let funds = 50;
    let round = 0;
    // console.log(`sim ${i}:`);

    while (funds > 0 && funds < 100) {
        round++;

        // console.log(`round ${round}:`);
        // console.log(`\tstarting funds: ${funds}p`);

        let bets = { crown: 0, anchor: 0, heart: 0,
                     spade: 0, club: 0, diamond: 0 };
        let totalBet = rand(1, funds);

        if (totalBet === 7) {
            totalBet = funds;
            bets.heart = totalBet;
        } else {
            let remaining = totalBet;
            do {
                let bet = rand(1, remaining);
                let face = randFace();
                bets[face] = bets[face] + bet;
                remaining = remaining - bet;
            } while (remaining > 0);
        }

        funds = funds - totalBet;
        // console.log("\tbets: " +
        //     Object.keys(bets).map(face => `${face}: ${bets[face]}p`).
        //         join(", ") + ` (total: ${totalBet}p)`);

        const hand = [];
        for (let roll = 0; roll < 3; roll++) {
            hand.push(randFace());
        }
        // console.log(`\thand: ${hand.join(", ")}`);

        let winnings = 0;
        for (let die = 0; die < hand.length; die++) {
            let face = hand[die];
            if (bets[face] > 0) winnings = winnings + bets[face];
        }

        funds = funds + winnings;
        // console.log(`\twinnings: ${winnings}`);
    }

    // console.log(`\tending funds: ${funds}`);
    if (funds >= 100) wins++;
    if (funds <= 0) losses++;
}
console.log(`wins: ${wins}, losses: ${losses}` +
            `(ratio ${wins/numberSims})`);
