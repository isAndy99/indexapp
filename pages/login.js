import { useRouter } from "next/router";
import { useState } from "react";
import Cookies from "js-cookie";

const initialFormData = {
  username: "",
  password: "",
};

const Login = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [error, setError] = useState("");

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const body = {
      username: formData.username,
      password: formData.password,
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
  };

  const handleChange = (e) => {
    const { name, value } = e.currentTarget;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="username">Username</label>
      <input
        type="username"
        id="username"
        name="username"
        placeholder="Username"
        required
        onChange={handleChange}
        value={formData.username}
      />
      <label htmlFor="password">Password</label>
      <input
        type="password"
        id="password"
        name="password"
        placeholder="Password"
        required
        onChange={handleChange}
        value={formData.password}
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
