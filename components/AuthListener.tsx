import { useUserStore } from "@/lib/store";
import { createClient } from "@/lib/supabase/client";
import { useEffect } from "react";

export default function AuthListener() {
  const client = createClient();
  const store = useUserStore();

  async function hydrateUser(id: string) {
    const { data } = await client
      .from("member")
      .select("role")
      .eq("user_id", id)
      .eq("org_id", process.env.NEXT_PUBLIC_ORG_ID)
      .maybeSingle();

    if (data) {
      store.setId(id);
      store.setRole(data.role);
    }
  }

  useEffect(() => {
    const {
      data: { subscription },
    } = client.auth.onAuthStateChange((_, session) => {
      if (session) {
        hydrateUser(session.user.id);
      } else {
        store.setId();
        store.setRole(undefined);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);
  return null;
}
