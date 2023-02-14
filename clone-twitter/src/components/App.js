import React, { useEffect, useState } from "react";
import Router from "components/Router";
import { fbAuth } from "fb";

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(fbAuth.currentUser);

  useEffect(() => {
    fbAuth.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, []);
  return <>{init ? <Router isLoggedIn={isLoggedIn} /> : "init"}</>;
}

export default App;
