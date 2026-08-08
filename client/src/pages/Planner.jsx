import "./Planner.css";
import { useState } from "react";
import { Button, Menu, MenuItem } from "@mui/material";

function Planner() {
  const [meals, setMeals] = useState({});
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

  const handleMealSelect = (meal) => {
    setMeals({
      ...meals,
      [selectedDay]: meal,
    });

    setAnchorEl(null);
    setSelectedDay(null);
  };

  return (
    <section className="planner-page">
      <div className="planner-content">
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
          <MenuItem onClick={() => handleMealSelect("Pancakes")}>
            Pancakes
          </MenuItem>

          <MenuItem onClick={() => handleMealSelect("Eggs on Toast")}>
            Eggs on Toast
          </MenuItem>

          <MenuItem onClick={() => handleMealSelect("Yogurt & Berries")}>
            Yogurt & Berries
          </MenuItem>
        </Menu>
      </div>
    </section>
  );
}

export default Planner;
