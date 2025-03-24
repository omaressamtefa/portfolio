import { Component } from '@angular/core';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
  standalone: true,
  imports: [],
})
export class ProjectsComponent {
  openProject(link: string) {
    window.open(link, '_blank');
  }
}
