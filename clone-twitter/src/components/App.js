import React, { useEffect, useState } from "react";
import { fbAuth } from "fb";
import AppRouter from "components/Router";

function App() {
  const [init, setInit] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    // 로그인 상태 감지
    fbAuth.onAuthStateChanged((user) => {
      user ? setUserInfo(user) : setUserInfo(null);
      setInit(true);
    });
  }, []);
  return (
    <>
      {init ? (
        <AppRouter
          isLoggedIn={Boolean(fbAuth.currentUser)}
          userInfo={userInfo}
        />
      ) : (
        "init"
      )}
    </>
  );
}

export default App;
