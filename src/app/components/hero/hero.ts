import { Component, signal, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { EmailService } from '../../services/email.service';

interface ContactForm {
  name: string;
  email: string;
  mobile: string;
  connectionType: string;
  message: string;
  eventDate: string;
  eventTime: string;
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
  protected modalError = signal<string | null>(null);

  protected formData: ContactForm = {
    name: '',
    email: '',
    mobile: '',
    connectionType: '',
    message: '',
    eventDate: '',
    eventTime: ''
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

  protected readonly scheduleRequiredTypes = ['coffee', 'vc', 'collab', 'talk', 'bd26'];
  protected readonly mobilePattern = /^\d{10}$/;

  constructor(private emailService: EmailService) {}

  protected needsSchedule(): boolean {
    return this.scheduleRequiredTypes.includes(this.formData.connectionType);
  }

  protected getScheduleLabel(): string {
    switch (this.formData.connectionType) {
      case 'talk':    return 'Talk / Event date';
      case 'bd26':    return 'Bharat Dreamin 2026 date';
      case 'coffee':  return 'Preferred meetup date';
      case 'vc':      return 'Preferred call date';
      case 'collab':  return 'Project kickoff date';
      default:        return 'Preferred date';
    }
  }

  protected getScheduleTimeLabel(): string {
    switch (this.formData.connectionType) {
      case 'talk':    return 'Talk / Event time';
      case 'bd26':    return 'Bharat Dreamin 2026 time';
      case 'coffee':  return 'Preferred meetup time';
      case 'vc':      return 'Preferred call time';
      case 'collab':  return 'Preferred discussion time';
      default:        return 'Preferred time';
    }
  }

  protected sanitizeMobileInput(value: string): string {
    return value.replace(/\D/g, '').slice(0, 10);
  }

  protected isMobileValid(): boolean {
    return this.mobilePattern.test(this.formData.mobile);
  }

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

  protected async submitModal(form: NgForm) {
    this.formData.mobile = this.sanitizeMobileInput(this.formData.mobile);

    if (form.invalid || !this.formData.connectionType || !this.isMobileValid() ||
        (this.needsSchedule() && (!this.formData.eventDate || !this.formData.eventTime))) {
      Object.keys(form.controls).forEach(k => form.controls[k].markAsTouched());
      return;
    }

    this.isModalSubmitting.set(true);
    this.modalError.set(null);

    try {
      const connectionLabel = this.connectionTypes.find(t => t.id === this.formData.connectionType)?.label
                              ?? this.formData.connectionType;

      await this.emailService.sendEmail({
        from_name:       this.formData.name,
        from_email:      this.formData.email,
        mobile:          this.formData.mobile,
        connection_type: connectionLabel,
        message:         this.formData.message,
        event_date:      this.formData.eventDate,
        event_time:      this.formData.eventTime,
        to_email:        'ittiku3@gmail.com'
      });

      this.isModalSubmitted.set(true);
    } catch (err) {
      console.error('EmailJS error (hero modal):', err);
      this.modalError.set('Something went wrong. Please try again or email me directly at ittiku3@gmail.com');
    } finally {
      this.isModalSubmitting.set(false);
    }
  }

  protected resetModal() {
    this.isModalSubmitted.set(false);
    this.modalError.set(null);
    this.formData = { name: '', email: '', mobile: '', connectionType: '', message: '', eventDate: '', eventTime: '' };
  }

  @HostListener('document:keydown.escape')
  protected onEsc() { this.closeModal(); }
}
