import React from 'react'
import InputForm from '../Elements/Input'
import Button from '../Elements/Button'

const FormLogin = () => {
  return (
    <form action="" className="">
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

    <div>
      <Button variant="bg-blue-600 w-full text-white">Login</Button>
    </div>
    <div className="mt-4">
      <Button variant="bg-white border w-full text-blue-600">
        Register
      </Button>
    </div>
  </form>
  )
}

export default FormLogin