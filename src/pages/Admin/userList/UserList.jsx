import "./userList.css";
import { DataGrid } from "@mui/x-data-grid";
import { DeleteOutline } from "@mui/icons-material";
import Sidebar from "../../../components/AdminDashboardFinal/sidebar/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { deleteUser, getAllUsers } from "../../../store/reducers/adminSlice";
import Loading from "../../../components/Loading/Loading";
import { Link } from "react-router-dom";
import { animateScroll as scroll } from "react-scroll";

export default function UserList() {
  const users = useSelector((state) => state.admin.usersList);
  const { dark } = useSelector((state) => state.dark);
  const { isLoading, serverError } = useSelector((state) => state.admin);
  const [jwt, setJWT] = useState(localStorage.getItem("jwt"));

  const dispatch = useDispatch();

  useEffect(() => {
    scroll.scrollToTop();
    dispatch(getAllUsers(jwt));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [jwt]);

  window.addEventListener("storage", function () {
    setJWT(this.localStorage.getItem("jwt"));
  });

  const handleDelete = async (id) => {
    await dispatch(deleteUser(id));
    dispatch(getAllUsers(jwt));
  };

  const columns = [
    {
      field: "userName",
      headerName: "user Name",
      width: 120,
      renderCell: (params) => {
        return <div className="userListUser">{params.row.userName}</div>;
      },
    },
    {
      field: "firstName",
      headerName: "First Name",
      width: 120,
      renderCell: (params) => {
        return <div className="userListUser">{params.row.firstName}</div>;
      },
    },
    {
      field: "lastName",
      headerName: "Last Name",
      width: 120,
      renderCell: (params) => {
        return <div className="userListUser">{params.row.lastName}</div>;
      },
    },
    {
      field: "email",
      headerName: "Email",
      width: 250,
      renderCell: (params) => {
        return <div className="userListUser">{params.row.email}</div>;
      },
    },
    {
      field: "role",
      headerName: "Role",
      width: 100,
      renderCell: (params) => {
        return <div className="userListUser">{params.row.role}</div>;
      },
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <div className="userListUser">
            <Link to={"/AdminUser/" + params.row._id}>
              <button className="userListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="userListDelete mb-0"
              onClick={() => handleDelete(params.row._id)}
            />
          </div>
        );
      },
    },
  ];

  return (
    <>
      {isLoading && <Loading />}
      {serverError && (
        <div className="alert alert-danger m-5 p-5">{`${serverError}.. Please try again later`}</div>
      )}
      <div className="row mx-0">
        <div className="col-3">
          <Sidebar></Sidebar>
        </div>
        <div className="col-9 vstack">
          <div className="userList col-12">
            {users && (
              <DataGrid
                rows={users.users}
                getRowId={(row) => row._id}
                autoHeight
                disableSelectionOnClick
                columns={columns}
                pageSize={8}
                checkboxSelection
                className={`my-4 ${dark && "text-light"}`}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
