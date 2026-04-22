import { Component, inject, OnInit, ElementRef, viewChild } from '@angular/core';
import { BusinessConfigService } from '../../../../core/services/business-config.service';
import { ReservationService } from '../../../../core/services/reservation.service';
import { GsapService } from '../../../../core/animations/gsap.service';

@Component({
  selector: 'app-promotions',
  standalone: true,
  template: `
    <section class="section-pad promotions-section" id="promociones" aria-labelledby="promotions-heading">
      <div class="container">
        <div class="section-header promotions-header" #hdr>
          <span class="eyebrow">{{ cfg.config().sectionCopy.promotions.eyebrow }}</span>
          <h2 class="text-h2" id="promotions-heading">{{ cfg.config().sectionCopy.promotions.heading }}</h2>
          <p class="text-lead section-subtitle">{{ cfg.config().sectionCopy.promotions.eyebrow }}</p>
        </div>

        <div class="promotions-grid" #grid>
          @for (promo of cfg.promotions(); track promo.id) {
            <article class="promo-card micro-lift" tabindex="0">
              <p class="promo-kicker">{{ promo.badge || 'Promoción' }}</p>
              <h3 class="promo-title">{{ promo.title }}</h3>
              <p class="promo-desc">{{ promo.description }}</p>
              <button class="promo-link" (click)="reservationSvc.open()">{{ cfg.cta().reservationLabel }}</button>
            </article>
          }
        </div>
      </div>
    </section>
  `,
  styles: [`
    .promotions-section { background: linear-gradient(180deg, rgba(255,252,248,.95), rgba(250,247,241,.9)); }
    .promotions-header { text-align:left; max-width: 46rem; margin-bottom: 1.8rem; }
    .section-subtitle { margin-top:.7rem; color: var(--color-ink-700); }
    .promotions-grid { display:grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; }
    .promo-card {
      padding: 1.25rem; border-radius: 1.45rem;
      background: rgba(255,255,255,.82); border:1px solid rgba(92,64,51,.08);
      box-shadow: 0 16px 40px rgba(79,57,37,.07);
      transition: transform .24s ease, box-shadow .24s ease, border-color .24s ease;
    }
    .promo-kicker { font-size:.76rem; letter-spacing:.14em; text-transform:uppercase; color: var(--color-ink-500); }
    .promo-title { margin-top:.55rem; font-family: var(--font-display); font-size: 1.55rem; line-height:1.04; color: var(--color-ink-900); }
    .promo-desc { margin-top:.7rem; color: var(--color-ink-700); line-height:1.65; }
    .promo-link { margin-top:1rem; color: var(--color-brand-700); font-weight:700; }
    @media (max-width: 900px) { .promotions-grid { grid-template-columns: 1fr; } .promotions-header { text-align:center; } }
  `],
})
export class PromotionsComponent implements OnInit {
  readonly cfg = inject(BusinessConfigService);
  readonly reservationSvc = inject(ReservationService);
  private readonly gsap = inject(GsapService);
  readonly hdr = viewChild<ElementRef>('hdr');
  readonly grid = viewChild<ElementRef>('grid');

  async ngOnInit(): Promise<void> {
    await new Promise(r => setTimeout(r, 120));
    const hdr = this.hdr()?.nativeElement;
    if (hdr) await this.gsap.revealOnScroll(hdr.querySelectorAll(':scope > *'), 0.06);
    const grid = this.grid()?.nativeElement;
    if (grid) await this.gsap.revealOnScroll(grid.querySelectorAll('.promo-card'), 0.08);
  }
}
