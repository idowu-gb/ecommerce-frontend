import { useState } from "react";
import Router from "next/router";
import { setTokens } from "../lib/auth";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [error, setError] = useState(null);

  async function submit(e) {
    e.preventDefault();
    setError(null);
    const res = await fetch(`${API}/api/auth/register/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password, password2 }),
    });
    const data = await res.json();
    if (res.ok) {
      setTokens(data.access, data.refresh);
      Router.push("/");
    } else {
      setError(JSON.stringify(data));
    }
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Sign up</h1>
      <form onSubmit={submit}>
        <input
          placeholder="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <br />
        <input
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <input
          placeholder="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <input
          placeholder="confirm password"
          type="password"
          value={password2}
          onChange={(e) => setPassword2(e.target.value)}
        />
        <br />
        <button type="submit">Sign up</button>
      </form>
      {error && <pre style={{ color: "red" }}>{error}</pre>}
    </div>
  );
}
