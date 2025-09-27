import { useState, useEffect } from "react";
import css from "./ScrollToTopButton.module.css";
const ScrollToTopButton = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let timeoutId = null;

    const toggleVisibility = () => {
      if (timeoutId) return;

      timeoutId = setTimeout(() => {
        setVisible(window.scrollY > 300);
        timeoutId = null;
      }, 100);
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!visible) return null;

  return (
    <button
      onClick={scrollToTop}
      className={css.scrollToTop}
      aria-label="Scroll to Top"
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <polyline points="18,15 12,9 6,15"></polyline>
      </svg>
    </button>
  );
};
export default ScrollToTopButton;
