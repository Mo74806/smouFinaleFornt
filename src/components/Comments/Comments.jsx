import React, { useEffect, useState } from "react";
import "./comments.css";
import "@fortawesome/fontawesome-free/css/all.css";
import Sidebar from "../AdminDashboardFinal/sidebar/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { getAllMessages } from "../../store/reducers/messagesSlice";
import { userRequest } from "../../requestMethods";

export default function Comments() {
  const dispatch = useDispatch();

  const { messages } = useSelector((state) => state.messages);

  const [comments, setComment] = useState(null);
  const [commentsDisp, setCommentDisp] = useState(null);
  useEffect(() => {
    dispatch(getAllMessages()).then((res) => {
      setComment(res.payload);
      setCommentDisp(res.payload);
    });
  }, []);
  const filterByAll = () => {
    setCommentDisp([...comments]);
  };
  const filterByStarred = () => {
    let newArr = comments.filter((item) => item.stared === "true");
    setCommentDisp(newArr);
  };
  const filterByNotStarred = () => {
    let newArr = comments.filter((item) => item.stared === "false");
    setCommentDisp(newArr);
  };
  const starComment = async (index, id) => {
    // let newArr = [...comments];
    if (comments[index].stared === "false") {
      // newArr[index].stared = "true";
      const res = await userRequest
        .patch(
          `https://smou-alasala-server-ap-qy3u2378d-mo74806.vercel.app/api/v1/contacts/${id}`,
          {
            stared: "true",
          }
        )
        .then(() => {
          const newArr = [...comments];
          newArr[index] = { ...newArr[index], stared: "true" };
          setComment(newArr);
          setCommentDisp(newArr);
        });
    } else {
      // newArr[index].stared = "false";
      const res = await userRequest
        .patch(
          `https://smou-alasala-server-ap-qy3u2378d-mo74806.vercel.app/api/v1/contacts/${id}`,
          {
            stared: "false",
          }
        )
        .then(() => {
          const newArr = [...comments];
          newArr[index] = { ...newArr[index], stared: "false" };
          setComment(newArr);
          setCommentDisp(newArr);
        });
      // newArr[index].stared = false;
    }
    // setCommentDisp(newArr);
  };
  const deleteComment = async (id) => {
    const res = await userRequest
      .delete(
        `https://smou-alasala-server-ap-qy3u2378d-mo74806.vercel.app/api/v1/contacts/${id}`
      )
      .then((resp) => {
        let newArr = comments.filter((item) => item.id !== id);
        setComment(newArr);
        setCommentDisp(newArr);
      });
  };
  return (
    <>
      <div className="row mx-0">
        <div className="col-3">
          <Sidebar></Sidebar>
        </div>
        <div className="container my-4 mx-auto col-9">
          <div className="dropdown">
            <button
              className="btn btn-primary dropdown-toggle"
              type="button"
              id="dropdownMenuButton1"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Filtter comments
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
              <li>
                <a onClick={filterByAll} className="dropdown-item" href="#">
                  All comments
                </a>
              </li>
              <li>
                <a onClick={filterByStarred} className="dropdown-item" href="#">
                  Starred comments
                </a>
              </li>
              <li>
                <a
                  onClick={filterByNotStarred}
                  className="dropdown-item"
                  href="#"
                >
                  Not starred comments
                </a>
              </li>
            </ul>
          </div>
          <div className="row mx-auto">
            {commentsDisp &&
              commentsDisp.map((item, index) => {
                return (
                  <div key={index} className="p-5 col-md-6 ">
                    <div className="card bg-comment shadow-sm p-3">
                      {item.stared === "true" && (
                        <div className="star">
                          <i className="fa-solid fa-star text-warning fs-3"></i>
                        </div>
                      )}
                      <div className="card-body text-center">
                        <div className=" text-light">{item.name}</div>
                        <div className=" text-light">{item.mail}</div>
                        <div className=" text-light">{item.phone}</div>
                      </div>
                      <div className="card-body text-light">{item.message}</div>
                      <div className="row">
                        <button
                          onClick={() => {
                            deleteComment(item.id);
                          }}
                          className="btn btn-light col-4 mx-auto"
                        >
                          Delete
                        </button>
                        <button
                          onClick={() => {
                            starComment(index, item._id);
                          }}
                          className="btn btn-light col-5 mx-auto"
                        >
                          {item.stared === "true" && <span>Remove star</span>}
                          {item.stared === "false" && <span>Add star</span>}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
}
