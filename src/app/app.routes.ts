import { Routes } from '@angular/router';
import { AppComponent } from './app.component';

export const routes: Routes = [
    {path: '', redirectTo:"homePage", pathMatch:'full'},
    { path: 'homePage', component: AppComponent }
];
