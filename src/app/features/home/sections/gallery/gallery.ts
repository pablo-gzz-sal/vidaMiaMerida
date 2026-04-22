import { Component, inject, signal, computed, OnInit, ElementRef, viewChild } from '@angular/core';
import { BusinessConfigService } from '../../../../core/services/business-config.service';
import { GsapService } from '../../../../core/animations/gsap.service';

type GalleryCategory = 'all' | 'food' | 'drinks' | 'interior' | 'events';

@Component({
  selector: 'app-gallery',
  standalone: true,
  template: `
    <section class="section-pad gallery-section" id="galeria" aria-labelledby="gallery-heading">
      <div class="container">
        <div class="section-header gallery-header" #hdr>
          <span class="eyebrow">{{ cfg.config().sectionCopy.gallery.eyebrow }}</span>
          <h2 class="text-h2" id="gallery-heading">{{ cfg.config().sectionCopy.gallery.heading }}</h2>
        </div>

        <div class="gallery-filters" role="group" aria-label="Filtrar galería">
          @for (f of filters(); track f.id) {
            <button class="filter-btn" [class.active]="activeFilter() === f.id" (click)="setFilter(f.id)" [attr.aria-pressed]="activeFilter() === f.id">
              {{ f.label }}
            </button>
          }
        </div>

        <div class="gallery-grid" #galleryGrid>
          @for (item of filteredItems(); track item.id) {
            <figure class="gallery-item" (click)="openLightbox(item)">
              <img [src]="item.src" [alt]="item.alt" width="600" height="450" loading="lazy" class="gallery-img aspect-menu" />
              <figcaption class="gallery-caption">
                <span>{{ item.caption }}</span>
              </figcaption>
            </figure>
          }
        </div>
      </div>

      @if (lightboxItem()) {
        <div class="gallery-lightbox" (click)="closeLightbox()" role="dialog" aria-modal="true" [attr.aria-label]="lightboxItem()?.alt">
          <button class="lightbox-close" (click)="closeLightbox()" aria-label="Cerrar">×</button>
          <img [src]="lightboxItem()?.src" [alt]="lightboxItem()?.alt" class="lightbox-img" (click)="$event.stopPropagation()" />
          @if (lightboxItem()?.caption) {
            <p class="lightbox-caption">{{ lightboxItem()?.caption }}</p>
          }
        </div>
      }
    </section>
  `,
  styles: [`
    .gallery-section { background: linear-gradient(180deg, rgba(250,247,241,.72), rgba(255,252,248,.96)); }
    .gallery-header { text-align:left; margin-bottom: 1.4rem; }
    .gallery-filters { display:flex; flex-wrap:wrap; gap:.65rem; margin-bottom: 1.5rem; }
    .filter-btn {
      padding:.7rem .95rem; border-radius:999px; background: rgba(255,255,255,.78);
      border:1px solid rgba(92,64,51,.08); color: var(--color-ink-700); font-weight:600;
    }
    .filter-btn.active { background: var(--color-brand-600); color:white; border-color: var(--color-brand-600); }
    .gallery-grid {
      display:grid;
      grid-template-columns: repeat(12, 1fr);
      gap: 1rem;
    }
    .gallery-item {
      grid-column: span 4;
      position:relative;
      overflow:hidden;
      border-radius: 1.45rem;
      cursor:pointer;
      min-height: 18rem;
      box-shadow: 0 18px 44px rgba(79,57,37,.08);
    }
    .gallery-item:nth-child(4n+1) { grid-column: span 7; }
    .gallery-item:nth-child(4n+2) { grid-column: span 5; }
    .gallery-item:nth-child(4n+3) { grid-column: span 5; }
    .gallery-item:nth-child(4n+4) { grid-column: span 7; }
    .gallery-img { width:100%; height:100%; object-fit:cover; transition: transform .6s ease; }
    .gallery-item:hover .gallery-img { transform: scale(1.05); }
    .gallery-caption {
      position:absolute; left:1rem; right:1rem; bottom:1rem;
      padding:.8rem 1rem; border-radius: 1rem;
      background: rgba(255,255,255,.72); backdrop-filter: blur(8px);
      color: var(--color-ink-900); font-weight:600;
    }
    .gallery-lightbox {
      position:fixed; inset:0; z-index:120;
      display:grid; place-items:center;
      background: rgba(26,20,16,.72);
      padding: 1.5rem;
    }
    .lightbox-img { max-width:min(92vw, 980px); max-height:78vh; border-radius:1.25rem; box-shadow:0 24px 60px rgba(0,0,0,.28); }
    .lightbox-caption { color:white; margin-top:1rem; text-align:center; }
    .lightbox-close {
      position:absolute; top:1rem; right:1rem; width:2.5rem; height:2.5rem; border-radius:999px;
      background: rgba(255,255,255,.18); color:white; font-size:1.6rem; line-height:1;
    }
    @media (max-width: 768px) {
      .gallery-header { text-align:center; }
      .gallery-grid { grid-template-columns: 1fr; }
      .gallery-item,
      .gallery-item:nth-child(n) { grid-column: auto; min-height: 16rem; }
    }
  `],
})
export class GalleryComponent implements OnInit {
  readonly cfg = inject(BusinessConfigService);
  private readonly gsap = inject(GsapService);
  readonly hdr = viewChild<ElementRef>('hdr');
  readonly galleryGrid = viewChild<ElementRef>('galleryGrid');

  readonly activeFilter = signal<GalleryCategory>('all');
  readonly lightboxItem = signal<any | null>(null);
  readonly filters = computed(() => this.cfg.config().sectionCopy.gallery.filters);
  readonly filteredItems = computed(() => {
    const filter = this.activeFilter();
    const items = this.cfg.gallery();
    return filter === 'all' ? items : items.filter(i => i.category === filter);
  });

  setFilter(filter: GalleryCategory): void { this.activeFilter.set(filter); }
  openLightbox(item: any): void { this.lightboxItem.set(item); }
  closeLightbox(): void { this.lightboxItem.set(null); }

  async ngOnInit(): Promise<void> {
    await new Promise(r => setTimeout(r, 100));
    const hdr = this.hdr()?.nativeElement;
    if (hdr) await this.gsap.revealOnScroll(hdr.querySelectorAll(':scope > *'), 0.06);
    const grid = this.galleryGrid()?.nativeElement;
    if (grid) await this.gsap.revealOnScroll(grid.querySelectorAll('.gallery-item'), 0.05);
  }
}
