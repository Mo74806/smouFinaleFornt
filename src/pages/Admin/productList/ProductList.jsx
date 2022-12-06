import "./productList.css";
import { DataGrid } from "@mui/x-data-grid";
import { DeleteOutline } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Sidebar from "../../../components/AdminDashboardFinal/sidebar/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { getAllProjects } from "../../../store/reducers/projectSlice";
import { userRequest } from "../../../requestMethods";
import Loading from "../../../components/Loading/Loading";

export default function ProductList() {
  const { dark } = useSelector((state) => state.dark);
  const dispatch = useDispatch();
  const navigation = useNavigate();

  const allProjects = useSelector((state) => {
    return state.project.projects.projects;
  });
  const { isLoading, serverError } = useSelector((state) => state.project);

  useEffect(() => {
    dispatch(getAllProjects([null, null]));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleDelete = (id) => {
    const res = userRequest
      .delete(
        `https://smou-alasala-server-ap-qy3u2378d-mo74806.vercel.app/api/v1/projects/${id}`
      )
      .then((res) => {
        dispatch(getAllProjects([null, null]));
      });
  };

  const gotoAdd = () => navigation("/addProject");

  const columns = [
    { field: "id", headerName: "ID", width: 220 },
    {
      field: "project",
      headerName: "Project",
      width: 200,
      renderCell: (params) => {
        return <div className="productListItem">{params.row.name}</div>;
      },
    },
    {
      field: "housingUnits",
      headerName: "Number of units",
      width: 120,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            {params.row.housingUnits.length}
          </div>
        );
      },
    },
    {
      field: "prushure",
      headerName: "Brochure Downloads",
      width: 150,
      renderCell: (params) => {
        return (
          <div className="productListItem">{params.row.parsureDownloads}</div>
        );
      },
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/editProject/" + params.row.id}>
              <button className="productListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="productListDelete"
              onClick={() => handleDelete(params.row.id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="row mx-0">
      {isLoading && <Loading />}
      <div className="col-3">
        <Sidebar></Sidebar>
      </div>
      <div className=" col-9 mt-4 vstack align-items-center">
        {serverError && (
          <div className="alert alert-danger p-5 m-5 text-center">{`${serverError}.. Please Try Again Later`}</div>
        )}
        <button
          onClick={gotoAdd}
          className="bg-custom btn btn-primary border-0 rounded-pill col-3 m-2"
        >
          Create new project
        </button>
        <div className="productList col-12">
          {allProjects && (
            <DataGrid
              rows={allProjects}
              autoHeight
              disableExtendRowFullWidth
              disableSelectionOnClick
              columns={columns}
              pageSize={8}
              checkboxSelection
              className={`${dark && "text-light"}`}
            />
          )}
        </div>
      </div>
    </div>
  );
}
