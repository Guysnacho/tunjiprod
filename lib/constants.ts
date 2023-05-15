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

export type unformattedSong = {
  id: string;
  name: string;
  album: string;
  images: [
    {
      href: string;
      height: number;
      width: number;
    }
  ];
  artists: string[];
  previewUrl: string;
};

export const nullSong = {
  created_at: "",
  description: "",
  spotify_id: "",
  name: "",
  album: "",
  album_art: "", // Pick the second image in the list. Always 300px
  artists: [""],
  preview_url: "",
};

export { authCodes, urls, sectors };
