type Highlight = {
  label: string;
  blurb: string;
  url?: string;
  header?: string;
};

export const highlights: Highlight[] = [
  {
    label: "TwoTone - Music",
    blurb:
      "TwoTone, a spot for music lovers to share the tracks that mean something to them.",
    header: "https://twotone.app/_app/immutable/assets/logo.D0G0UcNF.png",
    url: "https://twotone.app",
  },
  {
    label: "Tunji Productions x Nuxt",
    blurb:
      "Not my first rodeo with Vue but was a learning experience for sure. I think I was scared because at the time, I was a bad engineer. Fixed that.",
    header: "",
  },
  {
    label: "Kabu P.2 Electric Boogaloo",
    blurb:
      "After an eternity of waiting, sharpening my skills, honing my craft, I decided to pay a legacy project a visit.",
    header: "",
    url: "http://deprestigechauffeur.netlify.app/",
  },
];
