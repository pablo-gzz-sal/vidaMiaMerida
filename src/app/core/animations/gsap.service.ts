import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

// GSAP is loaded client-side only to respect SSR boundaries (future-proof)
@Injectable({ providedIn: 'root' })
export class GsapService {
  private readonly platformId = inject(PLATFORM_ID);
  private gsap: any;
  private ScrollTrigger: any;
  private loaded = false;

  async load(): Promise<{ gsap: any; ScrollTrigger: any }> {
    if (!isPlatformBrowser(this.platformId)) return { gsap: null, ScrollTrigger: null };
    if (this.loaded) return { gsap: this.gsap, ScrollTrigger: this.ScrollTrigger };

    const gsapModule = await import('gsap');
    const stModule   = await import('gsap/ScrollTrigger');
    this.gsap = gsapModule.gsap;
    this.ScrollTrigger = stModule.ScrollTrigger;
    this.gsap.registerPlugin(this.ScrollTrigger);
    this.loaded = true;
    return { gsap: this.gsap, ScrollTrigger: this.ScrollTrigger };
  }

  /** Fade-up reveal on scroll — most common animation */
  async revealOnScroll(targets: string | Element | Element[], stagger = 0.08): Promise<void> {
    const { gsap, ScrollTrigger } = await this.load();
    if (!gsap) return;
    gsap.from(targets, {
      opacity: 0, y: 28, duration: 0.8,
      ease: 'power3.out',
      stagger,
      scrollTrigger: {
        trigger: Array.isArray(targets) ? targets[0] : targets,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    });
  }

  /** Clip-path image reveal (no layout shift) */
  async imageReveal(target: string | Element): Promise<void> {
    const { gsap, ScrollTrigger } = await this.load();
    if (!gsap) return;
    gsap.from(target, {
      clipPath: 'inset(100% 0 0 0)',
      duration: 1.1,
      ease: 'power4.out',
      scrollTrigger: {
        trigger: target,
        start: 'top 82%',
        toggleActions: 'play none none none',
      },
    });
  }

  /** Hero text stagger entrance */
  async heroEntrance(elements: Element[]): Promise<void> {
    const { gsap } = await this.load();
    if (!gsap) return;
    gsap.from(elements, {
      opacity: 0, y: 40, duration: 1,
      ease: 'power3.out',
      stagger: 0.15,
      delay: 0.3,
    });
  }

  /** Counter animation for numbers */
  async countUp(target: Element, endValue: number, suffix = ''): Promise<void> {
    const { gsap } = await this.load();
    if (!gsap) return;
    const obj = { val: 0 };
    gsap.to(obj, {
      val: endValue, duration: 1.5, ease: 'power2.out',
      onUpdate: () => { target.textContent = Math.round(obj.val) + suffix; },
      scrollTrigger: { trigger: target, start: 'top 85%', once: true },
    });
  }

  /** Parallax for hero background */
  async parallax(target: string | Element, yPercent = 25): Promise<void> {
    const { gsap, ScrollTrigger } = await this.load();
    if (!gsap) return;
    gsap.to(target, {
      yPercent,
      ease: 'none',
      scrollTrigger: {
        trigger: target,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    });
  }
}
