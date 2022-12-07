import React, { useEffect } from "react";
import CardS from "../../components/About/Card/CardS";
import CircleS from "../../components/About/Circle/CircleS";
import Cover from "../../components/About/Cover/Cover";
import Slider from "../../components/About/Slider/Slider";
import Timeline from "../../components/About/Timeline/Timeline";
import Values from "../../components/About/Value/Values";
import "../../components/About/about.css";
import { useSelector } from "react-redux";
import { animateScroll as scroll } from "react-scroll";
const About = () => {
  const { dark } = useSelector((state) => state.dark);
  useEffect(() => {
    scroll.scrollToTop();
  },[]);
  return (
    <div className={`body ${dark && "bg-dark"}`}>
      <Cover />
      <CircleS />
      <Values />
      <CardS />
      <Slider />
      <Timeline />
    </div>
  );
};

export default About;
