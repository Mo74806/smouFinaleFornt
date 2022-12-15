import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { mobile, tablet } from "../../responsive";
import { addUser } from "../../store/reducers/userSlice";

const Container = styled.div`
  background-color: #1e87a8;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 1000'%3E%3Cg %3E%3Ccircle fill='%231E87A8' cx='50' cy='0' r='50'/%3E%3Cg fill='%232084a3' %3E%3Ccircle cx='0' cy='50' r='50'/%3E%3Ccircle cx='100' cy='50' r='50'/%3E%3C/g%3E%3Ccircle fill='%2322819f' cx='50' cy='100' r='50'/%3E%3Cg fill='%23247e9a' %3E%3Ccircle cx='0' cy='150' r='50'/%3E%3Ccircle cx='100' cy='150' r='50'/%3E%3C/g%3E%3Ccircle fill='%23267b95' cx='50' cy='200' r='50'/%3E%3Cg fill='%23287891' %3E%3Ccircle cx='0' cy='250' r='50'/%3E%3Ccircle cx='100' cy='250' r='50'/%3E%3C/g%3E%3Ccircle fill='%232a758c' cx='50' cy='300' r='50'/%3E%3Cg fill='%232c7287' %3E%3Ccircle cx='0' cy='350' r='50'/%3E%3Ccircle cx='100' cy='350' r='50'/%3E%3C/g%3E%3Ccircle fill='%232e6f83' cx='50' cy='400' r='50'/%3E%3Cg fill='%23306c7e' %3E%3Ccircle cx='0' cy='450' r='50'/%3E%3Ccircle cx='100' cy='450' r='50'/%3E%3C/g%3E%3Ccircle fill='%23326a7a' cx='50' cy='500' r='50'/%3E%3Cg fill='%23346775' %3E%3Ccircle cx='0' cy='550' r='50'/%3E%3Ccircle cx='100' cy='550' r='50'/%3E%3C/g%3E%3Ccircle fill='%23366470' cx='50' cy='600' r='50'/%3E%3Cg fill='%2338616c' %3E%3Ccircle cx='0' cy='650' r='50'/%3E%3Ccircle cx='100' cy='650' r='50'/%3E%3C/g%3E%3Ccircle fill='%233a5e67' cx='50' cy='700' r='50'/%3E%3Cg fill='%233c5b62' %3E%3Ccircle cx='0' cy='750' r='50'/%3E%3Ccircle cx='100' cy='750' r='50'/%3E%3C/g%3E%3Ccircle fill='%233e585e' cx='50' cy='800' r='50'/%3E%3Cg fill='%23405559' %3E%3Ccircle cx='0' cy='850' r='50'/%3E%3Ccircle cx='100' cy='850' r='50'/%3E%3C/g%3E%3Ccircle fill='%23425254' cx='50' cy='900' r='50'/%3E%3Cg fill='%23444f50' %3E%3Ccircle cx='0' cy='950' r='50'/%3E%3Ccircle cx='100' cy='950' r='50'/%3E%3C/g%3E%3Ccircle fill='%23464C4B' cx='50' cy='1000' r='50'/%3E%3C/g%3E%3C/svg%3E");
  background-attachment: fixed;
  background-size: contain;
  width: 100vw;

  display: flex;
  align-items: center;
  justify-content: center;
  direction: ltr;
  ${mobile({ justifyContent: "center", backgroundSize: "190% 100%" })}
`;
const Wrapper = styled.div`
  width: 40%;
  margin: 50px 0;
  background-color: #fff;
  border-radius: 20px;
  padding: 20px;
  box-shadow: rgba(0, 0, 0, 0.56) 0px 22px 70px 4px;
  ${mobile({ width: "75%" })}
  ${tablet({ width: "60%" })}
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  color: black;
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

const Register = () => {
  const { dark } = useSelector((state) => state.dark);
  const { lang } = useSelector((state) => state.language);
  const [error, setError] = useState({});
  const [newUser, setNewUser] = useState({});

  const changeHandler = (e) => {
    // First Name Validation

    if (e.target.name === "firstName") {
      if (e.target.value.length === 0) {
        lang === "english"
          ? setError({
              ...error,
              fname: "Please enter name",
            })
          : setError({
              ...error,
              fname: "من فضلك ادخل اسم",
            });
      } else if (!e.target.value.match(/^[a-zA-Z ]{3,20}$/)) {
        lang === "english"
          ? setError({
              ...error,
              fname:
                "Please enter characters only in range of 3 and 20 characters",
            })
          : setError({
              ...error,
              fname: "من فضلك غير مسموح بالارقام والحد المسموح به من 3-20 حرف",
            });
      } else {
        setError({
          ...error,
          fname: null,
        });
        setNewUser({
          ...newUser,
          firstName: e.target.value,
        });
      }
    }
    // Last Name Validation

    if (e.target.name === "lastName") {
      if (e.target.value.length === 0) {
        lang === "english"
          ? setError({
              ...error,
              lname: "Please enter name",
            })
          : setError({
              ...error,
              lname: "من فضلك ادخل اسم",
            });
      } else if (!e.target.value.match(/^[a-zA-Z ]{3,20}$/)) {
        lang === "english"
          ? setError({
              ...error,
              lname:
                "Please enter characters only in range of 3 and 20 characters",
            })
          : setError({
              ...error,
              lname: "من فضلك غير مسموح بالارقام والحد المسموح به من 3-20 حرف",
            });
      } else {
        setError({
          ...error,
          lname: null,
        });
        setNewUser({
          ...newUser,
          lastName: e.target.value,
        });
      }
    }

    // Username Validation

    if (e.target.name === "userName") {
      if (e.target.value.length === 0) {
        lang === "english"
          ? setError({
              ...error,
              username: "User name required",
            })
          : setError({
              ...error,
              username: "اسم المستخدم مطلوب",
            });
      } else if (
        !e.target.value.match(
          /^[a-zA-Z0-9](_(?!(\.|_))|\.(?!(_|\.))|[a-zA-Z0-9]){6,18}[a-zA-Z0-9]$/
        )
      ) {
        lang === "english"
          ? setError({
              ...error,
              username: "Please enter valid user name",
            })
          : setError({
              ...error,
              username: "من فضلك ادخل اسم مستخدم صحيح",
            });
      } else {
        setError({
          ...error,
          username: null,
        });
        setNewUser({
          ...newUser,
          userName: e.target.value,
        });
      }
    }

    // Email Validation

    if (e.target.name === "email") {
      if (e.target.value.length === 0) {
        lang === "english"
          ? setError({
              ...error,
              email: "Please enter email",
            })
          : setError({
              ...error,
              email: "من فضلك ادخل البريد الالكتروني",
            });
      } else if (
        !e.target.value.match(
          /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/
        )
      ) {
        lang === "english"
          ? setError({
              ...error,
              email: "Please enter valid email",
            })
          : setError({
              ...error,
              email: "من فضلك ادخل البريد بشكل صحيح",
            });
      } else {
        setError({
          ...error,
          email: null,
        });
        setNewUser({
          ...newUser,
          email: e.target.value,
        });
      }
      console.log("hello from email");
    }

    // Password Validation

    if (e.target.name === "password") {
      if (e.target.value.length === 0) {
        lang === "english"
          ? setError({
              ...error,
              password: "Please create password",
            })
          : setError({
              ...error,
              password: "من فضلك قم بانشاء كلمة مرور",
            });
      } else if (
        !e.target.value.match(
          /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
        )
      ) {
        lang === "english"
          ? setError({
              ...error,
              password:
                "password must include uper case, lower case,number,special character ",
            })
          : setError({
              ...error,
              password: "كلمة المرور يجب ان تحتوي على ارقام وحروف ورموز",
            });
      } else {
        setError({
          ...error,
          password: null,
        });
        setNewUser({
          ...newUser,
          password: e.target.value,
        });
      }
    }

    // Confirm Password

    if (e.target.name === "passwordConfirm") {
      if (e.target.value.length === 0) {
        lang === "english"
          ? setError({
              ...error,
              confirmPassword: "Please confirm password",
            })
          : setError({
              ...error,
              confirmPassword: "من فضلك قم بتأكيد كلمة مرور",
            });
      } else if (e.target.value !== newUser.password) {
        lang === "english"
          ? setError({
              ...error,
              confirmPassword: "Password not match",
            })
          : setError({
              ...error,
              confirmPassword: "كلمة المرور غير مطابقة",
            });
      } else {
        setError({
          ...error,
          confirmPassword: null,
        });
        setNewUser({
          ...newUser,
          passwordConfirm: e.target.value,
        });
      }
    }

    // Phone Validation

    if (e.target.name === "phone") {
      if (e.target.value.length === 0) {
        setError({
          ...error,
          phone: null,
        });
      } else if (!e.target.value.match(/^\d{10}/)) {
        lang === "english"
          ? setError({
              ...error,
              phone: "Please enter valid phone number",
            })
          : setError({
              ...error,
              phone: "من فضلك ادخل رقم صحيح",
            });
      } else {
        setError({
          ...error,
          phone: null,
        });
        setNewUser({
          ...newUser,
          phone: e.target.value,
        });
      }
    }
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(addUser(newUser)).then((res) => {
      navigate("/");
    });
  };

  return (
    <Container>
      <Wrapper className={` ${dark ? "bg-dark" : "null"} `}>
        <Title>
          {lang === "english" ? "Create new account" : "إنشاء حساب جديد"}
        </Title>
        <Form onChange={changeHandler} onSubmit={submitHandler}>
          <Input
            name="firstName"
            type="text"
            placeholder="First Name"
            autoFocus
          />
          {error.fname && <Error>{error.fname}</Error>}
          <Input
            name="lastName"
            type="text"
            placeholder="Last Name"
            onBlur={(e) => (e.target.placeholder = "Last Name")}
            onFocus={(e) => (e.target.placeholder = "")}
          />
          {error.lname && <Error>{error.lname}</Error>}
          <Input
            name="userName"
            type="text"
            placeholder="Username"
            onBlur={(e) => (e.target.placeholder = "Username")}
            onFocus={(e) => (e.target.placeholder = "")}
          />
          {error.username && <Error>{error.username}</Error>}
          <Input
            name="email"
            type="email"
            placeholder="Email"
            onBlur={(e) => (e.target.placeholder = "Email")}
            onFocus={(e) => (e.target.placeholder = "")}
          />
          {error.email && <Error>{error.email}</Error>}
          <Input
            name="password"
            type="password"
            placeholder="Password"
            onBlur={(e) => (e.target.placeholder = "Password")}
            onFocus={(e) => (e.target.placeholder = "")}
          />
          {error.password && <Error>{error.password}</Error>}
          <Input
            name="passwordConfirm"
            type="password"
            placeholder="Confirm Password"
            onBlur={(e) => (e.target.placeholder = "Password")}
            onFocus={(e) => (e.target.placeholder = "")}
          />
          {error.confirmPassword && <Error>{error.confirmPassword}</Error>}
          <Input
            name="phone"
            type="text"
            placeholder="phone"
            onBlur={(e) => (e.target.placeholder = "Phone")}
            onFocus={(e) => (e.target.placeholder = "")}
          />
          {error.phone && <Error>{error.phone}</Error>}
          <Button type="submit" className="mt-4">
            {lang === "english" ? "Register" : "إنشاء"}
          </Button>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Register;
