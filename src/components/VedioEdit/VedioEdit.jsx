import React from "react";
import { Form } from "react-bootstrap";

export default function VedioEdit({ values, changeHandlerParent }) {
  const changeHandler = (e) => {
    changeHandlerParent(e);
  };
  return (
    <>
      {values && (
        <div className="container my-3">
          <div className="text-center fw-bold fs-4 text-custom mb-1">
            Project vedio
          </div>
          <div className="card p-3 cardEdit text-light">
            <Form>
              <Form.Group
                className="mb-3 col-10 mx-auto"
                controlId="formBasicUser"
              >
                <Form.Label className="mt-3">
                  <iframe
                    src={values.videos}
                    title={values.name}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  ></iframe>
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Edit vedio link"
                  name="videos"
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
