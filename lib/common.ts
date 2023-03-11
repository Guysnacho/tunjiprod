import { supabase } from "./supabaseClient";

const logSuccess = (sector: string, message: string, data?: any) => {
  supabase.from("logs").insert({
    status: 1,
    sector: sector,
    message: message,
    data: data,
  });
};

const logError = (sector: string, message: string, data?: any) => {
  supabase.from("logs").insert({
    status: 2,
    sector: sector,
    message: message,
    data: data,
  });
};

const logNeutral = (sector: string, message: string, data?: any) => {
  supabase
    .from("logs")
    .insert({
      status: 3,
      sector: sector,
      message: message,
      data: data,
    })
    .then();
};

export { logSuccess, logError, logNeutral };
