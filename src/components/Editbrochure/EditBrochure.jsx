import React from "react";
import { Form } from "react-bootstrap";

export default function EditBrochure({ values, changeHandlerParent }) {
  const changeHandler = (e) => {
    changeHandlerParent(e);
  };
  return (
    <div className="container my-3">
      <div className="text-center fw-bold fs-4 text-custom mb-1">
        Edit Brochure
      </div>
      <div className="card cardEdit p-3">
        <Form>
          <Form.Group className="mb-3" controlId="formBasicUser">
            <Form.Label>Brochure</Form.Label>
            <Form.Control
              type="file"
              placeholder="upload Brochure here"
              accept="application/pdf"
              name="parsure"
              onChange={changeHandler}
            />
          </Form.Group>
        </Form>
      </div>
    </div>
  );
}
