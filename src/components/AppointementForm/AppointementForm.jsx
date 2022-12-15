import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { animateScroll as scroll } from "react-scroll";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { CenterFocusStrong, Dangerous } from "@mui/icons-material";

export default function AppointementForm() {
  const { dark } = useSelector((state) => state.dark);
  const { lang } = useSelector((state) => state.language);
  const { serverError, user } = useSelector((state) => state.user);
  const [form, setForm] = useState({ day: "" });
  const [freeHoursResponse, setFreeHoursResponse] = useState("");
  const [appointement, setapp] = useState("");
  const [error, setError] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  const [logged, setLogged] = useState(
    JSON.parse(localStorage.getItem("isLoggedIn"))
  );
  useEffect(() => {
    scroll.scrollToTop();
  }, []);

  useEffect(() => {
    setLogged(JSON.parse(localStorage.getItem("isLoggedIn")));
  }, []);

  window.addEventListener("storage", function () {
    setLogged(JSON.parse(localStorage.getItem("isLoggedIn")));
  });

  let handleDelete = async () => {
    const jwt = localStorage.getItem("jwt");
    setapp(null);
    const response = await axios.delete(
      `https://smou-alasala-server-ap-qy3u2378d-mo74806.vercel.app/api/v1/appointements/${appointement._id}`,
      { headers: { jwt } }
    );
  };

  let getAppointement = async () => {
    let id = localStorage.getItem("app");

    let localUser = JSON.parse(localStorage.getItem("user"));
    if (localUser) {
      const jwt = localStorage.getItem("jwt");

      const response1 = await axios.get(
        `https://smou-alasala-server-ap-qy3u2378d-mo74806.vercel.app/api/v1/appointements/user/${localUser._id}`,
        { headers: { jwt } }
      );

      setapp(response1.data.data.appointement);
    }
  };

  useEffect(() => {
    getAppointement();
  }, [user]);
  useEffect(() => {}, [freeHoursResponse]);

  useEffect(() => {}, [freeHoursResponse]);

  let handleShow = async () => {
    if (form.day) {
      const jwt = localStorage.getItem("jwt");
      const response = await axios.get(
        `https://smou-alasala-server-ap-qy3u2378d-mo74806.vercel.app/api/v1/appointements/free/${form.day}`,
        { headers: { jwt } }
      );
      if (
        response.data.message == "this is a dayoff " ||
        response.data.message == "select valid date "
      ) {
        lang === "english"
          ? setError("this day is not valid please choose another day")
          : setError("هذا اليوم غير متاح من فضلك اختر يوم اّخر");
      } else {
        setError(null);
        setFreeHoursResponse(response.data.data.freeHourse);
      }
    }
  };

  let handleClick = async (h) => {
    const jwt = localStorage.getItem("jwt");
    axios
      .post(
        `https://smou-alasala-server-ap-qy3u2378d-mo74806.vercel.app/api/v1/appointements`,
        { startDate: `${form.day}T${h}:00` },
        { headers: { jwt } }
      )
      .then((response) => {
        if (lang === "english")
          toast.success("Your appointment successfuly booked");
        else toast.success("تم حجز موعد زيارتك بنجاح");
        setFreeHoursResponse([]);

        //edit set user appointement in slice
        setapp({ ...response.data.data.appointement });
        localStorage.setItem("app", response.data.data.appointement._id);
      })
      .catch((e) => {
        if (e.response.data.message.startsWith("E11000 duplicate key")) {
          if (lang === "english")
            toast.error("You already have an appointement");
          else toast.error("انت بالفعل لديك حجز");
        }
      });
  };
  let handleChange = (e) => {
    e.preventDefault();
    if (e.target.value != "") {
      setForm((prev) => ({ day: e.target.value }));
      return;
    }
  };

  const loginHandler = () => {
    navigate("/login", {
      state: { prevPath: location.pathname },
      replace: true,
    });
  };
  const signUpHandler = () => {
    navigate("/register", {
      state: { prevPath: location.pathname },
      replace: true,
    });
  };

  return (
    <div className="contact-form-form-section row  m-0 p-0   ">
      <div>
        <Toaster />
      </div>
      <div className=" mask" style={{ backgroundColor: "rgba(0, 0, 0, 0.85)" }}>
        <div className="    ">
          <div action="" className="row   hstack justify-centent-center">
            <div className="row d-flex align-items-center  justify-content-center justify-content-xl-start   mx-xl-5 mx-auto py-5">
              <div
                className={`col-10    ${
                  dark
                    ? "contact-form-form-body-dark"
                    : "contact-form-form-body"
                } col-lg-4  px-2 text-center `}
              >
                <h3
                  className={
                    lang === "english"
                      ? "text-white text-center w-100 mx-3 "
                      : "text-white text-center w-100 mx-3 "
                  }
                >
                  {lang === "english"
                    ? "Book your aoointment"
                    : "احجز مواعد لزيارتك"}
                </h3>

                {logged ? (
                  <>
                    <div className="mb-2 mx-3">
                      <label for="start">Start date:</label>

                      <input
                        type="date"
                        id="start"
                        name="trip-start"
                        placeholder="2018-07-22"
                        value={form.day}
                        min="2022-01-01"
                        max="2024-12-31"
                        onChange={handleChange}
                      />
                    </div>
                    {error && (
                      <div className="text-center text-danger">{error}</div>
                    )}
                    <button onClick={handleShow}>
                      {lang === "english"
                        ? "Valid appointments"
                        : "المواعيد المتاحة"}
                    </button>
                  </>
                ) : (
                  <div className="row -flex  justify-content-center align-items-cenetr">
                    <div className="col-8 py-2 text-white text-center fw-bold ">
                      <p>
                        {lang === "english"
                          ? "Please Loging to book"
                          : "من فضلك سجل دخول بحسابك لتسطيع حجز موعد"}
                      </p>
                    </div>
                    <div className="col-5 btn nav-item px-2 border border-0 py-2">
                      <button className="col-12" onClick={signUpHandler}>
                        {lang === "english" ? "Creat account" : "انشاء حساب"}
                      </button>
                    </div>
                    <div className="col-5 btn nav-item p-2 border border-0">
                      <button className="col-12" onClick={loginHandler}>
                        {lang === "english" ? "Login" : "الدخول"}
                      </button>
                    </div>
                  </div>
                )}

                {freeHoursResponse &&
                  !error &&
                  freeHoursResponse.map((item) => (
                    <div key={item} className="row justify-content-center">
                      <button
                        onClick={() => handleClick(item)}
                        className="my-2 col-10 "
                      >
                        <p className="text-white fw-bold">{`${item}:00 `}</p>
                      </button>
                    </div>
                  ))}
              </div>
            </div>
            {appointement && (
              <div className="row d-flex justify-content-center col-12 my-lg-0 my-3 col-lg-8 mx-auto fw-bold text-center">
                <h3 className="fw-bold text-center text-white mb-5">
                  {lang === "english"
                    ? "Previous appointments"
                    : ":الحجوزات السابقة"}
                </h3>

                <div className="row">
                  <div className="col-8 text-danger fw-bold">
                    {new Date(appointement.startDate).getDate()}/
                    {new Date(appointement.startDate).getMonth() + 1}/
                    {new Date(appointement.startDate).getFullYear()}
                  </div>
                  <div className="col-2 text-white">
                    {lang === "english" ? "Day" : ":اليوم"}
                  </div>
                </div>

                <div className="row">
                  <div className="col-8 text-danger fw-bold">
                    {new Date(appointement.startDate).getHours()}:00
                  </div>
                  <div className="col-2 text-white">
                    {lang === "english" ? "Time" : ":الساعة"}
                  </div>
                </div>

                <div className="row">
                  <div className="col-8 text-danger fw-bold">
                    {appointement.confirm === true
                      ? lang === "english"
                        ? "confirmed"
                        : "تم التاكيد"
                      : lang === "english"
                      ? "pending"
                      : "انتظار التاكيد"}
                  </div>
                  <div className="col-2 text-white">
                    {lang === "english" ? "status" : ":تأكيد"}
                  </div>
                </div>

                <div className="row d-flex justify-content-center my-5 py-5">
                  <button
                    className="col-6 rounded-pill "
                    onClick={handleDelete}
                  >
                    {lang === "english" ? "Cancel appontment" : "إلغاء الزيارة"}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
