import React from "react";
import "./cards.css";
import { cards } from "../../../aboutData";
import Card from "./Card";
import { useSelector } from "react-redux";

export default function CardS() {
  const { lang } = useSelector((state) => state.language);
  const { dark } = useSelector((state) => state.dark);
  return (
    <div
      className={`postion-relative   container-1 ${dark && "bg-dark"}`}
      id="value1"
    >
      <div
        className={
          dark
            ? "card-group card-group-aboutDark"
            : "card-group card-group-about"
        }
        data-toggle="animation"
        data-toggle-reset="true"
        data-animation="slide-right"
      >
        {" "}
        <h2 className="mt-5 px-3 row d-flex align-items-start justify-content-start">
          <span>
            <img
              className="quote1"
              src="./imgs/about/straight-quote1.png"
              alt="quoteMark"
            />
          </span>

          <span className={dark ? "text-card valuesDark" : "text-card values"}>
            {lang === "english" ? "Values" : "قيمتنا"}
          </span>
        </h2>{" "}
        <div className="row d-flex py-xl-5 px-xl-5 justify-content-center">
          {cards.map((cards) => (
            <Card
              className={`${dark && "bg-dark"}`}
              key={cards.id}
              title={lang === "english" ? cards.titleEN : cards.title}
              des={lang === "english" ? cards.desEN : cards.des}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
