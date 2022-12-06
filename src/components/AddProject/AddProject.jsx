import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Dropdown, Form } from "react-bootstrap";
import { userRequest } from "../../requestMethods";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AddProject() {
  const navigation = useNavigate();
  var [unitsNo, setUnitsNo] = useState([]);
  var [unitsKey, setUnitsKey] = useState(0);
  const [unitFlag, setUnitFlag] = useState(false);

  // Error state
  const [error, setError] = useState({
    name: null,
    nameEN: null,
    sliderImgs: null,
    description: null,
    descriptionEN: null,
    videos: null,
    planSlider: null,
    servicesSlider: null,
    housingUnits: null,
    unitImg: null,
    flag: true,
  });

  // Form state
  const [formValues, setFormValues] = useState({
    name: "",
    nameEN: "",
    sliderImgs: [],
    description: "",
    descriptionEN: "",
    videos: "",
    locationEN: "saudi arbia",
    planSlider: [],
    servicesSlider: [],
    housingUnits: [{}],
  });

  const setLocationEG = () => {
    setFormValues({ ...formValues, locationEN: "egypt" });
  };
  const setLocationKSA = () => {
    setFormValues({ ...formValues, locationEN: "saudi arbia" });
  };

  // add new unit section
  const addUnitsInput = async (e) => {
    setUnitsKey(unitsKey + 1);
    setUnitFlag(true);
    setUnitsNo([...unitsNo, 1]);
    e.preventDefault();
  };

  // Handler function to values of form to form state
  const changeHandler = (e) => {
    if (
      e.target.name === "sliderImgs" ||
      e.target.name === "planSlider" ||
      e.target.name === "servicesSlider" ||
      e.target.name === "parsure"
    ) {
      setFormValues({ ...formValues, [e.target.name]: [...e.target.files] });
      setError({
        ...error,
        [e.target.name]: null,
        flag: false,
      });
    } else {
      if (e.target.value.length < 1) {
        setError({
          ...error,
          [e.target.name]: `*You must add ${e.target.name}`,
          flag: false,
        });
      } else {
        setFormValues({ ...formValues, [e.target.name]: e.target.value });
        setError({
          ...error,
          [e.target.name]: null,
          flag: false,
        });
      }
    }
  };

  // Submit Function to add project
  const addNewProject = async (e) => {
    if (
      error.planSlider ||
      error.flag ||
      error.name ||
      error.nameEN ||
      error.description ||
      error.descriptionEN ||
      error.servicesSlider ||
      error.sliderImgs ||
      error.videos
    ) {
      e.preventDefault();
    } else {
      e.preventDefault();
      const formData = new FormData();
      for (let i = 0; i < formValues.sliderImgs.length; i++) {
        formData.append(
          "imageCover",
          formValues.sliderImgs[i],
          formValues.sliderImgs[i].name
        );
      }
      for (let i = 0; i < formValues.servicesSlider.length; i++) {
        formData.append(
          "imageService",
          formValues.servicesSlider[i],
          formValues.servicesSlider[i].name
        );
      }
      for (let i = 0; i < formValues.planSlider.length; i++) {
        formData.append(
          "imagePlan",
          formValues.planSlider[i],
          formValues.planSlider[i].name
        );
      }
      for (let i = 0; i < formValues.housingUnits.length; i++) {
        formData.append(
          "unitCover",
          formValues.housingUnits[i].unitImg[0],
          formValues.housingUnits[i].unitImg[0].name
        );
      }
      for (let i = 0; i < formValues.housingUnits.length; i++) {
        formData.append("unitName", formValues.housingUnits[i].name);
        formData.append("unitNameEN", formValues.housingUnits[i].nameEN);
      }
      for (let i = 0; i < formValues.housingUnits.length; i++) {
        formData.append(
          "unitDescription",
          formValues.housingUnits[i].description
        );
        formData.append(
          "unitDescriptionEN",
          formValues.housingUnits[i].descriptionEN
        );
      }
      // const res = await userRequest.get("https://smou-alasala-server-ap-qy3u2378d-mo74806.vercel.app/api/v1/projects");

      formData.append("name", formValues.name);
      formData.append("nameEN", formValues.nameEN);
      formData.append("description", formValues.description);
      formData.append("descriptionEN", formValues.descriptionEN);
      formData.append("locationEN", formValues.locationEN);
      formData.append("videos", formValues.videos);
      formData.append(
        "parsure",
        formValues.parsure[0],
        formValues.parsure[0].name
      );
      formData.append("housingUnits", formValues.housingUnits);
      const res = await toast.promise(
        userRequest
          .post(
            "https://smou-alasala-server-ap-qy3u2378d-mo74806.vercel.app/api/v1/projects",
            formData
          )
          .then((res) => {
            navigation("/admin");
          }),
        {
          pending: "Uploading project please wait",
          success: "Project added successfuly 👌",
          error: "error occurred please try again later",
        }
      );
    }
  };
  // Handeler fucntion to add units to form state
  const unitHandler = (e, i) => {
    let newArr = [...formValues.housingUnits];
    if (e.target.name === "unitImg") {
      newArr[i] = { ...newArr[i], [e.target.name]: [...e.target.files] };
    } else {
      newArr[i] = { ...newArr[i], [e.target.name]: e.target.value };
    }
    setFormValues({
      ...formValues,
      housingUnits: newArr,
    });
  };

  return (
    <div className="my-5">
      <div className="container p-5 border border-primary border-3 rounded">
        <div className="text-custom text-center">
          <h1 className="fw-bold">Add new project in Arabic</h1>
        </div>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicUser">
            <Form.Label>project name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Project name in Arabic"
              name="name"
              onChange={changeHandler}
            />
            {error.name && (
              <Form.Text className="text-danger">{error.name}</Form.Text>
            )}
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicUser">
            <Form.Label>project name in English</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Project name in English"
              name="nameEN"
              onChange={changeHandler}
            />
            {error.nameEN && (
              <Form.Text className="text-danger">{error.name}</Form.Text>
            )}
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicUser">
            <Form.Label>project description in Arabic</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter project description in Arabic"
              name="description"
              onChange={changeHandler}
            />
            {error.description && (
              <Form.Text className="text-danger">{error.description}</Form.Text>
            )}
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicUser">
            <Form.Label>project description in English</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter project description in English"
              name="descriptionEN"
              onChange={changeHandler}
            />
            {error.descriptionEN && (
              <Form.Text className="text-danger">{error.description}</Form.Text>
            )}
          </Form.Group>

          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              Project Location
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item onClick={setLocationEG}>Egypt</Dropdown.Item>
              <Dropdown.Item onClick={setLocationKSA}>KSA</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          <Form.Group className="mb-3" controlId="formBasicUser">
            <Form.Label>project videos</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your name"
              name="videos"
              onChange={changeHandler}
            />
            {error.videos && (
              <Form.Text className="text-danger">{error.videos}</Form.Text>
            )}
          </Form.Group>

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

          <Form.Group className="mb-3" controlId="formBasicUser">
            <Form.Label>main slider images</Form.Label>
            <Form.Control
              type="file"
              placeholder="upload images here"
              multiple
              accept="image/*"
              name="sliderImgs"
              onChange={changeHandler}
            />
            {error.sliderImgs && (
              <Form.Text className="text-danger">{error.sliderImgs}</Form.Text>
            )}
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicUser">
            <Form.Label>services slider images</Form.Label>
            <Form.Control
              type="file"
              placeholder="upload images here"
              multiple
              accept="image/*"
              name="servicesSlider"
              onChange={changeHandler}
            />
            {error.servicesSlider && (
              <Form.Text className="text-danger">
                {error.servicesSlider}
              </Form.Text>
            )}
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicUser">
            <Form.Label>Plan view images</Form.Label>
            <Form.Control
              type="file"
              placeholder="upload images here"
              multiple
              accept="image/*"
              name="planSlider"
              onChange={changeHandler}
            />
            {error.planSlider && (
              <Form.Text className="text-danger">{error.planSlider}</Form.Text>
            )}
          </Form.Group>

          {unitFlag &&
            unitsNo.map((item, index) => {
              return (
                <Form.Group
                  key={index}
                  className="mb-3"
                  controlId="formBasicUser"
                  onChange={(event) => unitHandler(event, index)}
                >
                  <Form.Label>unit name in Arabic</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Project name"
                    name="name"
                  />
                  <Form.Label>unit name in English</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Project name"
                    name="nameEN"
                  />

                  <Form.Label>unit description in Arabic</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Enter Project name"
                    name="description"
                  />
                  <Form.Label>unit description in English</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Enter Project name"
                    name="descriptionEN"
                  />

                  <Form.Label>unit images</Form.Label>
                  <Form.Control
                    type="file"
                    placeholder="upload images here"
                    multiple
                    accept="image/*"
                    name="unitImg"
                  />
                </Form.Group>
              );
            })}

          <div className="row mb-5">
            <button onClick={addUnitsInput} className="btn btn-warning  ">
              Add Unit
            </button>
          </div>

          <div className="d-flex justify-content-center">
            <Button
              variant="primary"
              type="submit"
              onClick={addNewProject}
              className="d-block"
            >
              Add Project
            </Button>
            <ToastContainer />
          </div>
        </Form>
      </div>
    </div>
  );
}
