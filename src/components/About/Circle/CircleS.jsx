import React from "react";
import { circles } from "../../../aboutData";
import "./circles.css";
import Circle from "./Circle";
import { useSelector } from "react-redux";
const CircleS = () => {
  const { lang } = useSelector((state) => state.language);
  const { dark } = useSelector((state) => state.dark);
  return (
    <div
      class={`container ${
        dark ? "marketingDark" : "marketing"
      }position-relativec `}
      dir="rtl"
      id="market"
    >
      <div class="mx-auto">
        <div class={`row  d-flex justify-content-center align-items-center mx-auto rows-col-xl-2 rows-col-12 ${dark ?  "row-threeDark" : "row-three"}`}>
          {circles.map((circles) => (
            <Circle
              key={circles.id}
              title={lang === "english" ? circles.titleEN : circles.title}
              page={circles.page}
              classs={circles.classs}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CircleS;
