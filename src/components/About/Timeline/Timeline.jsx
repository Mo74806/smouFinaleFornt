import React from "react";
import "./timeline.css";

import { useSelector } from "react-redux";

export default function Timeline() {
  const { lang } = useSelector((state) => state.language);
  const { dark } = useSelector((state) => state.dark);
  return (
    <div className="container my-5">
      <div className="row text-center justify-content-center mb-5">
        <div className="col-xl-8 col-lg-10">
          <h2
            className=" text-center mx-0 d-flex justify-content-center row col-12"
            id="h2"
          >
            <span>
              <img
                className="time_img"
                src="./imgs/about/straight-quote1.png"
                alt="quote-mark"
              />
            </span>
            {lang === "english" ? "Our Working Steps" : "خطوات عملنا"}
          </h2>
          <p
            className=" fw-semibold fs-5 text-center  d-flex justify-self-center"
            dir={lang === "english" ? "ltr" : "rtl"}
          >
            {lang === "english"
              ? "We seek the highness of originality in managing and supervising projects through An integrated system and sequential steps to ensure the success of projects."
              : " نسعى في سمو الأصاله في إدارة المشاريع والإشراف عليها من خلالمنظومة متكامله وخطوات متراتبه لضمان نجاح المشاريع."}
          </p>
        </div>
      </div>

      <div className="row my-5 ">
        <div className="col">
          <div
            className="timeline-steps aos-init aos-animate"
            data-aos="fade-up"
          >
            <div className="timeline-step">
              <div
                className="timeline-content"
                data-toggle="popover"
                data-trigger="hover"
                data-placement="top"
                title=""
                data-content="And here's some amazing content. It's very engaging. Right?"
                data-original-title="2003"
              >
                <div className="inner-circle"></div>
                <p
                  className="h6 text-muted mb-0 mb-lg-0"
                  id={dark ? "h6n" : "h6"}
                >
                  {lang === "english" ? "5" : "٥"}
                </p>
                <p
                  className="h6 text-muted mb-0 mb-lg-0"
                  id={dark ? "h6e" : "h6"}
                >
                  {lang === "english" ? "Project management" : "إدارة المشاريع"}
                </p>
              </div>
            </div>
            <div
              className={
                lang === "english" ? "timeline-step eng" : "timeline-step arb"
              }
            >
              <div
                className="timeline-content"
                data-toggle="popover"
                data-trigger="hover"
                data-placement="top"
                title=""
                data-content="And here's some amazing content. It's very engaging. Right?"
                data-original-title="2004"
              >
                <div className="inner-circle"></div>
                <p
                  className="h6 text-muted mb-0 mb-lg-0"
                  id={dark ? "h6n" : "h6"}
                >
                  {lang === "english" ? "4" : "٤"}
                </p>
                <p
                  className="h6 text-muted mb-0 mb-lg-0"
                  id={dark ? "h6e" : "h6"}
                >
                  {lang === "english"
                    ? "Finance and marketing"
                    : "التمويل والتسويق"}
                </p>
              </div>
            </div>
            <div
              className={
                lang === "english" ? "timeline-step eng" : "timeline-step arb"
              }
            >
              <div
                className="timeline-content"
                data-toggle="popover"
                data-trigger="hover"
                data-placement="top"
                title=""
                data-content="And here's some amazing content. It's very engaging. Right?"
                data-original-title="2005"
              >
                <div className="inner-circle"></div>
                <p
                  className="h6 text-muted mb-0 mb-lg-0"
                  id={dark ? "h6n" : "h6"}
                >
                  {lang === "english" ? "3" : "٣"}
                </p>
                <p
                  className="h6 text-muted mb-0 mb-lg-0"
                  id={dark ? "h6e" : "h6"}
                >
                  {lang === "english" ? "Design idea" : "الفكرة التصميمية"}
                </p>
              </div>
            </div>
            <div
              className={
                lang === "english" ? "timeline-step eng" : "timeline-step arb"
              }
            >
              <div
                className="timeline-content"
                data-toggle="popover"
                data-trigger="hover"
                data-placement="top"
                title=""
                data-content="And here's some amazing content. It's very engaging. Right?"
                data-original-title="2010"
              >
                <div className="inner-circle"></div>
                <p
                  className="h6 text-muted mb-0 mb-lg-0"
                  id={dark ? "h6n" : "h6"}
                >
                  {lang === "english" ? "2" : "٢"}
                </p>
                <p
                  className="h6 text-muted mb-0 mb-lg-0"
                  id={dark ? "h6e" : "h6"}
                >
                  {lang === "english" ? "Feasibility study" : "دراسة الجدوى"}
                </p>
              </div>
            </div>
            <div
              className={
                lang === "english"
                  ? "timeline-step eng mb-0"
                  : "timeline-step arb mb-0"
              }
            >
              <div
                className="timeline-content"
                data-toggle="popover"
                data-trigger="hover"
                data-placement="top"
                title=""
                data-content="And here's some amazing content. It's very engaging. Right?"
                data-original-title="2020"
              >
                <div className="inner-circle"></div>
                <p
                  className="h6 text-muted mb-0 mb-lg-0"
                  id={dark ? "h6n" : "h6"}
                >
                  {lang === "english" ? "1" : "١"}
                </p>
                <p
                  className="h6 text-muted mb-0 mb-lg-0"
                  id={dark ? "h6e" : "h6"}
                >
                  {lang === "english" ? "Market analysis" : "تحليل السوق"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
