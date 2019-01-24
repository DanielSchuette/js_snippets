/* measure execution time */
const NUM_ITERATIONS = 5e9; /* takes ~6s */

const start = new Date();
for (let i = 0; i < NUM_ITERATIONS; i++) {
    // don't do anything
}
const end = new Date();
console.log(`time: ${(end-start)/1000}s`);
