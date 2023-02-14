import { fb, fbAuth } from "fb";
import React, { useState } from "react";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  // 인풋 변경 감지 함수
  const onChange = (event) => {
    const { name, value } = event.target;

    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };
  // 폼 제출 함수
  const onSubmit = async (event) => {
    event.preventDefault();

    try {
      if (newAccount) {
        // 계정생성
        await fbAuth.createUserWithEmailAndPassword(email, password);
      } else {
        // 로그인
        await fbAuth.signInWithEmailAndPassword(email, password);
      }
    } catch (error) {
      setErrorMsg(error.message);
    }
  };

  // 계정생성 / 로그인 결정
  const toggleAccount = () => {
    setNewAccount((prev) => !prev);
  };

  // 소셜 로그인 함수
  const onSocialLogin = async (event) => {
    const { name: socialName } = event.target;
    let provider;

    if (socialName === "google") {
      // 구글 로그인
      provider = new fb.auth.GoogleAuthProvider();
    } else if (socialName === "github") {
      // 깃허브 로그인
      provider = new fb.auth.GithubAuthProvider();
    }

    await fbAuth.signInWithPopup(provider);
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
          name="password"
          placeholder="PASSWORD"
          required
          value={password}
          onChange={onChange}
        />
        <input type="submit" value={newAccount ? "계정생성" : "로그인"} />
        {errorMsg}
      </form>

      <span onClick={toggleAccount}>{newAccount ? "로그인" : "계정생성 "}</span>
      <div>
        <button onClick={onSocialLogin} name="google">
          GOOGLE 로그인
        </button>
        <button onClick={onSocialLogin} name="github">
          GITHUB 로그인
        </button>
      </div>
    </div>
  );
};
export default Auth;
