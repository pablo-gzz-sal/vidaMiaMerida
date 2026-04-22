import { Component, inject, OnInit, ElementRef, viewChild } from '@angular/core';
import { BusinessConfigService } from '../../../../core/services/business-config.service';
import { GsapService } from '../../../../core/animations/gsap.service';

@Component({
  selector: 'app-testimonials',
  standalone: true,
  template: `
    <section class="section-pad testimonials-section" id="testimonios" aria-labelledby="testimonials-heading">
      <div class="container">
        <div class="section-header testimonials-header" #hdr>
          <span class="eyebrow">{{ cfg.config().sectionCopy.testimonials.eyebrow }}</span>
          <h2 class="text-h2" id="testimonials-heading">{{ cfg.config().sectionCopy.testimonials.heading }}</h2>
        </div>

        <div class="testimonials-grid" #grid>
          @for (item of cfg.testimonials(); track item.name) {
            <article class="testimonial-card micro-tilt" tabindex="0">
              <p class="testimonial-quote">“{{ item.text }}”</p>
              <div class="testimonial-meta">
                <strong>{{ item.name }}</strong>
                <span>{{ item.source }}</span>
              </div>
            </article>
          }
        </div>
      </div>
    </section>
  `,
  styles: [`
    .testimonials-section { background: linear-gradient(180deg, rgba(250,247,241,.72), rgba(255,252,248,.96)); }
    .testimonials-header { text-align:left; margin-bottom: 1.5rem; }
    .testimonials-grid { display:grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; }
    .testimonial-card {
      padding: 1.3rem; border-radius: 1.45rem;
      background: rgba(255,255,255,.82); border:1px solid rgba(92,64,51,.08);
      box-shadow: 0 16px 40px rgba(79,57,37,.07);
    }
    .testimonial-quote { color: var(--color-ink-900); font-size: 1.02rem; line-height:1.75; }
    .testimonial-meta { margin-top: 1rem; display:grid; gap:.2rem; color: var(--color-ink-700); }
    .testimonial-meta span { color: var(--color-ink-500); font-size:.88rem; }
    @media (max-width: 900px) { .testimonials-grid { grid-template-columns: 1fr; } .testimonials-header { text-align:center; } }
  `],
})
export class TestimonialsComponent implements OnInit {
  readonly cfg = inject(BusinessConfigService);
  private readonly gsap = inject(GsapService);
  readonly hdr = viewChild<ElementRef>('hdr');
  readonly grid = viewChild<ElementRef>('grid');

  async ngOnInit(): Promise<void> {
    await new Promise(r => setTimeout(r, 120));
    const hdr = this.hdr()?.nativeElement;
    if (hdr) await this.gsap.revealOnScroll(hdr.querySelectorAll(':scope > *'), 0.06);
    const grid = this.grid()?.nativeElement;
    if (grid) await this.gsap.revealOnScroll(grid.querySelectorAll('.testimonial-card'), 0.08);
  }
}
