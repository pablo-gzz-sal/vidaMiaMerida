import { Component, inject } from '@angular/core';
import { BusinessConfigService } from '../../core/services/business-config.service';
import { ReservationService } from '../../core/services/reservation.service';

@Component({
  selector: 'app-contact-page',
  standalone: true,
  template: `
    <section class="section-pad contact-page">
      <div class="container contact-shell">
        <div class="contact-intro">
          <span class="eyebrow">{{ cfg.config().sectionCopy.contactPage.eyebrow }}</span>
          <h1 class="text-h1">{{ cfg.config().sectionCopy.contactPage.heading }}</h1>
          <p class="contact-lead">Resuelve en una sola vista lo que más importa: contacto, menú y cómo llegar.</p>
        </div>

        <div class="contact-grid">
          <a class="contact-card" [href]="'https://wa.me/' + cfg.config().whatsapp.number + '?text=' + encodedMessage" target="_blank" rel="noopener noreferrer">
            <p class="contact-card-title">{{ cfg.config().sectionCopy.contactPage.whatsappTitle }}</p>
            <p class="contact-card-desc">{{ cfg.config().location.phone }}</p>
          </a>

          <button class="contact-card" (click)="reservationSvc.open()">
            <p class="contact-card-title">{{ cfg.config().sectionCopy.contactPage.reservationTitle }}</p>
            <p class="contact-card-desc">{{ cfg.config().sectionCopy.contactPage.reservationDescription }}</p>
          </button>

          <a class="contact-card" [href]="cfg.config().location.googleMapsUrl" target="_blank" rel="noopener noreferrer">
            <p class="contact-card-title">Ubicación</p>
            <p class="contact-card-desc">{{ cfg.config().location.address }}</p>
          </a>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .contact-page { background: linear-gradient(180deg, rgba(250,247,241,.74), rgba(255,252,248,.95)); }
    .contact-shell { display:grid; gap: 1.5rem; }
    .contact-intro { max-width: 42rem; }
    .contact-lead { margin-top:.8rem; color: var(--color-ink-700); }
    .contact-grid { display:grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; }
    .contact-card {
      text-align:left; padding:1.2rem; border-radius:1.35rem;
      background: rgba(255,255,255,.8); border:1px solid rgba(92,64,51,.08);
      box-shadow: 0 16px 40px rgba(79,57,37,.08);
      transition: transform .24s ease, box-shadow .24s ease;
    }
    .contact-card:hover { transform: translateY(-3px); box-shadow: 0 22px 48px rgba(79,57,37,.1); }
    .contact-card-title { font-family: var(--font-display); font-size: 1.35rem; color: var(--color-ink-900); }
    .contact-card-desc { margin-top:.5rem; color: var(--color-ink-700); }
    @media (max-width: 900px) {
      .contact-grid { grid-template-columns: 1fr; }
    }
  `],
})
export class ContactPageComponent {
  readonly cfg = inject(BusinessConfigService);
  readonly reservationSvc = inject(ReservationService);
  get encodedMessage(): string { return encodeURIComponent(this.cfg.config().whatsapp.defaultMessage); }
}
