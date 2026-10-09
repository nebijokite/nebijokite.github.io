function Footer() {
  return (
    <footer className="footer" id="contacts">
      <div className="footer__top">
        <span>2026</span>

        <nav className="footer__links" aria-label="Социальные сети">
          <a href="#" aria-label="Telegram">
            Telegram
          </a>

          <a href="#" aria-label="VK">
            VK
          </a>

          <a href="#" aria-label="GitHub">
            GitHub
          </a>
        </nav>
      </div>

      <div className="footer__bottom">
        <span>Россия</span>
      </div>
    </footer>
  );
}

export default Footer;
