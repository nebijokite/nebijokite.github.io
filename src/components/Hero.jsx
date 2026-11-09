<<<<<<< HEAD
import { motion } from "framer-motion";

const ease = [0.2, 0.7, 0.2, 1];

export default function Hero() {
  return (
    <section className="hero" data-theme="light" aria-label="Приветствие">
      <h1 className="hero__title">
        <span className="hero__mask">
          <motion.span className="hero__hello" initial={{ y: "100%" }} animate={{ y: 0 }} transition={{ duration: 0.9, ease }}>
            Hello
          </motion.span>
        </span>
        <span className="hero__mask hero__mask--me">
          <motion.span className="hero__me" initial={{ y: "100%" }} animate={{ y: 0 }} transition={{ duration: 0.9, ease, delay: 0.12 }}>
            я Женя
          </motion.span>
        </span>
      </h1>
      <motion.p className="hero__meta" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7, duration: 0.6 }}>
        <span>Евгений Горбунов</span>
        <span>Product Designer</span>
      </motion.p>
    </section>
  );
}
=======
function Hero() {
  return (
    <section className="hero" id="hero">
      <div className="hero__content">
        <div className="hero__name">
          <span className="hero__hello">Hello</span>

          <span className="hero__name-line">
            я Женя
          </span>
      <div className="hero__description">
        Продуктовый и графический дизайнер с 4+ годами опыта.
        Влюблен в хорошие продукты и дизайн, дружу с метриками.
        <br />
        <br />
        Готов к работе.
      </div>
      </div>
        </div>

        <img className="hero__card" src="/images/metalcard.png" alt="Product Designer" />




      <div className="hero__bottom">
        <span>Россия</span>

        <span>2026</span>
      </div>
    </section>
  );
}

export default Hero;
>>>>>>> 67d56fc93b8702593fe1db63d11206050054a884
