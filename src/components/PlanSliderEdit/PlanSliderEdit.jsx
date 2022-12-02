import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { ConfirmToast } from "react-confirm-toast";
import { userRequest } from "../../requestMethods";

export default function PlanSliderEdit({ values, changeHandlerParent }) {
  const changeHandler = (e) => {
    changeHandlerParent(e);
  };
  const [data, setData] = useState(values.imagePlan);
  console.log("data/*/*/*/*/*/*/");
  console.log(values.imagePlan);
  const deleteImg = (image) => {
    userRequest
      // .patch(
      //   `http://localhost:3030/api/v1/projects/removeImage/${values.id}/imagePlan/${image}`
      // )
      .patch(
        `http://localhost:3030/api/v1/projects/removeImage/${values.id}/imagePlan/`,
        { imageName: image }
      )
      .then((res) => {
        console.log(res);
        var newData = data.filter((item) => item !== image);
        setData(newData);
      });
  };
  return (
    <div className="container my-3">
      <div className="text-center fw-bold fs-4 text-custom mb-1">
        Plan view slider images
      </div>
      <div className="card cardEdit p-3">
        <Form>
          <Form.Group className="mb-3" controlId="formBasicUser">
            <Form.Label className="d-flex flex-wrap">
              {data &&
                data.map((image, index) => {
                  return (
                    <div className="position-relative">
                      <img
                        key={index}
                        className="mx-2 my-2"
                        src={image}
                        width="200px"
                      />
                      <ConfirmToast
                        asModal={true}
                        message="Do you want to delete this image?"
                        showCloseIcon={false}
                        // theme="lilac"
                        // childrenClassName="margin-top-10"
                        customFunction={() => {
                          deleteImg(image);
                        }}
                      >
                        <button
                          onClick={(event) => {
                            event.preventDefault();
                          }}
                          key={`p2${index}`}
                          className="btn btn-outline-danger rounded-pill btnImg"
                        >
                          X
                        </button>
                      </ConfirmToast>
                    </div>
                  );
                })}
            </Form.Label>

            <Form.Control
              type="file"
              placeholder="upload images here"
              multiple
              accept="image/*"
              name="imagePlan"
              onChange={changeHandler}
            />
          </Form.Group>
        </Form>
      </div>
    </div>
  );
}
