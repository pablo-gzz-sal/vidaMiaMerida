import { Component, inject, OnInit, ElementRef, viewChild } from '@angular/core';
import { BusinessConfigService } from '../../../../core/services/business-config.service';
import { ReservationService } from '../../../../core/services/reservation.service';
import { GsapService } from '../../../../core/animations/gsap.service';

@Component({
  selector: 'app-location',
  standalone: true,
  template: `
    <section class="section-pad location-section" id="ubicacion" aria-labelledby="location-heading">
      <div class="container location-shell">
        <div class="location-copy" #copy>
          <span class="eyebrow">{{ cfg.config().sectionCopy.location.eyebrow }}</span>
          <h2 class="text-h2" id="location-heading">{{ cfg.config().sectionCopy.location.heading }}</h2>
          <p class="location-lead">{{ cfg.config().location.address }}, {{ cfg.config().location.city }}, {{ cfg.config().location.state }}</p>

          <div class="location-card hours-card">
            <p class="card-kicker">{{ cfg.config().location.hoursTitle }}</p>
            <div class="hours-list">
              @for (row of cfg.config().location.hours; track row.day) {
                <div class="hours-row">
                  <span>{{ row.day }}</span>
                  <strong>{{ row.hours }}</strong>
                </div>
              }
            </div>
          </div>

          <div class="location-actions">
            <a class="btn btn-primary" [href]="cfg.config().location.googleMapsUrl" target="_blank" rel="noopener noreferrer">{{ cfg.config().location.openMapsLabel }}</a>
            <button class="btn btn-ghost" (click)="reservationSvc.open()">{{ cfg.cta().reservationLabel }}</button>
          </div>
        </div>

        <div class="location-visual" #visual>
          <div class="location-map-card">
            <img [src]="cfg.config().sectionCopy.images.locationMapImage" [alt]="cfg.config().location.mapImageAlt" width="800" height="600" loading="lazy" />
            <div class="location-badge">
              <span>📍</span>
              <div>
                <strong>{{ cfg.config().name }}</strong>
                <p>{{ cfg.config().location.city }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .location-section { background: linear-gradient(180deg, rgba(255,252,248,.96), rgba(250,247,241,.92)); }
    .location-shell { display:grid; grid-template-columns: 1fr 1fr; gap: 2rem; align-items:center; }
    .location-lead { margin-top:.8rem; color: var(--color-ink-700); max-width: 42rem; }
    .location-card {
      margin-top:1.25rem; padding:1.2rem; border-radius:1.35rem;
      background: rgba(255,255,255,.8); border:1px solid rgba(92,64,51,.08);
      box-shadow: 0 18px 40px rgba(79,57,37,.08);
    }
    .card-kicker { color: var(--color-ink-500); font-size:.8rem; text-transform:uppercase; letter-spacing:.12em; margin-bottom:.8rem; }
    .hours-list { display:grid; gap:.6rem; }
    .hours-row { display:flex; justify-content:space-between; gap:1rem; color: var(--color-ink-700); }
    .hours-row strong { color: var(--color-ink-900); }
    .location-actions { display:flex; flex-wrap:wrap; gap:.8rem; margin-top:1.25rem; }
    .location-map-card { position:relative; overflow:hidden; border-radius:1.8rem; box-shadow: 0 22px 54px rgba(79,57,37,.12); }
    .location-map-card img { width:100%; height:100%; min-height:24rem; object-fit:cover; display:block; }
    .location-badge {
      position:absolute; left:1rem; right:1rem; bottom:1rem;
      display:flex; align-items:center; gap:.8rem; padding:.9rem 1rem;
      border-radius:1rem; background: rgba(255,255,255,.78); backdrop-filter: blur(8px);
    }
    .location-badge p { margin:0; color: var(--color-ink-700); }
    @media (max-width: 900px) {
      .location-shell { grid-template-columns: 1fr; }
    }
  `],
})
export class LocationComponent implements OnInit {
  readonly cfg = inject(BusinessConfigService);
  readonly reservationSvc = inject(ReservationService);
  private readonly gsap = inject(GsapService);
  readonly copy = viewChild<ElementRef>('copy');
  readonly visual = viewChild<ElementRef>('visual');

  async ngOnInit(): Promise<void> {
    await new Promise(r => setTimeout(r, 100));
    const copy = this.copy()?.nativeElement;
    if (copy) await this.gsap.revealOnScroll(copy.querySelectorAll(':scope > *'), 0.08);
    const visual = this.visual()?.nativeElement;
    if (visual) await this.gsap.imageReveal(visual);
  }
}
