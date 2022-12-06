import "./appointsments.css";
import { DataGrid } from "@mui/x-data-grid";
import { DeleteOutline } from "@mui/icons-material";
import { useEffect, useState } from "react";
import Sidebar from "../../../components/AdminDashboardFinal/sidebar/Sidebar";
import { userRequest } from "../../../requestMethods";
import { useSelector } from "react-redux";

export default function Appointments() {
  const { dark } = useSelector((state) => state.dark);
  const [usersList, setUsersList] = useState(null);
  const [appoint, setAppoint] = useState(null);

  useEffect(() => {
    const data = userRequest
      .get(
        "https://smou-alasala-server-ap-qy3u2378d-mo74806.vercel.app/api/v1/appointements"
      )
      .then((res) => setAppoint(res.data.data.appointements));
    const users = userRequest
      .get(
        "https://smou-alasala-server-ap-qy3u2378d-mo74806.vercel.app/api/v1/users"
      )
      .then((res) => {
        setUsersList(res.data.data.users);
      });
  }, []);

  const handleDelete = (id) => {
    const res = userRequest
      .delete(
        `https://smou-alasala-server-ap-qy3u2378d-mo74806.vercel.app/api/v1/appointements/${id}`
      )
      .then(() => {
        let newApp = appoint.filter((item) => item.id !== id);
        setAppoint(newApp);
      });
  };
  const handleApp = async (id, e) => {
    const res = await userRequest
      .patch(
        `https://smou-alasala-server-ap-qy3u2378d-mo74806.vercel.app/api/v1/appointements/${id}`,
        {
          confirm: true,
        }
      )
      .then((res) => {
        let newApp = [...appoint];
        // newApp[id] = { ...newApp[id], confirm: true };
        appoint.map((item, index) => {
          if (item.id === id) {
            newApp[index].confirm = true;
          }
        });
        setAppoint(newApp);
      });
  };

  //   const appUserList = usersList.filter((item) => {
  //     return "appointements" in item;
  //   });

  const columns = [
    {
      field: "userName",
      headerName: "user Name",
      width: 100,
      renderCell: (params) => {
        const user =
          usersList &&
          usersList.filter((item) => {
            return item._id === params.row.user;
          });

        return <div className="userListUser">{user && user[0].userName}</div>;
      },
    },
    {
      field: "firstName",
      headerName: "First Name",
      width: 100,
      renderCell: (params) => {
        const user =
          usersList &&
          usersList.filter((item) => {
            return item._id === params.row.user;
          });

        return <div className="userListUser">{user && user[0].firstName}</div>;
      },
    },
    {
      field: "lastName",
      headerName: "Last Name",
      width: 100,
      renderCell: (params) => {
        const user =
          usersList &&
          usersList.filter((item) => {
            return item._id === params.row.user;
          });

        return <div className="userListUser">{user && user[0].lastName}</div>;
      },
    },
    {
      field: "email",
      headerName: "Email",
      width: 200,
      renderCell: (params) => {
        const user =
          usersList &&
          usersList.filter((item) => {
            return item._id === params.row.user;
          });

        return <div className="userListUser">{user && user[0].email}</div>;
      },
    },
    {
      field: "date",
      headerName: "Date",
      width: 150,
      renderCell: (params) => {
        return <div className="userListUser">{params.row.startDate}</div>;
      },
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            {(params.row.confirm && (
              <button
                disabled
                onClick={() => {
                  handleApp(params.row._id);
                }}
                className="btn btn-success rounded-pill"
              >
                Confirmed
              </button>
            )) || (
              <button
                onClick={(e) => {
                  handleApp(params.row._id, e);
                }}
                className="btn btn-warning rounded-pill"
              >
                Confirm
              </button>
            )}

            <DeleteOutline
              className="userListDelete"
              onClick={() => handleDelete(params.row.id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <>
      <div className="row mx-0">
        <div className="col-3">
          <Sidebar></Sidebar>
        </div>
        <div className="col-9 vstack">
          <div className="userList col-12">
            {appoint && (
              <DataGrid
                rows={appoint}
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
