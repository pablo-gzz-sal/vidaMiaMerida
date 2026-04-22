import { Component, inject, OnInit, ElementRef, viewChildren, viewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BusinessConfigService } from '../../../../core/services/business-config.service';
import { GsapService } from '../../../../core/animations/gsap.service';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [RouterLink],
  template: `
    <section class="hero" [attr.aria-label]="'Hero — ' + cfg.config().name">
      <div class="hero-media" #bg [style.background-image]="'url(' + cfg.config().sectionCopy.images.heroBackground + ')'">
        <div class="hero-overlay"></div>
      </div>

      <div class="container hero-shell">
        <div class="hero-copy" #el>
          <span class="eyebrow">{{ cfg.hero().locationLabel }}</span>
          <h1 class="hero-title">
            {{ headlineLine1 }}<br />
            <em>{{ headlineLine2 }}</em>
          </h1>
          <p class="hero-subtitle">{{ cfg.hero().subheadline }}</p>

          <div class="hero-actions">
            <a routerLink="/menu" class="btn btn-primary">{{ cfg.hero().ctaLabel }}</a>
            <a [href]="cfg.config().location.googleMapsUrl" target="_blank" rel="noopener noreferrer" class="btn btn-ghost">
              {{ cfg.hero().ctaSecondaryLabel }}
            </a>
          </div>

          <div class="hero-meta">
            <div class="hero-pill">Café + desayuno</div>
            <div class="hero-pill">Mérida</div>
            <div class="hero-pill">Mañanas 7:30 am</div>
          </div>
        </div>

        <div class="hero-spotlight" #el>
          <div class="spotlight-card">
            <p class="spotlight-kicker">Lo más buscado</p>
            <h2 class="spotlight-title">Desayuno & brunch todos los días</h2>
            <p class="spotlight-text">
              Diseñado para convertir visitas móviles en una decisión rápida: ver menú, validar horario y abrir mapa.
            </p>
          </div>
        </div>
      </div>

      <button class="hero-scroll-cue" (click)="scrollToConcept()" [attr.aria-label]="cfg.hero().scrollCueLabel">
        <span>{{ cfg.hero().scrollCueLabel }}</span>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
          <path d="M12 5v14M19 12l-7 7-7-7"/>
        </svg>
      </button>
    </section>
  `,
  styles: [`
    :host { display:block; }
    .hero {
      position: relative;
      min-height: 100svh;
      display: grid;
      align-items: end;
      overflow: clip;
      background: linear-gradient(180deg, rgba(250,247,241,0.35), rgba(250,247,241,0.96));
    }
    .hero-media {
      position: absolute;
      inset: 0;
      background-size: cover;
      background-position: center;
      transform: scale(1.02);
    }
    .hero-overlay {
      position:absolute;
      inset:0;
      background:
        linear-gradient(180deg, rgba(255,255,255,.10) 0%, rgba(250,247,241,.52) 45%, rgba(250,247,241,.96) 100%),
        linear-gradient(90deg, rgba(255,255,255,.56) 0%, rgba(255,255,255,.10) 100%);
    }
    .hero-shell {
      position: relative;
      z-index: 1;
      display: grid;
      grid-template-columns: minmax(0, 1.2fr) minmax(280px, .8fr);
      gap: 2rem;
      align-items: end;
      padding-top: 8rem;
      padding-bottom: 5rem;
    }
    .hero-copy {
      max-width: 46rem;
      padding: 2rem;
      border-radius: 2rem;
      backdrop-filter: blur(10px);
      background: rgba(255,255,255,.62);
      border: 1px solid rgba(92,64,51,.08);
      box-shadow: 0 18px 60px rgba(79,57,37,.10);
    }
    .hero-title {
      font-size: clamp(3rem, 7vw, 6rem);
      line-height: .95;
      letter-spacing: -0.03em;
      color: var(--color-ink-900);
      margin-top: .5rem;
    }
    .hero-title em {
      font-style: italic;
      color: var(--color-brand-700);
      font-weight: 500;
    }
    .hero-subtitle {
      max-width: 40rem;
      margin-top: 1rem;
      font-size: clamp(1rem, 1.8vw, 1.2rem);
      color: var(--color-ink-700);
    }
    .hero-actions {
      display:flex;
      flex-wrap:wrap;
      gap:.75rem;
      margin-top: 1.5rem;
    }
    .hero-meta {
      display:flex;
      flex-wrap:wrap;
      gap:.6rem;
      margin-top: 1.25rem;
    }
    .hero-pill {
      padding: .62rem .9rem;
      border-radius: 999px;
      background: rgba(255,255,255,.82);
      border: 1px solid rgba(92,64,51,.08);
      color: var(--color-ink-700);
      font-size: .88rem;
      font-weight: 600;
    }
    .hero-spotlight {
      display:flex;
      justify-content:flex-end;
    }
    .spotlight-card {
      max-width: 22rem;
      padding: 1.25rem;
      border-radius: 1.5rem;
      background: rgba(255,250,245,.92);
      box-shadow: 0 18px 48px rgba(79,57,37,.12);
      border: 1px solid rgba(92,64,51,.08);
    }
    .spotlight-kicker {
      font-size:.78rem;
      text-transform:uppercase;
      letter-spacing:.14em;
      color: var(--color-ink-500);
    }
    .spotlight-title {
      margin-top:.45rem;
      font-size:1.35rem;
      line-height:1.08;
      color: var(--color-ink-900);
    }
    .spotlight-text {
      margin-top:.75rem;
      color: var(--color-ink-700);
      font-size:.95rem;
    }
    .hero-scroll-cue {
      position:absolute;
      left:50%;
      bottom:1.2rem;
      transform:translateX(-50%);
      z-index:2;
      display:flex;
      align-items:center;
      gap:.5rem;
      padding:.65rem .9rem;
      border-radius:999px;
      background: rgba(255,255,255,.72);
      border:1px solid rgba(92,64,51,.08);
      color: var(--color-ink-700);
      backdrop-filter: blur(8px);
    }
    @media (max-width: 900px) {
      .hero-shell {
        grid-template-columns: 1fr;
        padding-top: 7rem;
      }
      .hero-copy {
        padding: 1.4rem;
        border-radius: 1.5rem;
      }
      .hero-title {
        font-size: clamp(2.7rem, 12vw, 4.4rem);
      }
      .hero-spotlight {
        justify-content: stretch;
      }
      .spotlight-card {
        max-width: none;
      }
    }
  `]
})
export class HeroComponent implements OnInit {
  readonly cfg = inject(BusinessConfigService);
  private readonly gsap = inject(GsapService);
  readonly els = viewChildren<ElementRef<HTMLElement>>('el');
  readonly bg = viewChild<ElementRef<HTMLElement>>('bg');

  get headlineLine1() { return this.cfg.hero().headline.split('\n')[0] ?? this.cfg.hero().headline; }
  get headlineLine2() { return this.cfg.hero().headline.split('\n')[1] ?? ''; }

  async ngOnInit(): Promise<void> {
    const items = this.els().map(ref => ref.nativeElement);
    await this.gsap.heroEntrance(items);

    const bg = this.bg()?.nativeElement;
    if (bg) {
      await this.gsap.parallax(bg, 8);
    }
  }

  scrollToConcept(): void {
    document.getElementById('concepto')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
