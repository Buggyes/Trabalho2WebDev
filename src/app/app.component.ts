import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { Course } from './models/course-model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ReactiveFormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'unicursos';

  courses: any[] = [];

  editing: boolean;
  courseEditId: number;

  courseCount = 0;

  constructor(private renderer: Renderer2, private router: Router) {
    this.editing = false;
    this.courseEditId = 0;
  }

  editForm = new FormGroup({
    name: new FormControl(''),
    time: new FormControl(''),
    instructor: new FormControl(''),
    date: new FormControl(''),
    education: new FormControl(''),
  });

  courseForm = new FormGroup({
    name: new FormControl(''),
    time: new FormControl(''),
    instructor: new FormControl(''),
    date: new FormControl(''),
    education: new FormControl(''),
  });

  goToHomePage(){
    this.router.navigate(['/homePage'])
  }

  clearForm(){
    this.courseForm.reset();
  }

  cancelEditing(){
    this.editForm.reset();
    this.editing = false;
  }

  saveChanges(){
    let courseDate = this.editForm.value.date!.split('-');
      let newDate = courseDate[2]+"/"+courseDate[1]+"/"+courseDate[0];
      localStorage.setItem(
        'name' + this.courseEditId,
        this.editForm.value.name!
      );
      localStorage.setItem(
        'time' + this.courseEditId,
        this.editForm.value.time!
      );
      localStorage.setItem(
        'instructor' + this.courseEditId,
        this.editForm.value.instructor!
      );
      localStorage.setItem(
        'date' + this.courseEditId,
        newDate
      );
      localStorage.setItem(
        'education' + this.courseEditId,
        this.editForm.value.education!
      );

      location.reload();
  }

  editCourse(id:number) {
    let clearButton = document.getElementById('clearButton');
    clearButton?.scrollIntoView();
    this.editing = true;
    for (let i = 0; i < this.courses.length; i++) {
      if(id == this.courses[i].id){
        this.courseEditId = id;
        let date = this.courses[i].date.split("/");
        let oldDate = date[2]+"-"+date[1]+"-"+date[0]
        this.editForm.patchValue({
          name: this.courses[i].name,
          time: this.courses[i].time,
          instructor: this.courses[i].instructor,
          date: oldDate,
          education: this.courses[i].education,
        })
        break;
      }
    }
  }

  deleteCourse(id:number) {
    localStorage.removeItem("id"+id);
    localStorage.removeItem("name"+id);
    localStorage.removeItem("time"+id);
    localStorage.removeItem("instructor"+id);
    localStorage.removeItem("date"+id);
    localStorage.removeItem("education"+id);
    location.reload();
  }

  getAllCourses() {
    if (localStorage.getItem('courseCount') != null) {
      this.courseCount = parseInt(localStorage.getItem('courseCount')!);
      for (let i = 0; i <= this.courseCount; i++) {
        if (localStorage.getItem('name' + i) == null) {
          continue;
        }
        let id = parseInt(localStorage.getItem('id' + i)!);
        let name = localStorage.getItem('name' + i);
        let time = parseInt(localStorage.getItem('time' + i)!);
        let instructor = localStorage.getItem('instructor' + i);
        let date = localStorage.getItem('date' + i);
        let education = localStorage.getItem('education' + i);
        this.courses.push(
          new Course(id!, name!, time!, instructor!, date!, education!)
        );
      }
    }
    for (let i = 0; i < this.courses.length; i++) {
      console.log(this.courses[i]);
    }
  }

  addCourse() {
    this.courseCount++;

    if (this.courseForm.value.name == '') {
      window.alert('Digite um nome válido!');
    } else if (
      this.courseForm.value.time == '' ||
      parseInt(this.courseForm.value.time!) <= 0
    ) {
      window.alert('Digite uma carga horária válida!');
    } else if (this.courseForm.value.instructor == '') {
      window.alert('Digite um instrutor válido!');
    } else if (this.courseForm.value.date == '') {
      window.alert('Digite uma data válida!');
    } else if (this.courseForm.value.education == '') {
      window.alert('Escolha um nível de educação!');
    } else {
      let courseDate = this.courseForm.value.date!.split('-');
      let newDate = courseDate[2]+"/"+courseDate[1]+"/"+courseDate[0];
      localStorage.setItem(
        'id'+this.courseCount,
        this.courseCount.toString()
      );
      localStorage.setItem(
        'name' + this.courseCount,
        this.courseForm.value.name!
      );
      localStorage.setItem(
        'time' + this.courseCount,
        this.courseForm.value.time!
      );
      localStorage.setItem(
        'instructor' + this.courseCount,
        this.courseForm.value.instructor!
      );
      localStorage.setItem(
        'date' + this.courseCount,
        newDate
      );
      localStorage.setItem(
        'education' + this.courseCount,
        this.courseForm.value.education!
      );

      localStorage.setItem('courseCount', this.courseCount.toString());
      location.reload();
    }
  }

  toggleTheme() {
    const body = document.getElementById('body')!;
    const currentTheme = localStorage.getItem('theme');
    const lightTheme = 'lightTheme';
    const darkTheme = 'darkTheme';

    if (currentTheme == 'lightTheme') {
      this.renderer.removeClass(body, lightTheme);
      this.renderer.addClass(body, darkTheme);

      localStorage.setItem('theme', darkTheme);
    } else {
      this.renderer.removeClass(body, darkTheme);
      this.renderer.addClass(body, lightTheme);

      localStorage.setItem('theme', lightTheme);
    }
  }

  ngOnInit(): void {
    this.getAllCourses();
    const body = document.getElementById('body')!;
    const theme = localStorage.getItem('theme');
    if (theme) {
      this.renderer.addClass(body, theme);
    } else {
      this.renderer.addClass(body, 'darkTheme');
      localStorage.setItem('theme', 'darkTheme');
    }
  }
}
