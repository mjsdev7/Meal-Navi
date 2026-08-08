import "./Planner.css";

function Planner() {
  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

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
                <p>Choose a meal</p>
              </div>

              <div className="meal-slot">
                <span>☀️</span>
                <h3>Lunch</h3>
                <p>Choose a meal</p>
              </div>

              <div className="meal-slot">
                <span>🌙</span>
                <h3>Dinner</h3>
                <p>Choose a meal</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Planner;
