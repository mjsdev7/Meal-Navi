import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./ShoppingList.css";
import "./Home.css";

const categories = [
  {
    name: "Fruit & Vegetables",
    matches: [
      "apple",
      "banana",
      "orange",
      "lemon",
      "lime",
      "grape",
      "strawberr",
      "blueberr",
      "raspberr",
      "mango",
      "pear",
      "peach",
      "pineapple",
      "watermelon",
      "melon",
      "kiwi",
      "avocado",
      "tomato",
      "carrot",
      "onion",
      "broccoli",
      "spinach",
      "potato",
      "lettuce",
      "cucumber",
      "pepper",
      "garlic",
      "ginger",
      "mushroom",
      "cabbage",
      "celery",
      "courgette",
      "zucchini",
      "aubergine",
      "eggplant",
      "pumpkin",
      "sweet potato",
      "spring onion",
      "kale",
      "cauliflower",
      "asparagus",
      "green bean",
      "pea",
      "corn",
      "sweetcorn",
      "beetroot",
      "radish",
      "herb",
      "parsley",
      "coriander",
      "basil",
      "cilantro",
    ],
  },
  {
    name: "Meat & Seafood",
    matches: [
      "chicken",
      "beef",
      "pork",
      "lamb",
      "turkey",
      "duck",
      "bacon",
      "ham",
      "sausage",
      "mince",
      "steak",
      "meat",
      "salmon",
      "tuna",
      "prawn",
      "shrimp",
      "cod",
      "fish",
      "seafood",
      "mackerel",
      "sardine",
      "crab",
      "lobster",
      "mussel",
      "clam",
      "scallop",
      "squid",
      "anchovy",
    ],
  },
  {
    name: "Dairy & Eggs",
    matches: [
      "milk",
      "egg",
      "cheese",
      "butter",
      "cream",
      "yogurt",
      "yoghurt",
      "mozzarella",
      "parmesan",
      "cheddar",
      "cream cheese",
      "sour cream",
      "whipping cream",
    ],
  },
  {
    name: "Bakery & Bread",
    matches: [
      "bread",
      "loaf",
      "bagel",
      "croissant",
      "bun",
      "roll",
      "baguette",
      "pita",
      "tortilla",
      "wrap",
      "muffin",
      "pastry",
      "brioche",
      "breadcrumbs",
      "flour tortilla",
    ],
  },
  {
    name: "Frozen",
    matches: [
      "frozen",
      "ice cream",
      "frozen pea",
      "frozen pizza",
      "frozen berry",
      "frozen vegetable",
      "frozen chip",
    ],
  },
  {
    name: "Pantry",
    matches: [
      "rice",
      "pasta",
      "noodle",
      "spaghetti",
      "macaroni",
      "flour",
      "sugar",
      "salt",
      "peppercorn",
      "oil",
      "olive oil",
      "vinegar",
      "soy sauce",
      "stock",
      "broth",
      "canned",
      "tin of",
      "tinned",
      "bean",
      "lentil",
      "chickpea",
      "oat",
      "cereal",
      "granola",
      "honey",
      "jam",
      "peanut butter",
      "tomato paste",
      "passata",
      "coconut milk",
      "coconut cream",
      "baking powder",
      "bicarbonate",
      "yeast",
      "spice",
      "paprika",
      "cumin",
      "oregano",
      "thyme",
      "curry",
      "mustard",
      "mayonnaise",
      "ketchup",
      "sauce",
      "nuts",
      "almond",
      "walnut",
      "cashew",
      "raisin",
      "dried",
      "chocolate",
      "tea",
      "coffee",
    ],
  },
];

const getCategory = (itemName) => {
  const name = itemName.toLowerCase().trim();

  const frozen = categories.find((category) => category.name === "Frozen");

  if (frozen.matches.some((word) => name.includes(word))) {
    return frozen.name;
  }

  const matchedCategory = categories.find(
    (category) =>
      category.name !== "Frozen" &&
      category.matches.some((word) => name.includes(word)),
  );

  return matchedCategory?.name || "Other";
};

