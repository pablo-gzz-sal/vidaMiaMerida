import { BusinessConfig } from '../business.config';
import { DEFAULT_RESTAURANT_PRESET } from '../presets/default-restaurant.preset';

export const VIDA_MIA_CONFIG: BusinessConfig = {
  ...(DEFAULT_RESTAURANT_PRESET as BusinessConfig),

  id: 'vida-mia-merida',
  name: 'Vida Mía',
  tagline: '¡Desayuno & Brunch! Abrimos todos los días.',
  category: 'restaurant',
  concept: 'Restaurante de desayuno y brunch en el norte de Mérida, con espíritu bohemio, jardín exuberante, mesas pintadas a mano, opciones saludables y comfort food hecho con amor.',

  brand: {
    primaryColor: '#C49A10',
    accentColor: '#4a5e2a',
    bgBase: '#faf7f0',
    fontDisplay: 'Playfair Display',
    fontBody: 'DM Sans',
    darkMode: false,
  },

  seo: {
    title: 'Vida Mía Restaurante — Desayuno & Brunch en Mérida',
    description: 'Desayuno y brunch en el norte de Mérida. Ambiente bohemio con jardín, smoothie bowls, omelettes, pan de masa madre y café. Abrimos todos los días 8am–3pm.',
    keywords: ['desayuno Mérida', 'brunch Mérida norte', 'Vida Mía restaurante', 'Montes de Amé', 'smoothie bowl Mérida', 'comfort food Mérida'],
    ogImage: 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=1200&auto=format&fit=crop&q=80',
    locale: 'es_MX',
    schemaType: 'Restaurant',
    googleMapsEmbed: '',
  },

  hero: {
    headline: 'Tu lugar favorito\npara el desayuno en Mérida',
    subheadline: 'Brunch todos los días, pan de masa madre, smoothie bowls y comfort food con alma bohemia en el norte de Mérida.',
    ctaLabel: 'Ver menú',
    ctaSecondaryLabel: 'Cómo llegar',
    locationLabel: 'Montes de Amé, Mérida · 8am – 3pm',
    scrollCueLabel: 'Descubre más',
    backgroundImage: 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=1600&auto=format&fit=crop&q=80',
    overlayOpacity: 0.42,
  },

  cta: {
    reservationLabel: 'Escríbenos',
    whatsappLabel: 'WhatsApp',
    stickyLabel: 'Escríbenos',
  },

  navigation: {
    homeLabel: 'Inicio',
    menuLabel: 'Menú',
    aboutLabel: 'Nosotros',
    contactLabel: 'Contacto',
  },

  footer: {
    copyrightLabel: 'Todos los derechos reservados',
    navigationHeading: 'Navegación',
    hoursHeading: 'Horarios',
    contactHeading: 'Contacto',
  },

  sectionCopy: {
    images: {
      heroBackground: 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=1600&auto=format&fit=crop&q=80',
      conceptImage: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=900&auto=format&fit=crop&q=80',
      conceptImageAlt: 'Jardín y ambiente bohemio de Vida Mía Restaurante',
      locationMapImage: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?w=900&auto=format&fit=crop&q=80',
      menuPageHeroImage: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=1400&auto=format&fit=crop&q=80',
      menuItemImages: {},
      menuItemFallbackImage: 'https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?w=600&auto=format&fit=crop&q=80',
    },
    concept: {
      eyebrow: 'Nuestra historia',
      heading: 'Un jardín para las mañanas de Mérida',
      lead: 'Vida Mía nació como un rincón bohemio en el norte de la ciudad, inspirado en el alma de Tulum y la Riviera Maya, pero con raíces profundas en Mérida.',
      body: 'Mesas de madera pintadas a mano, un jardín exuberante y un menú que equilibra lo saludable con el placer del comfort food. Pan de masa madre hecho en casa, smoothie bowls, omelettes personalizables y café de calidad, todo en un espacio donde el tiempo se detiene.',
      foundedLabel: 'Norte de Mérida',
    },
    menuHighlights: {
      eyebrow: 'Lo que más pedimos',
      heading: 'Favoritos de Vida Mía',
      subheading: 'Smoothie bowls, pan de masa madre, omelettes, ensaladas y comfort food para empezar el día con todo.',
      fullMenuLabel: 'Ver menú completo',
    },
    promotions: {
      eyebrow: 'Novedades',
      heading: 'Razones para venir esta semana',
      validUntilPrefix: 'Válido hasta',
    },
    gallery: {
      eyebrow: 'Galería',
      heading: 'El espacio, la comida y el ambiente',
      filters: [
        { id: 'all', label: 'Todo' },
        { id: 'food', label: 'Desayunos' },
        { id: 'drinks', label: 'Café y smoothies' },
        { id: 'interior', label: 'El jardín' },
        { id: 'events', label: 'Momentos' },
      ],
    },
    testimonials: {
      eyebrow: 'Lo que dicen',
      heading: 'Experiencias reales en Vida Mía',
      subheading: 'Clientes frecuentes y visitantes que ya lo tienen como su favorito para el desayuno en Mérida.',
      proofItems: [
        { value: '7', label: 'Días a la semana' },
        { value: '8–3', label: 'Horario todos los días' },
        { value: '4.5★', label: 'Calificación pública' },
      ],
    },
    location: {
      eyebrow: 'Encuéntranos',
      heading: 'Estamos en Montes de Amé',
    },
    menuPage: {
      eyebrow: 'Menú completo',
      heading: 'Todo lo que sirve Vida Mía',
      lead: 'Desde smoothie bowls hasta comfort food, con opciones saludables, pan de masa madre y café todos los días.',
      finalHeading: '¿Listo para tu próximo desayuno en Vida Mía?',
      finalDescription: 'Estamos todos los días de 8am a 3pm. Sin reservación requerida.',
    },
    contactPage: {
      eyebrow: 'Contacto',
      heading: 'Hablemos',
      whatsappTitle: 'WhatsApp / Teléfono',
      reservationTitle: 'Escríbenos',
      reservationDescription: 'Comparte cualquier consulta, pedido especial o evento privado',
      emailTitle: 'Correo',
    },
  },

  menuCategories: [
    { id: 'bowls', name: 'Smoothie Bowls', description: 'Tazones de fruta tropical, yogurt y granola', emoji: '🥣' },
    { id: 'desayunos', name: 'Desayunos', description: 'Platillos completos para empezar bien el día', emoji: '🍳' },
    { id: 'saludable', name: 'Opciones saludables', description: 'Ensaladas, tostadas y opciones ligeras', emoji: '🥗' },
    { id: 'comfort', name: 'Comfort Food', description: 'Los favoritos que te hacen volver', emoji: '🥞' },
    { id: 'cafe', name: 'Café y bebidas calientes', description: 'Café de calidad y bebidas para acompañar', emoji: '☕' },
    { id: 'frias', name: 'Jugos y smoothies', description: 'Naturales, fríos y llenos de energía', emoji: '🥤' },
  ],

  menuItems: [
    { id: 'm1', categoryId: 'bowls', name: 'Smoothie Bowl tropical', description: 'Frutas tropicales, yogurt, granola y toppings frescos', price: '$145', tag: 'popular', featured: true },
    { id: 'm2', categoryId: 'bowls', name: 'Bowl de frutos rojos', description: 'Mezcla de berries, yogurt griego y granola artesanal', price: '$155', featured: true },
    { id: 'm3', categoryId: 'desayunos', name: 'Omelette personalizable', description: 'Elige tus ingredientes favoritos con pan de masa madre', price: '$165', tag: 'signature', featured: true },
    { id: 'm4', categoryId: 'desayunos', name: 'Huevos al gusto', description: 'Con pan de masa madre hecho en casa y fruta fresca', price: '$140', tag: 'popular' },
    { id: 'm5', categoryId: 'comfort', name: 'Hot cakes de la casa', description: 'Esponjosos, con mantequilla y miel de maple', price: '$155', featured: true },
    { id: 'm6', categoryId: 'comfort', name: 'French toast artesanal', description: 'Pan de masa madre bañado en huevo y canela', price: '$160', tag: 'signature' },
    { id: 'm7', categoryId: 'saludable', name: 'Tostada de aguacate', description: 'Pan de masa madre, aguacate, semillas y limón', price: '$145', tag: 'popular' },
    { id: 'm8', categoryId: 'saludable', name: 'Ensalada matutina', description: 'Vegetales frescos, queso de cabra y aderezo cítrico', price: '$138' },
    { id: 'm9', categoryId: 'cafe', name: 'Latte', description: 'Espresso con leche vaporizada al momento', price: '$75', tag: 'signature' },
    { id: 'm10', categoryId: 'cafe', name: 'Café de olla', description: 'Preparación tradicional con canela y piloncillo', price: '$60' },
    { id: 'm11', categoryId: 'frias', name: 'Jugo natural', description: 'Frutas de temporada, recién exprimido', price: '$80', tag: 'popular' },
    { id: 'm12', categoryId: 'frias', name: 'Smoothie verde', description: 'Espinaca, manzana, pepino y limón', price: '$90', tag: 'new' },
  ],

  promotions: [
    { id: 'p1', title: 'Pan de masa madre hecho en casa', description: 'Vida Mía prepara su propio pan de masa madre artesanal, la base de sus mejores platillos del día.', badge: 'Artesanal', ctaLabel: 'Ver menú', ctaAction: 'link', ctaValue: '/menu' },
    { id: 'p2', title: 'Todos los días de 8am a 3pm', description: 'Sin días de descanso. Sin reservación necesaria. Ven cuando quieras durante la semana o el fin de semana.', badge: 'Abierto siempre', ctaLabel: 'Cómo llegar', ctaAction: 'link', ctaValue: 'https://maps.google.com/?q=Calle+26+214+Montes+de+Ame+Merida' },
    { id: 'p3', title: 'Pet friendly con terraza al aire libre', description: 'Trae a tu mascota y disfruta del jardín. Contamos con área exterior y climatizada para que elijas la que más te guste.', badge: 'Pet friendly', ctaLabel: 'Escríbenos', ctaAction: 'whatsapp' },
  ],

  gallery: [
    { id: 'g1', src: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&auto=format&fit=crop&q=80', alt: 'Smoothie bowl tropical de Vida Mía', caption: 'Bowls que sí llenan', category: 'food' },
    { id: 'g2', src: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&auto=format&fit=crop&q=80', alt: 'Café latte en Vida Mía', caption: 'Café de todos los días', category: 'drinks' },
    { id: 'g3', src: 'https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?w=800&auto=format&fit=crop&q=80', alt: 'Desayuno completo en mesa del jardín', caption: 'Mañanas en el jardín', category: 'food' },
    { id: 'g4', src: 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=800&auto=format&fit=crop&q=80', alt: 'Interior y jardín de Vida Mía', caption: 'Espíritu bohemio', category: 'interior' },
    { id: 'g5', src: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&auto=format&fit=crop&q=80', alt: 'Terraza al aire libre', caption: 'El jardín te espera', category: 'interior' },
    { id: 'g6', src: 'https://images.unsplash.com/photo-1543352634-a1c51d9f1fa7?w=800&auto=format&fit=crop&q=80', alt: 'Smoothie y jugos frescos', caption: 'Energía natural', category: 'drinks' },
  ],

  testimonials: [
    { id: 't1', name: 'Reseña pública', source: 'Google', rating: 5, text: 'Tiene área climatizada o exterior según prefieras. El sabor de la comida y pan dulce es delicioso. El café y smoothies, muy buenos.', date: '2025' },
    { id: 't2', name: 'Wanderlog', source: 'Direct', rating: 5, text: 'Un encantador destino de desayuno y brunch en el norte de Mérida, con espíritu bohemio reminiscente de Tulum. Jardín exuberante y menú variado.', date: '2025' },
    { id: 't3', name: 'Visitante frecuente', source: 'Instagram', rating: 5, text: '¿Vamos por un brunch? Tú y yo… y una platicadita sin prisa. Mi lugar favorito para las mañanas en Mérida.', date: '2024' },
  ],

  faqs: [
    { question: '¿Necesito reservación?', answer: 'No. Vida Mía abre todos los días de 8am a 3pm sin necesidad de reservación previa.' },
    { question: '¿Son pet friendly?', answer: 'Sí. Tienen área exterior y terraza donde puedes llevar a tu mascota.' },
    { question: '¿Dónde están ubicados?', answer: 'Calle 26 #214 x 63 y 65, Col. Montes de Amé, norte de Mérida, detrás de los Departamentos Buyán.' },
    { question: '¿Cómo puedo contactarlos?', answer: 'Por teléfono al 999 931 2679, por correo a vidamiarestaurantemid@gmail.com o en Instagram @vidamiarestaurantemid.' },
  ],

  reservation: {
    enabled: true,
    mode: 'mock',
    maxGuests: 10,
    minAdvanceHours: 0,
    modalTitle: 'Escríbenos a Vida Mía',
    modalDescription: 'Comparte tu consulta o evento especial y te respondemos rápido. No se requiere reservación.',
    successTitle: '¡Listo! Tu mensaje está preparado',
    successDescription: 'Continúa por WhatsApp para confirmar cualquier detalle.',
    previewLabel: 'Tu mensaje:',
    openWhatsappLabel: 'Abrir WhatsApp',
    messageTemplate: 'Hola Vida Mía 👋 Quiero hacer una consulta para *{{guests}} personas* el *{{date}}* a las *{{time}}*. Mi nombre es *{{name}}*.',
    whatsappNumber: '529999312679',
  },

  whatsapp: {
    number: '529999312679',
    defaultMessage: 'Hola Vida Mía, quiero información sobre desayuno o brunch.',
    floatingButton: true,
    ariaLabel: 'Contactar Vida Mía por WhatsApp',
  },

  location: {
    address: 'Calle 26 #214 x 63 y 65',
    city: 'Mérida',
    state: 'Yucatán',
    zip: '97115',
    country: 'México',
    googleMapsUrl: 'https://maps.google.com/?q=Vida+Mia+Restaurante+Merida+Montes+de+Ame',
    embedMapSrc: '',
    mapAriaLabel: 'Mapa de ubicación de Vida Mía Restaurante',
    mapImageAlt: 'Mapa de Vida Mía en Montes de Amé, Mérida',
    openMapsLabel: 'Abrir en Google Maps',
    hoursTitle: 'Horario',
    hours: [
      { day: 'Lunes – Domingo', hours: '8:00 am – 3:00 pm' },
    ],
    phone: '+52 999 931 2679',
    email: 'vidamiarestaurantemid@gmail.com',
  },

  social: {
    instagram: 'https://instagram.com/vidamiarestaurantemid',
    facebook: 'https://facebook.com/p/Vida-Mía-Restaurante-Mid-100063615966553',
  },

  uiCopy: {
    accessibility: {
      skipToContentLabel: 'Saltar al contenido',
      primaryNavLabel: 'Principal',
      dividerAriaLabel: 'Divisor',
    },
    mobileMenu: {
      triggerAriaLabel: 'Abrir menú móvil',
      dialogAriaLabel: 'Menú móvil',
      eyebrow: 'Navegación',
      closeAriaLabel: 'Cerrar menú',
    },
    reservationUi: {
      eyebrow: 'Escríbenos',
      closeAriaLabel: 'Cerrar',
      fields: {
        nameLabel: 'Nombre',
        namePlaceholder: 'Tu nombre',
        phoneLabel: 'Teléfono',
        phonePlaceholder: '+52 999 000 0000',
        dateLabel: 'Fecha',
        timeLabel: 'Hora',
        guestsLabel: 'Número de personas',
        guestsSuffix: 'personas',
        notesLabel: 'Notas',
        notesPlaceholder: 'Evento especial, alergias, preferencias…',
      },
      actions: {
        cancelLabel: 'Cancelar',
        confirmLabel: 'Enviar',
        closeLabel: 'Cerrar',
      },
      successEyebrow: 'Mensaje listo',
    },
    menuPageUi: {
      categoryNavAriaLabel: 'Secciones del menú',
    },
  },
};
