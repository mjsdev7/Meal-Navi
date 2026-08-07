import "./HowItWorks.css";

function HowItWorks() {
  return (
    <section className="how-it-works">
      <div className="how-content">
        <h2>How It Works</h2>

        <div className="steps-container">
          <div className="step-card">
            <div className="step-icon">📅</div>
            <h3>Plan Your Meals</h3>
            <p>Choose your meals for the week and stay organised.</p>
          </div>

          <div className="step-card">
            <div className="step-icon">🛒</div>
            <h3>Create Your Shopping List</h3>
            <p>Automatically create a shopping list from your meal plan.</p>
          </div>

          <div className="step-card">
            <div className="step-icon">🍽️</div>
            <h3>Cook & Enjoy</h3>
            <p>Follow your plan and make cooking simple every day.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;
