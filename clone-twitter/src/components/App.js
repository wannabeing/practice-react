import React, { useState } from "react";
import Router from "components/Router";
import { fbAuth } from "fb";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return <Router isLoggedIn={isLoggedIn} />;
}

export default App;
