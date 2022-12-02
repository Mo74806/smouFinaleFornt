import { Pagination, TablePagination, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Project from "../../components/Project/Project";
import { getAllProjects } from "../../store/reducers/projectSlice";
// import { projects } from "../../data";

const Container = styled.div`
  background-color: var(--bg-main);
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const ProjectList = ({ sort, filter }) => {
  const { lang } = useSelector((state) => state.language);
  const { dark } = useSelector((state) => state.dark);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const { projects } = useSelector((state) => state.project.projects);
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(null);

  const handleChange = (event, newPage) => {
    setPage(newPage);
  };

  // GET PRODUCTS

  useEffect(() => {
    dispatch(getAllProjects([null, null])).then((res) => {
      setCount(Math.ceil(res.payload.projects.length / 6));
      dispatch(getAllProjects([page, 6]));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, filter]);

  // FILTERS HANDLING
  useEffect(() => {
    if (filter.locationEN === "all") {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(
        projects &&
          projects.filter((project) =>
            Object.entries(filter).every(
              ([key, value]) => project[key] === value
            )
          )
      );
    }
  }, [projects, filter, sort]);

  // SORT HANDLING

  useEffect(() => {
    if (sort === "newest") {
      setFilteredProjects((prev) => prev && [...prev].reverse());
    } else {
      setFilteredProjects((prev) => prev && [...prev]);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sort]);

  return (
    <Container className={`container ${dark && "bg-dark"}`}>
      <Wrapper>
        {filteredProjects &&
          filteredProjects.map((project) => (
            <Project key={project._id} project={project} />
          ))}
      </Wrapper>
      <Typography>Page: {page}</Typography>
      <Pagination
        color="primary"
        count={count}
        page={page}
        onChange={handleChange}
        className="my-3"
      />
    </Container>
  );
};

export default ProjectList;
