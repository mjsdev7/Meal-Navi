import "./Planner.css";
import { useState, useEffect } from "react";
import { Button, Menu, MenuItem } from "@mui/material";

import {
  getMeals,
  getMealPlans,
  createMealPlan,
  deleteMealPlan,
  generateShoppingList,
} from "../services/api";

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
    const loadPlanner = async () => {
      try {
        const [mealsData, plansData] = await Promise.all([
          getMeals(),
          getMealPlans(),
        ]);

        setAvailableMeals(mealsData);

        const savedMeals = {};
        const savedIds = {};

        plansData.forEach((mealPlan) => {
          const key = `${mealPlan.day}-${mealPlan.mealType}`;

          savedMeals[key] = mealPlan.meal.name;
          savedIds[key] = mealPlan._id;
        });

        setMeals(savedMeals);
        setMealPlanIds(savedIds);
      } catch (error) {
        console.error("Error loading planner:", error);
      }
    };

    loadPlanner();
  }, []);

  const handleMealSelect = async (meal) => {
    const [day, mealType] = selectedDay.split("-");

    try {
      const savedPlan = await createMealPlan(meal._id, day, mealType);

      setMeals({
        ...meals,
        [selectedDay]: meal.name,
      });

      setMealPlanIds({
        ...mealPlanIds,
        [selectedDay]: savedPlan._id,
      });

      setAnchorEl(null);
      setSelectedDay(null);
    } catch (error) {
      console.error("Error saving meal plan:", error);
    }
  };

  const handleClearMeal = async () => {
    const mealPlanId = mealPlanIds[selectedDay];

    try {
      if (mealPlanId) {
        await deleteMealPlan(mealPlanId);
      }

      const updatedMeals = { ...meals };
      const updatedIds = { ...mealPlanIds };

      delete updatedMeals[selectedDay];
      delete updatedIds[selectedDay];

      setMeals(updatedMeals);
      setMealPlanIds(updatedIds);

      setAnchorEl(null);
      setSelectedDay(null);
    } catch (error) {
      console.error("Error deleting meal plan:", error);
    }
  };

  const handleGenerateShoppingList = async () => {
    try {
      await generateShoppingList();

      alert("Shopping list generated!");
    } catch (error) {
      console.error("Error generating shopping list:", error);

      alert("Could not generate shopping list.");
    }
  };

  return (
    <section className="planner-section">
      <div className="planner-container">
        <h1>Weekly Meal Planner</h1>

        <p>Plan your meals for the week and stay organised.</p>

        <Button
          variant="contained"
          onClick={handleGenerateShoppingList}
          sx={{
            marginBottom: "20px",
            borderRadius: "25px",
            backgroundColor: "#F7B267",
            "&:hover": {
              backgroundColor: "#E89A5A",
            },
          }}
        >
          Generate Shopping List
        </Button>

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
