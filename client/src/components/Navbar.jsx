import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <AppBar
      position="fixed"
      sx={{
        background: "transparent",
        boxShadow: "none",
        color: "white",
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          padding: "20px 60px",
        }}
      >
        <Box
          component={Link}
          to="/"
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            color: "inherit",
            textDecoration: "none",
          }}
        >
          <Typography fontSize="28px">🍲</Typography>

          <Typography fontWeight="bold" fontSize="24px">
            Meal Navi
          </Typography>
        </Box>

        <Box>
          <Button color="inherit" component={Link} to="/features">
            Features
          </Button>

          <Button color="inherit" component={Link} to="/how-it-works">
            How It Works
          </Button>

          <Button color="inherit" component={Link} to="/planner">
            Planner
          </Button>

          <Button color="inherit" component={Link} to="/shopping-list">
            Shopping List
          </Button>

          <Button color="inherit" component={Link} to="/login">
            Log In
          </Button>

          <Button color="inherit" component={Link} to="/register">
            Sign Up
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
