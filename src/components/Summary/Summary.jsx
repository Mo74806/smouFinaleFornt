import React from "react";
import "./Summary.css";
import { summary } from "../../data";
import styled from "styled-components";
import { useSelector } from "react-redux";

const SummaryCardBox = styled.div`
  height: 400px;
  background-image: linear-gradient(
      0deg,
      rgba(0, 0, 0, 0.7) 0%,
      rgba(0, 0, 0, 0.8) 60%
    ),
    /* we cannot use "filter: brightness()" because it will affect on text brightness also */
      url(${"./imgs/summary-background.jfif"});
  &:hover {
    box-shadow: rgb(38, 57, 77) 0px 20px 30px -10px;
    transform: scale(1.1, 1.1);
  }
`;

const Summary = () => {
  const { lang } = useSelector((state) => state.language);
  const { dark } = useSelector((state) => state.dark);
  return (
    <section className={`section summary py-5 ${dark && "bg-dark"}`}>
      <div className="container">
        <div className="row">
          {summary.map((item) => (
            <div className="summary-card col-lg-4">
              <SummaryCardBox className="summary-card-box m-3 p-4">
                <div className="summary-card-content h-100 text-center pt-3">
                  <div className="content-icon mb-2">
                    <i className={item.icon}></i>
                  </div>
                  <h3>{lang === "english" ? item.titleEN : item.title}</h3>
                  <span className="mb-4">
                    {lang === "english" ? item.hintEN : item.hint}
                  </span>
                  <p className="px-5">
                    {lang === "english" ? item.descEN : item.desc}
                  </p>
                </div>
              </SummaryCardBox>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Summary;
