class Person {
    constructor(firstName, lastName, age, email) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.age = age;
        this.email = email;
    }

    print() {
        console.log(`Name: ${this.firstName}, ${this.lastName}\n` +
                    `Age: ${this.age}, Email: ${this.email}`);
    }
}

const person = {
    firstName: "John",
    lastName: "Doe",
    age: 42,
    email: "johndoe@gmail.com",
};

module.exports = { person: person, Person: Person };
