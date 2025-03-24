import {
  Component,
  AfterViewInit,
  OnDestroy,
  ViewChild,
  ViewContainerRef,
  Inject,
  PLATFORM_ID,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import Typed from 'typed.js';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements AfterViewInit, OnDestroy {
  private typed: Typed | undefined;
  private observer: IntersectionObserver | undefined;

  // ViewContainerRefs for dynamic component loading
  @ViewChild('skillsContainer', { read: ViewContainerRef })
  skillsContainer!: ViewContainerRef;
  @ViewChild('projectsContainer', { read: ViewContainerRef })
  projectsContainer!: ViewContainerRef;
  @ViewChild('contactContainer', { read: ViewContainerRef })
  contactContainer!: ViewContainerRef;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      // Initialize Typed.js
      const element = document.getElementById('type-script');
      if (!element) {
        console.error('Element with id "type-script" not found');
        return;
      }

      if (this.typed) {
        this.typed.destroy();
        this.typed = undefined;
      }

      setTimeout(() => {
        this.typed = new Typed('#type-script', {
          strings: ['CS Student', 'Frontend Developer', 'Freelancer'],
          typeSpeed: 50,
          backSpeed: 30,
          loop: true,
          backDelay: 1000,
          startDelay: 500,
          cursorChar: '|',
          showCursor: true,
        });
      }, 500);

      setTimeout(() => {
        this.setupIntersectionObserver();
      }, 1000);
    }
  }

  ngOnDestroy(): void {
    if (this.typed) {
      this.typed.destroy();
      this.typed = undefined;
    }
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  downloadCV(): void {
    if (isPlatformBrowser(this.platformId)) {
      const pdfUrl = 'cv.pdf';
      const link = document.createElement('a');
      link.href = pdfUrl;
      link.download = 'cv.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      console.warn(
        'PDF download is not available during server-side rendering.'
      );
    }
  }

  private setupIntersectionObserver(): void {
    if (isPlatformBrowser(this.platformId)) {
      const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5,
      };

      this.observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(async (entry) => {
          if (entry.isIntersecting) {
            const section = entry.target as HTMLElement;
            console.log(
              `Section ${section.id} is intersecting! Intersection ratio: ${entry.intersectionRatio}`
            );

            section.classList.add('visible');

            try {
              switch (section.id) {
                case 'skills-section':
                  if (!this.skillsContainer.length) {
                    const { SkillsComponent } = await import(
                      '../skills/skills.component'
                    );
                    this.skillsContainer.createComponent(SkillsComponent);
                    console.log('SkillsComponent loaded successfully');
                  } else {
                    console.log('SkillsComponent already loaded');
                  }
                  break;
                case 'projects-section':
                  if (!this.projectsContainer.length) {
                    const { ProjectsComponent } = await import(
                      '../projects/projects.component'
                    );
                    this.projectsContainer.createComponent(ProjectsComponent);
                    console.log('ProjectsComponent loaded successfully');
                  } else {
                    console.log('ProjectsComponent already loaded');
                  }
                  break;
                case 'contact-section':
                  if (!this.contactContainer.length) {
                    const { ContactComponent } = await import(
                      '../contact/contact.component'
                    );
                    this.contactContainer.createComponent(ContactComponent);
                    console.log('ContactComponent loaded successfully');
                  } else {
                    console.log('ContactComponent already loaded');
                  }
                  break;
                default:
                  console.warn(`Unknown section ID: ${section.id}`);
              }
            } catch (error) {
              console.error(
                `Failed to load component for section ${section.id}:`,
                error
              );
            }

            observer.unobserve(section);
          }
        });
      }, options);

      const sections = document.querySelectorAll('section:not(.hero-section)');
      if (sections.length === 0) {
        console.error(
          'No sections found for observation. Check if sections are in the DOM.'
        );
        console.log(
          'All sections in DOM:',
          document.querySelectorAll('section')
        );
        return;
      }

      sections.forEach((section) => {
        console.log(`Observing section: ${section.id}`);
        this.observer?.observe(section);
      });
    }
  }

  public manuallyLoadComponents(): void {
    if (isPlatformBrowser(this.platformId)) {
      Promise.all([
        this.loadSkillsComponent(),
        this.loadProjectsComponent(),
        this.loadContactComponent(),
      ]).then(() => {
        console.log('All components loaded manually');
      });
    }
  }

  private async loadSkillsComponent(): Promise<void> {
    if (!this.skillsContainer.length) {
      const { SkillsComponent } = await import('../skills/skills.component');
      this.skillsContainer.createComponent(SkillsComponent);
      console.log('SkillsComponent loaded manually');
      document.getElementById('skills-section')?.classList.add('visible');
    }
  }

  private async loadProjectsComponent(): Promise<void> {
    if (!this.projectsContainer.length) {
      const { ProjectsComponent } = await import(
        '../projects/projects.component'
      );
      this.projectsContainer.createComponent(ProjectsComponent);
      console.log('ProjectsComponent loaded manually');
      document.getElementById('projects-section')?.classList.add('visible');
    }
  }

  private async loadContactComponent(): Promise<void> {
    if (!this.contactContainer.length) {
      const { ContactComponent } = await import('../contact/contact.component');
      this.contactContainer.createComponent(ContactComponent);
      console.log('ContactComponent loaded manually');
      document.getElementById('contact-section')?.classList.add('visible');
    }
  }
}
