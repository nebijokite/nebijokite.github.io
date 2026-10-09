import { useEffect, useState } from "react";

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
    const element = document.getElementById(id);

    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
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
