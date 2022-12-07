import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./projectDetails.css";
import { getProjectById } from "../../store/reducers/projectSlice";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCoverflow, Navigation, Pagination } from "swiper";
import Loading from "../../components/Loading/Loading";
import Header from "../../components/Header/Header";
import { animateScroll as scroll } from "react-scroll";
import axios from "axios";

export default function ProjectDetails() {
  const { lang } = useSelector((state) => state.language);
  const { dark } = useSelector((state) => state.dark);
  const { id } = useParams();
  const dispatch = useDispatch();
  const { project } = useSelector((state) => state.project.projectById);
  const { isLoading, serverError } = useSelector((state) => state.project);

  useEffect(() => {
    scroll.scrollToTop();
    dispatch(getProjectById(id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDownload = () => {
    const res = axios.patch(
      `https://smou-alasala-server-ap-qy3u2378d-mo74806.vercel.app/api/v1/projects/increaseParsureDownloads/${project._id}`
    );
  };

  return (
    <>
      {isLoading && <Loading />}
      {project && (
        <Header
          title={lang === "english" ? project.nameEN : project.name}
          cover={project.imageCover[1]}
        />
      )}
      <div className=" ">
        {serverError && (
          <div className="alert alert-danger">{`${serverError} .. Please try again later`}</div>
        )}

        {/* yasser slider */}

        <div className="py-5 swiper-bg">
          <div className="text-center text-white fs-1 fw-bold">
            شاهد أخر التطورات
          </div>
          <Swiper
            modules={[Pagination, Navigation, Autoplay, EffectCoverflow]}
            navigation
            pagination={{ clickable: true }}
            effect="coverflow"
            coverflowEffect={{
              rotate: 50,
              stretch: 0,
              depth: 100,
              modifier: 1,
              scale: 1,
              slideShadows: true,
            }}
            autoplay={{
              delay: 3000,
              disableOnInteraction: true,
            }}
            centeredSlides
            centeredSlidesBounds
            loop={project && project.imageCover.length <= 2 ? false : true}
            loopFillGroupWithBlank={false}
            simulateTouch={true}
            breakpoints={{
              820: {
                slidesPerView:
                  project && project.imageCover.length <= 2 ? 1 : 2,
              },
              0: { slidesPerView: 1 },
            }}
            className="my-5 px-2 "
          >
            {project &&
              project.imageCover.map((img) => (
                <SwiperSlide className="my-5 images-slider">
                  <img
                    className="w-100 rounded-4 "
                    src={`${img}`}
                    alt="cover"
                  />
                </SwiperSlide>
              ))}
          </Swiper>
        </div>

        {/* end yasser slider */}
        <div className="container my-5">
								  <div className="row my-5  d-flex justify-content-around">
								  <div className={`col-md-5 col-11 my-5   "`}>
            
              <iframe
                src={project && project.videos}
                title="Park View بارك فيو الخبر"
                // frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                // allowFullScreen
                
                className="rounded-2 video "
              ></iframe>
              <div className="row d-flex mx-1 justify-content-end">
            <div className={`text-center   fw-bold fs-3 ${lang === "english"
                        ? "aboutProject1EN"
                        : "aboutProject1"} 
            ${
                dark ? "contact-form-form-body-dark" : "contact-form-form-body"
              } m-0 p-0 py-2  col-5 mx-4   text-white`}>
            {lang === "english"
                        ? "watch prograss"
                        : "أخر التطورات"}
            
            </div>
            
            </div>
            </div>
            <div
              className={`col-md-5 my-5  col-10  ${
                dark ? "contact-form-form-body-dark" : "contact-form-form-body"
              } my-3 "`}
            >
<div className="row d-flex justify-content-end">
            <div className={`text-center   fw-bold fs-3 ${lang === "english"
                        ? "aboutProjectEN"
                        : "aboutProject"} 
            ${
                dark ? "contact-form-form-body-dark" : "contact-form-form-body"
              } m-0 p-0 py-2  col-5 mx-3  text-white`}>
            {lang === "english"
                        ? "About Project"
                        : "عن المشروع"}
            
            </div>
            
            </div>
              <div className="">
                <div className="">
                  {project && (
                    <p className="card-text py-0  text-center text-light fs-6 fw-semibold px-2">
                      {lang === "english"
                        ? project.descriptionEN
                        : project.description}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- slider 2 --> */}
        <div className="py-5 images-bg">
          <div className="py-5 container">
            <div className="row my-5">
              <div className="col-md-6 my-3  ">
                <h3 className={`text-center mb-5 fw-bold text-white `}>
                  {lang === "english" ? "Plan view" : "منظر علوي"}
                </h3>
                <div
                  id="carouselExampleInterval"
                  className="carousel carousel-fade"
                  data-bs-ride="carousel"
                >
                  <div className="carousel-inner">
                    <div
                      className="carousel-item active"
                      data-bs-interval="5000"
                    >
                      <img
                        src={`${project && project.imagePlan[0]}`}
                        className="d-block w-100 image-project"
                        alt="image-plan"
                      />
                    </div>
                    {project &&
                      project.imagePlan
                        .filter((img, index) => index > 0)
                        .map((item) => {
                          return (
                            <div
                              className="carousel-item  "
                              data-bs-interval="5000"
                            >
                              <img
                                src={`${item}`}
                                className="d-block w-100  image-project "
                                alt="image-plan"
                              />
                            </div>
                          );
                        })}
                  </div>
                  <button
                    className="carousel-control-prev"
                    type="button"
                    data-bs-target="#carouselExampleInterval"
                    data-bs-slide="prev"
                  >
                    <span
                      className="carousel-control-prev-icon"
                      aria-hidden="true"
                    ></span>
                    <span className="visually-hidden">Previous</span>
                  </button>
                  <button
                    className="carousel-control-next"
                    type="button"
                    data-bs-target="#carouselExampleInterval"
                    data-bs-slide="next"
                  >
                    <span
                      className="carousel-control-next-icon"
                      aria-hidden="true"
                    ></span>
                    <span className="visually-hidden">Next</span>
                  </button>
                </div>
              </div>

              <div className="col-md-6 mt-3">
                <h3 className="text-center mb-5 fw-bold text-white">
                  {lang === "english" ? "Services" : "الخدمات"}
                </h3>
                <div
                  id="slider2"
                  className="carousel carousel-fade"
                  data-bs-ride="carousel"
                >
                  <div className="carousel-inner">
                    <div
                      className="carousel-item active"
                      data-bs-interval="6000"
                    >
                      <img
                        src={`${project && project.imageService[0]}`}
                        className="d-block w-100 image-project"
                        alt="image-service"
                      />
                    </div>
                    {project &&
                      project.imageService
                        .filter((img, index) => index > 0)
                        .map((item) => (
                          <div className="carousel-item">
                            <img
                              src={`${item}`}
                              className="d-block w-100 image-project"
                              alt="image-service"
                            />
                          </div>
                        ))}
                  </div>
                  <button
                    className="carousel-control-prev"
                    type="button"
                    data-bs-target="#slider2"
                    data-bs-slide="prev"
                  >
                    <span
                      className="carousel-control-prev-icon"
                      aria-hidden="true"
                    ></span>
                    <span className="visually-hidden">Previous</span>
                  </button>
                  <button
                    className="carousel-control-next"
                    type="button"
                    data-bs-target="#slider2"
                    data-bs-slide="next"
                  >
                    <span
                      className="carousel-control-next-icon"
                      aria-hidden="true"
                    ></span>
                    <span className="visually-hidden">Next</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- slider 2 -->
        <!-- units --> */}

        <div className="">
          <div className="container">
            <h3
              className={`text-center mt-5 fw-bold fs-1 mb-5 ${
                dark ? "text-customDark" : "text-custom"
              }`}
            >
              {lang === "english" ? "Units types" : "أنواع الوحدات"}
            </h3>
            <div className="row d-flex justify-content-center">
              {project &&
                project.housingUnits &&
                project &&
                project.housingUnits.map((item) => {
                  return (
                    <>
                      <div className="card  px-0 mx-2 rounded-5 col-xl-5 col-10 bg-transparent mb-3">
                        <div className="">
                          <img
                            src={`${item.imageCover}`}
                            className="card-img-top "
                            alt="unit-cover"
                          />
                        </div>
                        <div className={`card-body rounded-0 `}>
                          <h5
                            className={`card-title  fw-bold fs-1 ${
                              dark
                                ? "contact-form-form-body-dark bg-black"
                                : "contact-form-form-body"
                            }  text-center text-light`}
                          >
                            {lang === "english" ? item.nameEN : item.name}
                          </h5>
                          <p
                            className={`card-text text-center px-4 ${
                              dark
                                ? "contact-form-form-body-dark"
                                : "contact-form-form-body"
                            } text-light text-center`}
                          >
                            {lang === "english"
                              ? item.descriptionEN
                              : item.description}
                          </p>
                        </div>
                      </div>
                    </>
                  );
                })}
            </div>
          </div>
        </div>

        {/* document download */}

        <div className="d-flex justify-content-center my-3">
          {project && (
            <button onClick={handleDownload} className="btnTransparent">
              <a
                href={`${project.parsure}`}
                className={`text-center btn ${
                  dark ? "bg-black text-white" : "btn-brucher"
                } px-3 rounded-pill  fw-bold`}
              >
                {lang === "english" ? "Download Brochoure" : "تصفح البروشور"}
              </a>
            </button>
          )}
        </div>
      </div>
    </>
  );
}
