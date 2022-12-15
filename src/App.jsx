import { Fragment, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer/Footer";
import NavBar from "./components/NavBar/NavBar";
import About from "./pages/About/About";
import Login from "./pages/Login/Login";
import Projects from "./pages/Projects/Projects";
import Register from "./pages/Register/Register";
import ContactUsPage from "./pages/ContactUsPage/ContactUsPage";
import ProjectDetails from "./pages/ProjectDetails/ProjectDetails";
import Contact from "./pages/Contact/Contact";
import Home from "./pages//Home/Home";
import UserList from "./pages/Admin/userList/UserList";
import AddProject from "./components/AddProject/AddProject";

import EditProject from "./components/EditProject/EditProject";
import EditPeojectsMain from "./components/EditProjectsMain/EditPeojectsMain";
import Comments from "./components/Comments/Comments";

import HomeAdmin from "./pages/Admin/home/Home";
import ProductList from "./pages/Admin/productList/ProductList";
import Appointments from "./pages/Admin/Appointments/Appointments";

import AppointementForm from "./components/AppointementForm/AppointementForm";
import User from "./pages/Admin/user/User";
import ForgetPass from "./components/ForgetPass/ForgetPass";
import { useSelector } from "react-redux";

function App() {
  const { dark } = useSelector((state) => state.dark);
  const { lang } = useSelector((state) => state.language);
  const [logged, setLogged] = useState(
    JSON.parse(localStorage.getItem("isLoggedIn"))
  );
  const [localUser, setLocalUser] = useState(
    JSON.parse(localStorage.getItem("user"))
  );

  useEffect(() => {
    setLogged(JSON.parse(localStorage.getItem("isLoggedIn")));
    setLocalUser(JSON.parse(localStorage.getItem("user")));
  }, []);

  window.addEventListener("storage", async function () {
    setLogged(JSON.parse(localStorage.getItem("isLoggedIn")));
    await setLocalUser(JSON.parse(localStorage.getItem("user")));
  });

  return (
    <Fragment>
      <div
        className={
          lang === "english"
            ? `english ${dark ? "bg-dark text-light" : ""}`
            : `${dark ? "bg-dark text-light" : ""}`
        }
      >
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<ContactUsPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/forgotPass" element={<ForgetPass />} />

          {
            <Route
              path="/admin"
              element={
                localUser && localUser.user.role === "admin" ? (
                  <HomeAdmin />
                ) : (
                  <Login />
                )
              }
            />
          }
          <Route path="/AdminUsers" element={<UserList />} />
          <Route path="/AdminUser/:id" element={<User />} />

          <Route path="/projects/:id" element={<ProjectDetails />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/appointment" element={<AppointementForm />} />

          <Route path="/addProject" element={<AddProject />}></Route>
          <Route path="/editProject/*" element={<EditProject />}></Route>
          <Route path="/edit" element={<EditPeojectsMain />}></Route>
          <Route path="/appointments" element={<Appointments />}></Route>
          <Route path="/AdminComments" element={<Comments />}></Route>
          <Route path="/AdminProjectsList" element={<ProductList />}></Route>
        </Routes>

        <Footer />
      </div>
    </Fragment>
  );
}

export default App;
