/*
    OOP Example in JavaScript

*/

class Animal {

    constructor(gender,age,weight) {
        if(new.target === Animal) {
            throw new TypeError("Cannost construct Abstract class");
        }

        this.gender = gender;
        this.age = age;
        this.weight = weight;
    }

    sleep() {

    }

    eat() {

    }

    move() {
        console.log("We movin");
    }

    ToString() {
        console.log("This animal is " +this.gender+ " , the age is "+this.age+ " and it weighs "+this.weight+ " kg");
    }
}

class Bird extends Animal {

    fly() {
        console.log("flying");
    }
}

class Reptile extends Animal {
    leap() {
      
        
    }
}

let eagle = new Bird("female",12,10);

console.log(eagle.gender);
eagle.fly();
eagle.ToString();