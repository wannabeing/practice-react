import React, { useEffect, useState } from "react";
import { fbAuth } from "fb";
import AppRouter from "components/Router";

function App() {
  const [init, setInit] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    // 로그인 상태 감지
    fbAuth.onAuthStateChanged((user) => {
      user
        ? setUserInfo({
            displayName: user.displayName,
            uid: user.uid,
            email: user.email,
            updateProfile: (args) => user.updateProfile(args),
          })
        : setUserInfo(null);
      setInit(true);
    });
  }, []);
  // 유저정보 새로고침 함수
  const refreshUserInfo = () => {
    const user = fbAuth.currentUser;
    setUserInfo({
      displayName: user.displayName,
      uid: user.uid,
      email: user.email,
      updateProfile: (args) => user.updateProfile(args),
    });
  };
  return (
    <>
      {init ? (
        <AppRouter
          isLoggedIn={Boolean(fbAuth.currentUser)}
          userInfo={userInfo}
          refreshUserInfo={refreshUserInfo}
        />
      ) : (
        "init"
      )}
    </>
  );
}

export default App;
