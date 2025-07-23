import { supabase } from "@/lib/supabaseClient";

export default function SignOutButton() {
  return (
    <button
      className="mt-4 rounded bg-red-500 px-4 py-2 text-white"
      onClick={() => supabase.auth.signOut()}
    >
      Sign out
    </button>
  );
}
