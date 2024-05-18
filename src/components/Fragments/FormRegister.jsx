import React from "react";
import InputForm from "../Elements/Input";
import Button from "../Elements/Button";

const FormRegister = () => {
  return (
    <form action="" className="">
      <InputForm
        label="Fullname"
        type="text"
        placeholder="Insert your fullname"
        name="fullname"
      />
      <InputForm
        label="Email"
        type="email"
        placeholder="Enter your email"
        name="email"
      />
      <InputForm
        label="Password"
        type="password"
        placeholder="********"
        name="password"
      />
      <InputForm
        label="Confirm Password"
        type="password"
        placeholder="********"
        name="ConfirmPassword"
      />

      <div>
        <Button variant="bg-blue-600 w-full text-white">Register</Button>
      </div>
    </form>
  );
};

export default FormRegister;
