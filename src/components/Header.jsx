import { useEffect, useState } from "react";
<<<<<<< HEAD
import { Link, useLocation } from "react-router-dom";

export default function Header() {
  const [theme, setTheme] = useState("light");
  const { pathname } = useLocation();

  // Цвет шапки зависит от секции под ней (data-theme="light|dark").
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
=======

function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

 
const scrollToSection = (id) => {
  if (window.location.pathname.replace(/\/$/, "") === "/projects") {
    sessionStorage.setItem("scrollTarget", id);
    window.history.pushState({}, "", "/");
    window.dispatchEvent(new PopStateEvent("popstate"));
    return;
  }

  document.getElementById(id)?.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
};



  const goToProjects = () => {
    window.history.pushState({}, "", "/projects");
    window.dispatchEvent(new PopStateEvent("popstate"));
    window.scrollTo(0, 0);
  };

  return (
    <header className={`header ${isScrolled ? "header--scrolled" : ""}`}>
      <button
        className="header__logo"
        onClick={() => scrollToSection("hero")}
        aria-label="На главную"
      >
        ЕГ
      </button>

      <nav className="header__nav" aria-label="Основная навигация">
        <button onClick={() => scrollToSection("works")}>
          Работы
        </button>

        <button onClick={() => scrollToSection("about")}>
          Обо мне
        </button>

        <button onClick={() => scrollToSection("contacts")}>
          Контакты
        </button>

        <button
          className="header__archive"
          onClick={goToProjects}
        >
          Все работы
        </button>
      </nav>
    </header>
  );
}

export default Header;
>>>>>>> 67d56fc93b8702593fe1db63d11206050054a884
