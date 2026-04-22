export interface BrandTokens {
  primaryColor: string;
  accentColor: string;
  bgBase: string;
  fontDisplay: string;
  fontBody: string;
  darkMode: boolean;
}

export interface SeoConfig {
  title: string;
  description: string;
  keywords: string[];
  ogImage: string;
  locale: string;
  schemaType: 'Restaurant' | 'Bar' | 'CafeOrCoffeeShop' | 'FoodEstablishment';
  googleMapsEmbed?: string;
}

export interface HeroConfig {
  headline: string;
  subheadline: string;
  ctaLabel: string;
  ctaSecondaryLabel: string;
  locationLabel: string;
  scrollCueLabel: string;
  backgroundImage: string;
  videoSrc?: string;
  overlayOpacity: number;
}

export interface CtaConfig {
  reservationLabel: string;
  whatsappLabel: string;
  stickyLabel: string;
}

export interface MenuCategory {
  id: string;
  name: string;
  description: string;
  emoji?: string;
}

export interface MenuItem {
  id: string;
  categoryId: string;
  name: string;
  description: string;
  price: string;
  tag?: 'signature' | 'new' | 'popular' | 'vegan';
  image?: string;
  featured?: boolean;
}

export interface Promotion {
  id: string;
  title: string;
  description: string;
  badge?: string;
  validUntil?: string;
  image?: string;
  ctaLabel: string;
  ctaAction: 'reservation' | 'whatsapp' | 'link';
  ctaValue?: string;
}

export interface GalleryItem {
  id: string;
  src: string;
  alt: string;
  caption?: string;
  category: 'food' | 'drinks' | 'interior' | 'events';
}

export interface Testimonial {
  id: string;
  name: string;
  source: 'Google' | 'TripAdvisor' | 'Instagram' | 'Direct';
  rating: number;
  text: string;
  date?: string;
}

export interface Faq {
  question: string;
  answer: string;
}

export interface ReservationConfig {
  enabled: boolean;
  mode: 'whatsapp' | 'form' | 'mock';
  maxGuests: number;
  minAdvanceHours: number;
  modalTitle: string;
  modalDescription: string;
  successTitle: string;
  successDescription: string;
  previewLabel: string;
  openWhatsappLabel: string;
  messageTemplate: string;
  whatsappNumber: string;
}

export interface WhatsappConfig {
  number: string;
  defaultMessage: string;
  floatingButton: boolean;
  ariaLabel: string;
}

export interface LocationConfig {
  address: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  googleMapsUrl: string;
  embedMapSrc?: string;
  mapAriaLabel?: string;
  mapImageAlt?: string;
  openMapsLabel?: string;
  hoursTitle?: string;
  hours: { day: string; hours: string; closed?: boolean }[];
  phone?: string;
  email?: string;
}

export interface SocialLinks {
  instagram?: string;
  facebook?: string;
  tiktok?: string;
  tripadvisor?: string;
  youtube?: string;
}

export interface NavigationConfig {
  homeLabel: string;
  menuLabel: string;
  aboutLabel: string;
  contactLabel: string;
}

export interface FooterConfig {
  copyrightLabel: string;
  navigationHeading: string;
  hoursHeading: string;
  contactHeading: string;
}

export interface SectionCopy {
  images: {
    heroBackground: string;
    conceptImage: string;
    conceptImageAlt: string;
    locationMapImage: string;
    menuPageHeroImage: string;
    menuItemImages: Record<string, string>;
    menuItemFallbackImage: string;
  };
  concept: {
    eyebrow: string;
    heading: string;
    lead: string;
    body: string;
    foundedLabel: string;
  };
  menuHighlights: {
    eyebrow: string;
    heading: string;
    subheading: string;
    fullMenuLabel: string;
  };
  promotions: {
    eyebrow: string;
    heading: string;
    validUntilPrefix: string;
  };
  gallery: {
    eyebrow: string;
    heading: string;
    filters: { id: 'all' | 'food' | 'drinks' | 'interior' | 'events'; label: string }[];
  };
  testimonials: {
    eyebrow: string;
    heading: string;
    subheading: string;
    proofItems: { value: string; label: string }[];
  };
  location: {
    eyebrow: string;
    heading: string;
  };
  menuPage: {
    eyebrow: string;
    heading: string;
    lead: string;
    finalHeading: string;
    finalDescription: string;
  };
  contactPage: {
    eyebrow: string;
    heading: string;
    whatsappTitle: string;
    reservationTitle: string;
    reservationDescription: string;
    emailTitle: string;
  };
};


export interface UiCopyConfig {
  accessibility: {
    skipToContentLabel: string;
    primaryNavLabel: string;
    dividerAriaLabel: string;
  };
  mobileMenu: {
    triggerAriaLabel: string;
    dialogAriaLabel: string;
    eyebrow: string;
    closeAriaLabel: string;
  };
  reservationUi: {
    eyebrow: string;
    closeAriaLabel: string;
    fields: {
      nameLabel: string;
      namePlaceholder: string;
      phoneLabel: string;
      phonePlaceholder: string;
      dateLabel: string;
      timeLabel: string;
      guestsLabel: string;
      guestsSuffix: string;
      notesLabel: string;
      notesPlaceholder: string;
    };
    actions: {
      cancelLabel: string;
      confirmLabel: string;
      closeLabel: string;
    };
    successEyebrow: string;
  };
  menuPageUi: {
    categoryNavAriaLabel: string;
  };
}

export interface BusinessConfig {
  id: string;
  name: string;
  tagline: string;
  category: 'restaurant' | 'bar' | 'cafe' | 'food-concept';
  concept: string;
  brand: BrandTokens;
  seo: SeoConfig;
  hero: HeroConfig;
  cta: CtaConfig;
  navigation: NavigationConfig;
  footer: FooterConfig;
  sectionCopy: SectionCopy;
  menuCategories: MenuCategory[];
  menuItems: MenuItem[];
  promotions: Promotion[];
  gallery: GalleryItem[];
  testimonials: Testimonial[];
  faqs: Faq[];
  reservation: ReservationConfig;
  whatsapp: WhatsappConfig;
  location: LocationConfig;
  social: SocialLinks;
  uiCopy: UiCopyConfig;
}
