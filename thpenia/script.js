// a simple function that suggests a diagnose
// for patients with thrombopenia and certain
// other lab parameters
let p_res; /* must be global */
p_res = document.getElementById("result_display");

// parameters:
//  count    - platelet count (/µl)
//  schisto  - schistocytes?
//  hemo     - hemoglobin (mg/dl)
//  crea     - creatinine (mg/dl)
//  temp     - body temperature (°C)
function thrombopenia(count, schisto, hemo, crea, temp) {
    // return a warning message if no values were provided
    if (count == null) {
        console.log("give me a platelet count");
    }
    // test if platelet count is below threshold
    if (count < 150000) {
        // doesn't currently discriminate between male/female
        // parameters
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
        return "unclear"
    }
    return "normal"
}

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

    // debugging
    console.log("platelets: ", thrombo, "\n", "schistocytes: ", schisto, "\n",
        "hemoglobin: ", hemo, "\n", "creatinine: ", crea, "\n", "temperature: ", temp)

    // do some input validation
    // TODO

    let res = thrombopenia(thrombo, schisto, hemo, crea, temp);
    p_res.innerHTML = res;
}
