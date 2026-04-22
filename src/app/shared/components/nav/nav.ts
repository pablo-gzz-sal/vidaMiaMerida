import { Component, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ReservationService } from '../../../core/services/reservation.service';
import { BusinessConfigService } from '../../../core/services/business-config.service';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <header class="site-header" [class.menu-open]="menuOpen()">
      <div class="container nav-shell">
        <a routerLink="/" class="brand-logo" [attr.aria-label]="cfg.config().name + ' — ' + cfg.navigation().homeLabel">
          <span class="brand-mark" aria-hidden="true">🌿</span>
          <span class="brand-name">{{ cfg.config().name }}</span>
        </a>

        <nav class="nav-desktop" [attr.aria-label]="cfg.config().uiCopy.accessibility.primaryNavLabel">
          <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact:true}" class="nav-link">{{ cfg.navigation().homeLabel }}</a>
          <a routerLink="/menu" routerLinkActive="active" class="nav-link">{{ cfg.navigation().menuLabel }}</a>
          <a routerLink="/nosotros" routerLinkActive="active" class="nav-link">{{ cfg.navigation().aboutLabel }}</a>
          <a routerLink="/contacto" routerLinkActive="active" class="nav-link">{{ cfg.navigation().contactLabel }}</a>
        </nav>

        <div class="nav-actions">
          <button class="btn btn-primary desktop-cta" (click)="openReservation()">{{ cfg.cta().reservationLabel }}</button>
          <button class="nav-toggle" (click)="toggleMenu()" [attr.aria-expanded]="menuOpen()" [attr.aria-label]="cfg.config().uiCopy.mobileMenu.triggerAriaLabel">
            <span></span><span></span>
          </button>
        </div>
      </div>

      @if (menuOpen()) {
        <div class="mobile-backdrop" (click)="toggleMenu()" aria-hidden="true"></div>
        <div class="mobile-sheet" role="dialog" aria-modal="true" [attr.aria-label]="cfg.config().uiCopy.mobileMenu.triggerAriaLabel">
          <div class="mobile-sheet-inner">
            <div class="mobile-sheet-head">
              <span class="eyebrow">{{ cfg.config().uiCopy.mobileMenu.eyebrow }}</span>
              <button class="mobile-close" (click)="toggleMenu()" [attr.aria-label]="cfg.config().uiCopy.mobileMenu.closeAriaLabel">×</button>
            </div>
            <a routerLink="/" class="mobile-link" (click)="toggleMenu()">{{ cfg.navigation().homeLabel }}</a>
            <a routerLink="/menu" class="mobile-link" (click)="toggleMenu()">{{ cfg.navigation().menuLabel }}</a>
            <a routerLink="/nosotros" class="mobile-link" (click)="toggleMenu()">{{ cfg.navigation().aboutLabel }}</a>
            <a routerLink="/contacto" class="mobile-link" (click)="toggleMenu()">{{ cfg.navigation().contactLabel }}</a>
            <button class="btn btn-primary w-full" (click)="openReservation(); toggleMenu()">{{ cfg.cta().reservationLabel }}</button>
          </div>
        </div>
      }
    </header>
  `,
  styles: [`
    .site-header {
      position: sticky; top: 0; z-index: 50;
      backdrop-filter: blur(14px);
      background: rgba(255,251,247,.72);
      border-bottom: 1px solid rgba(92,64,51,.08);
    }
    .nav-shell { display:flex; align-items:center; justify-content:space-between; min-height: 5rem; gap: 1rem; }
    .brand-logo { display:flex; align-items:center; gap:.75rem; color: var(--color-ink-900); text-decoration:none; }
    .brand-mark {
      width:2.25rem; height:2.25rem; display:grid; place-items:center; border-radius:999px;
      background: rgba(176,128,78,.12); color: var(--color-brand-700);
    }
    .brand-name { font-family: var(--font-display); font-size: 1.5rem; }
    .nav-desktop { display:flex; align-items:center; gap:1.2rem; }
    .nav-link { color: var(--color-ink-700); text-decoration:none; font-weight:600; }
    .nav-link.active { color: var(--color-ink-900); }
    .nav-actions { display:flex; align-items:center; gap:.75rem; }
    .nav-toggle {
      display:none; width:2.8rem; height:2.8rem; border-radius:999px;
      border:1px solid rgba(92,64,51,.08); background: rgba(255,255,255,.78);
      align-items:center; justify-content:center; flex-direction:column; gap:.28rem;
      transition: transform .24s ease, background .24s ease, box-shadow .24s ease;
      box-shadow: 0 10px 24px rgba(79,57,37,.08);
    }
    .menu-open .nav-toggle { transform: rotate(90deg); }
    .nav-toggle span { width:1rem; height:2px; background: var(--color-ink-900); display:block; border-radius:999px; transition: transform .24s ease, opacity .24s ease; }
    .mobile-backdrop {
      position: fixed; inset: 0; z-index: 58; background: rgba(39,29,20,.18);
      backdrop-filter: blur(6px); animation: fadeIn .2s ease;
    }
    .mobile-sheet {
      position: fixed; inset: 5rem 0 auto 0; z-index: 60; padding: 0 1rem 1rem;
      animation: sheetIn .28s cubic-bezier(0.16,1,0.3,1);
    }
    .mobile-sheet-inner {
      display:grid; gap:.7rem; padding:1rem; border-radius:1.4rem;
      background: rgba(255,252,248,.96); border:1px solid rgba(92,64,51,.08);
      box-shadow: 0 22px 54px rgba(79,57,37,.14);
    }
    .mobile-sheet-head { display:flex; align-items:center; justify-content:space-between; margin-bottom:.25rem; }
    .mobile-close { width:2.3rem; height:2.3rem; border-radius:999px; background: rgba(255,255,255,.7); color: var(--color-ink-900); font-size:1.4rem; }
    .mobile-link {
      padding: 1rem 1rem; border-radius: 1rem; text-decoration:none;
      color: var(--color-ink-900); background: rgba(255,255,255,.78); font-weight:600;
      transition: transform .2s ease, background .2s ease, box-shadow .2s ease;
    }
    .mobile-link:hover { transform: translateX(4px); background: rgba(255,255,255,.95); box-shadow: 0 12px 24px rgba(79,57,37,.08); }
    @keyframes sheetIn { from { opacity:0; transform: translateY(-14px) scale(.98); } to { opacity:1; transform: translateY(0) scale(1); } }
    @keyframes fadeIn { from { opacity:0; } to { opacity:1; } }
    @media (max-width: 900px) {
      .nav-desktop, .desktop-cta { display:none; }
      .nav-toggle { display:flex; }
      .brand-name { font-size: 1.35rem; }
    }
  `],
})
export class NavComponent {
  readonly cfg = inject(BusinessConfigService);
  private readonly reservation = inject(ReservationService);
  readonly menuOpen = signal(false);

  toggleMenu(): void { this.menuOpen.update(v => !v); }
  openReservation(): void { this.reservation.open(); }
}
