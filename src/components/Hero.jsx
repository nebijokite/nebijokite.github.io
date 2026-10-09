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
