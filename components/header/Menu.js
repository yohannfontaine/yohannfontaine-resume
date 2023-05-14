import { animate } from "framer-motion";
import { useEffect } from "react";

export default function Menu({ activeIndex, onSelect }) {
  return (
    <ul className="main-menu">
      <li>
        <a
          href="#home"
          className={activeIndex === 0 ? "active" : ""}
          onClick={() => onSelect(0)}
        >
          <span className="menu-icon lnr lnr-home"></span>
          <span className="link-text">Home</span>
        </a>
      </li>
      <li>
        <a
          href="#about-me"
          className={activeIndex === 1 ? "active" : ""}
          onClick={() => onSelect(1)}
        >
          <span className="menu-icon lnr lnr-user"></span>
          <span className="link-text">About Me</span>
        </a>
      </li>
      <li>
        <a
          href="#resume"
          className={activeIndex === 2 ? "active" : ""}
          onClick={() => onSelect(2)}
        >
          <span className="menu-icon lnr lnr-graduation-hat"></span>
          <span className="link-text">Resume</span>
        </a>
      </li>
      <li>
        <a
          href="#portfolio"
          className={activeIndex === 3 ? "active" : ""}
          onClick={() => onSelect(3)}
        >
          <span className="menu-icon lnr lnr-briefcase"></span>
          <span className="link-text">Portfolio</span>
        </a>
      </li>
      <li>
        <a
          href="#blog"
          className={activeIndex === 4 ? "active" : ""}
          onClick={() => onSelect(4)}
        >
          <span className="menu-icon lnr lnr-book"></span>
          <span className="link-text">Blog</span>
        </a>
      </li>
      <li>
        <a
          href="#contact"
          className={activeIndex === 5 ? "active" : ""}
          onClick={() => onSelect(5)}
        >
          <span className="menu-icon lnr lnr-envelope"></span>
          <span className="link-text">Contact</span>
        </a>
      </li>
    </ul>
  );
}
