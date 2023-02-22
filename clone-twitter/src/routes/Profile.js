import Tweet from "components/Tweet";
import { fbAuth, fbStore } from "fb";
import React, { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

// eslint-disable-next-line import/no-anonymous-default-export
export default ({ userInfo, refreshUserInfo }) => {
  const history = useHistory();
  const [newDname, setNewDname] = useState(userInfo.displayName);
  const [myTweets, setMyTweets] = useState([]);

  // 로그아웃 함수
  const onLogout = () => {
    fbAuth.signOut();
    history.push("/");
  };
  // 로그인 유저의 트윗리스트 가져오는 함수
  const getMyTweets = useCallback(async () => {
    fbStore
      .collection("tweets")
      .where("uid", "==", userInfo.uid)
      .orderBy("createdAt", "desc")
      .onSnapshot((snapshot) => {
        const updatedTweets = snapshot.docs.map((document) => ({
          pid: document.id,
          ...document.data(),
        }));
        setMyTweets(updatedTweets);
      });
  }, [userInfo]);

  useEffect(() => {
    getMyTweets();
  }, [getMyTweets]);

  // 닉네임 변경 인풋 감지 함수
  const onChangeDname = (event) => {
    const { value } = event.target;
    setNewDname(value);
  };
  // 닉네임 변경 실행 함수
  const onSubmitDname = async (event) => {
    event.preventDefault();

    if (userInfo.displayName !== newDname) {
      await userInfo.updateProfile({
        displayName: newDname,
      });
      refreshUserInfo();
    }
  };

  return (
    <>
      <form onSubmit={onSubmitDname}>
        <input
          onChange={onChangeDname}
          type="text"
          placeholder="닉네임"
          value={newDname}
        />
        <input type="submit" value="닉네임 변경" />
      </form>

      <button onClick={onLogout}>로그아웃</button>

      <div>
        {myTweets.map((tweet) => (
          <Tweet
            key={tweet.pid}
            tweet={tweet}
            isOwner={tweet.uid === userInfo.uid}
          />
        ))}
      </div>
    </>
  );
};
