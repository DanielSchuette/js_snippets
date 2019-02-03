let counter = {
        number: 0,
        plus: () => {
            this.number++;
            document.getElementById("userinput").value = this.number;
        },
        minus: () => {
            this.number--;
            document.getElementById("userinput").value = this.number;
        },
        ac: () => {
            this.number = 0;
            document.getElementById("userinput").value = this.number;
        },
        keystroke: button => {
            let elem = document.getElementById("userinput");
            /* don't append to zero */
            if (elem.value == "0")
                elem.value = "";

            /* append the buttons value to the content of input */
            elem.value = elem.value + button.value;
        },
        hallo: () => alert("Hallo"),
};
