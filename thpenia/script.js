/*
 * thrombopenia: A simple function that suggests a diagnose
 * for patients with thrombopenia and certain
 * other lab parameters.
 * parameters:
 *  count    - platelet count (/µl)
 *  schisto  - schistocytes?
 *  hemo     - hemoglobin (mg/dl)
 *  crea     - creatinine (mg/dl)
 *  temp     - body temperature (°C)
 */
function thrombopenia(count, schisto, hemo, crea, temp) {
    // return a warning message if no values were provided
    if (count == null) {
        console.log("give me a platelet count");
    }

    // return a warning message if a high count is provided
    if (count > 1000000) {
        return "is "+count+" a reasonable value?"
    }

    // test if platelet count is below threshold
    if (count < 150000) {
        // TODO: doesn't currently discriminate between
        // male/female patients
        if (schisto && (hemo < 13.5) && (crea >= 1.1) &&
            temp >= 38.0) {
            return "TTP"
        }

        // Evans syndrome has low platelets and an auto-
        // immune hemolytic anaemia (but w/o schistocytes)
        if (!schisto && (hemo < 13.5)) {
            return "Evans syndrome"
        }
        if (!schisto && (hemo > 13.5) && (crea <= 1.0) &&
            temp < 38.0) {
            return "ITP"
        }
        return "unclear" /* none of the scenarios were true */
    }
    return "normal" /* probably not reliable */
}

let p_res;              /* must be global */
let debugging = true;   /* set to false to disable console logging */
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

    if (schisto_1 == true) {
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

    // calculate ddx and show the result in index.html
    let res = thrombopenia(thrombo, schisto, hemo, crea, temp);
    p_res.innerHTML = res;
}
