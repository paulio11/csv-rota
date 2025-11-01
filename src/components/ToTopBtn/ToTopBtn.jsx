import React, { useEffect, useState } from "react";
// Bootstrap
import Button from "react-bootstrap/Button";

const ToTopBtn = () => {
  const [visible, setVisible] = useState(false);

  // Smooth scroll to top on click
  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Show/hide button based on scroll ammount
  const handleScroll = () => setVisible(window.scrollY > 100);

  // Adds then removes listener to window scroll
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Button
      onClick={handleClick}
      style={{
        position: "fixed",
        bottom: "50px",
        right: "50px",
        opacity: visible ? 1 : 0,
      }}
    >
      Scroll to top <i className="fas fa-arrow-up"></i>
    </Button>
  );
};

export default ToTopBtn;
