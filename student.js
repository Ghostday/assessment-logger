export default class Student {
    constructor(name) {
        this.name = name;
        this.weeks = {
            2: {},
            4: {},
            6: {},
            8: {},
            10: {},
            12: {}
        }
    }
}

const alex = new Student("Alex")

console.log(alex.weeks)