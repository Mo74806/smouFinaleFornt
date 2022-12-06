import React from "react";
import { useSelector } from "react-redux";
import "./values.css";

function Values() {
  const { lang } = useSelector((state) => state.language);
  const { dark } = useSelector((state) => state.dark);
  return (
    <div className="container-all " dir="rtl">
      <div className="featu">
        <div
          className={`row col-xl-10 col-12 ${
            dark ? "featuretteDark" : "featurette"
          }`}
          id="vision"
        >
          <div className="col-xl-7 col-12 ">
            <div className="content-text1">
              <h2
                className="featurette-heading"
                dir={lang === "english" ? "ltr" : "rtl"}
              >
                <span>
                  <img
                    className="quote"
                    src="./imgs/about/straight-quote1.png"
                    alt="quote-mark"
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
                className="bd-placeholder-img d-none d-xl-block bd-placeholder-img-lg featurette-image img-fluid mx-auto vision-det"
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
        </div>{" "}
        <hr className={`featurette-divider ${dark ? "divdark" : "divlight"}`} />
        <div className="m-0">
          <div dir="ltr">
            <div
              className={`row col-xl-10  mx-0 d-flex justify-self-start text-start ${
                dark
                  ? "featuretteDark featurette1Dark"
                  : "featurette featurette1"
              }`}
              dir="rtl"
              id="mission"
            >
              <div className="col-xl-7 text-start col-12  order-md-2">
                <div className="content-text1">
                  <h2 className="featurette-heading">
                    <span>
                      <img
                        className="quote"
                        src="./imgs/about/straight-quote1.png"
                        alt="quote-mark"
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
              <div className="col-md-5  order-md-1">
                <a href="#market">
                  <svg
                    className="bd-placeholder-img d-none d-xl-block bd-placeholder-img-lg featurette-image img-fluid mx-auto mission-det"
                    width="500"
                    height="500"
                    xmlns="http://www.w3.org/2000/svg"
                    role="img"
                    aria-label="Placeholder: 500x500"
                    preserveAspectRatio="xMidYMid slice"
                    focusable="false"
                    id="example2"
                  >
                    <title>
                      {lang === "english" ? "Click here" : "اضغط هنا"}
                    </title>
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
          </div>
          <hr
            className={`featurette-divider ${dark ? "divdark" : "divlight"}`}
          />
          <div
            className={`row col-xl-10 col-12  ${
              dark ? "featuretteDark" : "featurette"
            }`}
            id="value"
          >
            <div className="col-xl-7 col-12 ">
              <div className="content-text1">
                <h2
                  className="featurette-heading"
                  dir={lang === "english" ? "ltr" : "rtl"}
                >
                  <span>
                    <img
                      className="quote"
                      src="./imgs/about/straight-quote1.png"
                      alt="quote-mark"
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
                    className={` ${dark && "text-light"}`}
                    id="p"
                    dir={lang === "english" ? "ltr" : "rtl"}
                  >
                    {lang === "english"
                      ? "Creating opportunities of high social and investment value"
                      : "خلق فرص ذات قيمة اجتماعية واستثمارية عالية."}
                  </p>
                  <p
                    className={` ${dark && "text-light"}`}
                    id="p"
                    dir={lang === "english" ? "ltr" : "rtl"}
                  >
                    {lang === "english"
                      ? "Providing sustainable products that have quality and achieve customer satisfaction"
                      : "توفير منتجات عقارية مستدامة تلبي بجودتها تطلعات السوق وتحقق رضى العملاء"}
                  </p>
                  <p
                    className={` ${dark && "text-light"}`}
                    id="p"
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
                  className="bd-placeholder-img d-none d-xl-block bd-placeholder-img-lg featurette-image img-fluid mx-auto value-det"
                  width="500"
                  height="500"
                  xmlns="http://www.w3.org/2000/svg"
                  role="img"
                  ariaLabel="Placeholder: 500x500"
                  preserveAspectRatio="xMidYMid slice"
                  focusable="false"
                  id="example2"
                >
                  <title>
                    {lang === "english" ? "Click here" : "اضغط هنا"}
                  </title>
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
    </div>
  );
}

export default Values;
