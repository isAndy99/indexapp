import { useRouter } from "next/router";
import { useState } from "react";
import Cookies from "js-cookie";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        setError("");

        const body = {
          username,
          password,
        };

        const response = await fetch("api/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });

        const result = await response.json();

        if (result.error) {
          setError(result.error);
          return;
        }

        Cookies.set("token", result.token);

        router.push("/");
      }}
    >
      <label htmlFor="username">Username</label>
      <input
        type="username"
        id="username"
        name="username"
        placeholder="Username"
        required
        onChange={(e) => setUsername(e.target.value)}
        value={username}
      />
      <label htmlFor="password">Password</label>
      <input
        type="password"
        id="password"
        name="password"
        placeholder="Password"
        required
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      <button type="submit">Login</button>
      {/* <button
        onClick={(e) => {
          e.preventDefault();
          Cookies.remove("token");
          router.push("/login");
        }}
      >
        Logout
      </button> */}
      {error && <span>{error}</span>}
    </form>
  );
};

export default Login;
