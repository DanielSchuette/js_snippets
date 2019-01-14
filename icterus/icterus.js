/* get text field from html */
var out = document.getElementById("outDiv");

/* LabParam class */
class LabParam {
    constructor(gender, gBili, indirBili, dirBili,
                urinBili, urinUroBili, alat, ggt, output) {
        this.gender = gender;           /* male or female */
        this.gBili = gBili;             /* < 1.1 mg/dl */
        this.indirBili = indirBili;     /* 0.2 - 0.8 mg/dl */
        this.dirBili = dirBili;         /* < 0.25 mg/dl */
        this.urinBili = urinBili;       /* true/false */
        this.urinUroBili = urinUroBili; /* true/false */
        this.alat = alat;               /* f 10 - 35 U/l, m 10 - 50 U/l */
        this.ggt = ggt;                 /* f 4 - 18 U/l, m 6 - 28 U/l */

        this.out = output;              /* html element for text output */
        this.result = null;             /* holds the analysis result */
    }

    /* showResult() displays the result on index.html page. */
    showResult() {
        if (this.result === null) {
            return;
        }
        let msg = "<br><br> Werte: " + "<br> Geschlecht: " + this.gender +
            "<br> Gesamt-Bilirubin: " + this.gBili + " mg/dl" +
            "<br> Indirektes Bilirubin:  " + this.indirBili + " mg/dl" +
            "<br> Direktes Bilirubin: " + this.dirBili + " mg/dl" +
            "<br> Urin-Bilirubin: " + this.urinBili +
            "<br> Urin-Urobilinogen: " + this.urinUroBili +
            "<br> ALAT: " + this.alat + " U/l" +
            "<br> Gamma-GT: " + this.ggt + " U/l";
        this.out.innerHTML += msg + "<br><br> Auswertung: " + this.result;
    }

    /* analyze() returns a diagnostic text based upon lab parameters. */
    analyze() {
        if (this.gBili > 1.1) {
            if ((this.indirBili > 0.8) && (this.dirBili < 0.25) &&
                (this.urinBili === false) && (this.urinUroBili === true) &&
                (((this.alat < 50) && (this.ggt < 28) && (this.gender === "male")) ||
                ((this.alat < 35) && (this.ggt < 18) && (this.gender === "female")))) {
                this.result = "<br> Es liegt eine Hyperbilirubinämie vor! <br> Es liegt ein prähepatischer Ikterus vor!";
            } else if ((this.indirBili < 0.8) && (this.dirBili > 0.25) &&
                       (this.urinBili === true) && (this.urinUroBili === false) &&
                       (((this.alat > 50) && (this.ggt > 28) && (this.gender === "male")) ||
                       ((this.alat > 35) && (this.ggt > 18) && (this.gender === "female")))) {
                this.result = "<br> Es liegt eine Hyperbilirubinämie vor! <br> Es liegt ein posthepatischer Ikterus vor!";
            } else if ((this.indirBili > 0.8) && (this.dirBili < 0.25) &&
                       (this.urinBili === false) && (this.urinUroBili === false) &&
                       (((this.alat < 50) && (this.ggt < 28) && (this.gender === "male")) ||
                           /* original code has alat < 50 for this case */
                       ((this.alat < 35) && (this.ggt < 18) && (this.gender === "female")))) {
                this.result = "<br> Es liegt eine Hyperbilirubinämie vor! <br> Es liegt ein intrahepatischer Ikterus vor! <br> Es liegt eine Bilirubinkonjugationsstörung vor!";
            } else if ((this.indirBili > 0.8) && (this.dirBili > 0.25) &&
                       (this.urinBili === true) &&
                       (((this.alat > 50) && (this.ggt > 28) && (this.gender === "male")) ||
                        ((this.alat > 35) && (this.ggt > 18) && (this.gender === "female")))) {
                this.result = "<br> Es liegt eine Hyperbilirubinämie vor! <br> Es liegt ein intrahepatischer Ikterus vor! <br> Es liegt eine Leberzellschädigung vor!";
            } else {
                this.result = "<br> Es liegt eine Hyperbilirubinämie vor!";
            }
        } else {
            this.result = "<br> Es liegt keine Hyperbilirubinämie vor!";
        }
    }
}

/* patients object */
patients = {
    male: {
        /* no disease */
        healthy:        new LabParam("male", 0.5, 0.3, 0.2, false, false, 20, 16, out),
        /* pre-hepatic icterus */
        preHepIcterus:  new LabParam("male", 2, 1.8, 0.2, false, true, 20, 16, out),
        /* post-hepatic icterus */
        postHepIct:     new LabParam("male", 3, 0.5, 2.5, true, false, 60, 80, out),
        /* conjugation defect */
        intraHepConjug: new LabParam("male", 2, 1.8, 0.2, false, false, 20, 16, out),
        /* hepatic injury */
        intraHepInj:    new LabParam("male", 3, 1, 2, true, false, 60, 80, out),
    },
    female: {
        healthy:        new LabParam("female", 0.5, 0.3, 0.2, false, false, 20, 16, out),
        preHepIct:      new LabParam("female", 2, 1.8, 0.2, false, true, 20, 16, out),
        postHepIct:     new LabParam("female", 3, 0.5, 2.5, true, false, 60, 80, out),
        intraHepConjug: new LabParam("female", 2, 1.8, 0.2, false, false, 20, 16, out),
        intraHepInj:    new LabParam("female", 3, 1, 2, true, false, 60, 80, out),
    }
}

for (const gender in patients) {            /* iterate over genders */
    for (const pat in patients[gender]) {   /* iterate over individual patients */
        patients[gender][pat].analyze();    /* analyze patient */
        patients[gender][pat].showResult(); /* display result */
    }
}
