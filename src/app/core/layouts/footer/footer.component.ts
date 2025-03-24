import { Component } from '@angular/core';
import { BackgroundComponent } from '../../pages/background/background.component';

@Component({
  selector: 'app-footer',
  imports: [BackgroundComponent],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {}
