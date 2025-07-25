import { createClient } from "@/lib/supabaseServer";
import { redirect } from "next/navigation";
import createRoom from "../actions/createRoom";

export default async function DashboardPage() {
  const supabase = createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Welcome, {session.user.email}</h1>

      <form action={createRoom}>
        <button
          type="submit"
          className="mt-4 mr-4 rounded bg-green-600 px-4 py-2 text-white"
        >
          Create a room
        </button>
      </form>
    </div>
  );
}
