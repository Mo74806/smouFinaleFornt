import "./widgetSm.css";
import { Visibility } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getAllUsers } from "../../../store/reducers/adminSlice";
import { useNavigate } from "react-router-dom";
import Loading from "../../Loading/Loading";

export default function WidgetSm() {
  const users = useSelector((state) => state.admin.usersList);
  const { isLoading, serverError } = useSelector((state) => state.admin);
  const [jwt, setJWT] = useState(localStorage.getItem("jwt"));
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAllUsers(jwt));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [jwt]);

  window.addEventListener("storage", function () {
    setJWT(this.localStorage.getItem("jwt"));
  });

  const clickHandler = (id) => {
    navigate(`/AdminUser/${id}`);
  };

  return (
    <div className="widgetSm">
      <span className="widgetSmTitle">New Join Members</span>
      {isLoading && <Loading />}
      {serverError && (
        <div className="alert alert-danger">Somthing Went Wrong</div>
      )}
      <ul className="widgetSmList">
        {users &&
          users.users.slice(0, 4).map((user) => (
            <li className="widgetSmListItem">
              <img
                src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
                alt="widgetSmImg"
                className="widgetSmImg"
              />
              <div className="widgetSmUser mx-2">
                <span className="widgetSmUsername">{`${user.firstName} ${user.lastName}`}</span>
                <span className="widgetSmUserTitle">{user.userName}</span>
              </div>
              <button
                className="widgetSmButton"
                onClick={() => clickHandler(user._id)}
              >
                <Visibility className="widgetSmIcon" />
                Display
              </button>
            </li>
          ))}
      </ul>
    </div>
  );
}
