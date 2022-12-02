import React from "react";
import "./Values.css";
import { values } from "../../data";
import { useSelector } from "react-redux";

const Values = () => {
  const { lang } = useSelector((state) => state.language);
  const { dark } = useSelector((state) => state.dark);
  return (
    <section className="section flag">
      <div className="container">
        <div className="title text-center mb-3">
          <h2 className="position-relative d-inline-block my-4">
            {lang === "english" ? "Values" : "قـيمـنــا"}
          </h2>
        </div>
        <div className="row">
          {values.map((value) => (
            <div className="flag-box col-lg-3 px-4 pb-5">
              <div
                className={`flag-box-content d-flex flex-column justify-content-evenly align-items-center mx-3 ${
                  dark && "bg-dark"
                }`}
              >
                <div
                  className={`${
                    dark ? "content-icon-dark" : "content-icon"
                  } m-1`}
                >
                  <i className={value.icon}></i>
                </div>
                <div
                  className={`content-text py-2 text-center w-100 ${
                    dark && "text-dark"
                  }`}
                >
                  <h3 className="fw-bold">
                    {lang === "english" ? value.titleEN : value.title}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Values;
