import heroImage from "../assets/hero.jpg";
import "./Hero.css";

function Hero() {
  return (
    <section className="hero" style={{ backgroundImage: `url(${heroImage})` }}>
      <div className="overlay"></div>

      <div className="hero-content">
        <h1>Meal Navi</h1>

        <h2>
          Plan Smarter.
          <br />
          Cook Easier.
        </h2>

        <p>
          Plan your meals, organise your week,
          <br />
          and never forget your shopping list again.
        </p>

        <button className="hero-btn">Get Started</button>

        <div className="hero-features">
          <span>Meal Planning</span>
          <span>•</span>
          <span>Smart Shopping</span>
          <span>•</span>
          <span>Save Your Favourites</span>
        </div>
      </div>
    </section>
  );
}

export default Hero;
