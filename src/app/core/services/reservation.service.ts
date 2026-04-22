import { Injectable, signal } from '@angular/core';
import { BusinessConfigService } from './business-config.service';

export interface ReservationForm {
  name: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  notes: string;
}

export type ReservationState = 'idle' | 'open' | 'success';

@Injectable({ providedIn: 'root' })
export class ReservationService {
  private readonly configSvc = new BusinessConfigService();
  readonly state   = signal<ReservationState>('idle');
  readonly preview = signal<string>('');

  open()  { this.state.set('open'); }
  close() { this.state.set('idle'); this.preview.set(''); }

  buildWhatsappMessage(form: ReservationForm, template: string): string {
    return template
      .replace('{{name}}',   form.name)
      .replace('{{date}}',   form.date)
      .replace('{{time}}',   form.time)
      .replace('{{guests}}', String(form.guests));
  }

  /** In mock mode: show success; in live mode: open WhatsApp deep-link */
  submit(form: ReservationForm, config = this.configSvc.reservation()): void {
    const msg = this.buildWhatsappMessage(form, config.messageTemplate);
    this.preview.set(msg);

    if (config.mode === 'mock') {
      this.state.set('success');
      return;
    }
    // Live: open WhatsApp deep link
    const encoded = encodeURIComponent(msg);
    window.open(`https://wa.me/${config.whatsappNumber}?text=${encoded}`, '_blank');
    this.state.set('success');
  }
}
