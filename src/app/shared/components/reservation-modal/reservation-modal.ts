import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReservationService, ReservationForm } from '../../../core/services/reservation.service';
import { BusinessConfigService } from '../../../core/services/business-config.service';

@Component({
  selector: 'app-reservation-modal',
  standalone: true,
  imports: [FormsModule],
  template: `
    @if (svc.state() !== 'idle') {
      <div class="overlay-backdrop" (click)="svc.close()" role="presentation"></div>
      <div class="modal-shell">
        <div class="modal" role="dialog" aria-modal="true" [attr.aria-label]="cfg.config().reservation.modalTitle">
          @if (svc.state() === 'open') {
            <div class="modal-header">
              <div>
                <span class="eyebrow">{{ cfg.config().uiCopy.reservationUi.eyebrow }}</span>
                <h2 class="text-h3">{{ cfg.config().reservation.modalTitle }}</h2>
                <p class="modal-copy">{{ cfg.config().reservation.modalDescription }}</p>
              </div>
              <button class="modal-close" type="button" (click)="svc.close()" [attr.aria-label]="cfg.config().uiCopy.reservationUi.closeAriaLabel">×</button>
            </div>

            <form class="reservation-form" (ngSubmit)="submit()" #f="ngForm">
              <div class="form-row">
                <div class="form-group">
                  <label class="label" for="res-name">{{ cfg.config().uiCopy.reservationUi.fields.nameLabel }}</label>
                  <input id="res-name" class="input" type="text" [(ngModel)]="form.name" name="name" [placeholder]="cfg.config().uiCopy.reservationUi.fields.namePlaceholder" required minlength="2">
                </div>
                <div class="form-group">
                  <label class="label" for="res-phone">{{ cfg.config().uiCopy.reservationUi.fields.phoneLabel }}</label>
                  <input id="res-phone" class="input" type="tel" [(ngModel)]="form.phone" name="phone" [placeholder]="cfg.config().uiCopy.reservationUi.fields.phonePlaceholder" required>
                </div>
              </div>
              <div class="form-row">
                <div class="form-group">
                  <label class="label" for="res-date">{{ cfg.config().uiCopy.reservationUi.fields.dateLabel }}</label>
                  <input id="res-date" class="input" type="date" [(ngModel)]="form.date" name="date" [min]="minDate" required>
                </div>
                <div class="form-group">
                  <label class="label" for="res-time">{{ cfg.config().uiCopy.reservationUi.fields.timeLabel }}</label>
                  <select id="res-time" class="input" [(ngModel)]="form.time" name="time" required>
                    @for (t of timeSlots; track t) {
                      <option [value]="t">{{ t }}</option>
                    }
                  </select>
                </div>
              </div>
              <div class="form-group">
                <label class="label" for="res-guests">{{ cfg.config().uiCopy.reservationUi.fields.guestsLabel }}</label>
                <select id="res-guests" class="input" [(ngModel)]="form.guests" name="guests" required>
                  @for (n of guestOptions; track n) {
                    <option [value]="n">{{ n }} {{ cfg.config().uiCopy.reservationUi.fields.guestsSuffix }}</option>
                  }
                </select>
              </div>
              <div class="form-group">
                <label class="label" for="res-notes">{{ cfg.config().uiCopy.reservationUi.fields.notesLabel }}</label>
                <textarea id="res-notes" class="input" [(ngModel)]="form.notes" name="notes" rows="3" [placeholder]="cfg.config().uiCopy.reservationUi.fields.notesPlaceholder"></textarea>
              </div>
              <div class="form-actions">
                <button type="button" class="btn btn-ghost btn-micro" (click)="svc.close()">{{ cfg.config().uiCopy.reservationUi.actions.cancelLabel }}</button>
                <button type="submit" class="btn btn-primary btn-micro" [disabled]="f.invalid">{{ cfg.config().uiCopy.reservationUi.actions.confirmLabel }}</button>
              </div>
            </form>
          }

          @if (svc.state() === 'success') {
            <div class="success-state">
              <div class="success-orb" aria-hidden="true">✓</div>
              <span class="eyebrow">{{ cfg.config().uiCopy.reservationUi.successEyebrow }}</span>
              <h2 class="text-h3">{{ cfg.config().reservation.successTitle }}</h2>
              <p>{{ cfg.config().reservation.successDescription }}</p>
              <div class="wa-preview">
                <p class="label">{{ cfg.config().reservation.previewLabel }}</p>
                <pre>{{ svc.preview() }}</pre>
              </div>
              <div class="success-actions">
                <button class="btn btn-primary btn-micro" (click)="openWhatsapp()">{{ cfg.config().reservation.openWhatsappLabel }}</button>
                <button class="btn btn-ghost btn-micro" (click)="svc.close()">{{ cfg.config().uiCopy.reservationUi.actions.closeLabel }}</button>
              </div>
            </div>
          }
        </div>
      </div>
    }
  `,
  styles: [`
    .overlay-backdrop {
      position: fixed; inset: 0; z-index: 90;
      background: rgba(30, 23, 18, 0.28);
      backdrop-filter: blur(8px);
      animation: modalFade .22s ease;
    }
    .modal-shell {
      position: fixed; inset: 0; z-index: 91;
      display: grid; place-items: center;
      padding: 1rem;
      pointer-events: none;
    }
    .modal {
      width: min(100%, 760px);
      max-height: min(88vh, 920px);
      overflow: auto;
      pointer-events: auto;
      padding: 1.35rem;
      border-radius: 1.75rem;
      background: rgba(255, 252, 248, 0.96);
      border: 1px solid rgba(92,64,51,.08);
      box-shadow: 0 30px 80px rgba(56, 38, 23, 0.18);
      animation: modalIn .34s cubic-bezier(0.16,1,0.3,1);
    }
    .modal-header {
      display: flex; align-items: start; justify-content: space-between;
      gap: 1rem; margin-bottom: 1.25rem;
    }
    .modal-copy {
      color: var(--color-text-muted);
      font-size: var(--text-sm);
      margin-top: .55rem;
      max-width: 40rem;
      line-height: 1.65;
    }
    .modal-close {
      width: 2.5rem; height: 2.5rem; border-radius: 999px;
      background: rgba(255,255,255,.82); border: 1px solid rgba(92,64,51,.08);
      color: var(--color-ink-900); font-size: 1.4rem; line-height: 1;
      transition: transform .18s ease, background .18s ease, box-shadow .18s ease;
    }
    .modal-close:hover { transform: rotate(90deg) scale(1.04); box-shadow: 0 10px 24px rgba(79,57,37,.08); }
    .reservation-form { display: flex; flex-direction: column; gap: 1rem; }
    .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
    @media (max-width: 640px) { .form-row { grid-template-columns: 1fr; } }
    .form-group { display: flex; flex-direction: column; }
    .label {
      font-size: .76rem; letter-spacing: .12em; text-transform: uppercase; font-weight: 700;
      color: var(--color-ink-500); margin-bottom: .45rem;
    }
    .input {
      min-height: 3.15rem; padding: .9rem 1rem;
      border-radius: 1rem; background: rgba(255,255,255,.74);
      border: 1px solid rgba(92,64,51,.08); outline: none;
      transition: border-color .18s ease, box-shadow .18s ease, transform .18s ease;
    }
    .input:focus {
      border-color: rgba(176,128,78,.38);
      box-shadow: 0 0 0 4px rgba(176,128,78,.10);
      transform: translateY(-1px);
    }
    textarea.input { resize: vertical; min-height: 6rem; }
    .form-actions { display: flex; gap: .75rem; justify-content: flex-end; padding-top: .35rem; }
    .success-state {
      display: flex; flex-direction: column; align-items: center; text-align: center;
      gap: .9rem; padding: .5rem;
      animation: riseIn .28s cubic-bezier(0.16,1,0.3,1);
    }
    .success-orb {
      width: 4rem; height: 4rem; display: grid; place-items: center; border-radius: 999px;
      background: linear-gradient(180deg, rgba(176,128,78,.18), rgba(176,128,78,.08));
      color: var(--color-brand-700); font-size: 1.6rem; font-weight: 700;
    }
    .success-state p { color: var(--color-text-muted); }
    .wa-preview {
      width: 100%; margin-top: .25rem; text-align: left;
      background: rgba(255,255,255,.8); border: 1px solid rgba(92,64,51,.08);
      border-radius: 1.2rem; padding: 1rem;
    }
    .wa-preview pre {
      font-size: var(--text-sm); white-space: pre-wrap; line-height: 1.65;
      color: var(--color-ink-700); margin-top: .45rem;
    }
    .success-actions { display:flex; gap:.75rem; flex-wrap:wrap; justify-content:center; }
    @keyframes modalFade { from { opacity: 0; } to { opacity: 1; } }
    @keyframes modalIn { from { opacity: 0; transform: translateY(18px) scale(.97); } to { opacity: 1; transform: translateY(0) scale(1); } }
    @keyframes riseIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
  `],
})
export class ReservationModalComponent {
  readonly svc = inject(ReservationService);
  readonly cfg = inject(BusinessConfigService);
  private readonly configSvc = this.cfg;
  readonly pressed = signal(false);

  form: ReservationForm = { name: '', phone: '', date: '', time: '13:00', guests: 2, notes: '' };

  readonly minDate = new Date().toISOString().split('T')[0];
  readonly timeSlots = ['13:00','14:00','15:00','19:00','20:00','20:30','21:00','21:30','22:00'];
  readonly guestOptions = [1,2,3,4,5,6,7,8,10,12];

  submit(): void {
    this.svc.submit(this.form, this.configSvc.reservation());
  }

  openWhatsapp(): void {
    const cfg = this.configSvc.reservation();
    const msg = encodeURIComponent(this.svc.preview());
    window.open(`https://wa.me/${cfg.whatsappNumber}?text=${msg}`, '_blank');
  }
}
