import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'unicursos';

  courseCount = 0;

  constructor(private renderer:Renderer2){}

  courseForm = new FormGroup({
    name: new FormControl(''),
    time: new FormControl(''),
    instructor: new FormControl(''),
    date: new FormControl(''),
    education: new FormControl('')
  });

  addCourse(){
    this.courseCount++;

    if(this.courseForm.value.name == ''){
      window.alert("Digite um nome válido!");
    }
    else if(this.courseForm.value.time == '' || parseInt(this.courseForm.value.time!) <= 0){
      window.alert("Digite uma carga horária válida!");
    }
    else if(this.courseForm.value.instructor == ''){
      window.alert("Digite um instrutor válido!");
    }
    else if(this.courseForm.value.date == ''){
      window.alert("Digite uma data válida!");
    }
    else if(this.courseForm.value.education == ''){
      window.alert("Escolha um nível de educação!");
    }
    else{
      localStorage.setItem('name'+this.courseCount, this.courseForm.value.name!);
      localStorage.setItem('time'+this.courseCount, this.courseForm.value.time!);
      localStorage.setItem('instructor'+this.courseCount, this.courseForm.value.instructor!);
      localStorage.setItem('date'+this.courseCount, this.courseForm.value.date!);
      localStorage.setItem('education'+this.courseCount, this.courseForm.value.education!);

      localStorage.setItem('courseCount',this.courseCount.toString());
      location.reload();
    }
  }

  toggleTheme() {
    const body = document.getElementById("body")!;
    const currentTheme = localStorage.getItem("theme");
    const lightTheme = "lightTheme";
    const darkTheme = "darkTheme";
  
    if (currentTheme == "lightTheme") {
      this.renderer.removeClass(body, lightTheme);
      this.renderer.addClass(body, darkTheme);

      localStorage.setItem("theme", darkTheme);
    } else {
      this.renderer.removeClass(body, darkTheme);
      this.renderer.addClass(body, lightTheme);

      localStorage.setItem("theme", lightTheme);
    }
  }
  
  ngOnInit(): void {
    if(localStorage.getItem('courseCount')){
      this.courseCount = parseInt(localStorage.getItem('courseCount')!);
    }
    const body = document.getElementById("body")!;
    const theme = localStorage.getItem("theme");
    if (theme) {
      this.renderer.addClass(body, theme);
    }
    else{
      this.renderer.addClass(body, "darkTheme");
      localStorage.setItem("theme", "darkTheme");
    }
  }
}
