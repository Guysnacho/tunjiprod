declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT?: string;
      NODE_ENV: "development" | "production" | "test";

      NEXT_PUBLIC_LATE_REGISTRATION: string;
      NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: string;
      NEXT_PUBLIC_SUPABASE_PUB_KEY: string;
      NEXT_PUBLIC_SUPABASE_URL: string;
      SERVER_RESEND_KEY: string;
      STRIPE_SECRET_KEY: string;
      SUPABASE_SERVER_KEY: string;
      SUPABASE_SIGNING_KEY: string;
      NEXT_PUBLIC_ORG_ID: string;
      NEXT_PUBLIC_APP_URL: string;
    }
  }
}

export {};
