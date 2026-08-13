import "./Planner.css";
import { useState, useEffect } from "react";
import { Button, Menu, MenuItem } from "@mui/material";

function Planner() {
  const [meals, setMeals] = useState({});
  const [availableMeals, setAvailableMeals] = useState([]);
  const [mealPlanIds, setMealPlanIds] = useState({});
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
    const token = localStorage.getItem("token");

    fetch("http://localhost:3000/api/meals")
      .then((response) => response.json())
      .then((data) => {
        setAvailableMeals(data);
      })
      .catch((error) => {
        console.error("Error fetching meals:", error);
      });

    fetch("http://localhost:3000/api/mealplans", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const savedMeals = {};
        const savedMealPlanIds = {};

        data.forEach((mealPlan) => {
          const slot = `${mealPlan.day}-${mealPlan.mealType}`;

          savedMeals[slot] = mealPlan.meal.name;
          savedMealPlanIds[slot] = mealPlan._id;
        });

        setMeals(savedMeals);
        setMealPlanIds(savedMealPlanIds);
      })
      .catch((error) => {
        console.error("Error fetching meal plans:", error);
      });
  }, []);

  const handleMealSelect = async (meal) => {
    const [day, mealType] = selectedDay.split("-");

    try {
      const response = await fetch("http://localhost:3000/api/mealplans", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          meal: meal._id,
          day,
          mealType,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to save meal plan");
      }

      const savedMealPlan = await response.json();

      setMeals({
        ...meals,
        [selectedDay]: meal.name,
      });

      setMealPlanIds({
        ...mealPlanIds,
        [selectedDay]: savedMealPlan._id,
      });

      setAnchorEl(null);
      setSelectedDay(null);
    } catch (error) {
      console.error("Error saving meal plan:", error);
    }
  };

  const handleClearMeal = async () => {
    const mealPlanId = mealPlanIds[selectedDay];

    if (!mealPlanId) {
      setMeals({
        ...meals,
        [selectedDay]: "",
      });

      setAnchorEl(null);
      setSelectedDay(null);
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:3000/api/mealplans/${mealPlanId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );

      if (!response.ok) {
        throw new Error("Failed to delete meal plan");
      }

      const updatedMeals = { ...meals };
      const updatedMealPlanIds = { ...mealPlanIds };

      delete updatedMeals[selectedDay];
      delete updatedMealPlanIds[selectedDay];

      setMeals(updatedMeals);
      setMealPlanIds(updatedMealPlanIds);

      setAnchorEl(null);
      setSelectedDay(null);
    } catch (error) {
      console.error("Error deleting meal plan:", error);
    }
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
          <MenuItem onClick={handleClearMeal}>Clear meal</MenuItem>

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
