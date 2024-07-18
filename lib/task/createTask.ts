"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

export default async function createTask(userId: string, title: string) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/");
  }

  const { error } = await supabase.from("tasks").insert([
    {
      user_id: userId,
      title: title,
      done: false,
    },
  ]);

  if (error) {
    console.log(error);
    return redirect("/error");
  }

  return redirect("/protected");
}
