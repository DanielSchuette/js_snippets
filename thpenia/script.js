/*
 * business logic of the thrombopenia analyzer
 */
let p_res;                  /* must be global */
let debugging = false;      /* set to true to disable console logging */
p_res = document.getElementById("result_display"); /* index.html */

/* parseForm(): works in concert with the form in index.html */
function parseForm() {
    let thrombo = document.getElementById("platelets").value;
    let hemo = document.getElementById("hemoglobin").value;
    let schisto_1 = document.getElementById("schisto_1").checked;
    let schisto_2 = document.getElementById("schisto_2").checked;
    let schisto; // for the actual boolean
    let crea = document.getElementById("creatinine").value;
    let temp = document.getElementById("temperature").value;

    if (schisto_1 === true) {
        schisto = true;
    } else {
        schisto = false;
    }

    // debugging is true?
    if (debugging) {
        console.log("platelets: ", thrombo, "\n",
            "schistocytes: ", schisto, "\n",
            "hemoglobin: ", hemo, "\n",
            "creatinine: ", crea, "\n",
            "temperature: ", temp)
    }

    // TODO: do some input validation to check if all
    // inputs are reasonable values

    // calculate DDX
    lab = new Lab(new Date(), thrombo, schisto, hemo, crea, temp);
    lab.logValues();

    // show the result in index.html
    let res = lab.thrombopenia();
    p_res.innerHTML = res;
}
