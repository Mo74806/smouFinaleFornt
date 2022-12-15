import React, { Component } from "react";
import "./circles.css";

export default class Circle extends Component {
  render() {
    let { title, page, classs } = this.props;

    return (
      <div className="col m-2" id="circle">
        <a href={page}>
          <svg
            className={`${classs}  `}
            width="140"
            height="140"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            aria-label="Placeholder: 140x140"
            preserveAspectRatio="xMidYMid slice"
            focusable="false"
          >
            <title>اضغط هنا</title>
            <rect width="100%" height="100%" fill="rgba(5, 5, 5, 0.4)" />
            <text x="67%" y="50%" fill="#fff" dy=".3em" className="value-text">
              {title}
            </text>
          </svg>
        </a>
      </div>
    );
  }
}
