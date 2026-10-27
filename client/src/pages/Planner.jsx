import "./Planner.css";
import mealPlannerBanner from "../images/meal-planner-banner.jpg";

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

const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const mealTypes = [
  { key: "breakfast", label: "Breakfast" },
  { key: "lunch", label: "Lunch" },
  { key: "dinner", label: "Dinner" },
];

function Planner() {
  const [meals, setMeals] = useState({});
  const [availableMeals, setAvailableMeals] = useState([]);
  const [mealPlanIds, setMealPlanIds] = useState({});
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRecipe, setSelectedRecipe] = useState(null);

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

  useEffect(() => {
    if (selectedRecipe) {
      document
        .querySelector(".recipe-details")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [selectedRecipe]);

  const handleMealSelect = async (meal) => {
    if (!selectedDay) return;

    const [day, mealType] = selectedDay.split("-");

    try {
      let mealId = meal._id;

      if (!mealId) {
        const savedMeal = await createMeal(meal);
        mealId = savedMeal._id;
      }

      const savedPlan = await createMealPlan(mealId, day, mealType);

      setMeals((previous) => ({
        ...previous,
        [selectedDay]: meal.name,
      }));

      setMealPlanIds((previous) => ({
        ...previous,
        [selectedDay]: savedPlan._id,
      }));

      setAnchorEl(null);
      setSelectedDay(null);
      setSearchTerm("");
      setSelectedRecipe(null);
    } catch (error) {
      console.error("Error saving meal plan:", error);
    }
  };

  const handleClearMeal = async () => {
    if (!selectedDay) return;

    const mealPlanId = mealPlanIds[selectedDay];

    try {
      if (mealPlanId) await deleteMealPlan(mealPlanId);

      setMeals((previous) => {
        const updated = { ...previous };
        delete updated[selectedDay];
        return updated;
      });

      setMealPlanIds((previous) => {
        const updated = { ...previous };
        delete updated[selectedDay];
        return updated;
      });

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
      setSearchTerm("");
    } catch (error) {
      console.error("Error clearing all meals:", error);
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

  const openMealMenu = (event, day, mealType) => {
    setAnchorEl(event.currentTarget);
    setSelectedDay(`${day}-${mealType}`);
    setSearchTerm("");
    setSelectedRecipe(null);
  };

  const closeMealMenu = () => {
    setAnchorEl(null);
    setSearchTerm("");
  };

  const filteredMeals = availableMeals
    .filter((meal) =>
      meal.name.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    .sort((a, b) => a.name.localeCompare(b.name));

  return (
    <section className="planner-section">
      <div className="planner-container">
        <header className="planner-intro">
          <p className="planner-eyebrow">MN · MEAL PLANNING</p>

          <p className="planner-tagline">
            Thoughtful design. Seamless planning. Better mealtimes.
          </p>

          <h1>Plan Your Week, Make Mealtimes Easier</h1>

          <p className="planner-description">
            Plan your breakfasts, lunches, and dinners in one convenient place.
            Discover meals your family will love, build a weekly meal plan,
            reduce food waste, and make grocery shopping simpler.
          </p>

          <p className="planner-instructions">
            Select a meal for each day to add your chosen dishes. When your plan
            is ready, create your shopping list.
          </p>
        </header>

        <div className="planner-banner">
          <img
            src={mealPlannerBanner}
            alt="Fresh ingredients prepared for weekly meal planning"
          />
        </div>

        {selectedRecipe && (
          <div className="recipe-details">
            {selectedRecipe.image && (
              <img src={selectedRecipe.image} alt={selectedRecipe.name} />
            )}

            <h2>{selectedRecipe.name}</h2>

            {selectedRecipe.category && (
              <p>
                <strong>Category:</strong> {selectedRecipe.category}
              </p>
            )}

            <h3>Ingredients</h3>
            <ul>
              {selectedRecipe.ingredients?.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>

            <h3>Instructions</h3>
            <p>{selectedRecipe.instructions}</p>

            <Button
              className="planner-primary-button"
              variant="contained"
              onClick={() => handleMealSelect(selectedRecipe)}
            >
              Add to Planner
            </Button>
          </div>
        )}

        <div className="planner-grid">
          {days.map((day) => (
            <div className="day-row" key={day}>
              <h2 className="day-heading">{day}</h2>

              <div className="day-card">
                {mealTypes.map(({ key, label }) => {
                  const slotKey = `${day}-${key}`;

                  return (
                    <div className="meal-slot" key={key}>
                      <Button
                        className="meal-select-button"
                        variant="outlined"
                        aria-label={`${label} for ${day}`}
                        onClick={(event) => openMealMenu(event, day, key)}
                      >
                        <span className="meal-select-label">
                          {meals[slotKey] || `Select ${label}`}
                        </span>

                        <span className="meal-select-arrow" aria-hidden="true">
                          ▾
                        </span>
                      </Button>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="planner-actions">
          <Button
            className="planner-primary-button"
            variant="contained"
            onClick={handleGenerateShoppingList}
          >
            Create Shopping List
          </Button>

          <Button
            className="planner-secondary-button"
            variant="outlined"
            onClick={handleClearAllMeals}
          >
            Clear All Meals
          </Button>
        </div>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={closeMealMenu}
          slotProps={{
            paper: {
              className: "planner-meal-menu",
            },
          }}
        >
          <div className="planner-search">
            <TextField
              placeholder="Search meals..."
              size="small"
              fullWidth
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            />
          </div>

          <MenuItem onClick={handleClearMeal}>Clear meal</MenuItem>

          {filteredMeals.map((meal, index) => (
            <MenuItem
              key={meal._id || `${meal.name}-${index}`}
              onClick={() => {
                setSelectedRecipe(meal);
                setAnchorEl(null);
              }}
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
