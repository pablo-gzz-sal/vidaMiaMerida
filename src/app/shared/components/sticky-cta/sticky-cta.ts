import { Component, inject, signal, HostListener } from '@angular/core';
import { ReservationService } from '../../../core/services/reservation.service';
import { BusinessConfigService } from '../../../core/services/business-config.service';

@Component({
  selector: 'app-sticky-cta',
  standalone: true,
  template: `
    @if (visible()) {
      <div class="sticky-cta" role="complementary" aria-label="Reserva rápida">
        <button class="btn btn-cta" (click)="svc.open()" [attr.aria-label]="cfg.config().cta.reservationLabel + ' ahora'">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
               stroke-width="2" aria-hidden="true">
            <rect x="3" y="4" width="18" height="18" rx="2"/>
            <line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/>
            <line x1="3" y1="10" x2="21" y2="10"/>
          </svg>
          {{cfg.config().cta.reservationLabel}}
        </button>
      </div>
    }
  `,
  styles: [`
    .sticky-cta {
      position: fixed; bottom: var(--space-6); right: var(--space-4); z-index: 50;
      animation: slide-up 0.4s var(--ease-out-expo) both;
    }
    @keyframes slide-up {
      from { opacity: 0; transform: translateY(12px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    .btn-cta { gap: var(--space-2); box-shadow: var(--shadow-lg); }
  `],
})
export class StickyCTAComponent {
  readonly cfg = inject(BusinessConfigService);
  readonly svc = inject(ReservationService);
  readonly visible = signal(false);

  @HostListener('window:scroll')
  onScroll() { this.visible.set(window.scrollY > 500); }
}
