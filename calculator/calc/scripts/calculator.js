/*
 * A simple calculator implementation.
 * To make this app useful, it should be re-
 * written as a stack machine.
 */
let calc = {
    value: 0,
    action: undefined,
    plus: () => {
        if (!this.action) {
            document.getElementById("calc-display").value += "+";
            this.action = "+";
        }
    },
    minus: () => {
        if (!this.action) {
            document.getElementById("calc-display").value += "-";
            this.action = "-";
        }
    },
    ac: () => {
        this.value = 0;
        this.action = undefined;
        document.getElementById("calc-display").value = 0;
    },
    keystroke: button => {
        let elem = document.getElementById("calc-display");

        /* append the buttons value to the content of input */
        switch (this.action) {
            case undefined:
                if (elem.value === "0" || !elem.value)
                    elem.value = `${button.value}`;
                else
                    elem.value += `${button.value}`;
                this.value = 0;
                break;
            case "+":
                this.value = parseInt(elem.value) + parseInt(button.value);
                if (elem.value === "0" || !elem.value)
                    elem.value = `${button.value}`;
                else
                    elem.value += `${button.value}`;
                break;
            case "-":
                this.value = parseInt(elem.value) - parseInt(button.value);
                if (elem.value === "0" || !elem.value)
                    elem.value = `${button.value}`;
                else
                    elem.value += `${button.value}`;
                break;
        }
    },
    eql: () => {
        this.action = undefined;
        if (this.value)
            document.getElementById("calc-display").value = this.value;
    },
};

// initialize the calculator display
document.getElementById("calc-display").value = 0;
