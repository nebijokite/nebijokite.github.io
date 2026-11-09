<<<<<<< HEAD
import { config } from "../data/config";

export default function Footer() {
  return (
    <footer id="contacts" className="footer" data-theme="dark">
      <div className="wrap footer__row">
        <span>{config.year}</span>
        {config.links.map((l) => (
          <a key={l.label} href={l.href} target="_blank" rel="noreferrer">{l.label}</a>
        ))}
        {config.email && <a href={`mailto:${config.email}`}>{config.email}</a>}
        <span>{config.country}</span>
=======
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
>>>>>>> 67d56fc93b8702593fe1db63d11206050054a884
      </div>
    </footer>
  );
}
<<<<<<< HEAD
=======

export default Footer;
>>>>>>> 67d56fc93b8702593fe1db63d11206050054a884
