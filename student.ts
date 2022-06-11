export class Student {
    studentId: string;
    firstName: string;
    lastName: string;
    
    constructor(studentId: string, firstName: string, lastName: string) {
        this.studentId = studentId
        this.firstName = firstName;
        this.lastName = lastName;
    }

    results = {
        "Personal Responsibility": [],
        "Growth Mindset": [],
        "Future Orientation": [],
        "Persistence": [],
        "Communication": [],
        "Teamwork": [],
        "Proactiveness": [],
        "Adaptability": [],
    }

}

export class Sheet {
    students: Array<Student>

    constructor() {
        this.students = [];
    }

    newStudent(csvString: string) {
        const data = csvString.split(',')
        let id = data[0]
        let first = data[1]
        let last = data[2]
        let s = new Student(id, first, last);
        this.students.push(s)
    }

}
