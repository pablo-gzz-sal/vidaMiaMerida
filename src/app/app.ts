import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from './shared/components/nav/nav';
import { FooterComponent } from './shared/components/footer/footer';
import { ReservationModalComponent } from './shared/components/reservation-modal/reservation-modal';
import { WhatsappButtonComponent } from './shared/components/whatsapp-button/whatsapp-button';
import { BusinessConfigService } from './core/services/business-config.service';
import { StickyCTAComponent } from './shared/components/sticky-cta/sticky-cta';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NavComponent,
    FooterComponent,
    ReservationModalComponent,
    WhatsappButtonComponent,
    StickyCTAComponent,
  ],
  template: `
    <a href="#main-content" class="sr-only skip-link">{{ cfg.config().uiCopy.accessibility.skipToContentLabel }}</a>
    <app-nav />
    <router-outlet />
    <app-footer />
    <!-- Global overlays -->
    <app-reservation-modal />
    <app-whatsapp-button />
    <app-sticky-cta />
  `,
  styles: [`
    .skip-link:focus {
      position: fixed; top: var(--space-4); left: var(--space-4); z-index: 9999;
      background: var(--color-primary); color: var(--color-text-inverse);
      padding: var(--space-3) var(--space-6); border-radius: var(--radius-md);
      font-size: var(--text-sm); text-decoration: none;
    }
  `],
})
export class AppComponent {
  readonly cfg = inject(BusinessConfigService);
}
