import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-background',
  imports: [CommonModule],
  templateUrl: './background.component.html',
  styleUrl: './background.component.scss',
})
export class BackgroundComponent {
  private readonly sensitivity = 80;

  constructor(private renderer: Renderer2, private el: ElementRef) {}

  @HostListener('mousemove', ['$event'])
  onMouseMove(e: MouseEvent) {
    const particles = this.el.nativeElement.querySelectorAll(
      '.geometric-particle'
    );
    particles.forEach((particle: HTMLElement) => {
      const rect = particle.getBoundingClientRect();
      const x = (e.clientX - rect.left) / this.sensitivity;
      const y = (e.clientY - rect.top) / this.sensitivity;

      this.renderer.setStyle(
        particle,
        'transform',
        `translate(${x}px, ${y}px)
         rotate(${x * 2}deg)
         scale(${1 + Math.abs(x * y) / 100})`
      );
    });
  }
}
