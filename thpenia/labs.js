/*
 * labs.js defines a Lab class.
 */
class Lab {
    constructor(
        date,           /* Date()   - submission date */
        count,          /* int      - platelet count (/µl) */
        schistocytes,   /* bool     - schistocytes? */
        hemoglobin,     /* float    - hemoglobin (mg/dl) */
        creatinine,     /* float    - creatinine (mg/dl) */
        temperature     /* float    - body temperature (°C) */
    ) {
        this.date = date;
        this.count = count;
        this.schisto = schistocytes;
        this.hemo = hemoglobin;
        this.crea = creatinine;
        this.temp = temperature;
    }

    /*
     * logValues(): log all attributes of this Lab()
     * object.
     */
    logValues() {
        // a format string is more elegant, but what about
        // backwards compatibility?
        let msg = "date: "+this.date+"\ncount: "+this.count+
            "\nschistocytes: "+this.schisto+"\nhemoglobin: "+
            this.hemo+"\ncreatinine: "+this.crea+"\ntemperature: "+
            this.temp;
        console.log(msg);
    }

    /*
     * thrombopenia(): A simple method that suggests a diagnose
     * for patients with thrombopenia and certain other lab parameters.
     */
    thrombopenia() {
        // return a warning message if no values were provided
        if (this.count === "" || this.count === null) {
            console.log("give me a platelet count");
        }

        // return a warning message if a high count is provided
        if (this.count > 1000000) {
            return "is "+this.count+" a reasonable value?";
        }

        // test if platelet count is below threshold
        if (this.count < 150000) {
            // TODO: doesn't currently discriminate between
            // male/female patients
            if (this.schisto && (this.hemo < 13.5) &&
                (this.crea >= 1.1) && this.temp >= 38.0) {
                return "TTP";
            }

            // Evans syndrome has low platelets and an auto-
            // immune hemolytic anaemia (but w/o schistocytes)
            if (!this.schisto && (this.hemo < 13.5)) {
                return "Evans syndrome"
            }
            if (!this.schisto && (this.hemo > 13.5) &&
                (this.crea <= 1.0) && this.temp < 38.0) {
                return "ITP";
            }
            return "unclear";    /* none of the scenarios were true */
        }
        return "normal";        /* probably not reliable */
    }
}
