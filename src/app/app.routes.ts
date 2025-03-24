import { Routes } from '@angular/router';
import { HomeComponent } from './core/pages/home/home.component';
import { ProjectsComponent } from './core/pages/projects/projects.component';
import { SkillsComponent } from './core/pages/skills/skills.component';
import { ContactComponent } from './core/pages/contact/contact.component';
import { NotfoundComponent } from './core/pages/notfound/notfound.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, title: 'Home' },
  { path: 'projects', component: ProjectsComponent, title: 'Projects' },
  { path: 'skills', component: SkillsComponent, title: 'Skills' },
  { path: 'contact', component: ContactComponent, title: 'Contact' },
  { path: '**', component: NotfoundComponent, title: 'notfound' },
];
