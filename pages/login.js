import { useRouter } from "next/router";
import Head from "next/head";
import { useState } from "react";
import Cookies from "js-cookie";

import { InputField, Button } from "../components";

import styles from "../styles/Login.module.scss";

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
    <div className={styles.container}>
      <Head>
        <title>Login</title>
      </Head>
      <form className={styles.loginBox} onSubmit={handleSubmit}>
        <InputField
          className={styles.userField}
          id="username"
          name="username"
          required
          onChange={handleChange}
          value={formData.username}
          label="Username"
        />
        <InputField
          className={styles.passField}
          label="Password"
          type="password"
          id="password"
          name="password"
          required
          onChange={handleChange}
          value={formData.password}
        />
        <Button className={styles.loginButton} type="submit">
          Login
        </Button>
        {error && <div className={styles.errorField}>{error}</div>}
      </form>
    </div>
  );
};

export default Login;
