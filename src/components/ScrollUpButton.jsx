import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";

const ScrollUpButton = () => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos =
        window.pageYOffset || document.documentElement.scrollTop;
      setShowButton(currentScrollPos > 100); // Show button when scrolled down 100 pixels
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-10 right-10 p-3 bg-tertiary text-white rounded-full shadow-md hover:bg-secondary transition-colors ${
        showButton ? "flex" : "hidden"
      } items-center space-x-2`}
    >
      <FontAwesomeIcon icon={faArrowUp} size="lg" />
      <span>Scroll Up</span>
    </button>
  );
};

export default ScrollUpButton;
