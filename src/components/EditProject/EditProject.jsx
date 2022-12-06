import React, { useEffect, useState } from "react";
import MainSliderEdit from "../MainSliderEdit/MainSliderEdit";
import PlanSliderEdit from "../PlanSliderEdit/PlanSliderEdit";
import ProjectDescription from "../ProjectDesc/ProjectDescription";
import ProjectNameEdit from "../ProjectNameEdit/ProjectNameEdit";
import ServicesSliderEdit from "../ServicesSliderEdit/ServicesSliderEdit";
import "./EditProject";
import VedioEdit from "../VedioEdit/VedioEdit";
import UnitsEdit from "../UnitsEdit/UnitsEdit";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProjectById } from "../../store/reducers/projectSlice";
import { userRequest } from "../../requestMethods";
import EditBrochure from "../Editbrochure/EditBrochure";
import { Dropdown } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function EditProject() {
  const query = useLocation();
  let id = query.pathname.split("/")[2];
  const navigation = useNavigate();
  const [editData, setEditData] = useState({});
  const [editDataUnits, setEditDataUnits] = useState([]);
  const dispatch = useDispatch();
  const { status, project } = useSelector((state) => state.project.projectById);

  useEffect(() => {
    dispatch(getProjectById(id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const unitsHandlerParent = (unitsData, index) => {
    let edit = [];
    if (editDataUnits.length > 0) {
      edit = editDataUnits;
      for (let i = 0; i < edit.length; i++) {
        if (edit[i]) {
          if (edit[i].id === unitsData.id) {
            edit[i] = unitsData;
          }
        }
      }
      setEditDataUnits(edit);
    } else {
      setEditDataUnits([...unitsData]);
    }
  };

  const changeHandlerParent = (e) => {
    if (
      e.target.name === "imageCover" ||
      e.target.name === "imageService" ||
      e.target.name === "imagePlan" ||
      e.target.name === "parsure"
    ) {
      setEditData({ ...editData, [e.target.name]: e.target.files });
      // setEditData({ ...values, [e.target.name]: [...e.target.files] });
    } else {
      setEditData({ ...editData, [e.target.name]: e.target.value });
    }
  };

  const setLocationEG = () => {
    setEditData({ ...editData, locationEN: "egypt" });
  };
  const setLocationKSA = () => {
    setEditData({ ...editData, locationEN: "saudi arbia" });
  };

  const submitEdit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    if ("imageCover" in editData) {
      for (let i = 0; i < editData.imageCover.length; i++) {
        formData.append(
          "imageCover",
          editData.imageCover[i],
          editData.imageCover[i].name
        );
      }
    }
    if ("imageService" in editData) {
      for (let i = 0; i < editData.imageService.length; i++) {
        formData.append(
          "imageService",
          editData.imageService[i],
          editData.imageService[i].name
        );
      }
    }
    if ("imagePlan" in editData) {
      for (let i = 0; i < editData.imagePlan.length; i++) {
        formData.append(
          "imagePlan",
          editData.imagePlan[i],
          editData.imagePlan[i].name
        );
      }
    }
    // if (editDataUnits.length > 0) {
    //   let j = 1;
    //   if (editDataUnits[0]) {
    //     j = 0;
    //   }
    //   for (let i = 0; i < editDataUnits[j].length; i++) {
    //     let unitForm = new FormData();
    //     if (editDataUnits[j][i]) {
    //       if ("name" in editDataUnits[j][i]) {
    //         unitForm.append("unitName", editDataUnits[j][i].name);
    //
    //       }
    //       if ("description" in editDataUnits[j][i]) {
    //         unitForm.append("unitDescription", editDataUnits[j][i].description);
    //
    //       }
    //       if ("imageCover" in editDataUnits[j][i]) {
    //         unitForm.append(
    //           "unitCover",
    //           editDataUnits[j][i].imageCover[0],
    //           editDataUnits[j][i].imageCover[0].name
    //         );
    //       }
    //       let resUnit = await userRequest
    //         .patch(
    //           `http://localhost:3030/api/v1/projects/updateUnit/${id}/${editDataUnits[j][i].unitId}`,
    //           unitForm
    //         )
    //     }
    //   }
    // }
    if ("name" in editData) {
      formData.append("name", editData.name);
    }
    if ("nameEN" in editData) {
      formData.append("nameEN", editData.nameEN);
    }
    if ("description" in editData) {
      formData.append("description", editData.description);
    }
    if ("descriptionEN" in editData) {
      formData.append("descriptionEN", editData.descriptionEN);
    }
    if ("videos" in editData) {
      formData.append("videos", editData.videos);
    }
    if ("parsure" in editData) {
      formData.append("parsure", editData.parsure[0], editData.parsure[0].name);
    }
    if ("locationEN" in editData) {
      formData.append("locationEN", editData.locationEN);
    }

    const res = await toast.promise(
      userRequest
        .patch(
          `https://smou-alasala-server-ap-qy3u2378d-mo74806.vercel.app/api/v1/projects/${id}`,
          formData
        )
        .then(() => navigation("/admin")),
      {
        pending: "Updating Project please wait",
        success: "Project updated successfuly 👌",
        error: "error occurred please try again later",
      }
    );
  };
  return (
    <>
      {project && (
        <div className="mt-5">
          <h1 className="text-center text-custom fw-bold">
            Edit Project {editData.name}
          </h1>
          <div className="container mt-5 card cardEditMain p-5 my-5">
            <ProjectNameEdit
              values={project}
              changeHandlerParent={changeHandlerParent}
            ></ProjectNameEdit>
            <ProjectDescription
              values={project}
              changeHandlerParent={changeHandlerParent}
            ></ProjectDescription>
            <VedioEdit
              values={project}
              changeHandlerParent={changeHandlerParent}
            ></VedioEdit>
            <EditBrochure
              values={project}
              changeHandlerParent={changeHandlerParent}
            ></EditBrochure>
            <PlanSliderEdit
              values={project}
              changeHandlerParent={changeHandlerParent}
            ></PlanSliderEdit>
            <ServicesSliderEdit
              values={project}
              changeHandlerParent={changeHandlerParent}
            ></ServicesSliderEdit>
            <MainSliderEdit
              values={project}
              changeHandlerParent={changeHandlerParent}
            ></MainSliderEdit>

            <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                Project Location
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item onClick={setLocationEG}>Egypt</Dropdown.Item>
                <Dropdown.Item onClick={setLocationKSA}>KSA</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

            <UnitsEdit
              values={[project, editDataUnits]}
              unitsHandlerParent={unitsHandlerParent}
            ></UnitsEdit>
            <div className="mx-auto">
              <button className="btn btn-primary mt-5" onClick={submitEdit}>
                Submit
              </button>
              <ToastContainer />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
