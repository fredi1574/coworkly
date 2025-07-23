"use client";
import { useSession } from "@supabase/auth-helpers-react";
import { redirect } from "next/navigation";
import SignOutButton from "./SignOutButton";

export default function DashboardPage() {
  const session = useSession();

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Welcome, {session.user.email}</h1>
      <SignOutButton />
    </div>
  );
}
