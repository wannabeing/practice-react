import AuthForm from "components/AuthForm";
import { fb, fbAuth } from "fb";
import React from "react";

const Auth = () => {
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
      <AuthForm />
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
