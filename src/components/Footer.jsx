import { config } from "../data/config";

export default function Footer() {
  return (
    <footer id="contacts" className="footer" data-theme="dark">
      <div className="wrap footer__row">
        <span>{config.year}</span>
        {config.links.map((l) => (
          <a key={l.label} href={l.href} target="_blank" rel="noreferrer">
            {l.label}
          </a>
        ))}
        {config.email && <a href={`mailto:${config.email}`}>{config.email}</a>}
        <span>{config.country}</span>
      </div>
    </footer>
  );
}