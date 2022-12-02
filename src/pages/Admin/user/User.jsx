import {
  AccessTimeOutlined,
  CalendarToday,
  LocationSearching,
  MailOutline,
  PermIdentity,
  PhoneAndroid,
} from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getUserById, updateUser } from "../../../store/reducers/adminSlice";
import "./user.css";
import Sidebar from "../../../components/AdminDashboardFinal/sidebar/Sidebar";
import { format } from "timeago.js";

export default function User() {
  const { dark } = useSelector((state) => state.dark);
  const [error, setError] = useState({});
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserById([id, jwt]));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const { userById } = useSelector((state) => state.admin);
  const [updatedUser, setUpdatedUser] = useState({});
  const { id } = useParams();
  const [jwt, setJWT] = useState(localStorage.getItem("jwt"));

  window.addEventListener("storage", function () {
    setJWT(this.localStorage.getItem("jwt"));
  });

  const changeHandler = (e) => {
    // First Name Validation

    if (e.target.name === "firstName") {
      if (e.target.value.length === 0) {
        setError({
          ...error,
          fname: null,
        });
      } else if (!e.target.value.match(/^[a-zA-Z ]{3,20}$/)) {
        setError({
          ...error,
          fname: "من فضلك غير مسموح بالارقام والحد المسموح به من 3-20 حرف",
        });
      } else {
        setError({
          ...error,
          fname: null,
        });
        setUpdatedUser({
          ...updatedUser,
          firstName: e.target.value,
        });
      }
    }
    // Last Name Validation

    if (e.target.name === "lastName") {
      if (e.target.value.length === 0) {
        setError({
          ...error,
          lname: null,
        });
      } else if (!e.target.value.match(/^[a-zA-Z ]{3,20}$/)) {
        setError({
          ...error,
          lname: "من فضلك غير مسموح بالارقام والحد المسموح به من 3-20 حرف",
        });
      } else {
        setError({
          ...error,
          lname: null,
        });
        setUpdatedUser({
          ...updatedUser,
          lastName: e.target.value,
        });
      }
    }

    // Username Validation

    if (e.target.name === "userName") {
      if (e.target.value.length === 0) {
        setError({
          ...error,
          username: null,
        });
      } else if (
        !e.target.value.match(
          /^[a-zA-Z0-9](_(?!(\.|_))|\.(?!(_|\.))|[a-zA-Z0-9]){6,18}[a-zA-Z0-9]$/
        )
      ) {
        setError({
          ...error,
          username: "من فضلك ادخل اسم مستخدم صحيح",
        });
      } else {
        setError({
          ...error,
          username: null,
        });
        setUpdatedUser({
          ...updatedUser,
          userName: e.target.value,
        });
      }
    }

    // Email Validation

    if (e.target.name === "email") {
      if (e.target.value.length === 0) {
        setError({
          ...error,
          email: null,
        });
      } else if (
        !e.target.value.match(
          /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/
        )
      ) {
        setError({
          ...error,
          email: "من فضلك ادخل حسابك بشكل صحيح",
        });
      } else {
        setError({
          ...error,
          email: null,
        });
        setUpdatedUser({
          ...updatedUser,
          email: e.target.value,
        });
      }
    }
    // Phone Validation

    if (e.target.name === "phone") {
      if (e.target.value.length === 0) {
        setError({
          ...error,
          phone: null,
        });
      } else if (!e.target.value.match(/^\d{10}/)) {
        setError({
          ...error,
          phone: "من فضلك ادخل رقم صحيح",
        });
      } else {
        setError({
          ...error,
          phone: null,
        });
        setUpdatedUser({
          ...updatedUser,
          phone: e.target.value,
        });
      }
    }
    setUpdatedUser({
      ...updatedUser,
      [e.target.name]: e.target.value,
    });
  };
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateUser([id, updatedUser, jwt]));
    dispatch(getUserById([id, jwt]));
  };

  return (
    <div className="user">
      <div className="userContainer">
        <Sidebar />
        <div className="userShow">
          <div className="userShowTop">
            <div className="userShowTopTitle">
              <span className="userShowUsername">
                {userById && `${userById.firstName} ${userById.lastName}`}
              </span>
              <span className="userShowUserTitle">
                {userById && `${userById.userName}`}
              </span>
            </div>
          </div>
          <div className="userShowBottom">
            <span className="userShowTitle">Account Details</span>
            <div className={`userShowInfo ${dark && "text-light"}`}>
              <PermIdentity className="userShowIcon" />
              <span className="userShowInfoTitle">
                {userById && `${userById.userName}`}
              </span>
            </div>
            <div className={`userShowInfo ${dark && "text-light"}`}>
              <CalendarToday className="userShowIcon" />
              <span className="userShowInfoTitle">{`Joined : ${
                userById && format(userById.createdAt)
              }`}</span>
            </div>
            <span className="userShowTitle">Contact Details</span>
            <div className={`userShowInfo ${dark && "text-light"}`}>
              <PhoneAndroid className="userShowIcon" />
              <span className="userShowInfoTitle">
                {userById && userById.phone}
              </span>
            </div>
            <div className={`userShowInfo ${dark && "text-light"}`}>
              <MailOutline className="userShowIcon" />
              <span className="userShowInfoTitle">
                {userById && `${userById.email}`}
              </span>
            </div>
            <div className={`userShowInfo ${dark && "text-light"}`}>
              <LocationSearching className="userShowIcon" />
              <span className="userShowInfoTitle">New York | USA</span>
            </div>
            <div className={`userShowInfo ${dark && "text-light"}`}>
              <AccessTimeOutlined className="userShowIcon" />
              <span className="userShowInfoTitle">
                {`last updated: ${userById && format(userById.updatedAt)}`}
              </span>
            </div>
          </div>
        </div>
        <div className="userUpdate">
          <span className="userUpdateTitle">Edit</span>
          <form
            className="userUpdateForm"
            onChange={changeHandler}
            onSubmit={submitHandler}
          >
            <div className="userUpdateLeft">
              <div className="userUpdateItem">
                <label>Username</label>
                <input
                  type="text"
                  name="userName"
                  placeholder={userById && userById.userName}
                  className="userUpdateInput"
                />
              </div>
              {error.username && (
                <div className="text-danger">{error.username}</div>
              )}
              <div className="userUpdateItem">
                <label>First Name</label>
                <input
                  type="text"
                  name="firstName"
                  placeholder={userById && userById.firstName}
                  className="userUpdateInput"
                />
              </div>
              {error.fname && <div className="text-danger">{error.fname}</div>}
              <div className="userUpdateItem">
                <label>Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  placeholder={userById && userById.lastName}
                  className="userUpdateInput"
                />
              </div>
              {error.lname && <div className="text-danger">{error.lname}</div>}
              <div className="userUpdateItem">
                <label>Email</label>
                <input
                  type="text"
                  name="email"
                  placeholder={userById && userById.email}
                  className="userUpdateInput"
                />
              </div>
              {error.email && <div className="text-danger">{error.email}</div>}
              <div className="userUpdateItem">
                <label>Phone</label>
                <input
                  type="text"
                  name="phone"
                  placeholder={
                    userById && userById.phone ? `${userById.phone}` : `empty`
                  }
                  className="userUpdateInput"
                />
              </div>
              {error.phone && <div className="text-danger">{error.phone}</div>}
              <div className="userUpdateItem">
                <label>Role</label>
                <select
                  className="userUpdateInput"
                  name="role"
                  label="role"
                  onChange={changeHandler}
                >
                  <option
                    value={
                      userById && userById.role === "admin" ? "admin" : "user"
                    }
                  >
                    ...
                  </option>
                  <option
                    value={
                      userById && userById.role === "admin" ? "admin" : "user"
                    }
                    disabled
                  >
                    {userById && userById.role === "admin" ? "Admin" : "User"}
                  </option>
                  <option
                    value={
                      userById && userById.role === "admin" ? "user" : "admin"
                    }
                  >
                    {userById && userById.role === "admin" ? "User" : "Admin"}
                  </option>
                </select>
              </div>
            </div>
            <button className="userUpdateButton">Update</button>
          </form>
        </div>
      </div>
    </div>
  );
}