function ShoppingList() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch(`${import.meta.env.VITE_API_URL}/shoppinglist`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to load shopping list");
        }
        return response.json();
      })
      .then((data) => {
        setItems(Array.isArray(data?.items) ? data.items : []);
      })
      .catch((error) => {
        console.error("Error fetching shopping list:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const saveItems = async (updatedItems) => {
    const token = localStorage.getItem("token");

    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/shoppinglist`,
      {
        method: items.length === 0 ? "POST" : "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          items: updatedItems,
        }),
      },
    );

    if (!response.ok) {
      throw new Error("Failed to save shopping list");
    }

    setItems(updatedItems);
  };

  const addItem = async (event) => {
    event.preventDefault();

    const name = newItem.trim();
    if (!name) return;

    const updatedItems = [
      ...items,
      {
        name,
        checked: false,
      },
    ];

    try {
      await saveItems(updatedItems);
      setNewItem("");
    } catch (error) {
      console.error("Error adding shopping-list item:", error);
      alert("Couldn't save this item. Please try again.");
    }
  };

  const toggleItem = async (index) => {
    const updatedItems = items.map((item, itemIndex) =>
      itemIndex === index ? { ...item, checked: !item.checked } : item,
    );

    try {
      await saveItems(updatedItems);
    } catch (error) {
      console.error("Error updating shopping list:", error);
      alert("Couldn't update this item. Please try again.");
    }
  };

  const deleteItem = async (index) => {
    const updatedItems = items.filter((_, itemIndex) => itemIndex !== index);

    try {
      await saveItems(updatedItems);
    } catch (error) {
      console.error("Error deleting shopping-list item:", error);
      alert("Couldn't delete this item. Please try again.");
    }
  };

  const clearCompleted = async () => {
    const updatedItems = items.filter((item) => !item.checked);

    try {
      await saveItems(updatedItems);
    } catch (error) {
      console.error("Error clearing completed items:", error);
      alert("Couldn't clear completed items. Please try again.");
    }
  };

  const deleteAll = async () => {
    if (items.length === 0) return;

    const confirmed = window.confirm(
      "Are you sure you want to delete every item?",
    );

    if (!confirmed) return;

    try {
      await saveItems([]);
    } catch (error) {
      console.error("Error deleting shopping list:", error);
      alert("Couldn't delete the shopping list. Please try again.");
    }
  };

  const groupedItems = [
    ...categories.map((category) => ({
      name: category.name,
      items: items
        .map((item, index) => ({ ...item, originalIndex: index }))
        .filter((item) => getCategory(item.name) === category.name),
    })),
    {
      name: "Other",
      items: items
        .map((item, index) => ({ ...item, originalIndex: index }))
        .filter((item) => getCategory(item.name) === "Other"),
    },
  ].filter((group) => group.items.length > 0);

  const completedCount = items.filter((item) => item.checked).length;

  return (
    <>
      <section className="shopping-list-page">
        <div className="shopping-list-container">
          <p className="shopping-eyebrow">MN · EVERYDAY ESSENTIALS</p>

          <h1>Shopping List</h1>

          <p className="shopping-intro">
            Everything you need for your planned meals.
          </p>

          <form className="shopping-controls" onSubmit={addItem}>
            <input
              type="text"
              placeholder="Add an item..."
              value={newItem}
              onChange={(event) => setNewItem(event.target.value)}
              aria-label="New shopping-list item"
            />

            <button type="submit">Add</button>
          </form>

          <div className="shopping-summary">
            <span>
              {items.length} {items.length === 1 ? "item" : "items"}
            </span>

            <span>{completedCount} completed</span>
          </div>

          <div className="shopping-actions">
            <button
              className="clear-button"
              onClick={clearCompleted}
              type="button"
              disabled={completedCount === 0}
            >
              Clear completed
            </button>

            <button
              className="clear-button"
              onClick={deleteAll}
              type="button"
              disabled={items.length === 0}
            >
              Delete all
            </button>
          </div>

          {loading ? (
            <p className="empty-message">Loading your shopping list...</p>
          ) : items.length === 0 ? (
            <p className="empty-message">
              Your shopping list is empty. Add an item to get started!
            </p>
          ) : (
            <div className="shopping-groups">
              {groupedItems.map((group) => (
                <section className="shopping-category" key={group.name}>
                  <h2>{group.name}</h2>

                  <ul className="shopping-items">
                    {group.items.map((item) => (
                      <li
                        key={item.originalIndex}
                        className={`shopping-item ${
                          item.checked ? "checked" : ""
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={Boolean(item.checked)}
                          onChange={() => toggleItem(item.originalIndex)}
                          aria-label={`Mark ${item.name} as ${
                            item.checked ? "not completed" : "completed"
                          }`}
                        />

                        <span>{item.name}</span>

                        <button
                          className="delete-button"
                          onClick={() => deleteItem(item.originalIndex)}
                          type="button"
                          aria-label={`Delete ${item.name}`}
                        >
                          Delete
                        </button>
                      </li>
                    ))}
                  </ul>
                </section>
              ))}
            </div>
          )}
        </div>
      </section>

      <footer className="home-page home-footer">
        <div className="home-footer-brand">
          <span className="home-footer-mark">M|N</span>
          <span>Meal-Navi</span>
        </div>

        <p>Thoughtful design. Seamless planning. Better mealtimes.</p>

        <div className="home-footer-links">
          <Link to="/#about">About</Link>
          <Link to="/planner">Planner</Link>
          <Link to="/shopping-list">Shopping list</Link>
          <a href="mailto:m.j.swales@hotmail.com">Contact</a>
        </div>

        <div className="home-footer-bottom">
          <span>© Meal-Navi 2026</span>

          <a
            href="https://github.com/mjsdev7/Meal-Navi"
            target="_blank"
            rel="noreferrer"
          >
            View the project on GitHub ↗
          </a>
        </div>
      </footer>
    </>
  );
}

export default ShoppingList;
