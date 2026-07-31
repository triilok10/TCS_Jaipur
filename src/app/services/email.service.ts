import { Injectable } from '@angular/core';
import emailjs from '@emailjs/browser';
import { environment } from '../../environments/environment';

export interface EmailPayload {
  from_name: string;
  from_email: string;
  mobile?: string;
  connection_type?: string;
  subject?: string;
  message: string;
  event_date?: string;
  event_time?: string;
  to_email: string;
}

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  private readonly serviceId = environment.emailjs.serviceId;
  private readonly templateId = environment.emailjs.templateId;
  private readonly publicKey = environment.emailjs.publicKey;

  constructor() {
    emailjs.init(this.publicKey);
  }

  async sendEmail(payload: EmailPayload): Promise<void> {
    const templateParams: Record<string, string> = {
      from_name:       payload.from_name,
      from_email:      payload.from_email,
      to_email:        payload.to_email,
      message:         payload.message,
      mobile:          payload.mobile        ?? '—',
      connection_type: payload.connection_type ?? '—',
      subject:         payload.subject        ?? 'General',
      event_date:      payload.event_date      ?? '—',
      event_time:      payload.event_time      ?? '—',
    };

    const result = await emailjs.send(this.serviceId, this.templateId, templateParams);
    if (result.status !== 200) {
      throw new Error(`EmailJS error: ${result.text}`);
    }
  }
}
