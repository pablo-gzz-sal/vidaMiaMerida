import { Injectable, signal, computed } from '@angular/core';
import { BusinessConfig } from '../config/business.config';
import { VIDA_MIA_CONFIG } from '../config/clients/vida-mia.config';

@Injectable({ providedIn: 'root' })
export class BusinessConfigService {
  private readonly _config = signal<BusinessConfig>(VIDA_MIA_CONFIG);

  readonly config = this._config.asReadonly();

  // Computed slices for granular component reads
  readonly hero         = computed(() => this._config().hero);
  readonly cta          = computed(() => this._config().cta);
  readonly navigation   = computed(() => this._config().navigation);
  readonly menu         = computed(() => this._config().menuItems);
  readonly categories   = computed(() => this._config().menuCategories);
  readonly promotions   = computed(() => this._config().promotions);
  readonly gallery      = computed(() => this._config().gallery);
  readonly testimonials = computed(() => this._config().testimonials);
  readonly location     = computed(() => this._config().location);
  readonly social       = computed(() => this._config().social);
  readonly reservation  = computed(() => this._config().reservation);
  readonly whatsapp     = computed(() => this._config().whatsapp);

  featuredItems = computed(() => this._config().menuItems.filter(i => i.featured));
  itemsByCategory = (categoryId: string) =>
    computed(() => this._config().menuItems.filter(i => i.categoryId === categoryId));

  /** Hot-swap config for different clients (future multi-tenant use) */
  loadConfig(config: BusinessConfig): void {
    this._config.set(config);
  }
}
