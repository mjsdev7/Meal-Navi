import "./Planner.css";
import { useState, useEffect } from "react";
import { Button, Menu, MenuItem, TextField } from "@mui/material";

import {
  getMeals,
  getRecipes,
  getMealPlans,
  createMeal,
  createMealPlan,
  deleteMealPlan,
  generateShoppingList,
  clearAllMealPlans,
} from "../services/api";

function Planner() {
  const [meals, setMeals] = useState({});
  const [availableMeals, setAvailableMeals] = useState([]);
  const [mealPlanIds, setMealPlanIds] = useState({});
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRecipe, setSelectedRecipe] = useState(null);

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
        const [mealsData, recipesData, plansData] = await Promise.all([
          getMeals(),
          getRecipes(),
          getMealPlans(),
        ]);

        const apiRecipes = recipesData.map((recipe) => ({
          ...recipe,
          cookingTime: 30,
          servings: 4,
        }));

        setAvailableMeals([...mealsData, ...apiRecipes]);

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
      let mealId = meal._id;

      if (!mealId) {
        const savedMeal = await createMeal(meal);
        mealId = savedMeal._id;
      }

      const savedPlan = await createMealPlan(mealId, day, mealType);

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
      setSearchTerm("");
      setSelectedRecipe(null);
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
      setSearchTerm("");
      setSelectedRecipe(null);
    } catch (error) {
      console.error("Error deleting meal plan:", error);
    }
  };

  const handleClearAllMeals = async () => {
    try {
      await clearAllMealPlans();

      setMeals({});
      setMealPlanIds({});
      setAnchorEl(null);
      setSelectedDay(null);
      setSelectedRecipe(null);
    } catch (error) {
      console.error("Error clearing all meal plans:", error);
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

        <Button
          variant="outlined"
          onClick={handleClearAllMeals}
          sx={{
            marginBottom: "20px",
            marginLeft: "10px",
            borderRadius: "25px",
            borderColor: "white",
            color: "white",
            "&:hover": {
              borderColor: "white",
              backgroundColor: "rgba(255,255,255,0.1)",
            },
          }}
        >
          Clear All Meals
        </Button>

        {selectedRecipe && (
          <div className="recipe-details">
            {selectedRecipe.image && (
              <img
                src={selectedRecipe.image}
                alt={selectedRecipe.name}
                width="300"
              />
            )}

            <h2>{selectedRecipe.name}</h2>

            <p>
              <strong>Category:</strong> {selectedRecipe.category}
            </p>

            <h3>Ingredients</h3>

            <ul>
              {selectedRecipe.ingredients?.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>

            <h3>Instructions</h3>

            <p>{selectedRecipe.instructions}</p>

            <Button
              variant="contained"
              onClick={() => handleMealSelect(selectedRecipe)}
            >
              Add to Planner
            </Button>

            <Button
              variant="outlined"
              onClick={() => setSelectedRecipe(null)}
              sx={{
                marginLeft: "10px",
              }}
            >
              Close
            </Button>
          </div>
        )}

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
            setSearchTerm("");
          }}
        >
          <TextField
            placeholder="Search meals..."
            size="small"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            sx={{ margin: "10px", width: "250px" }}
          />

          <MenuItem onClick={handleClearMeal}>Clear meal</MenuItem>

          {availableMeals
            .filter((meal) =>
              meal.name.toLowerCase().includes(searchTerm.toLowerCase()),
            )
            .map((meal, index) => (
              <MenuItem
                key={meal._id || `${meal.name}-${index}`}
                onClick={() => setSelectedRecipe(meal)}
              >
                {meal.name}
              </MenuItem>
            ))}
        </Menu>
      </div>
    </section>
  );
}

export default Planner;
