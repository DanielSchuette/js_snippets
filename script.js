// a simple function that suggests a diagnose
// for patients with thrombopenia and certain
// other lab parameters
let p_res;
p_res = document.getElementById("result_display");

// parameters:
//  count    - thrombocyte count (/µl)
//  schisto  - schistocytes?
//  hemo     - hemoglobin (mg/dl)
//  crea     - creatinine (mg/dl)
//  temp     - body temperature (°C)
function thrombopenia(count, schisto, hemo, crea, temp) {
    // test if platelet count is below threshold
    if (count < 150000) {
        // doesn't currently discriminate between male/female
        // parameters
        if (schisto && (hemo < 13.5) && (crea > 1.1) &&
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

res1 = thrombopenia(50000, true, 8, 1.7, 39.2)
p_res.innerHTML = res1
