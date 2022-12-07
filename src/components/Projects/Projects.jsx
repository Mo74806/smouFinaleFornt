/* eslint-disable jsx-a11y/anchor-is-valid */
import "./Projects.css";
import { Carousel } from "react-bootstrap";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllProjects } from "../../store/reducers/projectSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Wrapper = styled.div`
  background-color: #ddd;
`;

const Projects = () => {
  const navigate = useNavigate();
  const res = useSelector((state) => {
    return state.project.projects;
  });
  const { lang } = useSelector((state) => state.language);
  const { dark } = useSelector((state) => state.dark);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllProjects([null, null]));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const detailsHandle = (id) => {
    navigate(`/projects/${id}`);
  };

  const handleDownload = (id) => {
    const res = axios.patch(
      `https://smou-alasala-server-ap-qy3u2378d-mo74806.vercel.app/api/v1/projects/increaseParsureDownloads/${id}`
    );
  };

  return (
    <Wrapper>
      <div
        className={`values-title text-center pt-4 ${
          dark && "bg-dark text-light"
        }`}
      >
        <h2
          className={`position-relative d-inline-block my-4 fw-bold ${
            dark && "text-white"
          }`}
        >
          {lang === "arabic" ? "أحــدث مشاريعنا" : "Latest Projects"}
        </h2>
      </div>
      <Carousel id="project-carousel" variant="dark">
        {res.projects &&
          res.projects.slice(-3).map((project) => (
            <Carousel.Item
              className={`projects pt-2 pb-5 ${dark && "bg-dark"}`}
              key={project._id}
            >
              <div className="container">
                <div className="project-card row d-flex justify-content-center align-items-center">
                  <div className="col-lg-8 order-lg-1 mb-3">
                    <div className="image-container">
                      <img src={project.imageCover[0]} alt="project-cover" />
                    </div>
                  </div>
                  <div className="col-lg-4 order-lg-0">
                    <div className="text-container d-flex flex-column justify-content-center align-items-center">
                      <h3 className="fw-bold fs-4 text-white my-2">
                        {lang === "arabic" ? project.name : project.nameEN}
                      </h3>
                      <p className="text-center my-3 px-3">
                        {lang === "arabic"
                          ? project.description
                          : project.descriptionEN}
                      </p>
                      <div className="text-container-btns d-flex flex-wrap justify-content-center my-3">
                        <a className="m-2" href="#">
                          <button
                            onClick={() => detailsHandle(project._id)}
                            className="px-4 py-2"
                          >
                            {lang === "arabic" ? "التفاصيل" : "Details"}
                          </button>
                        </a>
                        <a className="m-2" href="#">
                          <button
                            onClick={() => handleDownload(project._id)}
                            className="px-3 py-2"
                          >
                            <a
                              href={`${project.parsure}`}
                              className="text-decoration-none text-black"
                            >
                              {lang === "english"
                                ? "Download Brochoure"
                                : "تصفح البروشور"}
                            </a>
                          </button>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Carousel.Item>
          ))}
      </Carousel>
    </Wrapper>
  );
};

export default Projects;
