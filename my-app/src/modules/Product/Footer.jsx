import "../../theme/scss/Footer.scss";

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer__logo">
        <img src="/gerb.png" alt="Fonte Logo" />
        <span>Военно-патриотический клуб "ВЫМПЕЛ"</span>
      </div>

      <div className="footer__line" />

      <p className="footer__copyright">
        © 2025 • VPK-Vimpel • All rights reserved
      </p>
    </footer>
  );
}
