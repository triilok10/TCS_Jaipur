import { Component, signal, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';

interface ContactForm {
  name: string;
  email: string;
  mobile: string;
  connectionType: string;
  message: string;
}

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './hero.html',
  styleUrl: './hero.css'
})
export class Hero {
  protected isRequestSent = signal(false);
  protected isRequestLoading = signal(false);

  // Modal state
  protected isModalOpen = signal(false);
  protected isModalSubmitting = signal(false);
  protected isModalSubmitted = signal(false);

  protected formData: ContactForm = {
    name: '',
    email: '',
    mobile: '',
    connectionType: '',
    message: ''
  };

  protected readonly connectionTypes = [
    { id: 'coffee', emoji: '☕', label: 'Chat Over Coffee', desc: 'Casual conversation, no agenda' },
    { id: 'vc',     emoji: '🎥', label: 'VC Chat',          desc: 'Quick video call (15–30 min)' },
    { id: 'collab', emoji: '🤝', label: 'Collaborate',      desc: 'Project or product idea' },
    { id: 'talk',   emoji: '🎙️', label: 'Speaking Invite',  desc: 'Conference or meetup talk' },
    { id: 'mentor', emoji: '🧑‍💻', label: 'Mentorship',      desc: 'Career or tech guidance' },
    { id: 'bd26',   emoji: '🇮🇳', label: 'Bharat Dreamin\'', desc: 'BD \'26 ambassador inquiry' },
    { id: 'other',  emoji: '💬', label: 'Something Else',   desc: 'Just say hello!' }
  ];

  protected sendRequest() {
    if (this.isRequestLoading()) return;
    this.isRequestLoading.set(true);
    this.isRequestSent.set(false);
    setTimeout(() => {
      this.isRequestLoading.set(false);
      this.isRequestSent.set(true);
    }, 800);
  }

  protected openModal() {
    this.isModalOpen.set(true);
    document.body.style.overflow = 'hidden';
  }

  protected closeModal() {
    this.isModalOpen.set(false);
    document.body.style.overflow = '';
  }

  protected selectType(id: string) {
    this.formData.connectionType = id;
  }

  protected submitModal(form: NgForm) {
    if (form.invalid || !this.formData.connectionType) {
      Object.keys(form.controls).forEach(k => form.controls[k].markAsTouched());
      return;
    }
    this.isModalSubmitting.set(true);
    setTimeout(() => {
      this.isModalSubmitting.set(false);
      this.isModalSubmitted.set(true);
    }, 1200);
  }

  protected resetModal() {
    this.isModalSubmitted.set(false);
    this.formData = { name: '', email: '', mobile: '', connectionType: '', message: '' };
  }

  @HostListener('document:keydown.escape')
  protected onEsc() { this.closeModal(); }
}
