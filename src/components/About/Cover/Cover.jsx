import React from "react";
import { useSelector } from "react-redux";
import "./cover.css";

const Cover = () => {
  const { lang } = useSelector((state) => state.language);
  return (
    <div className="container-cover text-white bg-light">
      <div className="cover-container d-flex p-3 mx-auto flex-column position-relative">
        <main className=" px-3 text-center position-absolute main_cover">
          <h1 className="h1_cover">
            {lang === "english" ? "SAMOU AL ASALAH" : "سمو الأصالة"}
          </h1>
          <h6 className="h6_cover" id="h6_cover">
            {lang === "english"
              ? "For real estate development and investment"
              : " للتطويــر والإستثـمار العقـاري"}
          </h6>
          <p className="lead p_cover" dir="rtl">
            {lang === "english"
              ? "We seek, in  Smou Al asalaa, to create an inspiring society, with creative real estate ideas that riseTo meet the aspirations of our customers and partners "
              : " نسعى في سمو الأصالة لخلقِ مجتمع ملهم، بأفكار عقارية إبداعية ترقى لطموحات عملائنا وشركاؤنا وتسمو بجودة الحياة وفقاً لأهداف رؤية المملكة ٢٠٣٠ م."}
          </p>

          <p className="lead lead_cover">
            <a
              href="#market"
              className="btn arrow-btn btn-secondary fw-bold border-white"
            >
              <img
                className="arrow_cover"
                src="./imgs/about/arrow.png"
                alt="arrow-mark"
              />
            </a>
          </p>
        </main>
      </div>
    </div>
  );
};

export default Cover;
