"use server";
import { createClient } from "@/lib/supabaseServer";
import { redirect } from "next/navigation";

export default async function createRoom() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data, error } = await supabase
    .from("rooms")
    .insert({
      name: "New room",
      created_by: user.id,
    })
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to create a room: ${error.message}`);
  }

  redirect(`/dashboard/room/${data.id}`);
}
