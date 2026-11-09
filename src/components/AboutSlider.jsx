<<<<<<< HEAD
import { useRef, useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { aboutPhotos } from "../data/config";

const pad = (n) => String(n).padStart(2, "0");

export default function AboutSlider() {
  const [i, setI] = useState(0);
  const [dir, setDir] = useState(1);
  const startX = useRef(null);
  const total = aboutPhotos.length;

  const go = (d) => { setDir(d); setI((v) => (v + d + total) % total); };

  useEffect(() => {
    const img = new Image();
    img.src = aboutPhotos[(i + 1) % total].src;
  }, [i, total]);

  const onTouchEnd = (e) => {
    if (startX.current == null) return;
    const dx = e.changedTouches[0].clientX - startX.current;
    startX.current = null;
    if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
  };

  return (
    <section id="about" className="about" data-theme="light" aria-roledescription="карусель" aria-label="Обо мне">
      <h2 className="about__title">Обо мне</h2>
      <div className="about__stage">
        <button type="button" className="about__arrow" onClick={() => go(-1)} aria-label="Предыдущее фото">←</button>
        <div className="about__frame"
          onTouchStart={(e) => (startX.current = e.touches[0].clientX)} onTouchEnd={onTouchEnd}
          onKeyDown={(e) => { if (e.key === "ArrowLeft") go(-1); if (e.key === "ArrowRight") go(1); }} tabIndex={0}>
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.img key={i} src={aboutPhotos[i].src} alt={aboutPhotos[i].alt} draggable={false}
              className="about__img"
              initial={{ opacity: 0, x: dir * 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: dir * -40 }}
              transition={{ duration: 0.45, ease: [0.2, 0.7, 0.2, 1] }} />
          </AnimatePresence>
        </div>
        <button type="button" className="about__arrow" onClick={() => go(1)} aria-label="Следующее фото">→</button>
      </div>
      <p className="about__count" aria-live="polite">{pad(i + 1)} / {pad(total)}</p>
    </section>
  );
}
=======
import { useState } from "react";

const images = [
  "/images/me/1.jpg",
  "/images/me/2.jpg",
  "/images/me/3.jpg",
  "/images/me/4.jpg",
  "/images/me/5.jpg",
  "/images/me/6.jpg"
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
>>>>>>> 67d56fc93b8702593fe1db63d11206050054a884
