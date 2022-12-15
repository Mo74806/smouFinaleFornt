import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserById } from "../../../store/reducers/adminSlice";
import { getDayAppointments } from "../../../store/reducers/appointmentsSlice";
import "./widgetLg.css";
import Loading from "../../Loading/Loading";

export default function WidgetLg() {
  const [jwt, setJWT] = useState(localStorage.getItem("jwt"));
  const date = new Date();
  const { appointments, isLoading } = useSelector((state) => state.appointment);
  const [userList, setUserList] = useState([]);
  let [day, month, year] = [
    date.getDate(),
    date.getMonth() + 1,
    date.getFullYear(),
  ];

  window.addEventListener("storage", function () {
    setJWT(this.localStorage.getItem("jwt"));
  });
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getDayAppointments([`${year}-${month}-${day}`, jwt])).then((res) =>
      res.payload.dayAppointements.forEach((appointment) =>
        dispatch(getUserById([appointment.user, jwt])).then((res) =>
          setUserList((prev) => [...prev, res.payload])
        )
      )
    );
  }, []);

  // appointments &&
  //   appointments.dayAppointements.forEach((appointment) =>
  //     dispatch(getUserById([appointment.user, jwt])).then((res) =>
  //     )
  //   );

  const Button = ({ type }) => {
    return <button className={"widgetLgButton " + type}>{type}</button>;
  };
  return (
    <div className="widgetLg">
      <h3 className="widgetLgTitle">Today's Appointments</h3>
      {isLoading && <Loading />}
      <table className="widgetLgTable">
        <tr className="widgetLgTr">
          <th className="widgetLgTh">Customer</th>
          <th className="widgetLgTh">Phone | Email</th>
          <th className="widgetLgTh">Time</th>
          <th className="widgetLgTh">Status</th>
        </tr>
        {appointments &&
          userList.length === appointments.dayAppointements.length &&
          appointments.dayAppointements.map((appointment, i) => (
            <tr className="widgetLgTr" key={appointment._id}>
              <td className="widgetLgUser">
                <span className="widgetLgName">
                  {userList.length &&
                    `${userList[i].firstName} ${userList[i].lastName}`}
                </span>
              </td>
              <td className="widgetLgDate">
                {userList.length && userList[i].phone
                  ? userList.length && userList[i].phone
                  : userList.length && userList[i].email}
              </td>
              <td className="widgetLgAmount">
                {appointment.startDate.split("T")[1]}
              </td>
              <td className="widgetLgStatus">
                <Button type={appointment.confirm ? "Confirmed" : "Pending"} />
              </td>
            </tr>
          ))}
      </table>
      {!appointments && (
        <div className="alert alert-warning w-100 p-5 text-center">
          No Appointments Today
        </div>
      )}
    </div>
  );
}
