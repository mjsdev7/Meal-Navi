import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";

function Navbar() {
  return (
    <AppBar
      position="absolute"
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
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Typography fontSize="28px">🍲</Typography>

          <Typography fontWeight="bold" fontSize="24px">
            Meal Navi
          </Typography>
        </Box>

        <Box>
          <Button color="inherit">Features</Button>
          <Button color="inherit">How It Works</Button>
          <Button color="inherit">About</Button>
          <Button color="inherit">Log In</Button>
          <Button color="inherit">Sign Up</Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
