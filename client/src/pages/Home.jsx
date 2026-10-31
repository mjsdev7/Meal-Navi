import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./Home.css";

import heroFood from "../assets/hero-food.jpg";
import mealPlanning from "../assets/meal-planning.jpg";
import smartShopping from "../assets/smart-shopping.jpg";
import favouriteRecipes from "../assets/favourite-recipes.jpg";
import featureFour from "../assets/feature-four.jpg";
import finalBanner from "../assets/final-banner.jpg";

const features = [
  {
    number: "01",
    title: "Plan your meals",
    description:
      "Bring a little more intention to your week. Plan breakfast, lunch and dinner in one simple place, and make mealtimes easier to manage.",
    image: mealPlanning,
    alt: "A thoughtfully prepared meal on a table",
    link: "/planner",
    linkText: "Explore your planner",
    reverse: false,
    revealDirection: "right",
  },
  {
    number: "02",
    title: "Keep your favourites",
    description:
      "Make the meals you love part of your routine. Keep favourite recipes close and make deciding what to cook feel effortless.",
    image: favouriteRecipes,
    alt: "A delicious home-cooked recipe",
    reverse: true,
    revealDirection: "left",
  },
  {
    number: "03",
    title: "Shop with purpose",
    description:
      "Turn your meal plan into a shopping list. Keep everything organised, know what you need, and spend less time figuring it out at the supermarket.",
    image: smartShopping,
    alt: "Fresh ingredients ready for cooking",
    link: "/shopping-list",
    linkText: "View your shopping list",
    reverse: false,
    revealDirection: "right",
  },
  {
    number: "04",
    title: "Make room for good food",
    description:
      "Less planning stress, more time to enjoy the food you make. Build a routine that works for your household, one meal at a time.",
    image: featureFour,
    alt: "A beautifully served meal ready to enjoy",
    reverse: true,
    revealDirection: "left",
  },
];

// Send signed-in users to the planner and signed-out users to registration.
const getStartedPath = () => {
  return localStorage.getItem("token") ? "/planner" : "/register";
};

// Individual feature component with its own scroll observer.
function FeatureArticle({ feature }) {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.2,
      },
    );

    const currentSection = sectionRef.current;

    if (currentSection) {
      observer.observe(currentSection);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <article
      ref={sectionRef}
      className={`home-feature ${
        feature.reverse ? "home-feature-reverse" : ""
      }`}
    >
      <div className="home-feature-image-wrap">
        <img src={feature.image} alt={feature.alt} />
        <span className="home-feature-number">{feature.number}</span>
      </div>

      <div
        className={`home-feature-copy reveal-${feature.revealDirection} ${
          isVisible ? "is-visible" : ""
        }`}
      >
        <p className="eyebrow">MADE FOR EVERYDAY LIFE</p>

        <h2>{feature.title}</h2>

        <p className="home-feature-description">{feature.description}</p>

        {feature.linkText && (
          <Link to={feature.link} className="home-feature-link">
            {feature.linkText} <span aria-hidden="true">→</span>
          </Link>
        )}
      </div>
    </article>
  );
}

function Home() {
  return (
    <main className="home-page">
      <section className="home-hero">
        <div className="home-hero-copy">
          <p className="eyebrow">A MORE CONSIDERED WAY TO COOK</p>

          <h1 className="home-title-animation">
            Meal-Navi<span>.</span>
          </h1>

          <p className="home-hero-subtitle home-subtitle-animation">
            Thoughtful meal planning, made simple.
          </p>

          <p className="home-hero-description">
            Plan your week, organise your shopping, and make more room for the
            meals you love. Everything you need for easier mealtimes, all in one
            place.
          </p>

          <div className="home-hero-actions">
            <Link
              to={getStartedPath()}
              className="home-button home-button-dark"
            >
              Get started <span aria-hidden="true">↗︎</span>
            </Link>
          </div>

          <p className="home-hero-note">PLAN THOUGHTFULLY. COOK HAPPILY.</p>
        </div>

        <div className="home-hero-image-wrap">
          <img
            src={heroFood}
            alt="Freshly prepared food for an enjoyable meal"
            className="home-hero-image"
          />

          <div className="home-image-caption">
            <span>GOOD FOOD, LESS FUSS</span>
            <span>01 / 05</span>
          </div>
        </div>
      </section>

      <section className="home-intro" id="about">
        <p className="eyebrow">THE MEAL-NAVI APPROACH</p>

        <h2>
          A little more planning.
          <br />
          <em>A lot more enjoying.</em>
        </h2>

        <p>
          Good food doesn't have to mean complicated routines. Meal-Navi brings
          your weekly meals and shopping together, so you can spend less time
          organising and more time enjoying what matters.
        </p>
      </section>

      <section className="home-features" aria-label="Meal-Navi features">
        {features.map((feature) => (
          <FeatureArticle feature={feature} key={feature.number} />
        ))}
      </section>

      <section className="home-final-cta">
        <img
          src={finalBanner}
          alt="A welcoming spread of food to share"
          className="home-final-image"
        />

        <div className="home-final-overlay" />

        <div className="home-final-content">
          <p className="eyebrow">YOUR WEEK, MADE SIMPLER</p>

          <h2>
            Make mealtimes
            <br />
            <em>something to look forward to.</em>
          </h2>

          <p>
            Start planning with a little more clarity and a lot less stress.
          </p>

          <Link to={getStartedPath()} className="home-button home-button-light">
            Start your journey <span aria-hidden="true">↗︎</span>
          </Link>
        </div>
      </section>

      <footer className="home-footer">
        <div className="home-footer-brand">
          <span className="home-footer-mark">M|N</span>
          <span>Meal-Navi</span>
        </div>

        <p>Thoughtful design. Seamless planning. Better mealtimes.</p>

        <div className="home-footer-links">
          <a href="#about">About</a>
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
            View the project on GitHub ↗︎
          </a>
        </div>
      </footer>
    </main>
  );
}

export default Home;
