import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";

export default async function RoomPage({ params }: { params: { id: string } }) {
  const { id } = params;

  const supabase = createServerComponentClient({ cookies });
  const { data: room } = await supabase
    .from("rooms")
    .select("*")
    .eq("id", id)
    .single();

  if (!room) {
    notFound();
  }

  return (
    <div className="p-6">
      <h1 className="mb-4 text-3xl font-bold">Room: {room.name}</h1>
      <p>Room ID: {room.id}</p>
    </div>
  );
}
