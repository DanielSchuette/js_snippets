/* map: maps a function to all elements of an array. */
function map(arr, func) {
    // declare an empty array
    let newArray = [];

    // loop over the input array and
    // apply the input function
    // push the resulting value onto
    // the new array
    for (let i = 0; i < arr.length; i++) {
        newArray.push(func(arr[i]));
    }

    // return the new array to the caller
    return newArray;
}

arr = [0, 1, 2, 3, 4, 5];          /* a test array */
fn = function(v) { return v + 1 }; /* a test function */
console.log(map(arr, fn));
