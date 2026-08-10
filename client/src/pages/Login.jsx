import "./Login.css";
import { TextField, Button } from "@mui/material";
import { useState } from "react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost:3000/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }

        throw new Error("Login failed");
      })
      .then((data) => {
        console.log(data);
        alert("Login successful!");
      })
      .catch((error) => {
        console.error(error);
        alert("Invalid email or password.");
      });
  };

  return (
    <section className="login-page">
      <div className="login-card">
        <h1>Welcome Back</h1>

        <p>Log in to continue planning your meals.</p>

        <form className="login-form" onSubmit={handleSubmit}>
          <TextField
            label="Email"
            type="email"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              marginTop: "20px",
              padding: "12px",
              borderRadius: "25px",
              backgroundColor: "#F7B267",
              "&:hover": {
                backgroundColor: "#E89A5A",
              },
            }}
          >
            Log In
          </Button>
        </form>
      </div>
    </section>
  );
}

export default Login;
