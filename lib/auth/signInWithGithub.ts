"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

const defaultUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000";

export default async function signInWithGithub() {
    const supabase = createClient();

    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "github",
        options: {
            redirectTo: `${defaultUrl}/auth/callback`,
        },
    });

    if (error) {
        return redirect("/error");
    }

    return redirect(data.url);
}
