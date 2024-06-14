import React from "react";
import { NavDropdown } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import i18n from "i18next";

const LanguageDropdown = () => {
  const { t } = useTranslation();

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };

  return (
    <NavDropdown title={<span>Language</span>} id="language-dropdown">
      <NavDropdown.Item onClick={() => changeLanguage("en")}>
        <img
          src="https://flagcdn.com/w20/gb.png"
          alt="English"
          className="me-2"
        />
        English
      </NavDropdown.Item>
      <NavDropdown.Item onClick={() => changeLanguage("fr")}>
        <img
          src="https://flagcdn.com/w20/fr.png"
          alt="French"
          className="me-2"
        />
        French
      </NavDropdown.Item>
      <NavDropdown.Item onClick={() => changeLanguage("ar")}>
        <img
          src="https://flagcdn.com/w20/sa.png"
          alt="Arabic"
          className="me-2"
        />
        Arabic
      </NavDropdown.Item>
    </NavDropdown>
  );
};

export default LanguageDropdown;
