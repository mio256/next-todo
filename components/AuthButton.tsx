import signInWithGithub from "@/lib/auth/signInWithGithub";
import signOut from "@/lib/auth/signOut";
import { createClient } from "@/utils/supabase/server";

export default async function AuthButton() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user ? (
    <div className="flex items-center gap-4">
      Hey, {user.email}!
      <form action={signOut}>
        <button className="py-2 px-4 rounded-md no-underline bg-btn-background hover:bg-btn-background-hover">
          SingOut
        </button>
      </form>
    </div>
  ) : (
    <div className="flex items-center gap-4">
      <form action={signInWithGithub}>
        <button className="py-2 px-4 rounded-md no-underline bg-btn-background hover:bg-btn-background-hover">
          SingIn
        </button>
      </form>
    </div>
  );
}
