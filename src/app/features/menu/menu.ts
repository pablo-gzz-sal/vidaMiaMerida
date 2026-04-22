import { Component, inject, signal, computed } from '@angular/core';
import { BusinessConfigService } from '../../core/services/business-config.service';
import { ReservationService } from '../../core/services/reservation.service';
import { MenuHighlightsComponent } from '../home/sections/menu-highlights/menu-highlights';

@Component({
  selector: 'app-menu-page',
  standalone: true,
  imports: [],
  template: `
    <main id="main-content" class="menu-page">
      <!-- Page hero -->
      <div class="menu-hero">
        <div class="menu-hero-bg" [style.background-image]="'url(' + cfg.config().sectionCopy.images.menuPageHeroImage + ' )'"></div>
        <div class="menu-hero-overlay"></div>
        <div class="container menu-hero-content">
          <span class="eyebrow">{{cfg.config().sectionCopy.menuPage.eyebrow}}</span>
          <h1 class="text-h1">{{cfg.config().sectionCopy.menuPage.heading}}</h1>
          <p class="text-lead" style="color:var(--color-text-muted);max-width:50ch">
            {{cfg.config().sectionCopy.menuPage.lead}}
          </p>
        </div>
      </div>

      <div class="container menu-body section-pad">
        <!-- Category nav -->
        <nav class="menu-cat-nav" [attr.aria-label]="cfg.config().uiCopy.menuPageUi.categoryNavAriaLabel">
          @for (cat of cfg.categories(); track cat.id) {
            <button class="cat-anchor" [class.active]="activeSection() === cat.id"
              (click)="scrollTo(cat.id)">
              {{cat.emoji}} {{cat.name}}
            </button>
          }
        </nav>

        <!-- Sections -->
        @for (cat of cfg.categories(); track cat.id) {
          <section [id]="cat.id" class="menu-section">
            <div class="menu-section-header">
              <h2 class="text-h3">{{cat.name}}</h2>
              <p style="color:var(--color-text-muted);font-size:var(--text-sm)">{{cat.description}}</p>
            </div>
            <div class="menu-items-list">
              @for (item of itemsByCategory(cat.id); track item.id) {
                <article class="menu-list-item">
                  <div class="mli-info">
                    <div class="mli-header">
                      <h3 class="mli-name">{{item.name}}</h3>
                      @if (item.tag) {
                        <span class="badge mli-tag" [attr.data-tag]="item.tag">
                          {{tagLabel(item.tag)}}
                        </span>
                      }
                    </div>
                    <p class="mli-desc">{{item.description}}</p>
                  </div>
                  <span class="mli-price">{{item.price}}</span>
                </article>
              }
            </div>
          </section>
        }

        <!-- Reservation CTA -->
        <div class="menu-final-cta">
          <span class="rule-brand" style="margin-inline:auto"></span>
          <h2 class="text-h2" style="text-align:center">{{cfg.config().sectionCopy.menuPage.finalHeading}}</h2>
          <p style="color:var(--color-text-muted);text-align:center;max-width:46ch;margin-inline:auto">
            {{cfg.config().sectionCopy.menuPage.finalDescription}}
          </p>
          <div style="display:flex;gap:var(--space-4);justify-content:center;flex-wrap:wrap;margin-top:var(--space-6)">
            <button class="btn btn-cta" (click)="reservationSvc.open()">{{cfg.cta().reservationLabel}}</button>
            <a href="https://wa.me/529991234567" target="_blank" rel="noopener" class="btn btn-ghost">{{cfg.cta().whatsappLabel}}</a>
          </div>
        </div>
      </div>
    </main>
  `,
  styles: [`
    .menu-page { padding-top: 0; }
    .menu-hero {
      position: relative; height: 50dvh; min-height: 340px;
      display: flex; align-items: center; overflow: hidden;
    }
    .menu-hero-bg {
      position: absolute; inset: 0;
      background-size: cover; background-position: center;
    }
    .menu-hero-overlay {
      position: absolute; inset: 0;
      background: oklch(0.10 0.01 60 / 0.65);
    }
    .menu-hero-content {
      position: relative; z-index: 2;
      padding-top: 6rem; display: flex; flex-direction: column; gap: var(--space-3);
    }
    .menu-cat-nav {
      display: flex; flex-wrap: wrap; gap: var(--space-2);
      margin-bottom: var(--space-12);
      position: sticky; top: 4.5rem; z-index: 10;
      background: var(--color-bg);
      padding-block: var(--space-3);
      border-bottom: 1px solid var(--color-divider);
    }
    .cat-anchor {
      padding: var(--space-2) var(--space-4); border-radius: var(--radius-full);
      font-size: var(--text-sm); color: var(--color-text-muted);
      border: 1px solid var(--color-border); background: transparent;
      transition: all var(--transition-ui); cursor: pointer;
    }
    .cat-anchor.active, .cat-anchor:hover {
      border-color: var(--color-primary); color: var(--color-primary);
    }
    .menu-section { margin-bottom: var(--space-16); scroll-margin-top: 8rem; }
    .menu-section-header { margin-bottom: var(--space-6); padding-bottom: var(--space-4); border-bottom: 1px solid var(--color-divider); }
    .menu-items-list { display: flex; flex-direction: column; }
    .menu-list-item {
      display: flex; align-items: flex-start; justify-content: space-between; gap: var(--space-6);
      padding-block: var(--space-5);
      border-bottom: 1px solid oklch(from var(--color-divider) l c h / 0.5);
      transition: background var(--transition-ui);
    }
    .menu-list-item:hover { background: oklch(from var(--color-primary) l c h / 0.04); }
    .mli-info { flex: 1; }
    .mli-header { display: flex; align-items: center; gap: var(--space-3); margin-bottom: var(--space-2); flex-wrap: wrap; }
    .mli-name { font-family: var(--font-display); font-size: var(--text-lg); }
    .mli-tag  { font-size: 0.65rem; }
    .mli-desc { font-size: var(--text-sm); color: var(--color-text-muted); max-width: 60ch; line-height: 1.6; }
    .mli-price {
      font-family: var(--font-display); font-size: var(--text-lg);
      color: var(--color-primary); white-space: nowrap; font-weight: 600;
      flex-shrink: 0;
    }
    [data-tag="signature"] { background: var(--color-primary); color: var(--color-text-inverse); }
    [data-tag="popular"]   { background: var(--color-ember-500); color: oklch(0.98 0.01 55); }
    [data-tag="new"]       { background: oklch(0.45 0.20 145); color: oklch(0.98 0.01 55); }
    [data-tag="vegan"]     { background: oklch(0.40 0.18 150); color: oklch(0.98 0.01 55); }
    .menu-final-cta { padding: var(--space-16) 0 var(--space-8); display: flex; flex-direction: column; gap: var(--space-4); }
  `],
})
export class MenuPageComponent {
  readonly cfg = inject(BusinessConfigService);
  readonly reservationSvc = inject(ReservationService);
  readonly activeSection = signal('entradas');

  itemsByCategory(catId: string) {
    return this.cfg.menu().filter(i => i.categoryId === catId);
  }

  tagLabel(tag: string): string {
    const map: Record<string, string> = { signature: 'Firma', popular: 'Popular', new: 'Nuevo', vegan: 'Vegano' };
    return map[tag] ?? tag;
  }

  scrollTo(id: string) {
    this.activeSection.set(id);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }
}
