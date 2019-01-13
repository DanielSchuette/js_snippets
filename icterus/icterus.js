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
    }

    /* showResult() displays the result on index.html page. */
    showResult(text) {
        let msg = "Werte: " + "<br> Geschlecht: " + this.gender +
            "<br> Gesamt-Bilirubin: " + this.gBili + " mg/dl" +
            "<br> Indirektes Bilirubin:  " + this.indirBili +
            " mg/dl" + "<br> Direktes Bilirubin: " + this.dirBili +
            " mg/dl" + "<br> Urin-Bilirubin: " + this.urinBili +
            "<br> Urin-Urobilinogen: " + this.urinUroBili +
            "<br> ALAT: " + this.alat + " U/l" +
            "<br> Gamma-GT: " + this.ggt + " U/l";
        this.out.innerHTML = msg + "<br><br> Auswertung: " + text;
    }

    /* analyze() returns a diagnostic text based upon lab parameters. */
    analyze() {
        if (this.gBili > 1.1) {
            if ((this.indirBili > 0.8) && (this.dirBili < 0.25) &&
                (this.urinBili === false) && (this.urinUroBili === true) &&
                (((this.alat < 50) && (this.ggt < 28) && (this.gender === "male")) ||
                ((this.alat < 35) && (this.ggt < 18) && (this.gender === "female")))) {
                return "<br> Es liegt eine Hyperbilirubinämie vor! <br> Es liegt ein prähepatischer Ikterus vor!";
            } else if ((this.indirBili < 0.8) && (this.dirBili > 0.25) &&
                       (this.urinBili === true) && (this.urinUroBili === false) &&
                       (((this.alat > 50) && (this.ggt > 28) && (this.gender === "male")) ||
                       ((this.alat > 35) && (this.ggt > 18) && (this.gender === "female")))) {
                return "<br> Es liegt eine Hyperbilirubinämie vor! <br> Es liegt ein posthepatischer Ikterus vor!";
            } else if ((this.indirBili > 0.8) && (this.dirBili < 0.25) &&
                       (this.urinBili === false) && (this.urinUroBili === false) &&
                       (((this.alat < 50) && (this.ggt < 28) && (this.gender === "male")) ||
                           /* original code has alat < 50 for this case */
                       ((this.alat < 35) && (this.ggt < 18) && (this.gender === "female")))) {
                return "<br> Es liegt eine Hyperbilirubinämie vor! <br> Es liegt ein intrahepatischer Ikterus vor! <br> Es liegt eine Bilirubinkonjugationsstörung vor!";
            } else if ((this.indirBili > 0.8) && (this.dirBili > 0.25) &&
                       (this.urinBili === true) &&
                       (((this.alat > 50) && (this.ggt > 28) && (this.gender === "male")) ||
                        ((this.alat > 35) && (this.ggt > 18) && (this.gender === "female")))) {
                return "<br> Es liegt eine Hyperbilirubinämie vor! <br> Es liegt ein intrahepatischer Ikterus vor! <br> Es liegt eine Leberzellschädigung vor!";
            } else {
                return "<br> Es liegt eine Hyperbilirubinämie vor!";
            }
        } else {
            return "<br> Es liegt keine Hyperbilirubinämie vor!";
        }
    }
}

/* Test cases, male patients. */
healthyMale = new LabParam("male", 0.5, 0.3, 0.2,
    false, false, 20, 16, out);             /* no disease, male */
/* to test this patient: */
let res1 = healthyMale.analyze();
healthyMale.showResult(res1);

preHepIctMale = new LabParam("male", 2, 1.8, 0.2,
    false, true, 20, 16, out);              /* pre-hepatic icterus, male */
postHepIctMale = new LabParam("male", 3, 0.5, 2.5,
    true, false, 60, 80, out);              /* post-hepatic icterus, male */
intraHepConjugMale = new LabParam("male", 2, 1.8, 0.2,
    false, false, 20, 16, out);             /* conjugation defect, male */
intraHepInjMale = new LabParam("male", 3, 1, 2,
    true, false, 60, 80, out);              /* hepatic injury, male */

/* Test cases, female patients. */
healthyFemale = new LabParam("female", 0.5, 0.3, 0.2,
    false, false, 20, 16, out);             /* no disease, female */
preHepIctFemale = new LabParam("female", 2, 1.8, 0.2,
    false, true, 20, 16, out);              /* pre-hepatic icterus, female */
postHepIctFemale = new LabParam("female", 3, 0.5, 2.5,
    true, false, 60, 80, out);              /* post-hepatic icterus, female */
intraHepConjugFemale = new LabParam("female", 2, 1.8, 0.2,
    false, false, 20, 16, out);             /* conjugation defect, female */
intraHepInjFemale = new LabParam("female", 3, 1, 2,
    true, false, 60, 80, out);              /* hepatic injury, female */
