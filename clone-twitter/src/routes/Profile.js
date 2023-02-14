import { fbAuth } from "fb";
import React from "react";
import { useHistory } from "react-router-dom";

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
  const history = useHistory();
  const onLogout = () => {
    fbAuth.signOut();
    history.push("/");
  };

  return (
    <>
      <button onClick={onLogout}>로그아웃</button>
    </>
  );
};
