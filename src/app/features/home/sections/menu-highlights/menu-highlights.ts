import { Component, inject, signal, computed, OnInit, ElementRef, viewChild } from '@angular/core';
import { BusinessConfigService } from '../../../../core/services/business-config.service';
import { ReservationService } from '../../../../core/services/reservation.service';
import { GsapService } from '../../../../core/animations/gsap.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-menu-highlights',
  standalone: true,
  imports: [RouterLink],
  template: `
    <section class="section-pad menu-section" id="menu" aria-labelledby="menu-heading">
      <div class="container menu-shell">
        <div class="section-header menu-header" #sectionHeader>
          <span class="eyebrow">{{ cfg.config().sectionCopy.menuHighlights.eyebrow }}</span>
          <h2 class="text-h2" id="menu-heading">{{ cfg.config().sectionCopy.menuHighlights.heading }}</h2>
          <p class="text-lead section-subtitle">{{ cfg.config().sectionCopy.menuHighlights.subheading }}</p>
        </div>

        <div class="menu-topbar">
          <div class="cat-tabs" role="tablist" aria-label="Categorías del menú">
            @for (cat of categories(); track cat.id) {
              <button class="cat-tab" role="tab"
                [class.active]="activeCategory() === cat.id"
                [attr.aria-selected]="activeCategory() === cat.id"
                (click)="setCategory(cat.id)">
                <span class="cat-label">{{ cat.name }}</span>
                <small>{{ cat.description }}</small>
              </button>
            }
          </div>
        </div>

        <div class="menu-grid" #menuGrid>
          @for (item of visibleItems(); track item.id) {
            <article class="menu-card" [class.featured]="item.featured">
              <div class="menu-card-img aspect-menu">
                <img [src]="getItemImage(item.id)" [alt]="item.name + ' — ' + cfg.config().name" width="400" height="300" loading="lazy" />
                @if (item.tag) {
                  <span class="item-tag" [attr.data-tag]="item.tag">{{ tagLabel(item.tag) }}</span>
                }
              </div>
              <div class="menu-card-body">
                <div class="menu-card-row">
                  <h3 class="menu-item-name">{{ item.name }}</h3>
                  <span class="menu-item-price">{{ item.price }}</span>
                </div>
                <p class="menu-item-desc">{{ item.description }}</p>
              </div>
            </article>
          }
        </div>

        <div class="menu-cta-row">
          <a routerLink="/menu" class="btn btn-outline-brand">{{ cfg.config().sectionCopy.menuHighlights.fullMenuLabel }}</a>
          <button class="btn btn-primary" (click)="reservationSvc.open()">{{ cfg.cta().reservationLabel }}</button>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .menu-section { background: linear-gradient(180deg, rgba(255,251,247,.96), rgba(250,247,241,.95)); }
    .menu-header { text-align: left; margin-bottom: 2rem; }
    .section-subtitle { color: var(--color-ink-700); max-width: 48rem; margin-top: .75rem; }
    .menu-topbar { display: grid; gap: 1rem; margin-bottom: 1.5rem; }
    .cat-tabs {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
      gap: .85rem;
    }
    .cat-tab {
      text-align: left;
      padding: 1rem 1rem .95rem;
      border-radius: 1.25rem;
      border: 1px solid rgba(92,64,51,.08);
      background: rgba(255,255,255,.72);
      box-shadow: 0 10px 24px rgba(79,57,37,.05);
      transition: transform .24s ease, border-color .24s ease, box-shadow .24s ease, background .24s ease;
    }
    .cat-tab:hover { transform: translateY(-2px); }
    .cat-tab.active {
      background: rgba(255,250,244,.96);
      border-color: rgba(176,128,78,.28);
      box-shadow: 0 14px 32px rgba(79,57,37,.08);
    }
    .cat-label { display:block; font-weight:700; color: var(--color-ink-900); }
    .cat-tab small { display:block; margin-top:.3rem; color: var(--color-ink-500); font-size:.8rem; }
    .menu-grid {
      display:grid;
      grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
      gap: 1.25rem;
    }
    .menu-card {
      overflow: hidden;
      border-radius: 1.5rem;
      background: rgba(255,252,248,.95);
      border: 1px solid rgba(92,64,51,.08);
      box-shadow: 0 18px 44px rgba(79,57,37,.08);
      transition: transform .28s ease, box-shadow .28s ease;
    }
    .menu-card:hover { transform: translateY(-4px); box-shadow: 0 22px 54px rgba(79,57,37,.12); }
    .menu-card-img { position:relative; overflow:hidden; }
    .menu-card-img img { width:100%; height:100%; object-fit:cover; transition: transform .55s ease; }
    .menu-card:hover .menu-card-img img { transform: scale(1.06); }
    .item-tag {
      position:absolute; top:1rem; left:1rem; padding:.4rem .7rem; border-radius:999px;
      font-size:.72rem; font-weight:700; letter-spacing:.08em; text-transform:uppercase;
      background: rgba(255,255,255,.88); color: var(--color-ink-900);
    }
    .menu-card-body { padding: 1rem 1rem 1.1rem; }
    .menu-card-row { display:flex; justify-content:space-between; gap:.75rem; align-items:start; }
    .menu-item-name { font-family: var(--font-display); font-size: 1.45rem; line-height:1.05; color: var(--color-ink-900); }
    .menu-item-desc { margin-top:.6rem; color: var(--color-ink-700); font-size:.95rem; line-height:1.6; }
    .menu-item-price { color: var(--color-brand-700); font-weight:700; white-space:nowrap; }
    .menu-cta-row { display:flex; flex-wrap:wrap; gap:.85rem; justify-content:center; margin-top:2rem; }
    @media (max-width: 768px) {
      .menu-header { text-align:center; }
      .cat-tabs { grid-template-columns: 1fr 1fr; }
    }
  `],
})
export class MenuHighlightsComponent implements OnInit {
  private readonly gsap = inject(GsapService);
  readonly cfg = inject(BusinessConfigService);
  readonly reservationSvc = inject(ReservationService);
  readonly sectionHeader = viewChild<ElementRef>('sectionHeader');
  readonly menuGrid = viewChild<ElementRef>('menuGrid');

  readonly categories = this.cfg.categories;
  readonly activeCategory = signal(this.categories()[0]?.id ?? 'desayunos');
  readonly visibleItems = computed(() => this.cfg.menu().filter(i => i.categoryId === this.activeCategory()).slice(0, 6));

  setCategory(id: string) { this.activeCategory.set(id); }
  tagLabel(tag: string): string {
    const map: Record<string, string> = { signature: 'Firma', popular: 'Popular', new: 'Nuevo', vegan: 'Vegano' };
    return map[tag] ?? tag;
  }
  getItemImage(id: string): string {
    const images = this.cfg.config().sectionCopy.images.menuItemImages;
    return images[id] ?? this.cfg.config().sectionCopy.images.menuItemFallbackImage;
  }

  async ngOnInit(): Promise<void> {
    await new Promise(r => setTimeout(r, 100));
    const hdr = this.sectionHeader()?.nativeElement;
    if (hdr) await this.gsap.revealOnScroll(hdr.querySelectorAll(':scope > *'), 0.06);
    const grid = this.menuGrid()?.nativeElement;
    if (grid) await this.gsap.revealOnScroll(grid.querySelectorAll('.menu-card'), 0.06);
  }
}
