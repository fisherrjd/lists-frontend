import React, { useState } from "react";
import "./index.css";

type FormType = "register" | "login";

function AuthForm({ type }: { type: FormType }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);
    try {
      const body: any = { username, password };
      if (type === "register") body.email = email;
      const res = await fetch(`/auth/${type}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      setMessage(data.message || JSON.stringify(data));
    } catch (err) {
      if (err instanceof Error) {
        setMessage("Error: " + err.message);
      } else {
        setMessage("An unknown error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form style={{ marginBottom: 24 }} onSubmit={handleSubmit}>
      <h2>{type === "register" ? "Register" : "Login"}</h2>
      <input
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
        style={{ display: "block", marginBottom: 8 }}
      />
      {type === "register" && (
        <input
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ display: "block", marginBottom: 8 }}
        />
      )}
      <input
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        style={{ display: "block", marginBottom: 8 }}
      />
      <button type="submit" disabled={loading}>
        {type === "register" ? "Register" : "Login"}
      </button>
      {message && <div style={{ marginTop: 8 }}>{message}</div>}
    </form>
  );
}

export default function App() {
  const [formType, setFormType] = useState<FormType>("login");
  return (
    <div className="app-container">
      <h1>Auth Demo</h1>
      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        <button
          type="button"
          onClick={() => setFormType("login")}
          style={{ fontWeight: formType === "login" ? "bold" : "normal" }}
        >
          Login
        </button>
        <button
          type="button"
          onClick={() => setFormType("register")}
          style={{ fontWeight: formType === "register" ? "bold" : "normal" }}
        >
          Register
        </button>
      </div>
      <AuthForm type={formType} />
    </div>
  );
}
