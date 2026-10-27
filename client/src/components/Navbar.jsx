import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const token = localStorage.getItem("token");

  const closeMenu = () => setMenuOpen(false);

  const handleAboutClick = (event) => {
    event.preventDefault();
    closeMenu();

    if (window.location.pathname === "/") {
      document.getElementById("about")?.scrollIntoView({
        behavior: "smooth",
      });
    } else {
      navigate("/");
      setTimeout(() => {
        document.getElementById("about")?.scrollIntoView({
          behavior: "smooth",
        });
      }, 100);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    closeMenu();
    navigate("/");
    window.location.reload();
  };

  const linkStyle = {
    color: "#242424",
    textDecoration: "none",
    fontSize: "13px",
    fontFamily: "Arial, sans-serif",
    letterSpacing: "0.3px",
    whiteSpace: "nowrap",
  };

  const pageLinkStyle = {
    ...linkStyle,
    display: "inline-block",
  };

  return (
    <header style={{ background: "#FFFFFF", color: "#242424" }}>
      <nav
        style={{
          minHeight: "76px",
          padding: "0 6%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "24px",
          borderBottom: "1px solid #E5E1DA",
          position: "relative",
          zIndex: 10,
        }}
      >
        <Link
          to="/"
          onClick={closeMenu}
          style={{
            ...linkStyle,
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <span
            style={{
              width: "38px",
              height: "38px",
              background: "#171717",
              color: "#C7A56A",
              display: "grid",
              placeItems: "center",
              fontFamily: "Georgia, serif",
              fontSize: "15px",
              letterSpacing: "-1px",
            }}
          >
            M|N
          </span>

          <span
            style={{
              fontFamily: "Georgia, serif",
              fontSize: "21px",
              letterSpacing: "-0.5px",
            }}
          >
            Meal-Navi
          </span>
        </Link>

        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
          style={{
            display: "none",
            border: "1px solid #D8D2C8",
            background: "white",
            padding: "8px 12px",
            cursor: "pointer",
          }}
          className="meal-navi-menu-toggle"
        >
          Menu
        </button>

        <div
          className={`meal-navi-nav-links ${menuOpen ? "is-open" : ""}`}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "26px",
            flexWrap: "wrap",
          }}
        >
          <a href="/#about" onClick={handleAboutClick} style={pageLinkStyle}>
            About
          </a>

          <Link to="/planner" onClick={closeMenu} style={pageLinkStyle}>
            Planner
          </Link>

          <Link to="/shopping-list" onClick={closeMenu} style={pageLinkStyle}>
            Shopping List
          </Link>

          {token ? (
            <button
              type="button"
              onClick={handleLogout}
              style={{
                ...linkStyle,
                background: "none",
                border: "none",
                padding: 0,
                cursor: "pointer",
              }}
            >
              Log Out
            </button>
          ) : (
            <>
              <Link to="/login" onClick={closeMenu} style={pageLinkStyle}>
                Log In
              </Link>

              <Link
                to="/register"
                onClick={closeMenu}
                style={{
                  ...pageLinkStyle,
                  background: "#242424",
                  color: "#FFFFFF",
                  padding: "12px 20px",
                }}
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </nav>

      <div
        style={{
          minHeight: "44px",
          padding: "10px 6%",
          boxSizing: "border-box",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "12px",
          borderBottom: "1px solid #E5E1DA",
          fontSize: "11px",
          letterSpacing: "0.5px",
          color: "#6B665F",
        }}
      >
        <span style={{ fontWeight: 600, color: "#242424" }}>
          MN <span style={{ color: "#C7A56A" }}>·</span> MEAL PLANNING
        </span>

        <span>Thoughtful design. Seamless planning. Better mealtimes.</span>
      </div>

      <style>{`
        @media (max-width: 760px) {
          .meal-navi-menu-toggle {
            display: block !important;
          }

          .meal-navi-nav-links {
            display: none !important;
            position: absolute;
            top: 75px;
            left: 0;
            right: 0;
            padding: 20px 6%;
            background: #FFFFFF;
            border-bottom: 1px solid #E5E1DA;
            flex-direction: column;
            align-items: flex-start !important;
            gap: 20px !important;
          }

          .meal-navi-nav-links.is-open {
            display: flex !important;
          }
        }

        @media (max-width: 480px) {
          .meal-navi-nav-links {
            top: 75px;
          }
        }
      `}</style>
    </header>
  );
}

export default Navbar;
