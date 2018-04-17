class Person {
    constructor(name,age)
    {
        this.name=name;
        this.age=age;
    }
    getName(){
        console.log(`name is ${this.name}`);
    }
    getAge(){
        console.log(`age is ${this.age}`);        
    }
}
module.exports = Person;