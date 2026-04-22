import { BusinessConfig } from "../business.config";

export const DEFAULT_RESTAURANT_PRESET: Partial<BusinessConfig> = {
  category: "restaurant",
  brand: {
    primaryColor: "#b0804e",
    accentColor: "#d2ab67",
    bgBase: "#f8f2eb",
    fontDisplay: "Cormorant Garamond",
    fontBody: "Inter",
    darkMode: false,
  },
  cta: {
    reservationLabel: "Reservar",
    whatsappLabel: "WhatsApp",
    stickyLabel: "Reservar ahora",
  },
  navigation: {
    homeLabel: "Inicio",
    menuLabel: "Menú",
    aboutLabel: "Nosotros",
    contactLabel: "Contacto",
  },
  footer: {
    copyrightLabel: "Todos los derechos reservados",
    navigationHeading: "Navegación",
    hoursHeading: "Horarios",
    contactHeading: "Contacto",
  },
  uiCopy: {
    accessibility: {
      skipToContentLabel: "Saltar al contenido",
      primaryNavLabel: "Principal",
      dividerAriaLabel: "Divisor",
    },
    mobileMenu: {
      triggerAriaLabel: "Abrir menú móvil",
      dialogAriaLabel: "Menú móvil",
      eyebrow: "Navegación",
      closeAriaLabel: "Cerrar menú",
    },
    reservationUi: {
      eyebrow: "Mesa para ti",
      closeAriaLabel: "Cerrar modal",
      fields: {
        nameLabel: "Nombre",
        namePlaceholder: "Tu nombre",
        phoneLabel: "Teléfono",
        phonePlaceholder: "+52 999 000 0000",
        dateLabel: "Fecha",
        timeLabel: "Hora",
        guestsLabel: "Número de personas",
        guestsSuffix: "personas",
        notesLabel: "Notas especiales",
        notesPlaceholder: "Alergias, celebraciones, área preferida…",
      },
      actions: {
        cancelLabel: "Cancelar",
        confirmLabel: "Confirmar",
        closeLabel: "Cerrar",
      },
      successEyebrow: "Listo para continuar",
    },
    menuPageUi: {
      categoryNavAriaLabel: "Secciones del menú",
    },
  },
};
