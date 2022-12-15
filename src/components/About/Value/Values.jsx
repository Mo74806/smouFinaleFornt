import React from "react";
import { useSelector } from "react-redux";
import "./values.css";

function Values() {
  const { lang } = useSelector((state) => state.language);
  const { dark } = useSelector((state) => state.dark);
  return (
    <div className="container-fluid" dir="rtl">
      <div className="featu">
        <hr
          id="vision"
          className={`featurette-divider mt-0 ${dark ? "divdark" : "divlight"}`}
        />
        <div
          className={`row  ${dark ? "featuretteDark" : "featurette"}`}
          id="vision"
        >
          <div className="col-md-7">
            <div className="px-4">
              <h2
                className="featurette-heading"
                dir={lang === "english" ? "ltr" : "rtl"}
              >
                <span>
                  <img
                    className="quote"
                    src="./imgs/about/straight-quote1.png"
                    alt=""
                  />
                </span>

                <span
                  className={`text ${
                    dark ? " text-darkcustom" : " text-lightcustom"
                  }`}
                  dir={lang === "english" ? "ltr" : "rtl"}
                  id="text"
                >
                  <br />
                  {lang === "english" ? "Vision" : "رؤيتنا"}
                </span>
              </h2>
              <p
                className={`lead par ${dark && "text-light"}`}
                id="p"
                dir={lang === "english" ? "ltr" : "rtl"}
              >
                {lang === "english"
                  ? "Improving communities so that their members can enjoy an exceptional lifestyle"
                  : "تحسين المجتمعات لينعم أفرادها بأسلوب حياة استثنائية"}
              </p>
            </div>
          </div>
          <div className="col-md-5">
            <a href="#market">
              <svg
                className="bd-placeholder-img bd-placeholder-img-lg featurette-image img-fluid mx-auto vision-det"
                width="500"
                height="500"
                xmlns="http://www.w3.org/2000/svg"
                role="img"
                aria-label="Placeholder: 500x500"
                preserveAspectRatio="xMidYMid slice"
                focusable="false"
                id="example2"
              >
                <title>{lang === "english" ? "Click here" : "اضغط هنا"}</title>
                <rect
                  width="100%"
                  height="100%"
                  fill="transparent"
                  className="rect-feture"
                />
              </svg>
            </a>
          </div>
        </div>
        <hr
          id="mission"
          className={`featurette-divider ${dark ? "divdark" : "divlight"}`}
        />
        <div
          className={`row   ${
            dark ? "featuretteDark featurette1Dark" : "featurette1"
          }`}
        >
          <div className="col-md-7  order-md-2">
            <div className="px-4">
              <h2 className="featurette-heading">
                <span>
                  <img
                    className="quote"
                    src="./imgs/about/straight-quote1.png"
                    alt=""
                  />
                </span>
                <br />
                <span
                  className={`text ${
                    dark ? " text-darkcustom" : " text-lightcustom"
                  }`}
                  id="text"
                >
                  {lang === "english" ? "Message" : "رسالتنا"}
                </span>
              </h2>
              <h4 className="h4-value">
                {lang === "english"
                  ? "Develop to be distinct"
                  : "نطور .. لنتميز"}
              </h4>
              <p className={`lead par ${dark && "text-light"}`} id="p">
                {lang === "english"
                  ? "Developing real estate and investment projects with the highest quality standards to suit the aspirations of our clients in all real estate sectors"
                  : "تطوير مشاريع عقارية واستثمارية بأعلى معايير الجودة لتتناسب مع طموحات عملائنا في جميع القطاعات العقارية"}
              </p>
            </div>
          </div>
          <div className="col-md-5 order-md-1">
            <a href="#market">
              <svg
                className="bd-placeholder-img bd-placeholder-img-lg featurette-image img-fluid mx-auto mission-det"
                width="500"
                height="500"
                xmlns="http://www.w3.org/2000/svg"
                role="img"
                aria-label="Placeholder: 500x500"
                preserveAspectRatio="xMidYMid slice"
                focusable="false"
                id="example2"
              >
                <title>{lang === "english" ? "Click here" : "اضغط هنا"}</title>
                <rect
                  width="100%"
                  className="rect-feture"
                  height="100%"
                  fill="transparent"
                />
              </svg>
            </a>
          </div>
        </div>
        <hr
          id="value"
          className={`featurette-divider ${dark ? "divdark" : "divlight"}`}
        />
        <div className={`row  ${dark ? "featuretteDark" : "featurette"}`}>
          <div className="col-md-7">
            <div className="px-4">
              <h2
                className="featurette-heading"
                dir={lang === "english" ? "ltr" : "rtl"}
              >
                <span>
                  <img
                    className="quote"
                    src="./imgs/about/straight-quote1.png"
                    alt=""
                  />
                </span>
                <br />
                <span
                  className={`text ${
                    dark ? " text-darkcustom" : " text-lightcustom"
                  }`}
                  id="text1"
                  dir={lang === "english" ? "ltr" : "rtl"}
                >
                  {lang === "english" ? "Our Goals" : "أهدافنا"}
                </span>
              </h2>
              <div className="p1">
                <p
                  className={`lead par1 ${dark && "text-light"}`}
                  id="p1"
                  dir={lang === "english" ? "ltr" : "rtl"}
                >
                  {lang === "english"
                    ? "Creating opportunities of high social and investment value"
                    : "خلق فرص ذات قيمة اجتماعية واستثمارية عالية."}
                </p>
                <p
                  className={`lead par1 ${dark && "text-light"}`}
                  id="p1"
                  dir={lang === "english" ? "ltr" : "rtl"}
                >
                  {lang === "english"
                    ? "Providing sustainable products that have quality and achieve customer satisfaction"
                    : "توفير منتجات عقارية مستدامة تلبي بجودتها تطلعات السوق وتحقق رضى العملاء"}
                </p>
                <p
                  className={`lead par1 ${dark && "text-light"}`}
                  id="p1"
                  dir={lang === "english" ? "ltr" : "rtl"}
                >
                  {lang === "english"
                    ? "We are working on developing a real estate footprint with the aim of improving and developing communities"
                    : "نعمل على وضع بصمة عقارية بهدف تحسين وتطوير المجتمعات."}
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-5">
            <a href="#market">
              <svg
                className="bd-placeholder-img bd-placeholder-img-lg featurette-image img-fluid mx-auto value-det"
                width="500"
                height="500"
                xmlns="http://www.w3.org/2000/svg"
                role="img"
                aria-label="Placeholder: 500x500"
                preserveAspectRatio="xMidYMid slice"
                focusable="false"
                id="example2"
              >
                <title>{lang === "english" ? "Click here" : "اضغط هنا"}</title>
                <rect
                  className="rect-feture"
                  width="100%"
                  height="100%"
                  fill="transparent"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Values;
