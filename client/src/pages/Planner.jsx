import "./Planner.css";
import { useState, useEffect } from "react";
import { Button, Menu, MenuItem } from "@mui/material";

function Planner() {
  const [meals, setMeals] = useState({});
  const [availableMeals, setAvailableMeals] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null);

  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  useEffect(() => {
    fetch("http://localhost:3000/api/meals")
      .then((response) => response.json())
      .then((data) => {
        setAvailableMeals(data);
      })
      .catch((error) => {
        console.error("Error fetching meals:", error);
      });
  }, []);

  const handleMealSelect = (meal) => {
    setMeals({
      ...meals,
      [selectedDay]: meal.name,
    });

    setAnchorEl(null);
    setSelectedDay(null);
  };

  return (
    <section className="planner-section">
      <div className="planner-container">
        <h1>Weekly Meal Planner</h1>
        <p>Plan your meals for the week and stay organised.</p>

        <div className="planner-grid">
          {days.map((day) => (
            <div className="day-card" key={day}>
              <h2>{day}</h2>

              <div className="meal-slot">
                <span>🌅</span>
                <h3>Breakfast</h3>

                <Button
                  variant="outlined"
                  onClick={(event) => {
                    setAnchorEl(event.currentTarget);
                    setSelectedDay(`${day}-breakfast`);
                  }}
                >
                  {meals[`${day}-breakfast`] || "Choose a meal"}
                </Button>
              </div>

              <div className="meal-slot">
                <span>☀️</span>
                <h3>Lunch</h3>

                <Button
                  variant="outlined"
                  onClick={(event) => {
                    setAnchorEl(event.currentTarget);
                    setSelectedDay(`${day}-lunch`);
                  }}
                >
                  {meals[`${day}-lunch`] || "Choose a meal"}
                </Button>
              </div>

              <div className="meal-slot">
                <span>🌙</span>
                <h3>Dinner</h3>

                <Button
                  variant="outlined"
                  onClick={(event) => {
                    setAnchorEl(event.currentTarget);
                    setSelectedDay(`${day}-dinner`);
                  }}
                >
                  {meals[`${day}-dinner`] || "Choose a meal"}
                </Button>
              </div>
            </div>
          ))}
        </div>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={() => {
            setAnchorEl(null);
            setSelectedDay(null);
          }}
        >
          {availableMeals.map((meal) => (
            <MenuItem key={meal._id} onClick={() => handleMealSelect(meal)}>
              {meal.name}
            </MenuItem>
          ))}
        </Menu>
      </div>
    </section>
  );
}

export default Planner;
