import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { mobile, tablet } from "../../responsive";

const Container = styled.div`
  flex: 1;
  min-width: 30%;
  max-width: 50%;

  margin: 20px 20px;
  ${mobile({ minWidth: "80%" })}
  ${tablet({ minWidth: "80%" })}
`;
const Wrapper = styled.div`
  border-radius: 30px;
  height: 100%;
  padding: 10px;

  overflow: hidden;
  border: 3px solid var(--gold-color);
  background-color: var(--btn-color);
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
`;
const Image = styled.div`
  border-radius: 30px 30px 0 0;
  overflow: hidden;
  margin-bottom: 10px;
`;
const Img = styled.img`
  width: 100%;
  height: 100%;
  transform: scale(1.3);
  transition: transform ease-out 0.7s;
  transform-origin: 0 0;
  &:hover {
    transform: scale(1.1) translateY(-8%);
  }
`;
const Info = styled.div``;
const InfoSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const Title = styled.h5`
  text-align: center;
  color: #fff;
  font-weight: bold;
  font-size: 2rem;
  background-color: rgba(1, 1, 1, 0.5);
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  border-radius: 30px;
`;
const InfoText = styled.p`
  color: #aaa;
  font-size: 1rem;
  padding: 0px 10px;
  text-align: center;
  height: 100%;
`;
const Button = styled.button`
  border: none;
  white-space: nowrap;
  border-radius: 10px;
  font-weight: bold;
  border-radius: 30px;
  transition: all ease-in-out 0.2s;
  padding: 7px 20px;
  &:hover {
    background-color: var(--gold-color);
    color: #fff;
  }
`;

const Project = ({ project }) => {
  const { lang } = useSelector((state) => state.language);
  return (
    <Container className="p-2 px-3">
      <Wrapper className="">
        <Image>
          <Img src={`${project.imageCover[0]}`} alt="project-cover" />
        </Image>
        <Info>
          <InfoSection>
            <Title>{lang === "english" ? project.nameEN : project.name}</Title>
            <InfoText>
              {lang === "english" ? project.descriptionEN : project.description}
            </InfoText>
            <Link to={`/projects/${project._id}`}>
              <Button>
                {lang === "english" ? "Show more" : "أعرض المزيد"}
              </Button>
            </Link>
          </InfoSection>
        </Info>
      </Wrapper>
    </Container>
  );
};

export default Project;
