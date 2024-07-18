"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

export default async function signOut() {
  const supabase = createClient();
  await supabase.auth.signOut();
  return redirect("/");
}
