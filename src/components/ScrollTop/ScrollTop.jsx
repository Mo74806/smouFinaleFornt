import React, { useEffect, useState } from "react";
import * as Scroll from "react-scroll";
import { animateScroll as scroll } from "react-scroll";
import { BsFillArrowUpCircleFill } from "react-icons/bs";

export default function ScrollTop() {
  const [showTopBtn, setShowTopBtn] = useState(false);
  const scrollToTop = () => {
    scroll.scrollToTop();
  };

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 900) {
        setShowTopBtn(true);
      } else {
        setShowTopBtn(false);
      }
    });
  }, []);
  return (
    <div
      className={`fixed position-absolute  right-10 bottom-6 z-10 flex w-fit items-end justify-end ${
        showTopBtn ? "opacity-75 -translate-y-8" : "opacity-0 invisible"
      } transition-all duration-300 hover:opacity-100`}
    >
      <BsFillArrowUpCircleFill
        size={40}
        onClick={scrollToTop}
        className="cursor-pointer text-primary"
      />
    </div>
  );
}
