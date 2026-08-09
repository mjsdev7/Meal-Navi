import "./Login.css";
import { TextField, Button } from "@mui/material";

function Login() {
  return (
    <section className="login-page">
      <div className="login-card">
        <h1>Welcome Back</h1>

        <p>Log in to continue planning your meals.</p>

        <form className="login-form">
          <TextField label="Email" type="email" fullWidth margin="normal" />

          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
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
