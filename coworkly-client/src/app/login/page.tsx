"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { redirect } from "next/navigation";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error(error.message);
    } else {
      console.log("Login successful");
      redirect("/dashboard");
    }
  };

  const handleSignup = async () => {
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) {
      console.error(error.message);
    } else {
      console.log("Signup successful");
      redirect("/dashboard");
    }
  };

  return (
    <div className="mx-auto max-w-sm p-4">
      <h1 className="mb-4 text-xl font-bold">Log in or Sign Up</h1>
      <input
        className="mb-2 w-full border p-2"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="mb-2 w-full border p-2"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <div className="flex justify-between">
        <button className="bg-blue-600 p-2 text-white" onClick={handleLogin}>
          Log In
        </button>
        <button className="bg-green-600 p-2 text-white" onClick={handleSignup}>
          Sign Up
        </button>
      </div>
    </div>
  );
}
