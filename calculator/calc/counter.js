let storedNumbers = [];
let wert = 5000;
let i = 1;

storedNumbers[i] = 5000;
storedNumbers.push(5000);

let summe = 0;
for (let j = 0; j < storedNumbers.length; j++){
    summe = summe + storedNumbers[j];
}

let counter = {
        number: "0",
        plus: function(){
            this.number++;
            document.getElementById("userinput").value=this.number;
        },
        minus:function(){
            this.number--;
            document.getElementById("userinput").value=this.number;
        }   ,
        ac:function(){
            this.number=0;
            document.getElementById("userinput").value=this.number;
        },
        keystroke: function(el){
            if(document.getElementById("userinput").value == "0"){
                document.getElementById("userinput").value = "";
            }
            document.getElementById("userinput").value = document.getElementById("userinput").value + el.value;
        },
        hallo: () => alert("Hallo"),
};
