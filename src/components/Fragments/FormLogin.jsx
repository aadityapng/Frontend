import React, { useState } from "react";
import InputForm from "../Elements/Input";
import Button from "../Elements/Button";
import {login} from "../../services/auth.service";

const FormLogin = () => {

  const [loginFailed, setLoginFailed] = useState("");

  const hendleLogin = (event) => {
    event.preventDefault();
    // localStorage.setItem("email", event.target.email.value);
    // localStorage.setItem("password", event.target.password.value);
    // window.location.href = "/products";
    const data = {
      username: event.target.username.value,
      password: event.target.password.value,
    };
    login(data, (status, res) => {
      if (status) {
        localStorage.setItem("token", res.data.token);
        window.location.href = "/management/dashboard";
      } else {
        setLoginFailed(res.response?.data?.message);
        console.log(res.response.data.message);
      }
    });
  };
  return (
    <form onSubmit={hendleLogin}>
      <InputForm
        label="Username"
        type="text"
        placeholder="username"
        name="username"
      />
      <InputForm
        label="Password"
        type="password"
        placeholder="********"
        name="password"
      />

      <div>
        <Button variant="bg-blue-600 w-full text-white" type="submit">
          Login
        </Button>
        {loginFailed && <p className="text-red-500 text-sm text-center mt-3">{loginFailed}</p>}
      </div>
    </form>
  );
};

export default FormLogin;
