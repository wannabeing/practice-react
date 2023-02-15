import React, { useEffect, useState } from "react";
import { fbAuth } from "fb";
import AppRouter from "components/Router";

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(fbAuth.currentUser);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    // 로그인 상태 감지
    fbAuth.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
        setUserInfo(user);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, []);
  return (
    <>
      {init ? (
        <AppRouter isLoggedIn={isLoggedIn} userInfo={userInfo} />
      ) : (
        "init"
      )}
    </>
  );
}

export default App;
