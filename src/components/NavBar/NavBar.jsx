import { useDispatch, useSelector } from "react-redux";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import "./NavBar.css";
import { userActions } from "../../store/reducers/userSlice";
import { changeLanguge } from "../../store/reducers/language";
import { changeDark } from "../../store/reducers/dark";

const NavBar = () => {
  const { lang } = useSelector((state) => state.language);
  const { dark } = useSelector((state) => state.dark);
  let { isLoggedIn } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logOut = () => {
    localStorage.removeItem("jwt");
    localStorage.removeItem("user");
    localStorage.setItem("isLoggedIn", false);
    dispatch(userActions.logOutHandler());
    window.dispatchEvent(new Event("storage"));
    navigate("/");
  };

  const location = useLocation();
  const logInHandler = () => {
    navigate("/login", {
      state: { prevPath: location.pathname },
      replace: true,
    });
  };

  const langChange = () => {
    dispatch(changeLanguge());
  };
  const darkChange = (e) => {

    dispatch(changeDark());
      e.preventDeafult();
  };

  return (
    <nav
      className={
        dark === false
          ? "navbar sticky-top navbar-expand-lg py-1  "
          : "navbar bg-dark sticky-top navbar-expand-lg py-1  "
      }
    >
      <div className="container">
        {/* <div className="order-lg-2 nav-btns">
            <a href="http://www.facebook.com" target="_blank" rel="noreferrer">
              <i className="fa-brands fa-facebook"></i>
            </a>
            <a href="http://www.twitter.com" target="_blank" rel="noreferrer">
              <i className="fa-brands fa-twitter"></i>
            </a>
            <a href="http://www.instagram.com" target="_blank" rel="noreferrer">
              <i className="fa-brands fa-instagram"></i>
            </a>
          </div> */}
        <div
          className="navbar-brand d-flex justify-content-between-align-items-center my-auto order-lg-0"
          onClick={() => navigate("/")}
        >
          <img
            id="logo-img"
            src="./imgs/logo/Sumou-Al-Asala-Logo.png"
            alt="site icon"
          />
          <img
            id="logo-text"
            src="./imgs/logo/Sumou-Al-Asala-Logo-text.png"
            alt="site icon"
          />
        </div>

        <button
          className="navbar-toggler my-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navMenu"
          aria-controls="navMenu"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className={`navbar-toggler-icon ${
        dark && "navbar-dark "}`}></span>
        </button>
        <div className="collapse navbar-collapse order-lg-1" id="navMenu">
          <ul className="navbar-nav mx-auto text-center">
            <li className="nav-item px-2 py-2 order-lg-3">
              <NavLink
                className="nav-link text-uppercase "
                activeclassname="active"
                to="/"
              >
                {lang === "arabic" ? "الرئيسية" : "Home"}
              </NavLink>
            </li>
            <li className="nav-item px-2 py-2 order-lg-2">
              <NavLink
                className="nav-link text-uppercase"
                activeclassname="active"
                to="/projects"
              >
                {lang === "arabic" ? "المشروعات" : "Projects"}
              </NavLink>
            </li>
            <li className="nav-item px-2 py-2 order-lg-1">
              <NavLink
                className="nav-link text-uppercase"
                activeclassname="active"
                to="/contact"
              >
                {lang === "arabic" ? "اتصل بنا" : "Contact us"}
              </NavLink>
            </li>
            <li className="nav-item px-2 py-2 order-lg-0">
              <NavLink
                className="nav-link text-uppercase"
                activeclassname="active"
                to="/about"
              >
                {lang === "arabic" ? "من نحن" : "About us"}
              </NavLink>
            </li>
          </ul>
          <ul className="navbar-nav d-flex flex-row justify-content-between">
            {isLoggedIn ? (
              <li className="nav-item p-2">
                <button
                  className={`nav-link ${
                    !dark ? "login" : "loginDark"
                  } text-uppercase`}
                  to="/login"
                  onClick={logOut}
                >
                  {lang === "arabic" ? "تسجيل الخروج" : "logout"}
                </button>
              </li>
            ) : (
              <li className="nav-item p-2">
                <button
                  className={`nav-link ${
                    !dark ? "login" : "loginDark"
                  } text-uppercase`}
                  onClick={logInHandler}
                >
                  {lang === "arabic" ? "الدخول" : "Login"}
                </button>
              </li>
            )}
          </ul>
          <ul className="navbar-nav d-flex flex-row">
            <li className="nav-item mx-2">
              <button
                onClick={langChange}
                className={`nav-link ${!dark ? "login" : "loginDark"}`}
              >
                {lang === "arabic" ? "EN" : "AR"}
              </button>
            </li>
            <li className="nav-item">
              <button
                onClick={()=>{    dispatch(changeDark())}}
                className={`nav-link ${!dark ? "login" : "loginDark"}`}
              >
                {dark === true ? (
                  <i class="fa-solid fa-sun"></i>
                ) : (
                  <i class="fa-solid fa-moon"></i>
                )}
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
