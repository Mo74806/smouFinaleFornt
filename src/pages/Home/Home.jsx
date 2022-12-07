import React, { Fragment } from "react";
import Projects from "../../components/Projects/Projects";
import Slider from "../../components/Slider/Slider";
import Summary from "../../components/Summary/Summary";
import Values from "../../components/Values/Values";
import { animateScroll as scroll } from "react-scroll";
import { useEffect } from "react";

const Home = () => {

  useEffect(() => {
    scroll.scrollToTop();
  },[]);

  return (
    <Fragment>
      <Slider />
      <Summary />
      <Values />
      <Projects />
    </Fragment>
  );
};

export default Home;
