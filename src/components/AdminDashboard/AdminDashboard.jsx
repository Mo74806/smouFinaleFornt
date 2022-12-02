import React from "react";
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css";

export default function AdminDashboard() {
  const navigation = useNavigate();

  const goToAddProject = () => {
    navigation("/addProject");
  };
  const goToEditProject = () => {
    navigation("/edit");
  };
  const goToComments = () => {
    navigation("/comments");
  };
  return (
    <div className="container">
      <div className="mt-5 p-sm-5 vstack g-5 mx-auto ustify-content-center align-items-center">
        <button
          onClick={goToAddProject}
          className="col-sm-10 btn btn-primary my-4 fw-bold fs-1"
        >
          Add new project
        </button>
        <button
          onClick={goToEditProject}
          className="col-sm-10 btn btn-warning my-4 fw-bold fs-1"
        >
          Edit Project
        </button>
        <button
          onClick={goToComments}
          className="col-sm-10 btn btn-info my-4 fw-bold fs-1"
        >
          View comments
        </button>
      </div>
    </div>
  );
}
