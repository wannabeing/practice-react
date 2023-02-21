import React from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import Auth from "routes/Auth";
import Home from "routes/Home";
import Profile from "routes/Profile";
import Navigation from "components/Navgation";

const AppRouter = ({ isLoggedIn, userInfo, refreshUserInfo }) => {
  return (
    <HashRouter>
      {isLoggedIn && <Navigation userInfo={userInfo} />}
      <Switch>
        {isLoggedIn ? (
          <>
            <Route exact path="/">
              <Home userInfo={userInfo} />
            </Route>
            <Route exact path="/profile">
              <Profile userInfo={userInfo} refreshUserInfo={refreshUserInfo} />
            </Route>
          </>
        ) : (
          <Route exact path="/">
            <Auth />
          </Route>
        )}
      </Switch>
    </HashRouter>
  );
};

export default AppRouter;
