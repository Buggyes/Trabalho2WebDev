export class Course{
    name: string;
    time: number;
    instructor: string;
    date: string;
    education: string;
    constructor(name:string, time:number, instructor:string, date:string, education:string){
        this.name = name;
        this.time = time;
        this.instructor = instructor;
        this.date = date;
        this.education = education;
    }
}