import React, { useState } from "react";
// Styles
import styles from "./Header.module.css";
// Assets
import logo from "../../assets/coop-logo.png";

const Header = () => {
  const [spin, setSpin] = useState(false);

  const handleClick = () => {
    setSpin(true);
    window.location.reload();
  };

  return (
    <header className={styles.header}>
      <img src={logo} alt="logo" height={40} />
      <div>
        Last updated: <strong>01/11/25</strong>
      </div>
      <i
        className={`${styles.reloadBtn} fas fa-arrows-rotate ${
          spin ? "fa-spin" : ""
        }`}
        onClick={handleClick}
      ></i>
    </header>
  );
};

export default Header;
