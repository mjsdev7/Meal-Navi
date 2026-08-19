const API_URL = "http://localhost:3000/api";

export const getMeals = async () => {
  const response = await fetch(`${API_URL}/meals`);

  if (!response.ok) {
    throw new Error("Failed to fetch meals");
  }

  return response.json();
};

export const createMeal = async (meal) => {
  const response = await fetch(`${API_URL}/meals`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(meal),
  });

  if (!response.ok) {
    throw new Error("Failed to create meal");
  }

  return response.json();
};

export const getRecipes = async () => {
  const response = await fetch(`${API_URL}/recipes`);

  if (!response.ok) {
    throw new Error("Failed to fetch recipes");
  }

  return response.json();
};

export const getMealPlans = async () => {
  const response = await fetch(`${API_URL}/mealplans`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch meal plans");
  }

  return response.json();
};

export const createMealPlan = async (meal, day, mealType) => {
  const response = await fetch(`${API_URL}/mealplans`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify({
      meal,
      day,
      mealType,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to save meal plan");
  }

  return response.json();
};

export const deleteMealPlan = async (mealPlanId) => {
  const response = await fetch(`${API_URL}/mealplans/${mealPlanId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to delete meal plan");
  }

  return response.json();
};

export const generateShoppingList = async () => {
  const response = await fetch(`${API_URL}/shoppinglist/generate`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to generate shopping list");
  }

  return response.json();
};