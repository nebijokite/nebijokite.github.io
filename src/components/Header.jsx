import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Header() {
  const [theme, setTheme] = useState("light");
  const { pathname } = useLocation();

  useEffect(() => {
    const update = () => {
      const y = 36;
      const hit = [...document.querySelectorAll("[data-theme]")].find((el) => {
        const r = el.getBoundingClientRect();
        return r.top <= y && r.bottom > y;
      });
      if (hit) setTheme(hit.dataset.theme);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [pathname]);

  return (
    <header className={`header header--${theme}`}>
      <nav className="header__nav" aria-label="Основная навигация">
        <Link to="/#works">Работы</Link>
        <Link to="/#about">Обо мне</Link>
        <Link to="/#contacts">Контакты</Link>
      </nav>
      <Link to="/projects" className="header__all">Все работы</Link>
    </header>
  );
}