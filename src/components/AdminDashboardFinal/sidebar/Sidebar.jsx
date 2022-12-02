import "./sidebar.css";
import {
  LineStyle,
  Timeline,
  TrendingUp,
  PermIdentity,
  Storefront,
  DynamicFeed,
  ChatBubbleOutline,
  WorkOutline,
  Report,
  Home,
} from "@mui/icons-material";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Sidebar() {
  const { dark } = useSelector((state) => state.dark);
  return (
    <div className={`sidebar ${dark && "text-light bg-dark"}`}>
      <div className={`sidebarWrapper ${dark && "text-light bg-dark"}`}>
        <div className={`sidebarMenu ${dark && "text-light bg-dark"}`}>
          <h3 className="sidebarTitle">Dashboard</h3>
          <ul className={`sidebarList ${dark && "text-light"}`}>
            <NavLink activeClassName="active" to={"/admin"} className="link">
              <li className="sidebarListItem">
                <Home className="sidebarIcon" />
                Home
              </li>
            </NavLink>
            <li className="sidebarListItem">
              <Timeline className="sidebarIcon" />
              Analytics
            </li>
            <li className="sidebarListItem">
              <TrendingUp className="sidebarIcon" />
              Sales
            </li>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Quick Menu</h3>
          <ul className="sidebarList">
            <NavLink activeClassName="active" to="/AdminUsers" className="link">
              <li className="sidebarListItem">
                <PermIdentity className="sidebarIcon" />
                Users
              </li>
            </NavLink>
            <NavLink
              activeClassName="active"
              to={"/AdminProjectsList"}
              className="link"
            >
              <li className="sidebarListItem">
                <Storefront className="sidebarIcon" />
                Projects
              </li>
            </NavLink>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Notifications</h3>
          <ul className="sidebarList ">
            <NavLink
              activeClassName="active"
              to={"/appointments"}
              className="link"
            >
              <li className="sidebarListItem">
                <DynamicFeed className="sidebarIcon" />
                Appointments
              </li>
            </NavLink>
            <NavLink
              activeClassName="active"
              to={"/AdminComments"}
              className="link"
            >
              <li className="sidebarListItem">
                <ChatBubbleOutline className="sidebarIcon" />
                Messages
              </li>
            </NavLink>
          </ul>
        </div>
      </div>
    </div>
  );
}
