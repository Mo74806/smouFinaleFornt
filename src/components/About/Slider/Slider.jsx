import React from "react";
import "./slider.css";
import Carousel from "react-bootstrap/Carousel";
import { useSelector } from "react-redux";

const Slider = () => {
  const { lang } = useSelector((state) => state.language);
  return (
    <div className="container">
      <Carousel fade id="carousel">
        <Carousel.Item>
          <img
            className="d-block w-100 slider_img"
            src="./imgs/about/slider1.jpg"
            alt="First slide"
          />
          <Carousel.Caption
            className={
              lang === "english"
                ? "slider_caption english1"
                : "slider_caption arabic1"
            }
          >
            <h3 id={lang === "english" ? "h3e" : "h3"}>
              {lang === "english" ? "Working Fields" : "مجالات عملنا"}
            </h3>
            <p id={lang === "english" ? "p_slidere" : "p_slider"}>
              {lang === "english" ? "The residential sector" : "القطاع السكني"}
            </p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img
            className=" slider_img d-block w-100"
            src="./imgs/about/slider2.jpg"
            alt="Second slide"
          />

          <Carousel.Caption
            className={
              lang === "english"
                ? "slider_caption english1"
                : "slider_caption arabic1"
            }
          >
            <h3 id={lang === "english" ? "h3e" : "h3"}>
              {lang === "english" ? "Working Fields" : "مجالات عملنا"}{" "}
            </h3>
            <p id={lang === "english" ? "p_slidere" : "p_slider"}>
              {lang === "english"
                ? "Hotel/hospitality sector"
                : "القطاع الفندقي / الضيافة"}
            </p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img
            className="d-block w-100 slider_img"
            src="./imgs/about/slider3.jpg"
            alt="Third slide"
          />

          <Carousel.Caption
            className={
              lang === "english"
                ? "slider_caption english1"
                : "slider_caption arabic1"
            }
          >
            <h3 id={lang === "english" ? "h3e" : "h3"}>
              {lang === "english" ? "Working Fields" : "مجالات عملنا"}
            </h3>
            <p id={lang === "english" ? "p_slidere" : "p_slider"}>
              {lang === "english" ? "Administrative sector" : "القطاع الإداري"}
            </p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img
            className="d-block w-100 slider_img"
            src="./imgs/about/slider4.jpg"
            alt="Third slide"
          />

          <Carousel.Caption
            className={
              lang === "english"
                ? "slider_caption english1"
                : "slider_caption arabic1"
            }
          >
            <h3 id={lang === "english" ? "h3e" : "h3"}>
              {lang === "english" ? "Working Fields" : "مجالات عملنا"}
            </h3>
            <p id={lang === "english" ? "p_slidere" : "p_slider"}>
              {lang === "english" ? "Commercial sector" : "القطاع التجاري"}
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
};

export default Slider;
