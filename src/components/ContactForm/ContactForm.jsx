import React, { useState } from "react";
import "./ContactForm.css";

import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function ContactForm() {
  const { dark } = useSelector((state) => state.dark);
  const { lang } = useSelector((state) => state.language);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    mail: "",
    message: "",
  });

  const [error, setError] = useState({
    name: null,
    phone: null,
    mail: null,
    message: null,
  });

  let handleAdd = async (e) => {
    e.preventDefault();

    const response = await axios.post(
      "https://smou-alasala-server-ap-qy3u2378d-mo74806.vercel.app/api/v1/contacts",
      form
    );

    let msg = "تم تسجيل استفسارك بنجاح";
    if (lang === "english") {
      msg = "Your enquiry submitet successfuly";
    } else {
      msg = "تم تسجيل استفسارك بنجاح";
    }
    toast.success(msg);
    window.location.reload(false);
    setForm("");
  };
  let handleChange = (e) => {
    setForm((p) => {
      return { ...p, [e.target.name]: e.target.value };
    });

    if (e.target.name === "name") {
      if (e.target.value.length <= 3)
        setError((p) => {
          return lang === "english"
            ? { ...p, [e.target.name]: "Name must be at least 3 characters" }
            : { ...p, [e.target.name]: "يجب أن يكون أسمك أكثر من 3 حروف" };
        });
      else {
        setError((p) => {
          return { ...p, [e.target.name]: null };
        });
      }
    }
    if (e.target.name === "phone") {
      if (e.target.value.length <= 10) {
        setError((p) => {
          return lang === "english"
            ? {
                ...p,
                [e.target.name]: "Please write a valid phone number",
              }
            : {
                ...p,
                [e.target.name]: "من فضللك أدخل رقم هاتف صحيح",
              };
        });
      } else {
        setError((p) => {
          return { ...p, [e.target.name]: null };
        });
      }
    }

    if (e.target.name === "mail") {
      const emailRegex = new RegExp(
        /^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/,
        "gm"
      );
      if (!emailRegex.test(e.target.value)) {
        setError((p) => {
          return lang === "english"
            ? {
                ...p,
                [e.target.name]: "Please insert a valid email",
              }
            : {
                ...p,
                [e.target.name]: "من فضللك أدخل بريد إلكتروني صحيح",
              };
        });
      } else {
        setError((p) => {
          return { ...p, [e.target.name]: null };
        });
      }
    }
    if (e.target.name === "message") {
      if (e.target.value.length <= 0) {
        setError((p) => {
          return lang === "english"
            ? {
                ...p,
                [e.target.name]: "Please write your enquery",
              }
            : {
                ...p,
                [e.target.name]: "من فضللك أدخل استفسارك",
              };
        });
      } else {
        setError((p) => {
          return { ...p, [e.target.name]: null };
        });
      }
    }
  };

  return (
    <div className="row m-0  contact-form-form-section  border-top  ">
      <div>
        <Toaster />
      </div>
      <div
        className="row m-0 mask"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.85)" }}
      >
        <div className="container m-0 row">
          <form action="" className="row m-0 ">
            <div className="row d-flex  justify-content-lg-start justify-content-center m-0 mx-lg-5   mx-auto mx-lg-0  py-5">
              <div
                className={`col-12 ${
                  dark
                    ? "contact-form-form-body-dark"
                    : "contact-form-form-body"
                } col-lg-4  px-2 text-center `}
              >
                <h3
                  className={
                    lang === "english"
                      ? "text-white fw-semibold my-2 text-start mx-3 "
                      : "text-white fw-semibold my-2 text-end mx-3 "
                  }
                >
                  {lang === "english" ? "Send enquiry" : "إرسل استفسارك"}
                </h3>
                <div className="mb-2 mx-3">
                  <input
                    type="text"
                    name="name"
                    className={lang === "english" ? "text-start" : "text-end"}
                    id="exampleFormControlInput1"
                    placeholder={lang === "english" ? "Name" : "الأسم"}
                    onChange={handleChange}
                  />
                </div>
                {error.name && (
                  <p className="text-danger mapAndDetails-text-sm">
                    {error.name}
                  </p>
                )}
                <div className="mb-2 mx-3">
                  <input
                    type="text"
                    name="phone"
                    className={
                      lang === "english"
                        ? "text-start overflow-hidden"
                        : " text-end overflow-hidden"
                    }
                    id="exampleFormControlInput2"
                    placeholder={lang === "english" ? "Phone number" : "الهاتف"}
                    onChange={handleChange}
                  />
                </div>
                {error.phone && (
                  <p className="text-danger mapAndDetails-text-sm">
                    {error.phone}
                  </p>
                )}

                <div className="mb-2 mx-3">
                  <input
                    type="text"
                    name="mail"
                    className={lang === "english" ? "text-start" : "text-end"}
                    id="exampleFormControlInput3"
                    placeholder={
                      lang === "english" ? "Email" : "البريد الألكتروني"
                    }
                    onChange={handleChange}
                  />
                </div>
                {error.mail && (
                  <p className="text-danger mapAndDetails-text-sm">
                    {error.mail}
                  </p>
                )}

                <div className="mb-2 mx-3">
                  <textarea
                    rows="3"
                    type="text"
                    name="message"
                    className={lang === "english" ? "text-start" : "text-end"}
                    id="exampleFormControlInput4"
                    placeholder={
                      lang === "english" ? "Enter you enquiry" : "استفسارك"
                    }
                    onChange={handleChange}
                  />

                  {error.message && (
                    <p className="text-danger mapAndDetails-text-sm">
                      {error.message}
                    </p>
                  )}

                  <button className=" my-2 col-7" onClick={handleAdd}>
                    {lang === "english" ? "Send" : "إرسال"}
                  </button>
                  <Link className="" to="/appointment">
                    <button className="col-7 my-2 border border-0">
                      {lang === "english" ? "Book appointment" : "احجز موعد"}
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
