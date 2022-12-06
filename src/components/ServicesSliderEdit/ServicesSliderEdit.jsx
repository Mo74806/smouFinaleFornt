import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { ConfirmToast } from "react-confirm-toast";
import { userRequest } from "../../requestMethods";

export default function ServicesSliderEdit({ values, changeHandlerParent }) {
  const changeHandler = (e) => {
    changeHandlerParent(e);
  };

  const [data, setData] = useState(values.imageService);

  const deleteImg = (image) => {
    userRequest
      .patch(
        `https://smou-alasala-server-ap-qy3u2378d-mo74806.vercel.app/api/v1/projects/removeImage/${values.id}/imageService/`,
        { imageName: image }
      )
      .then((res) => {
        var newData = data.filter((item) => item !== image);
        setData(newData);
      });
  };
  return (
    <>
      {data && (
        <div className="container my-3">
          <div className="text-center fw-bold fs-4 text-custom mb-1">
            Services slider images
          </div>
          <div className="card cardEdit p-3">
            <Form>
              <Form.Group className="mb-3" controlId="formBasicUser">
                <Form.Label className="d-flex flex-wrap">
                  {data.map((image, index) => {
                    return (
                      <div className="position-relative">
                        <img
                          key={index}
                          className="mx-2 my-2"
                          src={image}
                          width="200px"
                          alt="slider-image"
                        />
                        <ConfirmToast
                          asModal={true}
                          message="Do you want to delete this image?"
                          showCloseIcon={false}
                          childrenClassName="margin-top-10"
                          customFunction={() => {
                            deleteImg(image);
                          }}
                        >
                          <button
                            onClick={(event) => {
                              // deleteImgStop(event);
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
                  name="imageService"
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
