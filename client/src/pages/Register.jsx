import "./Register.css";
import { TextField, Button } from "@mui/material";

function Register() {
  return (
    <section className="register-page">
      <div className="register-card">
        <h1>Create Your Account</h1>
        <p>Join Meal Navi and start planning your meals.</p>

        <form className="register-form">
          <TextField label="Name" type="text" fullWidth margin="normal" />

          <TextField label="Email" type="email" fullWidth margin="normal" />

          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
          />

          <TextField
            label="Confirm Password"
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
            Create Account
          </Button>
        </form>
      </div>
    </section>
  );
}

export default Register;
