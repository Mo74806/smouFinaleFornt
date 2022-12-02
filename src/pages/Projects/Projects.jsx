import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import ProjectList from "../../components/ProjectList/ProjectList";
import { mobile } from "../../responsive";
import Loading from "../../components/Loading/Loading";
import { animateScroll as scroll } from "react-scroll";

const Container = styled.div``;
const Header = styled.div`
  background-color: var(--btn-color);
  padding-bottom: 20px;
`;

const Title = styled.h3`
  color: #fff;
  font-weight: bold;
  font-size: 32px;
  text-align: center;
  padding-top: 50px;
  padding-bottom: 20px;
`;
const FilterContainer = styled.div`
  display: flex;
  justify-content: space-around;
`;
const Logo = styled.div`
  text-align: center;
  flex: 1;
  ${mobile({ display: "none" })}
`;
const Img = styled.img`
  width: 80%;
`;

const Filter = styled.div`
  margin: 20px;
  flex: 2;
  align-self: end;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  ${mobile({ width: "20%" })}
`;
const FilterText = styled.span`
  font-size: 20px;
  color: var(--gold-color);
  font-weight: bold;
  margin-bottom: 10px;
  ${mobile({ marginRight: "0px" })}
`;

const Select = styled.select`
  padding: 7px 30px;
  background-color: var(--bg-main);
  ${mobile({ margin: "10px 4px" })};
`;
const Option = styled.option`
  padding: 10px 20px;
`;

const Projects = () => {
  const { lang } = useSelector((state) => state.language);
  const { dark } = useSelector((state) => state.dark);
  const [filter, setFilter] = useState("");
  const [sort, setSort] = useState("");
  const { serverError, isLoading } = useSelector((state) => state.project);

  useEffect(() => {
    scroll.scrollToTop();
  }, []);

  const filterHandler = (e) => {
    setFilter({
      [e.target.name]: e.target.value,
    });
  };
  const sortHandler = (e) => {
    setSort(e.target.value);
  };

  return (
    <Container className={`${dark && "bg-dark"}`}>
      <Header>
        <Title>{lang === "english" ? "Projects" : "المشــروعــات"}</Title>
        <FilterContainer>
          <Filter>
            <FilterText>
              {lang === "english" ? "View by" : "اعرض حســـب"}
            </FilterText>
            <Select name="locationEN" onChange={filterHandler}>
              <Option value="all" selected>
                {lang === "english" ? "ALL" : "الكــل"}
              </Option>
              <Option value="saudi arbia">
                {lang === "english" ? "KSA" : "السعــودية"}
              </Option>
              <Option value="egypt">
                {lang === "english" ? "Egypt" : "مـــصر"}
              </Option>
            </Select>
          </Filter>
          <Logo>
            <Img src="./imgs/logo/شعار سمو الاصالة ابيض.png" />
          </Logo>
          <Filter>
            <FilterText>
              {lang === "english" ? "Sort by" : "رتب حســب"}
            </FilterText>
            <Select name="sort" onChange={sortHandler}>
              <Option disabled>...</Option>
              <Option value="oldest">
                {lang === "english" ? "Oldest" : "الأقــدم"}
              </Option>
              <Option value="newest">
                {lang === "english" ? "Newest" : "الأحــدث"}
              </Option>
            </Select>
          </Filter>
        </FilterContainer>
      </Header>
      {isLoading && <Loading />}
      {serverError && (
        <div className="text-center m-5 p-5 alert alert-danger">
          {`${serverError} .. Please try again later`}
        </div>
      )}
      <ProjectList sort={sort} filter={filter} />
    </Container>
  );
};

export default Projects;
