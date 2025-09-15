import { useState } from "react";
import Router from "next/router";
export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  async function submit(e) {
    e.preventDefault();
    const res = await fetch("http://localhost:8000/api/auth/token/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    const data = await res.json();
    if (data.access) {
      localStorage.setItem("token", data.access);
      alert("Logged in!");
      Router.push("/");
    } else {
      alert("Login failed");
    }
  }
  return (
    <form onSubmit={submit} style={{ padding: 20 }}>
      <h1>Login</h1>
      <input
        placeholder="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <br />
      <input
        placeholder="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <button>Login</button>
    </form>
  );
}
