import React, { useState } from "react";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");

  // 인풋 변경 감지 함수
  const onChange = (event) => {
    const { name, value } = event.target;

    if (name === "email") {
      setEmail(value);
    } else if (name === "pw") {
      setPw(value);
    }
  };
  // 폼 제출 함수
  const onSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          name="email"
          placeholder="EMAIL"
          required
          value={email}
          onChange={onChange}
        />
        <input
          type="password"
          name="pw"
          placeholder="PASSWORD"
          required
          value={pw}
          onChange={onChange}
        />
        <input type="submit" value="로그인" />
      </form>
      <div>
        <button>GOOGLE 로그인</button>
        <button>GITHUB 로그인</button>
      </div>
    </div>
  );
};
export default Auth;
