export class Student {
    studentId: string;
    firstName: string;
    lastName: string;
    lines: string[];
    
    constructor(studentId: string, firstName: string, lastName: string) {
        this.studentId = studentId
        this.firstName = firstName;
        this.lastName = lastName;
        this.lines = [];
    }

    
    get fullName():string {
        return `${this.firstName} ${this.lastName}`
    }
    

    addLine(assessment: string, score: number) {
        let finalString = `${this.studentId},${this.firstName},${this.lastName},${assessment},${score}`
        this.lines.push(finalString)
    }

}

export class Sheet {
    students: Array<Student>
    lines: Array<string>

    constructor() {
        this.students = [];
        this.lines = [];
    }

    newStudent(csvString: string) {
        const data = csvString.split(',')
        let id = data[0]
        let first = data[1]
        let last = data[2]
        let s = new Student(id, first, last);
        this.students.push(s)
    }

    grabAllLines() {
        this.students.forEach(student => {
            this.lines.push(...student.lines)
        })
    }

    finalizeLines() {
        this.grabAllLines()
        const header = `Learner ID,First Name,Last Name,Assessment,Score\n`
        const data = this.lines.join("\n")
        return `${header}${data}`
    }

}
