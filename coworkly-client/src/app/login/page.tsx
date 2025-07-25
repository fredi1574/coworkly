"use client";
import { createClient } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const supabase = createClient();
  const router = useRouter();

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert(error.message);
    } else {
      console.log("Login successful");
      router.push("/dashboard");
    }
  };

  // const handleSignup = async () => {
  //   const { error } = await supabase.auth.signUp({ email, password });
  //   if (error) {
  //     console.error(error.message);
  //   } else {
  //     console.log("Signup successful");
  //     redirect("/dashboard");
  //   }
  // };

  return (
    <form onSubmit={handleLogin}>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Log In</button>
    </form>
  );
}
