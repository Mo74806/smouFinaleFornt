import React, { Component } from "react";
import "./cards.css";

export default class Card extends Component {
  render() {
    let { title, des } = this.props;
    return (
      <div className="card card-about">
        <img
          src="./imgs/about/wallpaper2.jpg"
          className="card-img-top"
          alt="..."
        />
        <div className="card-body card-body-about ">
          <h5 className="card-title card-title-about"> {title}</h5>
          <p className="card-text hide card-text-about " dir="rtl">
            {des}
          </p>
        </div>
        <div className="card-footer card-footer-about"></div>
      </div>
    );
  }
}
