import "./Features.css";

function Features() {
  return (
    <section className="features">
      <div className="features-content">
        <h2>Everything you need to plan better</h2>

        <div className="feature-container">
          <div className="feature-card">
            <div className="feature-icon">🍽️</div>
            <h3>Meal Planning</h3>
            <p>Organise your meals for the week and stay on track.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🛒</div>
            <h3>Smart Shopping</h3>
            <p>Create shopping lists automatically from your meals.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">❤️</div>
            <h3>Save Favourites</h3>
            <p>Keep your favourite recipes ready anytime.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Features;
