import React from "react";
import { Link } from "react-router-dom";

const Navigation = ({ userInfo }) => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">홈</Link>
        </li>
        <li>
          <Link to="/profile">
            {userInfo.displayName
              ? `${userInfo.displayName}'s 페이지`
              : "마이페이지"}
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
