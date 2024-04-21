export class Course{
    id: number;
    name: string;
    time: number;
    instructor: string;
    date: string;
    education: string;
    constructor(id:number, name:string, time:number, instructor:string, date:string, education:string){
        this.id = id;
        this.name = name;
        this.time = time;
        this.instructor = instructor;
        this.date = date;
        this.education = education;
    }
}