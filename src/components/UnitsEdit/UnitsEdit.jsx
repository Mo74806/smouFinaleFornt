import axios from "axios";
import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { userRequest } from "../../requestMethods";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function UnitsEdit({ values }) {
  const [units, setUnits] = useState([...values[0].housingUnits]);
  const [newUnits, setNewUnits] = useState([]);
  // const notify = () => toast("Unit edited successfuly");
  // const [data, setData] = useState(units.imageCover);
  // const deleteImg = (image, e) => {
  //   e.preventDefault();
  //   axios
  //     .patch(
  //       `https://smou-alasala-server-ap-qy3u2378d-mo74806.vercel.app/api/v1/projects/removeImage/${values.id}/imageCover/${image}`
  //     )
  //     .then((res) => {
  //       var newData = data.filter((item) => item !== image);
  //       setData(newData);
  //     });
  // };
  let newArr = [];
  if (newUnits.length > 0) {
    newArr = [...newUnits];
  }
  const unitHandler = (e, i, id) => {
    if (e.target.name === "imageCover") {
      newArr[i] = {
        ...newArr[i],
        [e.target.name]: [...e.target.files],
        unitId: id,
      };
    } else {
      newArr[i] = { ...newArr[i], [e.target.name]: e.target.value, unitId: id };
    }
    // unitsHandlerParent(newArr, i);
    setNewUnits(newArr);
  };

  const submitUnit = async (e, i) => {
    e.preventDefault();
    // toast("updating unit !!");

    let form = new FormData();
    if ("name" in newArr[i]) {
      form.append("unitName", newArr[i].name);
    }
    if ("nameEN" in newArr[i]) {
      form.append("unitNameEN", newArr[i].nameEN);
    }
    if ("description" in newArr[i]) {
      form.append("unitDescription", newArr[i].description);
    }
    if ("descriptionEN" in newArr[i]) {
      form.append("unitDescriptionEN", newArr[i].descriptionEN);
    }
    if ("imageCover" in newArr[i]) {
      form.append(
        "unitCover",
        newArr[i].imageCover[0],
        newArr[i].imageCover[0].name
      );
    }
    // for (var pair of form.entries()) {
    // }
    let resUnit = await toast.promise(
      userRequest
        .patch(
          `https://smou-alasala-server-ap-qy3u2378d-mo74806.vercel.app/api/v1/projects/updateUnit/${values[0].id}/${newArr[i].unitId}`,
          form
        )
        .then((res) => {
          // toast.update(toast, {
          //   render: "unit updated successfuly",
          //   type: "success",
          //   isLoading: false,
          // });
        }),
      {
        pending: "updating unit",
        success: "unit updated successfuly 👌",
        error: "error occurred please try again later",
      }
    );
  };
  return (
    <>
      {units.map((item, index) => {
        return (
          <div className="container my-3 col-12" key={index}>
            <div className="text-center fw-bold fs-4 text-custom mb-1">
              {item.name}
            </div>
            <div className="card cardEdit p-3 col-12 text-light">
              <Form>
                <Form.Group
                  className="mb-3 col-12"
                  controlId="formBasicUser"
                  onChange={(event) => unitHandler(event, index, item._id)}
                >
                  <Form.Label>{units[index].name}</Form.Label>
                  <Form.Control
                    type="text"
                    className="mb-5"
                    placeholder="Enter Project name in Arabic"
                    name="name"
                  />
                  <Form.Label>{units[index].nameEN}</Form.Label>
                  <Form.Control
                    type="text"
                    className="mb-5"
                    placeholder="Enter Project name in English"
                    name="nameEN"
                  />

                  <Form.Label>{units[index].description}</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Enter Project description in Arabic"
                    className="mb-5"
                    name="description"
                  />
                  <Form.Label>{units[index].descriptionEN}</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Enter Project description in English"
                    className="mb-5"
                    name="descriptionEN"
                  />

                  <Form.Label className="position-relative">
                    <img
                      src={item.imageCover}
                      alt="image-cover"
                      className="mx-2 my-2"
                      width="200px"
                    ></img>
                    {/* <button
                      onClick={(event) => {
                        deleteImg(data, event);
                      }}
                      key={`p2${index}`}
                      className="btn btn-outline-danger rounded-pill btnImg"
                    >
                      X
                    </button> */}
                  </Form.Label>
                  <Form.Control
                    type="file"
                    placeholder="upload images here"
                    accept="image/*"
                    name="imageCover"
                  />
                </Form.Group>
                <button
                  onClick={(e) => {
                    submitUnit(e, index);
                  }}
                  className="btn btn-primary"
                >
                  Submit Unit
                </button>
                <ToastContainer />
              </Form>
            </div>
          </div>
        );
      })}
    </>
  );
}
