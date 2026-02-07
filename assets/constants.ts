type Highlight = {
  label: string;
  blurb: string;
  url?: string;
  header?: string;
};

export const highlights: Highlight[] = [
  {
    label: "MCBIOS Overhaul",
    blurb:
      "We recently completed a full redesign and rebuild of the MidSouth Computational Biology and Bioinformatics Society's conference platform and it's a testament to what happens when you truly understand your client's needs.",
    header: "https://mcbios.com/images/logo.jpg",
    url: "https://mcbios.com",
  },
  {
    label: "De Prestige Chauffeur",
    blurb:
      "Experience world-class personalized chauffeur service for business and leisure. Seamless luxury transportation that redefines your journey.",
    header: "https://deprestigechauffeur.com/logo.png",
    url: "http://deprestigechauffeur.com",
  },
  {
    label: "TwoTone - Music",
    blurb:
      "TwoTone, a spot for music lovers to share the tracks that mean something to them.",
    header: "https://twotone.app/assets/icon.png",
    url: "https://twotone.app",
  },
  {
    label: "Tunji Productions x Nuxt",
    blurb:
      "Not my first rodeo with Vue but was a learning experience for sure. I think I was scared because at the time, I was a bad engineer. Fixed that.",
    header: "/img/logo_clear.png",
  },
];
