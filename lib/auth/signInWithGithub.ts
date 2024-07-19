"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import baseURL from "@/utils/vercel/url";

export default async function signInWithGithub() {
  const supabase = createClient();

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "github",
    options: {
      redirectTo: `${baseURL()}/auth/callback`,
    },
  });

  if (error) {
    return redirect("/error");
  }

  return redirect(data.url);
}
