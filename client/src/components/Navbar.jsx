import { useEffect, useState } from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const [showNavbar, setShowNavbar] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setShowNavbar(window.scrollY <= 10);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        background: "transparent",
        boxShadow: "none",
        color: "white",
        opacity: showNavbar ? 1 : 0,
        visibility: showNavbar ? "visible" : "hidden",
        pointerEvents: showNavbar ? "auto" : "none",
        transition: "opacity 0.3s ease-in-out, visibility 0.3s ease-in-out",
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          padding: {
            xs: "15px 20px",
            md: "20px 60px",
          },
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

        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: {
              xs: "center",
              md: "flex-end",
            },
            gap: {
              xs: 0,
              md: 0.5,
            },
          }}
        >
          <Button color="inherit" component={Link} to="/features">
            Features
          </Button>

          <Button color="inherit" component={Link} to="/how-it-works">
            How It Works
          </Button>

          {token ? (
            <>
              <Button color="inherit" component={Link} to="/planner">
                Planner
              </Button>

              <Button color="inherit" component={Link} to="/shopping-list">
                Shopping List
              </Button>

              <Button color="inherit" onClick={handleLogout}>
                Log Out
              </Button>
            </>
          ) : (
            <>
              <Button color="inherit" component={Link} to="/login">
                Log In
              </Button>

              <Button color="inherit" component={Link} to="/register">
                Sign Up
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
