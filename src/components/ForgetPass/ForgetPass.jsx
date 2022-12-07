import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { mobile } from "../../responsive";
import { signIn } from "../../store/reducers/userSlice";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #1e87a8;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 1000'%3E%3Cg %3E%3Ccircle fill='%231E87A8' cx='50' cy='0' r='50'/%3E%3Cg fill='%232084a3' %3E%3Ccircle cx='0' cy='50' r='50'/%3E%3Ccircle cx='100' cy='50' r='50'/%3E%3C/g%3E%3Ccircle fill='%2322819f' cx='50' cy='100' r='50'/%3E%3Cg fill='%23247e9a' %3E%3Ccircle cx='0' cy='150' r='50'/%3E%3Ccircle cx='100' cy='150' r='50'/%3E%3C/g%3E%3Ccircle fill='%23267b95' cx='50' cy='200' r='50'/%3E%3Cg fill='%23287891' %3E%3Ccircle cx='0' cy='250' r='50'/%3E%3Ccircle cx='100' cy='250' r='50'/%3E%3C/g%3E%3Ccircle fill='%232a758c' cx='50' cy='300' r='50'/%3E%3Cg fill='%232c7287' %3E%3Ccircle cx='0' cy='350' r='50'/%3E%3Ccircle cx='100' cy='350' r='50'/%3E%3C/g%3E%3Ccircle fill='%232e6f83' cx='50' cy='400' r='50'/%3E%3Cg fill='%23306c7e' %3E%3Ccircle cx='0' cy='450' r='50'/%3E%3Ccircle cx='100' cy='450' r='50'/%3E%3C/g%3E%3Ccircle fill='%23326a7a' cx='50' cy='500' r='50'/%3E%3Cg fill='%23346775' %3E%3Ccircle cx='0' cy='550' r='50'/%3E%3Ccircle cx='100' cy='550' r='50'/%3E%3C/g%3E%3Ccircle fill='%23366470' cx='50' cy='600' r='50'/%3E%3Cg fill='%2338616c' %3E%3Ccircle cx='0' cy='650' r='50'/%3E%3Ccircle cx='100' cy='650' r='50'/%3E%3C/g%3E%3Ccircle fill='%233a5e67' cx='50' cy='700' r='50'/%3E%3Cg fill='%233c5b62' %3E%3Ccircle cx='0' cy='750' r='50'/%3E%3Ccircle cx='100' cy='750' r='50'/%3E%3C/g%3E%3Ccircle fill='%233e585e' cx='50' cy='800' r='50'/%3E%3Cg fill='%23405559' %3E%3Ccircle cx='0' cy='850' r='50'/%3E%3Ccircle cx='100' cy='850' r='50'/%3E%3C/g%3E%3Ccircle fill='%23425254' cx='50' cy='900' r='50'/%3E%3Cg fill='%23444f50' %3E%3Ccircle cx='0' cy='950' r='50'/%3E%3Ccircle cx='100' cy='950' r='50'/%3E%3C/g%3E%3Ccircle fill='%23464C4B' cx='50' cy='1000' r='50'/%3E%3C/g%3E%3C/svg%3E");
  display: flex;
  align-items: center;
  justify-content: center;
  direction: ltr;
  ${mobile({ justifyContent: "center", backgroundSize: "200% 100%" })}
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 80%;
  background-color: #fff;
  border-radius: 20px;
  padding: 20px;
  box-shadow: rgba(0, 0, 0, 0.56) 0px 22px 70px 4px;
  ${mobile({ width: "75%", marginRight: "0" })}
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
  text-align: center;
`;
const Input = styled.input`
  flex: 1;
  width: 100%;
  border-radius: 25px;
  background-color: lightgray;
  margin: 20px 10px 0px 0px;
  border: 0px;
  font-weight: bold;
  padding: 1rem 3rem;
  display:flex;
  justify-content:center;
  margin-botton: 5px;
`;
const FormLink = styled.a`
  margin: 5px 0px;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
  &:hover {
    color: var(--btn-color);
  }
`;
const Button = styled.button`
  margin: 10px 0;
  align-self: center;
  width: 80%;
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
    border-raduis: 25px;
  }
`;

const Error = styled.span`
  color: red;
  font-size: 14px;
