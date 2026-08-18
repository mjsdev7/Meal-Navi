const getRecipes = async (req, res) => {
  try {
    const response = await fetch(
      "https://www.themealdb.com/api/json/v1/1/search.php?s="
    );

    if (!response.ok) {
      throw new Error("Failed to fetch recipes from TheMealDB");
    }

    const data = await response.json();

    const recipes = (data.meals || []).map((meal) => ({
      name: meal.strMeal,
      category: meal.strCategory,
      instructions: meal.strInstructions,
      image: meal.strMealThumb,
      ingredients: [
        meal.strIngredient1,
        meal.strIngredient2,
        meal.strIngredient3,
        meal.strIngredient4,
        meal.strIngredient5,
        meal.strIngredient6,
        meal.strIngredient7,
        meal.strIngredient8,
        meal.strIngredient9,
        meal.strIngredient10,
        meal.strIngredient11,
        meal.strIngredient12,
        meal.strIngredient13,
        meal.strIngredient14,
        meal.strIngredient15,
        meal.strIngredient16,
        meal.strIngredient17,
        meal.strIngredient18,
        meal.strIngredient19,
        meal.strIngredient20,
      ].filter((ingredient) => ingredient && ingredient.trim() !== ""),
    }));

    res.json(recipes);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getRecipes,
};