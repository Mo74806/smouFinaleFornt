import React from "react";
import { useSelector } from "react-redux";
import "./Header.css";
export default function Header(props) {
  const { lang } = useSelector((state) => state.language);
  const { dark } = useSelector((state) => state.dark);
  return (
    <header className="hide-contact  overflow-hidden">
      <div id="intro-example">
        <div
          className="mask "
          style={{ height: "600px", backgroundColor: "rgba(0, 0, 0, 0.4)" }}
        >
          <img
            alt="wallpaper"
            src={props.cover}
            width="100%"
            className="contact-header-image"
          />

          <div className="d-flex  justify-content-center  mx-0 justify-content-lg-end   align-items-end p-5 contact-header--title h-100">
            <h1
              className={`mb-3 mx-4 text-center  col-xl-4 col-10 fw-bold  ${
                dark
                  ? "contact-header--title--text-dark"
                  : "contact-header--title--text"
              }   px-3 py-5 `}
            >
              {props.title}
              <p
                className={
                  lang === "english"
                    ? "text-sm mx-auto text-center  fw-smaller"
                    : "fs-7 text-center  fw-smaller"
                }
              >
                {props.subTitle}{" "}
              </p>
            </h1>
          </div>
        </div>
      </div>
    </header>
  );
}
