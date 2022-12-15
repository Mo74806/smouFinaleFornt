import React from "react";
import { circles } from "../../../aboutData";
import "./circles.css";
import Circle from "./Circle";
import { useSelector } from "react-redux";
const CircleS = () => {
  const { lang } = useSelector((state) => state.language);
  const { dark } = useSelector((state) => state.dark);
  return (
    <div className="container p-5" dir="rtl" id="market">
      <div className={`row py-5 ${!dark && "row-three"}`}>
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
  );
};

export default CircleS;
