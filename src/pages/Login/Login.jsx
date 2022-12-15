import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { mobile, tablet } from "../../responsive";
import { signIn } from "../../store/reducers/userSlice";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #1e87a8;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 1000'%3E%3Cg %3E%3Ccircle fill='%231E87A8' cx='50' cy='0' r='50'/%3E%3Cg fill='%232084a3' %3E%3Ccircle cx='0' cy='50' r='50'/%3E%3Ccircle cx='100' cy='50' r='50'/%3E%3C/g%3E%3Ccircle fill='%2322819f' cx='50' cy='100' r='50'/%3E%3Cg fill='%23247e9a' %3E%3Ccircle cx='0' cy='150' r='50'/%3E%3Ccircle cx='100' cy='150' r='50'/%3E%3C/g%3E%3Ccircle fill='%23267b95' cx='50' cy='200' r='50'/%3E%3Cg fill='%23287891' %3E%3Ccircle cx='0' cy='250' r='50'/%3E%3Ccircle cx='100' cy='250' r='50'/%3E%3C/g%3E%3Ccircle fill='%232a758c' cx='50' cy='300' r='50'/%3E%3Cg fill='%232c7287' %3E%3Ccircle cx='0' cy='350' r='50'/%3E%3Ccircle cx='100' cy='350' r='50'/%3E%3C/g%3E%3Ccircle fill='%232e6f83' cx='50' cy='400' r='50'/%3E%3Cg fill='%23306c7e' %3E%3Ccircle cx='0' cy='450' r='50'/%3E%3Ccircle cx='100' cy='450' r='50'/%3E%3C/g%3E%3Ccircle fill='%23326a7a' cx='50' cy='500' r='50'/%3E%3Cg fill='%23346775' %3E%3Ccircle cx='0' cy='550' r='50'/%3E%3Ccircle cx='100' cy='550' r='50'/%3E%3C/g%3E%3Ccircle fill='%23366470' cx='50' cy='600' r='50'/%3E%3Cg fill='%2338616c' %3E%3Ccircle cx='0' cy='650' r='50'/%3E%3Ccircle cx='100' cy='650' r='50'/%3E%3C/g%3E%3Ccircle fill='%233a5e67' cx='50' cy='700' r='50'/%3E%3Cg fill='%233c5b62' %3E%3Ccircle cx='0' cy='750' r='50'/%3E%3Ccircle cx='100' cy='750' r='50'/%3E%3C/g%3E%3Ccircle fill='%233e585e' cx='50' cy='800' r='50'/%3E%3Cg fill='%23405559' %3E%3Ccircle cx='0' cy='850' r='50'/%3E%3Ccircle cx='100' cy='850' r='50'/%3E%3C/g%3E%3Ccircle fill='%23425254' cx='50' cy='900' r='50'/%3E%3Cg fill='%23444f50' %3E%3Ccircle cx='0' cy='950' r='50'/%3E%3Ccircle cx='100' cy='950' r='50'/%3E%3C/g%3E%3Ccircle fill='%23464C4B' cx='50' cy='1000' r='50'/%3E%3C/g%3E%3C/svg%3E");
  background-attachment: fixed;
  background-size: contain;
  display: flex;
  align-items: center;
  justify-content: center;
  ${mobile({ justifyContent: "center", backgroundSize: "200% 100%" })}
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 40%;
  background-color: #fff;
  border-radius: 20px;

  padding: 20px;
  box-shadow: rgba(0, 0, 0, 0.56) 0px 22px 70px 4px;
  ${mobile({ width: "75%", marginRight: "0" })}
  ${tablet({ width: "75%", marginRight: "0" })}
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;
const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: bold;
  text-align: center;
  color: var(--main-color);
`;
const Input = styled.input`
  flex: 1;

  width: 100%;
  border-radius: 25px;
  background-color: lightgray;
  margin: 20px 10px 0px 0px;
  border: 0px;
  font-weight: bold;
  padding: 10px 30px;
  margin-bottom: 5px;
`;
const FormLink = styled.a`
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
  &:hover {
    color: var(--btn-color);
  }
`;
const Button = styled.button`
  width: 40%;
  border: 1px solid white;
  padding: 12px 17px;

  border-radius: 25px;
  background-color: var(--main-color);
  color: white;
  cursor: pointer;
  white-space: nowrap;
  transition: all ease 0.25s;
  &:hover {
    border: 1px solid var(--main-color);
    background-color: #fff;
    color: var(--main-color);
    border-radius: 25px;
  }
`;

const Error = styled.span`
  color: red;
  text-align: center;
  width: 80%;
  font-size: 14px;
`;

const Login = (props) => {
  const { dark } = useSelector((state) => state.dark);
  const { lang } = useSelector((state) => state.language);
  const [inputUser, setInputUser] = useState({});
  let [adminonlyError, setAdminonlyError] = useState(null);
  let { serverError } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const changeHandler = (e) => {
    setInputUser({
      ...inputUser,
      [e.target.name]: e.target.value,
    });
  };
  const [target, setTarget] = useState(null);
  useEffect(() => {
    location.state && setTarget(location.state.prevPath);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(signIn(inputUser))
      .then((res) => {
        if (target === "/admin" || location.pathname === "/admin") {
          if (res.payload.user.role === "admin") {
            navigate(`/admin`);
          } else {
            lang === "english"
              ? setAdminonlyError("Admin Dashboard can only accessed by admins")
              : setAdminonlyError("هذا الجزء مخصص للإدارة فقط");
          }
        } else {
          if (res.payload.user) {
            if (target === "/forgotPass") {
              navigate("/");
            } else {
              navigate(`${target}`);
            }
          }
        }
      })
      .catch((error) => console.log(error));
  };

  const signUpHandler = () => {
    navigate("/register", {
      state: { prevPath: location.pathname || "/admin" },
      replace: true,
    });
  };

  return (
    <Container>
      <Wrapper className={`row ${dark ? "bg-dark" : "null"} `}>
        <Title>{lang === "english" ? "Login" : "تسجيل الدخول"}</Title>

        {adminonlyError && <Error>{adminonlyError}</Error>}

        {serverError && (
          <Error>
            {lang === "english"
              ? "incorrect email or password"
              : "كلمة السر او البريد الإلكترونى غير صحيح"}
          </Error>
        )}
        <Form
          dir={`${lang === "english" ? "ltr" : "rtl"}`}
          onSubmit={submitHandler}
          onChange={changeHandler}
        >
          <Input
            type="email"
            placeholder="email"
            onBlur={(e) => (e.target.placeholder = "email")}
            onFocus={(e) => (e.target.placeholder = "")}
            name="email"
            autoFocus
          />

          <Input
            type="password"
            placeholder="Password"
            name="password"
            onBlur={(e) => (e.target.placeholder = "Password")}
            onFocus={(e) => (e.target.placeholder = "")}
          />
          <NavLink
            to={"/forgotPass"}
            className={"align-self-start mx-4 px-3 my-1"}
          >
            {lang === "english" ? "Forgot password ?" : "نسيت كلمة السر ؟"}
          </NavLink>
          <FormLink className={"align-self-start mx-4 px-3 my-1"}>
            <FormLink onClick={signUpHandler}>
              {lang === "english" ? "create new account" : "انشاء حساب جديد"}
            </FormLink>
          </FormLink>
          <Button type="submit">
            {lang === "english" ? "Login" : "دخـول"}
          </Button>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Login;
