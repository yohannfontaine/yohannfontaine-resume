import { useState } from "react";
import Image from "next/image";
import Menu from "@/components/header/Menu";
import SocialLinks from "@/components/header/SocialLinks";

export default function HeaderSection({ activeIndex, onSelect }) {
  const [currentYear] = useState(new Date().getFullYear());
  const [menuOpen, setMenuOpen] = useState(false);

  const onSelectMenu = (index) => {
    setMenuOpen(false);
    onSelect(index);
  };

  const handleClick = (e) => {
    e.preventDefault();
    setMenuOpen(!menuOpen);
  };

  return (
    <div>
      <header
        id="site_header"
        className={`header  ${menuOpen ? "" : "mobile-menu-hide"}`}
      >
        <div className="header-content">
          <div className="header-photo">
            <img src="img/main_photo.jpg" alt="Yohann Fontaine" />
          </div>
          <div className="header-titles">
            <h2>Yohann Fontaine</h2>
            <h4>Lead Software Engineer</h4>
          </div>
        </div>

        <Menu activeIndex={activeIndex} onSelect={onSelectMenu} />

        <SocialLinks />

        <div className="header-buttons">
          <a href="#" target="_blank" className="btn btn-primary">
            Download CV
          </a>
        </div>

        <div className="copyrights">© {currentYear} All rights reserved.</div>
      </header>
      <div
        className={`menu-toggle  ${menuOpen ? "open" : ""}`}
        onClick={handleClick}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  );
}
