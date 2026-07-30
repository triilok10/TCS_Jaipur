import { Component, signal, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterModule } from '@angular/router';

interface TerminalLine {
  text: string;
  type: 'input' | 'output' | 'error' | 'success';
}

interface TalkEvent {
  date: string;
  title: string;
  description: string;
  category: 'talk' | 'community' | 'milestone';
  icon: string;
}

@Component({
  selector: 'app-connect',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './connect.html',
  styleUrl: './connect.css'
})
export class Connect implements AfterViewChecked {
  @ViewChild('terminalBody') private terminalBody!: ElementRef;
  @ViewChild('contactForm') private contactForm!: NgForm;

  protected readonly email = 'ittiku3@gmail.com';
  
  // Contact Form Model
  protected formData = {
    name: '',
    email: '',
    subject: 'general',
    message: '',
    eventDate: '',
    eventTime: ''
  };

  protected readonly scheduleRequiredTypes = ['coffee', 'call', 'talk', 'opportunity'];

  protected isFormSubmitting = signal(false);
  protected isFormSubmitted = signal(false);

  protected needsEventSchedule(): boolean {
    return this.scheduleRequiredTypes.includes(this.formData.subject);
  }

  protected getScheduleLabel(): string {
    switch (this.formData.subject) {
      case 'talk':
        return 'Talk / Event date';
      case 'opportunity':
        return 'Project kickoff date';
      case 'coffee':
        return 'Preferred meetup date';
      case 'call':
        return 'Preferred call date';
      default:
        return 'Preferred date';
    }
  }

  protected getScheduleTimeLabel(): string {
    switch (this.formData.subject) {
      case 'talk':
        return 'Talk / Event time';
      case 'opportunity':
        return 'Preferred time for the project discussion';
      case 'coffee':
        return 'Preferred time for coffee';
      case 'call':
        return 'Preferred call time';
      default:
        return 'Preferred time';
    }
  }

  // Talks & Milestones Timeline Dataset
  protected readonly timelineEvents: TalkEvent[] = [
    {
      date: 'June 2026',
      title: 'Delivered Technical Talk on Clean Architecture',
      description: 'Presented a session on "Building Robust Enterprise Web Applications with .NET Core & Angular" at a local developers meetup in Jaipur, showcasing secure role-based workflows.',
      category: 'talk',
      icon: '🎙️'
    },
    {
      date: 'March 2026',
      title: 'Appointed as Brand Ambassador for Bharat Dreamin\' 2026',
      description: 'Excited to represent India\'s builders, dreamers, and Salesforce community change-makers. Spreading the word about collaboration and trust-oriented software engineering.',
      category: 'community',
      icon: '🇮🇳'
    },
    {
      date: 'December 2025',
      title: 'Migrated Core Enterprise Billing to Docker & Azure',
      description: 'Successfully refactored a legacy server-side application to a containerized microservice setup. Configured role-based audit logs and CI/CD automated test runs.',
      category: 'milestone',
      icon: '⚙️'
    },
    {
      date: 'August 2025',
      title: 'Mentored Developer Cohort & Cloud Certification Prep',
      description: 'Shared happiness by mentoring 5 junior developers on Full Stack practices, database optimizations in SQL Server, and cloud deployment pipelines.',
      category: 'community',
      icon: '🤝'
    }
  ];

  // Shell Terminal Model
  protected terminalInput = '';
  protected terminalLines = signal<TerminalLine[]>([
    { text: 'echo #TCSJaipur', type: 'input' },
    { text: 'TCS Jaipur — Trilok Chand Swami', type: 'success' },
    { text: 'Jaipur, Rajasthan', type: 'output' },
    { text: 'Connect', type: 'output' }
  ]);

  protected readonly quickCommands = ['help', 'stack', 'secret', 'contact'];

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  protected submitContactForm(form: NgForm) {
    if (form.invalid || (this.needsEventSchedule() && (!this.formData.eventDate || !this.formData.eventTime))) {
      Object.keys(form.controls).forEach(key => {
        form.controls[key].markAsTouched();
      });
      return;
    }

    this.isFormSubmitting.set(true);

    // Simulate sending data to API
    console.log('Sending message data to API:', this.formData);
    
    setTimeout(() => {
      this.isFormSubmitting.set(false);
      this.isFormSubmitted.set(true);
      
      // Print notification in the terminal too!
      this.terminalLines.update(lines => [
        ...lines,
        { text: `System: Incoming message from ${this.formData.name} processed successfully!`, type: 'success' }
      ]);
    }, 1200);
  }

  protected resetContactForm() {
    if (this.contactForm) {
      this.contactForm.resetForm();
    }
    this.formData = {
      name: '',
      email: '',
      subject: 'general',
      message: '',
      eventDate: '',
      eventTime: ''
    };
    this.isFormSubmitted.set(false);
  }

  // Terminal commands interpreter
  protected handleTerminalSubmit(event?: Event) {
    if (event) event.preventDefault();
    const command = this.terminalInput.trim();
    if (!command) return;

    this.executeCommand(command);
    this.terminalInput = '';
  }

  protected runQuickCommand(cmd: string) {
    this.executeCommand(cmd);
  }

  private executeCommand(cmd: string) {
    this.terminalLines.update(lines => [...lines, { text: cmd, type: 'input' }]);

    const lowerCmd = cmd.toLowerCase().trim();
    const cmdParts = lowerCmd.split(' ');
    const mainCmd = cmdParts[0];

    switch (mainCmd) {
      case 'help':
        this.printOutput([
          'Available commands:',
          '  whoami   - Display bio summary',
          '  stack    - View core stack details',
          '  contact  - View contact details',
          '  secret   - Read a local trivia fact',
          '  clear    - Flush output logs',
          '  echo     - Echo back input text'
        ]);
        break;

      case 'whoami':
        this.printOutput([
          'Trilok Chand Swami (TCS) — Full Stack Engineer based in Jaipur, IN.',
          'Specializes in clean architectures, secure integrations, and DevOps pipelines.'
        ]);
        break;

      case 'stack':
        this.printOutput([
          'Stack Specs:',
          '  • Core:       .NET Core, C#, Angular, SQL Server',
          '  • DevOps:     Docker, Azure Cloud, CI/CD'
        ]);
        break;

      case 'contact':
        this.printOutput([
          `Email:      ${this.email}`,
          'Location:   Jaipur, Rajasthan, IN'
        ]);
        break;

      case 'secret':
        this.printOutput([
          '🌸 Jaipur Fact:',
          'Maharaja Ram Singh painted the city pink to welcome Prince Albert in 1876.',
          'Pink represents hospitality.'
        ]);
        break;

      case 'clear':
        this.terminalLines.set([]);
        break;

      case 'echo':
        const echoText = cmd.substring(5).trim();
        this.printOutput([echoText || '(nothing to echo)']);
        break;

      default:
        this.terminalLines.update(lines => [
          ...lines,
          { text: `bash: command not found: ${mainCmd}. Type 'help' for options.`, type: 'error' }
        ]);
    }
  }

  private printOutput(outputs: string[]) {
    this.terminalLines.update(lines => [
      ...lines,
      ...outputs.map(text => ({ text, type: 'output' as const }))
    ]);
  }

  private scrollToBottom() {
    try {
      this.terminalBody.nativeElement.scrollTop = this.terminalBody.nativeElement.scrollHeight;
    } catch (err) {}
  }
}
