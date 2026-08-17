import { useEffect, useState } from "react";

function ShoppingList() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch("http://localhost:3000/api/shoppinglist", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          setItems(data.items || []);
        }
      })
      .catch((error) => {
        console.error("Error fetching shopping list:", error);
      });
  }, []);

  const addItem = async () => {
    if (!newItem.trim()) return;

    const updatedItems = [
      ...items,
      {
        name: newItem,
        checked: false,
      },
    ];

    try {
      const response = await fetch("http://localhost:3000/api/shoppinglist", {
        method: items.length === 0 ? "POST" : "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          items: updatedItems,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to save shopping list");
      }

      setItems(updatedItems);
      setNewItem("");
    } catch (error) {
      console.error("Error saving shopping list:", error);
    }
  };

  const toggleItem = async (index) => {
    const updatedItems = items.map((item, itemIndex) =>
      itemIndex === index ? { ...item, checked: !item.checked } : item,
    );

    try {
      const response = await fetch("http://localhost:3000/api/shoppinglist", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          items: updatedItems,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update shopping list");
      }

      setItems(updatedItems);
    } catch (error) {
      console.error("Error updating shopping list:", error);
    }
  };

  const deleteItem = async (index) => {
    const updatedItems = items.filter((_, itemIndex) => itemIndex !== index);

    try {
      const response = await fetch("http://localhost:3000/api/shoppinglist", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          items: updatedItems,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to delete item");
      }

      setItems(updatedItems);
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const clearCompleted = async () => {
    const updatedItems = items.filter((item) => !item.checked);

    try {
      const response = await fetch("http://localhost:3000/api/shoppinglist", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          items: updatedItems,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to clear completed items");
      }

      setItems(updatedItems);
    } catch (error) {
      console.error("Error clearing completed items:", error);
    }
  };

  return (
    <section>
      <h1>Shopping List</h1>

      <div>
        <input
          type="text"
          placeholder="Add an item"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
        />

        <button onClick={addItem}>Add</button>

        <button onClick={clearCompleted}>Clear completed</button>
      </div>

      <ul>
        {items.map((item, index) => (
          <li key={index}>
            <input
              type="checkbox"
              checked={item.checked}
              onChange={() => toggleItem(index)}
            />

            {item.name}

            <button onClick={() => deleteItem(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default ShoppingList;
