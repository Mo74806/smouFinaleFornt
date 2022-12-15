/* eslint-disable jsx-a11y/iframe-has-title */

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "./Footer.css";

const Footer = () => {
  const { lang } = useSelector((state) => state.language);
  const { dark } = useSelector((state) => state.dark);

  const [localUser, setLocalUser] = useState(
    JSON.parse(localStorage.getItem("user"))
  );

  useEffect(() => {
    setLocalUser(JSON.parse(localStorage.getItem("user")));
  }, []);
  window.addEventListener("storage", async function () {
    await setLocalUser(JSON.parse(localStorage.getItem("user")));
  });

  console.log(localUser);

  const navigate = useNavigate();
  const adminClickHandle = () => {
    navigate("/admin");
  };

  return (
    <footer
      className={
        lang === "english"
          ? `footer-main py-5 ${dark && "bg-dark"}`
          : `footer-main2 py-5 ${dark && "bg-dark"}`
      }
    >
      <div className="container ">
        <div className="row text-white g-4">
          <div className="col-md-6 col-lg-3 text-center mb-4">
            <a href="./home.html">
              <img
                className="footer-logo"
                src="./imgs/logo/شعار سمو الاصالة ابيض.png"
                alt=""
              />
            </a>
          </div>
          <div className="col-md-6 col-lg-3 px-4 text-center">
            <h5 className="mb-3">
              {" "}
              {lang === "arabic" ? "شركة سمو الأصالة" : "Samou AL Asalah"}
            </h5>
            <p className="footer-text">
              {lang === "english"
                ? "It is one of the leading companies in the field of real estate development and investment. Its principle is transparency"
                : " هي احدى الشركات الرائدة في مجال التطوير والاستثمار العقاري مبدأها الشفافية"}
            </p>
            <p className="footer-text">
              {lang === "english"
                ? "Sumou Al-Asala Company for Real Estate Development and Investment was established to be the beginning of its launch in establishing the highest international standards for the development and management of real estate assets in a sustainable manner."
                : "أسست شركة سمو الأصالة للتطوير والاستثمار العقاري لتكون بدايةانطلاقتها في ارساء أسمى المعاييرالعالمية لتطوير وادارة الأصول العقارية بشكل مستدام"}
            </p>
          </div>

          <div className="col-md-6 col-lg-3 text-center">
            <h5 className="mb-3">
              {lang === "arabic" ? "العنوان" : "Address"}
            </h5>
            <div className="d-flex justify-content-end mx-3 my-2 footer-text">
              <span className="mx-2 order-1">
                <i className="fas fa-map-marked-alt footer-icon"></i>
              </span>
              <span className="fw-light order-0">
                {lang === "english"
                  ? "Dammam Office: Shati 5003, Al Khaleej Street, Office No. 13"
                  : "مكتب الدمام: الشاطئ 5003، شارع الخليج، مكتب رقم 13"}
              </span>
            </div>
            <div className="address-map">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3572.0085826489403!2d50.12437231427102!3d26.455452285995218!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e49fbbc75d61c05%3A0xc5a150a0f14712cb!2zRU1BQjUwMDMsIDUwMDMgS2hhbGVlaiBSZCwgODQ5MdiMINit2Yog2KfZhNi02KfYt9imINin2YTYtNix2YLZitiMIERhbW1hbSAzMjQxNCwgU2F1ZGkgQXJhYmlh!5e0!3m2!1sen!2seg!4v1664047270387!5m2!1sen!2seg"
                width="600"
                height="450"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
          <div className="col-md-6 col-lg-3 px-4 d-flex flex-column align-items-center">
            <h5 className="mb-3">
              {lang === "arabic" ? "تواصل معنا" : "Contact Us"}
            </h5>
            <div className="text-center d-flex flex-column justify-content-center">
              <ul className="social-icon p-0 list-unstyled d-flex flex-row justify-content-between">
                <li>
                  <a
                    href="https://www.facebook.com/"
                    className="text-decoration-none text-white text-muted fs-4 mx-3"
                  >
                    <i className="fab fa-facebook-f footer-icon"></i>
                  </a>
                </li>
                <li>
                  <a
                    href="https://twitter.com/?lang=en"
                    className="text-decoration-none text-white text-muted fs-4 mx-3"
                  >
                    <i className="fab fa-twitter footer-icon"></i>
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.instagram.com/"
                    className="text-decoration-none text-white text-muted fs-4 mx-3"
                  >
                    <i className="fab fa-instagram footer-icon"></i>
                  </a>
                </li>
              </ul>
              <div className="d-flex justify-content-center my-2 footer-text">
                <span className="mx-2 order-1">
                  <i className="fas fa-phone-alt footer-icon"></i>
                </span>
                <span className="order-0"> +954-578-254 </span>
              </div>
              {localUser && localUser.user.role === "admin" && (
                <div
                  onClick={adminClickHandle}
                  id="footer-admin"
                  className="d-flex justify-content-center my-2 footer-text"
                >
                  <span className="mx-2 order-1">
                    <i class="fa-sharp fa-solid fa-lock footer-icon"></i>
                  </span>
                  <span className="order-0"> Admin Dashboard </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
