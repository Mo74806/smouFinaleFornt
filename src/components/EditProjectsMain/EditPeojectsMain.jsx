import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./EditPeojectsMain.css";
import { getAllProjects } from "../../store/reducers/projectSlice";
import { userRequest } from "../../requestMethods";

export default function EditPeojectsMain() {
  const dispatch = useDispatch();

  const allProjects = useSelector((state) => {
    return state.project.projects.projects;
  });
  useEffect(() => {
    dispatch(getAllProjects());
  }, []);

  const navigation = useNavigate();
  const goToProject = (id) => {
    navigation(`/editProject/${id}`);
  };
  const deleteProject = async (id) => {
    const res = await userRequest.delete(
      `https://smou-alasala-server-ap-qy3u2378d-mo74806.vercel.app/api/v1/projects/${id}`
    );
  };
  return (
    <div className="container mt-5">
      <h2 className="text-center fw-bold text-dark">Project</h2>
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>#</th>
            <th>Project name</th>
            <th>Project description</th>
            <th>Number of units</th>
            <th>Edit Project</th>
          </tr>
        </thead>
        <tbody>
          {allProjects &&
            allProjects.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.name}</td>
                  <td>{item.description}</td>
                  <td>{item.housingUnits.length}</td>
                  <td>
                    <button
                      onClick={() => goToProject(index)}
                      className="btn btn-outline-warning"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteProject(item.id)}
                      className="btn btn-outline-danger"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>
    </div>
  );
}
