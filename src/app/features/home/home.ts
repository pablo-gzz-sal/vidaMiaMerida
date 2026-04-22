import { Component } from '@angular/core';
import { HeroComponent }          from './sections/hero/hero';
import { ConceptComponent }       from './sections/concept/concept';
import { MenuHighlightsComponent } from './sections/menu-highlights/menu-highlights';
import { PromotionsComponent }    from './sections/promotions/promotions';
import { GalleryComponent }       from './sections/gallery/gallery';
import { TestimonialsComponent }  from './sections/testimonials/testimonials';
import { LocationComponent }      from './sections/location/location';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeroComponent,
    ConceptComponent,
    MenuHighlightsComponent,
    PromotionsComponent,
    GalleryComponent,
    TestimonialsComponent,
    LocationComponent,
  ],
  template: `
    <main id="main-content">
      <app-hero />
      <app-concept />
      <app-menu-highlights />
      <app-promotions />
      <app-gallery />
      <app-testimonials />
      <app-location />
    </main>
  `,
})
export class HomeComponent {}
