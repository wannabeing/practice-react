import Tweet from "components/Tweet";
import { fbStore } from "fb";
import React, { useEffect, useState } from "react";

const Home = ({ userInfo }) => {
  const [tweet, setTweet] = useState("");
  const [tweets, setTweets] = useState([]);

  useEffect(() => {
    // DB가 뭔가를 할 때마다 트윗리스트 갱신
    fbStore
      .collection("tweets")
      .orderBy("createdAt", "desc")
      .onSnapshot((snapshot) => {
        const updatedTweets = snapshot.docs.map((document) => ({
          pid: document.id,
          ...document.data(),
        }));
        setTweets(updatedTweets);
      });
  }, []);

  // 폼 제출 함수
  const onSumbit = async (event) => {
    event.preventDefault();
    // fireStore에 저장
    await fbStore.collection("tweets").add({
      text: tweet,
      createdAt: Date.now(),
      uid: userInfo.uid, // 작성자 id 저장
    });
    setTweet(""); // 초기화
  };
  // 글(트윗) 저장 함수
  const onChange = (event) => {
    const { value } = event.target;
    setTweet(value);
  };
  return (
    <div>
      <form onSubmit={onSumbit}>
        <input
          onChange={onChange}
          value={tweet}
          type="text"
          placeholder="니 생각을 적어랏"
          maxLength={120}
        />
        <input type="submit" value="Tweet" />
      </form>

      <div>
        {tweets.map((tweet) => (
          <Tweet
            key={tweet.pid}
            tweet={tweet}
            isOwner={tweet.uid === userInfo.uid}
          />
        ))}
      </div>
    </div>
  );
};
export default Home;
