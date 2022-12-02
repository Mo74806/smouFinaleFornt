import React, { useState } from "react";
import { useSelector } from "react-redux";
import "./MapAndDetails.css";
export default function MapAndDetails() {
    const { dark } = useSelector((state) => state.dark);
  const { lang } = useSelector((state) => state.language);
  return (
    <div className="row m-0 border-top border-5 border-white mapAndDetails-details-info">
      <div className="container mx-auto py-5 ">
        <div className="row d-flex justify-content-center m-0">
          <div className={`col-lg-5 my-3 mx-lg-2 ${dark?'mapAndDetails-card-dark':'mapAndDetails-card'} col-12   `}>
            <div className="container  py-5">
              <h1 className="text-center fw-bolder py-2 px-2 text-white">
                {lang === "english" ? "Location" : "موقعنا"}
              </h1>
              <div className="row justify-content-center align-items-center">
                <div className="wow zoomIn col-10" data-wow-duration=".4s">
                  <iframe
                    className="mapAndDetails-map"
                    width="100%"
                    height="500px"
                    frameBorder="0"
                    style={{ border: 0 }}
                    src="https://www.google.com/maps/embed/v1/place?q=29.980669,31.339709&amp;key=AIzaSyBWs4kEppBNkazmiNugMLoOdjGhpwVgX78"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>

          <div className={`col-lg-5 my-3 ${dark?'mapAndDetails-card-dark':'mapAndDetails-card'} col-12  text-white`}>
            <div className="container  py-5">
              <h1 className="text-center fw-bolder py-2 px-2">
                {lang === "english" ? "Contact information" : "معلومات التواصل"}
              </h1>

              <div className="mapAndDetails-detail-item row p-3 ">
                <div className="mapAndDetails-detail-item--desc  col-7 fw-smaller  ">
                  {lang === "english"
                    ? "Dammam Office: Shati 5003, Al Khaleej Street, Office No. 13"
                    : "مكتب الدمام: الشاطئ 5003، شارع الخليج، مكتب رقم 13"}
                </div>

                <div
                  className={
                    lang === "english"
                      ? "col-5  mapAndDetails-detail-item--title text-start fw-bold"
                      : "col-5  mapAndDetails-detail-item--title text-end fw-bold"
                  }
                >
                  {lang === "english" ? "Location" : "العنوان"}
                  <i className="px-2  fa-sharp  fa-solid fa-location-dot"></i>
                </div>
              </div>

              <div className="mapAndDetails-detail-item row p-3">
                <div className="mapAndDetails-detail-item--desc  col-7 fw-smaller ">
                  {" "}
                  +954-578-254
                </div>
                <div
                  className={
                    lang === "english"
                      ? "mapAndDetails-detail-item--title col-5   text-start fw-bold"
                      : "mapAndDetails-detail-item--title col-5   text-end fw-bold"
                  }
                >
                  {lang === "english" ? "Phone" : "الهاتف"}
                  <i className=" px-2  fa-solid fa-phone"></i>
                </div>
              </div>
              <div className="mapAndDetails-detail-item row p-3 ">
                <div className="mapAndDetails-detail-item--desc  col-6 fw-smaller  ">
                  smouall@gmail.com
                </div>

                <div
                  className={
                    lang === "english"
                      ? "mapAndDetails-detail-item--title col-6   text-start fw-bold"
                      : "mapAndDetails-detail-item--title col-6   text-end fw-bold"
                  }
                >
                  {lang === "english" ? "Email" : "البريد الالكتروني"}
                  <i className=" px-1 text-end fa-solid fa-envelopes-bulk"></i>
                </div>
              </div>
              <div className="mapAndDetails-detail-item  row m-0 p-5">
                <div className="mapAndDetails-detail-item--desc   text-center  col-12 ">
                  <i className="fa-brands px-3 fs-1 fa-facebook"></i>
                  <i className="fa-brands px-3 fs-1 fa-twitter"></i>
                  <i className="fa-brands px-3 fs-1 fa-instagram"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
