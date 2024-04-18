import { Component, OnInit, Renderer2 } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'unicursos';

  constructor(private renderer:Renderer2){}

  toggleTheme() {
    const body = document.getElementById("body")!;
    const lightTheme = "lightTheme";
    const darkTheme = "darkTheme";
  
    if (body.classList.contains(lightTheme)) {
      body.classList.remove(lightTheme);
      body.classList.add(darkTheme);
  
      localStorage.setItem("theme", darkTheme);
    } else {
      body.classList.remove(darkTheme);
      body.classList.add(lightTheme);
  
      localStorage.setItem("theme", lightTheme);
    }
  }
  
  ngOnInit(): void {
    const theme = localStorage.getItem("theme");
    if (theme) {
      document.body.classList.add(theme);
    }
    else{
      let body = document.getElementById("body")!;
      body.classList.add("darkTheme");
      localStorage.setItem("theme", "darkTheme");
    }
  }
}
