import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';

@Component({
  selector: 'app-contact',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  standalone: true,
})
export class ContactComponent implements OnInit {
  contactForm: FormGroup;
  submitted = false;

  private emailJsPublicKey = '5RhPJ_4r2LQmzdVW2';
  private emailJsServiceId = 'service_q3c2l5u';
  private emailJsTemplateId = 'template_ernzler';

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    // Initialize EmailJS with the Public Key
    emailjs.init(this.emailJsPublicKey);
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.contactForm.invalid) {
      return;
    }

    const formData = this.contactForm.value;

    // Send email using EmailJS
    emailjs
      .send(this.emailJsServiceId, this.emailJsTemplateId, {
        name: formData.name,
        email: formData.email,
        message: formData.message,
        to_email: 'omaressamtefa@gmail.com', // Specify the recipient email
      })
      .then(
        (response: EmailJSResponseStatus) => {
          console.log('SUCCESS!', response.status, response.text);
          alert('Message sent successfully!');
          this.contactForm.reset();
          this.submitted = false;
        },
        (error: any) => {
          console.error('FAILED...', error.text || error);
          alert('Failed to send message: ' + (error.text || 'Unknown error'));
        }
      );
  }
}
