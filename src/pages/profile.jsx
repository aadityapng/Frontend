import React from "react";
import { useLogin } from "../hooks/useLogin";

const ProfilePage = () => {
  const username = useLogin();
  return <div>Username : {username}</div>;
};

export default ProfilePage;
