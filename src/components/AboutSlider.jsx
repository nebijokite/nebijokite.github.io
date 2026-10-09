import { useState } from "react";

const images = [
  "/images/me.jpeg",
  "/images/about-2.jpeg",
  "/images/about-3.jpeg",
  "/images/about-4.jpeg",
  "/images/about-5.jpeg",
  "/images/about-6.jpeg"
];

function AboutSlider() {
  const [current, setCurrent] = useState(0);
  const [touchStart, setTouchStart] = useState(null);

  const previous = () => {
    setCurrent((value) =>
      value === 0 ? images.length - 1 : value - 1
    );
  };

  const next = () => {
    setCurrent((value) =>
      value === images.length - 1 ? 0 : value + 1
    );
  };

  const handleTouchStart = (event) => {
    setTouchStart(event.touches[0].clientX);
  };

  const handleTouchEnd = (event) => {
    if (touchStart === null) return;

    const touchEnd = event.changedTouches[0].clientX;
    const distance = touchStart - touchEnd;

    if (Math.abs(distance) > 50) {
      if (distance > 0) {
        next();
      } else {
        previous();
      }
    }

    setTouchStart(null);
  };

  return (
    <section className="about" id="about">
      <div className="section-container">

        <div className="section-heading">
          <h2>Обо мне</h2>
        </div>

        <div
          className="about-slider"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <button
            className="about-slider__arrow about-slider__arrow--left"
            onClick={previous}
            aria-label="Предыдущая фотография"
          >
            ←
          </button>

          <div className="about-slider__image-wrap">
            <img
              src={images[current]}
              alt={`Евгений Горбунов — фотография ${current + 1}`}
              className="about-slider__image"
            />
          </div>

          <button
            className="about-slider__arrow about-slider__arrow--right"
            onClick={next}
            aria-label="Следующая фотография"
          >
            →
          </button>
        </div>

        <div className="about-slider__counter">
          <span>
            {String(current + 1).padStart(2, "0")}
          </span>

          <span>/</span>

          <span>
            {String(images.length).padStart(2, "0")}
          </span>
        </div>

      </div>
    </section>
  );
}

export default AboutSlider;
