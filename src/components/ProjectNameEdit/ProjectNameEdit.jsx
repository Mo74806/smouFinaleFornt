import React from "react";
import { Form } from "react-bootstrap";
import "../EditProject/EditProject.css";
export default function ProjectNameEdit({ values, changeHandlerParent }) {
  const changeHandler = (e) => {
    changeHandlerParent(e);
  };
  return (
    <>
      {values && (
        <div className="container my-3">
          <div className="text-center fw-bold fs-4 text-custom mb-1">
            Project name
          </div>
          <div className="card p-3 cardEdit col-10 text-light">
            <Form>
              <Form.Group
                className="mb-3 col-10 mx-auto"
                controlId="formBasicUser"
              >
                <Form.Label>{values.name}</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Edit Project name in Arabic"
                  name="name"
                  onChange={changeHandler}
                />

                <Form.Label>{values.nameEN}</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Edit Project name in English"
                  name="nameEN"
                  onChange={changeHandler}
                />
              </Form.Group>
            </Form>
          </div>
        </div>
      )}
    </>
  );
}