`;

export default function ForgetPass() {
  const { dark } = useSelector((state) => state.dark);
  const { lang } = useSelector((state) => state.language);
  const { serverError, user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [inputUser, setInputUser] = useState({});
  const [flag, setFalg] = useState(false);
  const [flag2, setFalg2] = useState(false);
  const navigate = useNavigate();

  const [errMsg, setErrMsg] = useState({
    email: null,
    emailEN: null,
    checkPass: "الرقم السرى غير متطابق",
    checkPassEN: "Password not matched",
    token: null,
    tokenEn: null,
  });

  const changeHandler = (e) => {
    setInputUser({
      ...inputUser,
      [e.target.name]: e.target.value,
    });
  };

  const tokenHandler = (e) => {
    e.preventDefault();
    if (inputUser.recivedTokenInput === inputUser.recivedToken) {
      setFalg2(true);
      setErrMsg({ ...errMsg, token: null, tokenEn: null });
    } else {
      setErrMsg({
        ...errMsg,
        token: "الكود غير صحيح",
        tokenEn: "Code not correct",
      });
    }
  };
  const changePass = async (e) => {
    e.preventDefault();
    if (inputUser.password === inputUser.passwordConfirm) {
      setErrMsg({ ...errMsg, checkPass: null, checkPassEN: null });
      try {
        await axios
          .patch(
            `https://smou-alasala-server-ap-qy3u2378d-mo74806.vercel.app/api/v1/users/resetPassword/${inputUser.recivedToken}`,
            {
              password: inputUser.password,
              passwordConfirm: inputUser.passwordConfirm,
            }
          )
          .then((res) => {
            dispatch(signIn(inputUser));
            navigate("/");
          });
      } catch (error) {
        setErrMsg({
          ...errMsg,
          checkPass: "الرقم السرى يجب ان يكون 8 حروف على الاقل",
          checkPassEN: "Password must be at least 8 characters",
        });
      }
    } else {
      setErrMsg({
        ...errMsg,
        checkPass: "الرقم السرى غير متطابق",
        checkPassEN: "Password not matched",
      });
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await axios
        .post(
          `https://smou-alasala-server-ap-qy3u2378d-mo74806.vercel.app/api/v1/users/forgotPassword`,
          {
            email: inputUser.email,
          }
        )
        .then((res) => {
          if (res.status >= 200 && res.status < 400) {
            setFalg(true);
            const token = res.data.resetToken;
            setInputUser({ ...inputUser, recivedToken: token });
            setErrMsg({ ...errMsg, email: null, emailEN: null });
          } else {
            setErrMsg({
              ...errMsg,
              email: "البريد الذى ادخلته غير صحيح",
              emailEN: "The email you entered in not regestered",
            });
          }
        });
    } catch (error) {
      setErrMsg({
        ...errMsg,
        email: "البريد الذى ادخلته غير صحيح",
        emailEN: "The email you entered in not regestered",
      });
    }
  };

  return (
    <Container>
      <Wrapper className={` ${dark ? "bg-dark" : "null"} `}>
        <Title>
          {lang === "english" ? "Reset password" : "اعداد كلمة السر"}
        </Title>
        <Form onChange={changeHandler}>
          {!flag && (
            <>
              <Input
                type="email"
                placeholder="email"
                onBlur={(e) => (e.target.placeholder = "Email")}
                onFocus={(e) => (e.target.placeholder = "")}
                name="email"
              />
              {errMsg.email && (
                <p className="text-center text-danger">
                  {lang === "english" ? errMsg.emailEN : errMsg.email}
                </p>
              )}
            </>
          )}
          {flag && !flag2 && (
            <>
              <Input
                type="text"
                placeholder="code"
                onBlur={(e) =>
                  (e.target.placeholder = "enter the Code you receved in email")
                }
                onFocus={(e) => (e.target.placeholder = "")}
                name="recivedTokenInput"
              />
              {errMsg.token && (
                <p className="text-center text-danger">
                  {lang === "english" ? errMsg.tokenEn : errMsg.token}
                </p>
              )}
            </>
          )}
          {flag2 && (
            <>
              <Input
                type="password"
                placeholder="New Password"
                onBlur={(e) => (e.target.placeholder = "New Password")}
                onFocus={(e) => (e.target.placeholder = "")}
                name="password"
              />
              <Input
                type="password"
                placeholder="Password Confirm"
                onBlur={(e) => (e.target.placeholder = "Password Confirm")}
                onFocus={(e) => (e.target.placeholder = "")}
                name="passwordConfirm"
              />
              {errMsg.checkPass && (
                <p className="text-center text-danger">
                  {lang === "english" ? errMsg.checkPassEN : errMsg.checkPass}
                </p>
              )}
            </>
          )}
          {!flag && (
            <Button
              onClick={(e) => {
                submitHandler(e);
              }}
              type="submit"
            >
              {lang === "english" ? "Send" : "ارسال"}
            </Button>
          )}
          {flag && !flag2 && (
            <Button
              onClick={(e) => {
                tokenHandler(e);
              }}
              type="submit"
            >
              {lang === "english" ? "Confirm" : "تأكيد"}
            </Button>
          )}
          {flag2 && (
            <Button
              onClick={(e) => {
                changePass(e);
              }}
              type="submit"
            >
              {lang === "english" ? "Confirm" : "تأكيد"}
            </Button>
          )}
        </Form>
      </Wrapper>
    </Container>
  );
}
