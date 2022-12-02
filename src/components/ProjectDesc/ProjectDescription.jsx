import React from "react";
import { Form } from "react-bootstrap";

export default function ProjectDescription({ values, changeHandlerParent }) {
  const changeHandler = (e) => {
    changeHandlerParent(e);
  };
  return (
    <>
      {values && (
        <div className="container my-3">
          <div className="text-center fw-bold fs-4 text-custom mb-1">
            Project description
          </div>
          <div className="card p-3 cardEdit text-light">
            <Form>
              <Form.Group
                className="mb-3 col-10 mx-auto"
                controlId="formBasicUser"
              >
                <Form.Label>{values.description}</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={5}
                  placeholder="Edit Project description in Arabic"
                  name="description"
                  onChange={changeHandler}
                />

                <Form.Label>{values.descriptionEN}</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={5}
                  placeholder="Edit Project description in English"
                  name="descriptionEN"
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
