const authCodes = {
  AUTHREQUEST: "LOGIN",
  SIGNUPREQUEST: "SIGNUP",
  REDIRECT: "REDIRECT",
};

const urls = {
  DEVURL: "http://localhost:3000/admin",
  PRODURL: "https://www.tunjiproductions.com/admin",
};

const sectors = {
  apiSpotify: "API - Spotify",
  generalApi: "API - Tunji",
  supabase: "Supabase",
  feSpotify: "Frontend - Spotify",
  extSpotify: "External - Spotify",
};

export type top10 = {
  name: string;
  images: [
    {
      href: string;
      height: number;
      width: number;
    }
  ];
  artists: [string];
  previewUrl: string;
};

export { authCodes, urls, sectors };
