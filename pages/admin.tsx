import { useRouter } from "next/dist/client/router";
import { useEffect } from "react";
import { supabase } from "../lib/supabaseClient";

/**
 * @fileoverview Where all the customization happens
 * @function Admin
 * @remarks Worrying about overengineering. Hopefully it pays off
 */
const Admin = () => {
  const router = useRouter();

  // Redirect if not authed
  useEffect(() => {
    supabase.auth.getUser().then((res) => {
      res.data.user ? undefined : router.replace("/");
    });
  }, []);

  return <></>;
};
export default Admin;
