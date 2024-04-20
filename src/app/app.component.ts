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
