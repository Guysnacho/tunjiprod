import { supabase } from "./supabaseClient";

const logSuccess = (sector: string, message: string, data?: any) => {
  console.debug(message);
  supabase
    .from("logs")
    .insert({
      status: 1,
      sector: sector,
      message: message,
      data: data,
      environment: process.env.NODE_ENV,
    })
    .then();
};

const logError = (sector: string, message: string, data?: any) => {
  console.debug(message);
  supabase
    .from("logs")
    .insert({
      status: 2,
      sector: sector,
      message: message,
      data: data,
      environment: process.env.NODE_ENV,
    })
    .then();
};

const logNeutral = (sector: string, message: string, data?: any) => {
  console.debug(message);
  supabase
    .from("logs")
    .insert({
      status: 3,
      sector: sector,
      message: message,
      data: data,
      environment: process.env.NODE_ENV,
    })
    .then();
};

export { logError, logNeutral, logSuccess };
