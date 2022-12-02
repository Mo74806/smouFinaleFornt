import Chart from "../../../components/AdminDashboardFinal/chart/Chart";
import "./home.css";
import WidgetSm from "../../../components/AdminDashboardFinal/widgetSm/WidgetSm";
import WidgetLg from "../../../components/AdminDashboardFinal/widgetLg/WidgetLg";
import SideBar from "../../../components/AdminDashboardFinal/sidebar/Sidebar";
import { useEffect, useMemo, useState } from "react";
import { publicRequest } from "../../../requestMethods";
import { animateScroll as scroll } from "react-scroll";

export default function HomeAdmin() {
  const [userStats, setUserStats] = useState([]);
  const [jwt, setJWT] = useState(localStorage.getItem("jwt"));

  window.addEventListener("storage", function () {
    setJWT(this.localStorage.getItem("jwt"));
  });

  const MONTHS = useMemo(
    () => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Agu",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    []
  );

  useEffect(() => {
    scroll.scrollToTop();
    const getStats = async () => {
      try {
        const res = await publicRequest.get("/users/userStats", {
          headers: { jwt: jwt },
        });
        res.data.data.user.map((item) =>
          setUserStats((prev) => [
            ...prev,
            { name: MONTHS[item._id - 1], "Active User": item.total },
          ])
        );
      } catch {}
    };
    getStats();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [MONTHS]);

  return (
    <div className="row containerAdmin mx-0">
      <div className="col-3 d-block">
        <SideBar></SideBar>
      </div>
      <div className="home col-9 mt-4">
        <Chart
          data={userStats}
          title="User Analytics"
          grid
          dataKey="Active User"
        />
        <div className="homeWidgets">
          <WidgetSm />
          <WidgetLg />
        </div>
      </div>
    </div>
  );
}
