import React from "react";
import { NavDropdown } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import i18n from "i18next";

const LanguageDropdown = (props) => {
  const { t } = props;

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };

  return (
    <NavDropdown title={<span>{t("Language")}</span>} id="language-dropdown">
      <NavDropdown.Item onClick={() => changeLanguage("en")}>
        <img
          src="https://flagcdn.com/w20/gb.png"
          alt="English"
          className="me-2"
        />
        {t("language.en")}
      </NavDropdown.Item>
      <NavDropdown.Item onClick={() => changeLanguage("fr")}>
        <img
          src="https://flagcdn.com/w20/fr.png"
          alt="French"
          className="me-2"
        />
        {t("language.fr")}
      </NavDropdown.Item>
      <NavDropdown.Item onClick={() => changeLanguage("ar")}>
        <img
          src="https://flagcdn.com/w20/sa.png"
          alt="Arabic"
          className="me-2"
        />
        {t("language.ar")}
      </NavDropdown.Item>
    </NavDropdown>
  );
};

export default LanguageDropdown;
