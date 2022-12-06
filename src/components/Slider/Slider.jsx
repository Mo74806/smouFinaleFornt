import React from "react";
import "./Slider.css";
import { sliderItems } from "../../data";
import styled from "styled-components";
import { mobile, tablet } from "../../responsive";
import { Carousel } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ImageBox = styled.div`
  position: relative;
  &::after {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6));
  }
`;

const Title = styled.h5`
  text-shadow: 4px 3px 0px #000, 9px 8px 0px rgba(0, 0, 0, 0.15);
  color: var(--main-color);
  white-space: nowrap;
  font-weight: 600;
  font-size: 3rem;
  white-space: nowrap;
  ${mobile({ fontSize: "1.5rem" })}
  ${tablet({ fontSize: "2rem" })}
`;
const Desc = styled.p`
  font-size: 2.5rem;
  white-space: nowrap;
  text-shadow: 4px 3px 0px #000, 9px 8px 0px rgba(0, 0, 0, 0.15);
  ${mobile({ fontSize: "0.7rem" })}
  ${tablet({ fontSize: "1.2rem" })}
`;

const Button = styled.button`
  border: 1.5px solid #fff;
  border-radius: 25px;
  padding: 10px 20px;
  color: #fff;
  font-weight: bold;
  background: transparent;
  transition: all ease 0.3s;
  font-size: 1rem;
  ${mobile({ fontSize: "0.6rem", padding: "5px 10px" })}

  &:hover {
    background-color: var(--main-color);
    border-color: var(--main-color);
  }
`;

const Slider = () => {
  const { lang } = useSelector((state) => state.language);
  const navigate = useNavigate();
  const clickHandler = () => {
    navigate("/about");
  };
  return (
    <Carousel variant="light">
      {sliderItems.map((slide) => (
        <Carousel.Item>
          <ImageBox>
            <img className="d-block w-100" src={slide.img} alt="slider-image" />
          </ImageBox>
          <Carousel.Caption
            className={
              lang === "english"
                ? "d-flex flex-column align-items-end justify-content-center carousel-captionEN"
                : "d-flex flex-column align-items-end justify-content-center carousel-captionAR"
            }
          >
            <Title>{lang === "english" ? slide.titleEN : slide.title}</Title>
            <Desc className="">
              {lang === "english" ? slide.descEN : slide.desc}
            </Desc>
            <Button onClick={clickHandler}>
              {lang === "english" ? "Read more" : "أقرأ المزيد"}
            </Button>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default Slider;
