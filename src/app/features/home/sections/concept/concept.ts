import { Component, OnInit, ElementRef, inject, viewChild } from '@angular/core';
import { GsapService } from '../../../../core/animations/gsap.service';
import { BusinessConfigService } from '../../../../core/services/business-config.service';

@Component({
  selector: 'app-concept',
  standalone: true,
  template: `
    <section class="section-pad" id="nosotros" aria-labelledby="concept-heading">
      <div class="container">
        <div class="concept-grid">
          <div class="concept-image-wrap" #imgWrap>
            <img
              [src]="cfg.config().sectionCopy.images.conceptImage"
              [alt]="cfg.config().sectionCopy.images.conceptImageAlt"
              width="800" height="1000" loading="lazy"
              class="concept-image"
            />
            <div class="concept-badge">
              <span class="concept-badge-number">2018</span>
              <span class="concept-badge-label">{{cfg.config().sectionCopy.concept.foundedLabel}}</span>
            </div>
          </div>
          <div class="concept-text" #textBlock>
            <span class="eyebrow">{{cfg.config().sectionCopy.concept.eyebrow}}</span>
            <h2 class="text-h2" id="concept-heading">{{cfg.config().sectionCopy.concept.heading}}</h2>
            <span class="rule-brand"></span>
            <p class="text-lead" style="color:var(--color-text-muted)">
              {{cfg.config().sectionCopy.concept.lead}}
            </p>
            <p style="color:var(--color-text-muted);font-size:var(--text-base);margin-top:var(--space-4);line-height:1.8">
              {{cfg.config().sectionCopy.concept.body}}
            </p>
            <div class="concept-stats">
              <div class="stat">
                <span class="stat-num">40+</span>
                <span class="stat-label">Productores locales</span>
              </div>
              <div class="stat">
                <span class="stat-num">8</span>
                <span class="stat-label">Años de experiencia</span>
              </div>
              <div class="stat">
                <span class="stat-num">100%</span>
                <span class="stat-label">Ingredientes Yucatán</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .concept-grid {
      display: grid; grid-template-columns: 1fr;
      gap: var(--space-12); align-items: center;
    }
    @media (min-width: 768px) { .concept-grid { grid-template-columns: 1fr 1fr; } }
    .concept-image-wrap { position: relative; }
    .concept-image {
      width: 100%; border-radius: var(--radius-xl);
      object-fit: cover; aspect-ratio: 4/5;
    }
    .concept-badge {
      position: absolute; bottom: var(--space-6); left: calc(-1 * var(--space-6));
      background: var(--color-surface);
      border: 1px solid var(--color-border);
      border-radius: var(--radius-xl);
      padding: var(--space-4) var(--space-6);
      display: flex; flex-direction: column;
      box-shadow: var(--shadow-lg);
    }
    @media (max-width: 768px) { .concept-badge { left: var(--space-4); } }
    .concept-badge-number {
      font-family: var(--font-display); font-size: var(--text-2xl);
      color: var(--color-primary); line-height: 1;
    }
    .concept-badge-label {
      font-size: var(--text-xs); letter-spacing: 0.1em;
      text-transform: uppercase; color: var(--color-text-muted);
      margin-top: var(--space-1);
    }
    .concept-text { display: flex; flex-direction: column; gap: var(--space-4); }
    .concept-stats {
      display: flex; gap: var(--space-8);
      padding-top: var(--space-6);
      border-top: 1px solid var(--color-divider);
      margin-top: var(--space-4);
    }
    .stat { display: flex; flex-direction: column; gap: var(--space-1); }
    .stat-num {
      font-family: var(--font-display); font-size: var(--text-xl);
      color: var(--color-primary); font-weight: 600;
    }
    .stat-label { font-size: var(--text-xs); color: var(--color-text-muted); text-transform: uppercase; letter-spacing: 0.08em; }
  `],
})
export class ConceptComponent implements OnInit {
  readonly cfg = inject(BusinessConfigService);
  private readonly gsap = inject(GsapService);
  readonly imgWrap  = viewChild<ElementRef>('imgWrap');
  readonly textBlock = viewChild<ElementRef>('textBlock');

  async ngOnInit() {
    await new Promise(r => setTimeout(r, 100));
    const img = this.imgWrap()?.nativeElement;
    const txt = this.textBlock()?.nativeElement;
    if (img) await this.gsap.imageReveal(img);
    if (txt) await this.gsap.revealOnScroll(txt.querySelectorAll(':scope > *'), 0.06);
  }
}
