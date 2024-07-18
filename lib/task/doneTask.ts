"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

export default async function doneTask(id: number) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/");
  }

  const { error } = await supabase
    .from("tasks")
    .update({ done: true })
    .eq("id", id);

  if (error) {
    console.log(error);
    return redirect("/error");
  }

  return redirect("/protected");
}
